import {
  BackSide,
  Group,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer,
  type Texture,
} from 'three';
import { DEG, FOV, HOME, unitVector, verticalFov, yawFor } from './view';

// A textured Earth with an atmosphere halo, rotated by dragging and flown to places.
// The camera stays on the +Z axis; the globe itself yaws (about its polar axis) and pitches.

export interface LatLon {
  lat: number;
  lon: number;
}

export interface ScreenPoint {
  x: number;
  y: number;
  // Cosine between the surface normal and the direction to the camera; <= 0 means behind the globe.
  facing: number;
}

export interface EarthOptions {
  canvas: HTMLCanvasElement;
  points: LatLon[];
  night: boolean;
  reducedMotion: boolean;
  textureSize: '2k' | '4k';
  onFrame: (points: ScreenPoint[]) => void;
  // Fires when the globe (with its halo) starts or stops overflowing the canvas.
  onOverflow: (overflowing: boolean) => void;
  onContextLost: () => void;
}

export interface Earth {
  // Resolves once the textures are loaded and the first frame is drawn.
  ready: Promise<void>;
  setSize(width: number, height: number): void;
  setNight(night: boolean): void;
  setActive(active: boolean): void;
  flyTo(point: LatLon): void;
  // Leaves the focused place: zooms back out and lets the globe spin again.
  release(): void;
  home(): void;
  zoomBy(factor: number): void;
  dispose(): void;
}

interface View {
  yaw: number;
  pitch: number;
  dist: number;
}

interface Flight {
  from: View;
  to: View;
  start: number;
  duration: number;
  lift: number;
}

const FOCUS_DIST = 3.2;
const MIN_DIST = 1.8;
const MAX_DIST = 6.5;
const MAX_PITCH = 80 * DEG;
const SPIN = 0.05; // auto-rotation, rad/s
const IDLE_MS = 3000; // pause after an interaction before auto-rotation resumes
const HALO_RADIUS = 1.12;
// Closer than this, the halo's projected radius exceeds half the canvas's shorter side.
const OVERFLOW_DIST = HALO_RADIUS / Math.sin(Math.atan(Math.tan((FOV * DEG) / 2)));
const LIGHT = new Vector3(-0.5, 0.55, 0.67).normalize();

// Linear-space colours for the two themes; the light theme shows the day side, the dark theme city lights.
const THEMES = {
  day: { rim: new Vector3(0.3, 0.52, 1), halo: new Vector3(0.36, 0.6, 1), haloStrength: 0.6 },
  night: { rim: new Vector3(0.1, 0.2, 0.62), halo: new Vector3(0.16, 0.32, 0.95), haloStrength: 0.6 },
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const earthFragment = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform float night;
  uniform vec3 lightDir;
  uniform vec3 rimColor;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float rim = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.5);

    vec3 day = texture2D(dayMap, vUv).rgb;
    float light = clamp(dot(n, lightDir) * 0.42 + 0.74, 0.0, 1.2);
    vec3 dayColor = mix(day * light, rimColor, rim * 0.6);

    vec3 lights = texture2D(nightMap, vUv).rgb;
    vec3 nightColor = lights * 1.15 + rimColor * rim * 0.5;

    gl_FragColor = vec4(mix(dayColor, nightColor, night), 1.0);
    #include <colorspace_fragment>
  }
`;

// Drawn on the back faces of a slightly larger sphere: opaque at the Earth's limb, fading to nothing at the edge.
const haloFragment = /* glsl */ `
  uniform vec3 color;
  uniform float strength;
  uniform float limb;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float d = clamp(-dot(normalize(vNormal), normalize(vView)) / limb, 0.0, 1.0);
    gl_FragColor = vec4(color, pow(d, 2.4) * strength);
    #include <colorspace_fragment>
  }
`;

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const wrapAngle = (a: number) => a - 2 * Math.PI * Math.floor((a + Math.PI) / (2 * Math.PI));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export function createEarth(options: EarthOptions): Earth {
  const { canvas, reducedMotion, onFrame } = options;

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
  const globe = new Group();
  scene.add(globe);

  const initial = options.night ? THEMES.night : THEMES.day;
  const earthUniforms = {
    dayMap: { value: null as Texture | null },
    nightMap: { value: null as Texture | null },
    night: { value: options.night ? 1 : 0 },
    lightDir: { value: LIGHT },
    rimColor: { value: initial.rim.clone() },
  };
  const haloUniforms = {
    color: { value: initial.halo.clone() },
    strength: { value: initial.haloStrength },
    limb: { value: Math.sqrt(1 - 1 / (HALO_RADIUS * HALO_RADIUS)) },
  };

  const earthGeometry = new SphereGeometry(1, 128, 64);
  const earthMaterial = new ShaderMaterial({ uniforms: earthUniforms, vertexShader, fragmentShader: earthFragment });
  globe.add(new Mesh(earthGeometry, earthMaterial));

  const haloGeometry = new SphereGeometry(HALO_RADIUS, 96, 48);
  const haloMaterial = new ShaderMaterial({
    uniforms: haloUniforms,
    vertexShader,
    fragmentShader: haloFragment,
    side: BackSide,
    transparent: true,
    depthWrite: false,
  });
  scene.add(new Mesh(haloGeometry, haloMaterial));

  const local = options.points.map((p) => new Vector3(...unitVector(p.lat, p.lon)));
  const screen: ScreenPoint[] = local.map(() => ({ x: 0, y: 0, facing: -1 }));
  const world = new Vector3();
  const toCamera = new Vector3();

  const view: View = { yaw: yawFor(HOME.lon), pitch: HOME.lat * DEG, dist: HOME.dist };
  const velocity = { yaw: 0, pitch: 0 };
  const pointers = new Map<number, { x: number; y: number }>();
  let pinch: { span: number; dist: number } | null = null;
  let lastMove = 0;
  let flight: Flight | null = null;
  let focused = false;
  let overflowing = false;
  let spin = 0; // ramps auto-rotation up from rest
  let nightTarget = earthUniforms.night.value;
  let lastInteraction = -Infinity;
  let width = 0;
  let height = 0;
  let loaded = false;
  let active = true;
  let disposed = false;
  let raf = 0;
  let last = 0;

  const textures: Texture[] = [];
  const loader = new TextureLoader();
  const load = async (url: string) => {
    const texture = await loader.loadAsync(url);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    textures.push(texture);
    return texture;
  };

  const size = options.textureSize;
  const ready = Promise.all([load(`/earth/day-${size}.webp`), load(`/earth/night-${size}.webp`)]).then(([day, nightMap]) => {
    if (disposed) return;
    earthUniforms.dayMap.value = day;
    earthUniforms.nightMap.value = nightMap;
    loaded = true;
    render();
    requestFrame();
  });

  function setTheme(t: number) {
    earthUniforms.rimColor.value.lerpVectors(THEMES.day.rim, THEMES.night.rim, t);
    haloUniforms.color.value.lerpVectors(THEMES.day.halo, THEMES.night.halo, t);
    haloUniforms.strength.value = lerp(THEMES.day.haloStrength, THEMES.night.haloStrength, t);
  }

  function project() {
    for (let i = 0; i < local.length; i++) {
      world.copy(local[i]).applyMatrix4(globe.matrixWorld);
      toCamera.copy(camera.position).sub(world).normalize();
      screen[i].facing = world.dot(toCamera);
      world.project(camera);
      screen[i].x = ((world.x + 1) / 2) * width;
      screen[i].y = ((1 - world.y) / 2) * height;
    }
    onFrame(screen);
  }

  function render() {
    if (!loaded || !width || !height) return;
    globe.rotation.set(view.pitch, view.yaw, 0);
    camera.position.set(0, 0, view.dist);
    renderer.render(scene, camera);
    project();
    if (view.dist < OVERFLOW_DIST !== overflowing) {
      overflowing = !overflowing;
      options.onOverflow(overflowing);
    }
  }

  function requestFrame() {
    if (raf || !active || disposed) return;
    raf = requestAnimationFrame(tick);
  }

  function tick(now: number) {
    raf = 0;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    let moving = false;

    if (flight) {
      const t = flight.duration ? Math.min(1, (now - flight.start) / flight.duration) : 1;
      const e = ease(t);
      view.yaw = lerp(flight.from.yaw, flight.to.yaw, e);
      view.pitch = lerp(flight.from.pitch, flight.to.pitch, e);
      view.dist = lerp(flight.from.dist, flight.to.dist, e) + flight.lift * Math.sin(Math.PI * e);
      if (t >= 1) flight = null;
      moving = true;
    } else if (pointers.size === 0 && Math.hypot(velocity.yaw, velocity.pitch) > 0.01) {
      view.yaw += velocity.yaw * dt;
      view.pitch = clamp(view.pitch + velocity.pitch * dt, -MAX_PITCH, MAX_PITCH);
      const decay = Math.exp(-3.5 * dt);
      velocity.yaw *= decay;
      velocity.pitch *= decay;
      moving = true;
    }

    // Auto-rotation: resumes a few seconds after the last interaction, unless a place is open.
    if (!focused && !reducedMotion) {
      moving = true;
      if (!flight && pointers.size === 0 && now - lastInteraction > IDLE_MS) {
        spin = Math.min(1, spin + dt / 1.5);
        view.yaw += SPIN * spin * dt;
      } else {
        spin = 0;
      }
    }

    const currentNight = earthUniforms.night.value;
    if (currentNight !== nightTarget) {
      const step = reducedMotion ? 1 : dt / 0.6;
      earthUniforms.night.value =
        nightTarget > currentNight ? Math.min(nightTarget, currentNight + step) : Math.max(nightTarget, currentNight - step);
      setTheme(earthUniforms.night.value);
      moving = true;
    }

    render();
    if (moving) requestFrame();
    else last = 0;
  }

  function fly(to: View, duration?: number) {
    const turn = wrapAngle(to.yaw - view.yaw);
    const target = { yaw: view.yaw + turn, pitch: clamp(to.pitch, -MAX_PITCH, MAX_PITCH), dist: to.dist };
    const arc = Math.hypot(turn * Math.cos((view.pitch + target.pitch) / 2), target.pitch - view.pitch);
    flight = {
      from: { ...view },
      to: target,
      start: performance.now(),
      duration: reducedMotion ? 0 : (duration ?? 650 + 750 * Math.min(1, arc / Math.PI)),
      lift: Math.min(1.4, arc * 0.6),
    };
    velocity.yaw = velocity.pitch = 0;
    requestFrame();
  }

  const interacted = () => {
    lastInteraction = performance.now();
  };

  // ---------- Input: drag to rotate, pinch or ctrl/⌘ + wheel to zoom ----------

  const span = () => {
    const [a, b] = Array.from(pointers.values());
    return Math.hypot(a.x - b.x, a.y - b.y) || 1;
  };

  // Radians per CSS pixel, so the surface under the pointer roughly follows it.
  const radiansPerPixel = () => {
    const shorter = Math.min(width, height) || 1;
    const radius = (shorter / 2) * (Math.tan(Math.asin(1 / view.dist)) / Math.tan((FOV * DEG) / 2));
    return 1 / radius;
  };

  function onPointerDown(e: PointerEvent) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) pinch = { span: span(), dist: view.dist };
    flight = null;
    velocity.yaw = velocity.pitch = 0;
    lastMove = e.timeStamp;
    interacted();
    requestFrame();
  }

  function onPointerMove(e: PointerEvent) {
    const p = pointers.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    p.x = e.clientX;
    p.y = e.clientY;
    if (pinch && pointers.size === 2) {
      view.dist = clamp((pinch.dist * pinch.span) / span(), MIN_DIST, MAX_DIST);
    } else if (pointers.size === 1) {
      const k = radiansPerPixel();
      const dt = Math.max(8, e.timeStamp - lastMove) / 1000;
      lastMove = e.timeStamp;
      view.yaw += dx * k;
      view.pitch = clamp(view.pitch + dy * k, -MAX_PITCH, MAX_PITCH);
      velocity.yaw = clamp(0.5 * velocity.yaw + (0.5 * dx * k) / dt, -4, 4);
      velocity.pitch = clamp(0.5 * velocity.pitch + (0.5 * dy * k) / dt, -4, 4);
    }
    interacted();
    requestFrame();
  }

  function onPointerUp(e: PointerEvent) {
    if (!pointers.delete(e.pointerId)) return;
    if (pointers.size < 2) pinch = null;
    // No fling when the pointer was held still before release, or when the browser took over the gesture.
    if (e.type === 'pointercancel' || e.timeStamp - lastMove > 90) velocity.yaw = velocity.pitch = 0;
    interacted();
    requestFrame();
  }

  function onWheel(e: WheelEvent) {
    if (!e.ctrlKey && !e.metaKey) return; // a plain wheel keeps scrolling the page
    e.preventDefault();
    flight = null;
    view.dist = clamp(view.dist * Math.exp(e.deltaY * 0.01), MIN_DIST, MAX_DIST);
    interacted();
    requestFrame();
  }

  function onContextLost(e: Event) {
    e.preventDefault();
    options.onContextLost();
  }

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('wheel', onWheel, { passive: false });
  canvas.addEventListener('webglcontextlost', onContextLost);

  return {
    ready,

    setSize(w, h) {
      width = w;
      height = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = verticalFov(w, h);
      camera.updateProjectionMatrix();
      render();
    },

    setNight(night) {
      nightTarget = night ? 1 : 0;
      requestFrame();
    },

    setActive(next) {
      active = next;
      if (active) {
        requestFrame();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
      }
    },

    flyTo({ lat, lon }) {
      focused = true;
      fly({ yaw: yawFor(lon), pitch: lat * DEG, dist: FOCUS_DIST });
    },

    release() {
      focused = false;
      interacted();
      fly({ yaw: view.yaw, pitch: view.pitch * 0.5, dist: HOME.dist }, 900);
    },

    home() {
      focused = false;
      interacted();
      fly({ yaw: yawFor(HOME.lon), pitch: HOME.lat * DEG, dist: HOME.dist });
    },

    zoomBy(factor) {
      interacted();
      fly({ ...view, dist: clamp(view.dist * factor, MIN_DIST, MAX_DIST) }, 350);
    },

    dispose() {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      textures.forEach((t) => t.dispose());
      earthGeometry.dispose();
      haloGeometry.dispose();
      earthMaterial.dispose();
      haloMaterial.dispose();
      renderer.dispose();
    },
  };
}
