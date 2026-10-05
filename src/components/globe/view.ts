// Camera and globe geometry shared by the WebGL renderer and the still-image fallback.
// Kept free of three.js so the page can import it without loading the renderer.

export const DEG = Math.PI / 180;
export const FOV = 30; // degrees, spanning the shorter side of the canvas
export const HOME = { lat: 6, lon: 132, dist: 4.5 };

// Unit vector for a latitude/longitude, matching the UV layout of three.js SphereGeometry
// (texture longitude 0 lines up with lon = 0).
export function unitVector(lat: number, lon: number): [number, number, number] {
  const phi = (lon + 180) * DEG;
  const theta = (90 - lat) * DEG;
  return [-Math.sin(theta) * Math.cos(phi), Math.cos(theta), Math.sin(theta) * Math.sin(phi)];
}

// Globe yaw that turns the given longitude to face the camera.
export const yawFor = (lon: number) => -(lon + 90) * DEG;

// Vertical field of view (degrees) for a canvas, keeping FOV on its shorter side.
export const verticalFov = (width: number, height: number) =>
  width >= height ? FOV : (2 * Math.atan(Math.tan((FOV * DEG) / 2) / (width / height))) / DEG;

// Screen position of a place with the globe at rest in the home view; used when WebGL is unavailable.
export function projectHome(lat: number, lon: number, width: number, height: number) {
  let [x, y, z] = unitVector(lat, lon);
  const yaw = yawFor(HOME.lon);
  const pitch = HOME.lat * DEG;
  [x, z] = [x * Math.cos(yaw) + z * Math.sin(yaw), -x * Math.sin(yaw) + z * Math.cos(yaw)];
  [y, z] = [y * Math.cos(pitch) - z * Math.sin(pitch), y * Math.sin(pitch) + z * Math.cos(pitch)];
  const depth = HOME.dist - z;
  const tanY = Math.tan((verticalFov(width, height) * DEG) / 2);
  const tanX = tanY * (width / height);
  return {
    x: ((x / depth / tanX + 1) / 2) * width,
    y: ((1 - y / depth / tanY) / 2) * height,
    facing: (z * HOME.dist - 1) / Math.hypot(x, y, depth),
  };
}
