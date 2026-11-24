"use client";

import { useEffect, useRef, useState } from "react";
import { STAR_D } from "@/components/brand/symbol-paths";
import { Reveal, Words } from "@/components/scroll/Reveal";
import type { Copy } from "@/content/i18n/en";

/**
 * The seven stars (D-09, D-14): the Big Dipper, 北斗七星, drawn with the gold star from the logo.
 * The constellation stays in place (position: sticky, inside normal scroll) while the seven
 * principles scroll past; each star lights as its principle crosses the middle of the screen.
 * Phones: the constellation sits on top and the principles scroll beneath it (D-06).
 *
 * Star positions are the real ones (J2000 right ascension and declination, projected around the
 * constellation's centre, east to the left as on a sky chart), in the traditional order from
 * Dubhe (天枢) to Alkaid (揺光).
 *
 * Before hydration, without JavaScript and under reduced motion every star is lit.
 */
const STARS: [number, number][] = [
  [584, 49], // Dubhe
  [590, 172], // Merak
  [418, 234], // Phecda
  [347, 157], // Megrez
  [220, 182], // Alioth
  [121, 206], // Mizar
  [43, 335], // Alkaid
];
const LINES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [3, 4],
  [4, 5],
  [5, 6],
];

export function SevenStars({ t }: { t: Copy }) {
  const s = t.stars;
  const listRef = useRef<HTMLOListElement>(null);
  // null = not measured yet: render everything lit (server HTML, no JS, reduced motion).
  const [lit, setLit] = useState<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-principle]"));
    let frame = 0;
    const read = () => {
      frame = 0;
      const line = window.innerHeight * 0.58;
      let count = 0;
      for (const item of items) if (item.getBoundingClientRect().top < line) count += 1;
      setLit(count);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const on = (i: number) => lit === null || i < lit;
  const active = lit === null ? -1 : lit - 1;
  const caption = active >= 0 ? `${s.starNames[active]} · ${active + 1} / 7` : " ";

  return (
    <section id="principles" className="stars" aria-labelledby="stars-title" data-measured={lit === null ? undefined : ""}>
      <Reveal className="wrap stars-head">
        <p className="eyebrow">
          <span lang="ja" className="eyebrow-kanji">
            {s.kanji}
          </span>
          <span aria-hidden="true">·</span>
          <span>{s.reading}</span>
        </p>
        <h2 id="stars-title" className="section-title">
          <Words text={s.title} />
        </h2>
        <p className="section-lead">{s.lead}</p>
      </Reveal>

      <div className="wrap stars-grid">
        <div className="stars-sticky">
          <figure className="dipper">
            <svg viewBox="0 0 640 380" role="img" aria-label={s.constellationLabel}>
              {LINES.map(([a, b]) => {
                const [x1, y1] = STARS[a]!;
                const [x2, y2] = STARS[b]!;
                return <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} className="dipper-line" data-on={on(a) && on(b) ? "" : undefined} />;
              })}
              {STARS.map(([x, y], i) => (
                <circle key={`dot-${i}`} cx={x} cy={y} r="2.5" className="dipper-dot" />
              ))}
              {STARS.map(([x, y], i) => (
                <path
                  key={`star-${i}`}
                  d={STAR_D}
                  className="dipper-star"
                  style={{ "--x": x, "--y": y } as React.CSSProperties}
                  data-on={on(i) ? "" : undefined}
                  data-active={i === active ? "" : undefined}
                />
              ))}
              {STARS.map(([x, y], i) => (
                <text key={`num-${i}`} x={i === 1 ? x - 30 : x + 16} y={i === 0 ? y + 42 : y + 36} className="dipper-num" aria-hidden="true">
                  {i + 1}
                </text>
              ))}
            </svg>
            <figcaption className="dipper-caption" aria-hidden="true">
              {caption}
            </figcaption>
          </figure>
        </div>

        <ol ref={listRef} className="principles">
          {s.principles.map((p, i) => (
            <li
              key={p.title}
              data-principle=""
              className="principle"
              data-state={lit === null ? undefined : i === active ? "active" : i < (lit ?? 0) ? "past" : "future"}
            >
              <p className="principle-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
                <span className="principle-star">{s.starNames[i]}</span>
              </p>
              <h3 className="principle-title">{p.title}</h3>
              <p className="principle-proof">{p.proof}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
