'use client';

import { useEffect, useRef, useState } from 'react';
import { Compass, Minus, Plus } from 'lucide-react';
import type { Earth, ScreenPoint } from './earth';
import { projectHome } from './view';
import type { Place } from '@/content/places';
import type { Lang } from '@/content/profile';

interface GlobeProps {
  lang: Lang;
  places: Place[];
  selected: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
  labels: { zoomIn: string; zoomOut: string; reset: string };
}

type Status = 'loading' | 'ready' | 'fallback';

// The WebGL globe. three.js is loaded on demand, so the page renders (and works) before it arrives;
// until then, or without WebGL, the stage shows a still image of the globe.
export default function Globe({ lang, places, selected, onSelect, onClose, labels }: GlobeProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const earthRef = useRef<Earth | null>(null);
  const selectedRef = useRef(selected);
  const resetRef = useRef(false);
  const [status, setStatus] = useState<Status>('loading');
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    let earth: Earth | null = null;
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    const root = document.documentElement;
    const darkScheme = matchMedia('(prefers-color-scheme: dark)');
    const isNight = () => (root.dataset.theme ? root.dataset.theme === 'dark' : darkScheme.matches);

    const placeMarkers = (points: Pick<ScreenPoint, 'x' | 'y' | 'facing'>[]) => {
      points.forEach(({ x, y, facing }, i) => {
        const marker = markerRefs.current[i];
        if (!marker) return;
        const alpha = Math.min(1, Math.max(0, (facing - 0.02) / 0.18));
        marker.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        marker.style.opacity = alpha.toFixed(3);
        marker.style.visibility = alpha > 0 ? 'visible' : 'hidden';
      });
    };

    // Without WebGL the still image stays up; pin the markers to it so places can still be opened.
    const fallback = () => {
      if (cancelled) return;
      setStatus('fallback');
      const pin = () =>
        placeMarkers(places.map((p) => projectHome(p.lat, p.lon, stage.clientWidth, stage.clientHeight)));
      pin();
      const resize = new ResizeObserver(pin);
      resize.observe(stage);
      cleanups.push(() => resize.disconnect());
    };

    import('./earth')
      .then(({ createEarth }) => {
        if (cancelled) return;
        const devicePixels = Math.min(stage.clientWidth, stage.clientHeight) * Math.min(window.devicePixelRatio || 1, 2);
        try {
          earth = createEarth({
            canvas,
            points: places,
            night: isNight(),
            reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
            textureSize: devicePixels > 900 ? '4k' : '2k',
            onFrame: placeMarkers,
            onOverflow: setOverflowing,
            onContextLost: fallback,
          });
        } catch {
          fallback();
          return;
        }
        earthRef.current = earth;

        const resize = new ResizeObserver(([entry]) => earth?.setSize(entry.contentRect.width, entry.contentRect.height));
        resize.observe(stage);
        const onScreen = new IntersectionObserver(([entry]) => earth?.setActive(entry.isIntersecting));
        onScreen.observe(stage);
        const syncTheme = () => earth?.setNight(isNight());
        const theme = new MutationObserver(syncTheme);
        theme.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
        darkScheme.addEventListener('change', syncTheme);
        cleanups.push(() => {
          resize.disconnect();
          onScreen.disconnect();
          theme.disconnect();
          darkScheme.removeEventListener('change', syncTheme);
        });

        const open = places.find((p) => p.id === selectedRef.current);
        if (open) earth.flyTo(open);

        earth.ready.then(() => !cancelled && setStatus('ready'), fallback);
      })
      .catch(fallback);

    return () => {
      cancelled = true;
      cleanups.forEach((cleanup) => cleanup());
      earth?.dispose();
      earthRef.current = null;
    };
  }, [places]);

  useEffect(() => {
    const previous = selectedRef.current;
    selectedRef.current = selected;
    const earth = earthRef.current;
    if (!earth) return;
    const place = places.find((p) => p.id === selected);
    if (place) {
      earth.flyTo(place);
    } else if (previous) {
      if (resetRef.current) earth.home();
      else earth.release();
    }
    resetRef.current = false;
  }, [selected, places]);

  const reset = () => {
    if (selected) {
      resetRef.current = true;
      onClose();
    } else {
      earthRef.current?.home();
    }
  };

  return (
    <div className="globe" ref={stageRef} data-status={status} data-overflowing={overflowing ? '' : undefined}>
      <div className="globe-poster" aria-hidden="true" />
      <canvas ref={canvasRef} className="globe-canvas" aria-hidden="true" />
      {/* Pointer targets only; the place list beside the globe is the accessible way in. */}
      <div className="globe-markers" aria-hidden="true">
        {places.map((place, i) => (
          <button
            key={place.id}
            type="button"
            tabIndex={-1}
            className="marker"
            data-selected={place.id === selected ? '' : undefined}
            ref={(el) => {
              markerRefs.current[i] = el;
            }}
            onClick={() => onSelect(place.id)}
          >
            <span className="marker-dot" />
            <span className="marker-label">{place.name[lang]}</span>
          </button>
        ))}
      </div>
      <div className="globe-controls">
        <button type="button" aria-label={labels.zoomIn} title={labels.zoomIn} onClick={() => earthRef.current?.zoomBy(0.8)}>
          <Plus size={16} strokeWidth={1.75} aria-hidden />
        </button>
        <button type="button" aria-label={labels.zoomOut} title={labels.zoomOut} onClick={() => earthRef.current?.zoomBy(1.25)}>
          <Minus size={16} strokeWidth={1.75} aria-hidden />
        </button>
        <button type="button" aria-label={labels.reset} title={labels.reset} onClick={reset}>
          <Compass size={16} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
    </div>
  );
}
