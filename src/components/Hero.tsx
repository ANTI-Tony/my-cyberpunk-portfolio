'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Globe from './globe/Globe';
import { formatCoordinates, places } from '@/content/places';
import { ui, type Lang } from '@/content/profile';

// Landing view: name and introduction on the left, the globe on the right.
// Opening a place swaps the introduction for that place's card, like a map's side panel.
export default function Hero({ lang, head, intro }: { lang: Lang; head: ReactNode; intro: ReactNode }) {
  const t = ui[lang].globe;
  const [selected, setSelected] = useState<string | null>(null);
  const index = places.findIndex((p) => p.id === selected);
  const place = index >= 0 ? places[index] : null;

  const heroRef = useRef<HTMLElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const returnTo = useRef<string | null>(null);

  const step = (delta: number) => setSelected(places[(index + delta + places.length) % places.length].id);
  // On narrow screens the list sits below the globe, so bring the globe into view to watch it turn.
  const openFromList = (id: string) => {
    setSelected(id);
    if (matchMedia('(max-width: 860px)').matches) globeRef.current?.scrollIntoView({ block: 'start' });
  };
  const close = () => {
    returnTo.current = selected;
    setSelected(null);
  };

  // Move focus into the card when it opens, and back to the place in the list when it closes.
  useEffect(() => {
    if (place) {
      titleRef.current?.focus({ preventScroll: true });
    } else if (returnTo.current) {
      listRefs.current[returnTo.current]?.focus({ preventScroll: true });
      returnTo.current = null;
    }
  }, [place]);

  useEffect(() => {
    if (!place) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      // Only while the reader is in the hero, not anywhere further down the page.
      const target = e.target as Node;
      if (target !== document.body && !heroRef.current?.contains(target)) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="wrap hero-grid">
        <div className="hero-head">{head}</div>

        <div className="hero-body">
          {place ? (
            <article className="place-card" key={place.id} aria-labelledby="place-title">
              <div className="place-bar">
                <button type="button" className="place-back" onClick={close}>
                  <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
                  {t.back}
                </button>
                <div className="place-step">
                  <button type="button" onClick={() => step(-1)} aria-label={t.prev} title={t.prev}>
                    <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
                  </button>
                  <span>
                    {index + 1} / {places.length}
                  </span>
                  <button type="button" onClick={() => step(1)} aria-label={t.next} title={t.next}>
                    <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
                  </button>
                </div>
              </div>
              <p className="place-meta">
                {place.country[lang]}
                {place.period && ` · ${place.period[lang]}`}
              </p>
              <h2 className="place-title" id="place-title" tabIndex={-1} ref={titleRef}>
                {place.name[lang]}
              </h2>
              <p className="place-coords">{formatCoordinates(place)}</p>
              {place.note && <p className="place-note">{place.note[lang]}</p>}
            </article>
          ) : (
            <>
              {intro}
              <div className="places">
                <h2 className="places-label">{t.places}</h2>
                <ul className="places-list">
                  {places.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        ref={(el) => {
                          listRefs.current[p.id] = el;
                        }}
                        onClick={() => openFromList(p.id)}
                      >
                        {p.name[lang]}
                        <span>{p.country[lang]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="globe-hint">{t.hint}</p>
              </div>
            </>
          )}
        </div>

        <div className="hero-globe" ref={globeRef}>
          <Globe
            lang={lang}
            places={places}
            selected={selected}
            onSelect={setSelected}
            onClose={close}
            labels={{
              zoomIn: t.zoomIn,
              zoomOut: t.zoomOut,
              reset: t.reset,
              day: t.day,
              night: t.night,
              canvas: t.canvas,
            }}
          />
        </div>
      </div>
    </section>
  );
}
