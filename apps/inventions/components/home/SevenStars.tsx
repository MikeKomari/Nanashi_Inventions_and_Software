"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STAR_D } from "@/components/brand/symbol-paths";
import { Reveal, Words } from "@/components/scroll/Reveal";
import Link from "next/link";
import type { Copy } from "@/content/i18n/en";
import { lp } from "@/lib/i18n";

export type SeenIn = { slug: string; name: string; accent: string; line: string }[][];

/**
 * The seven stars (D-09, D-14): the Big Dipper, 北斗七星, drawn with the gold star from the logo.
 * The section pins (position: sticky inside a tall track, so the page still scrolls natively, no
 * scroll-jacking) and shows ONE principle at a time: as you scroll, the current one slides out, the
 * next slides in (title and text at different speeds, for depth), and its star lights. Founder,
 * 25 Nov 2026: never show the previous and next principle at the same time.
 * Phones: the constellation sits above the principle (D-06).
 *
 * Star positions are the real ones (J2000 right ascension and declination, projected around the
 * constellation's centre, east to the left as on a sky chart), in the traditional order from
 * Dubhe (天枢) to Alkaid (揺光).
 *
 * Before hydration, without JavaScript and under reduced motion the principles are a plain list and
 * every star is lit.
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

export function SevenStars({ t, seen }: { t: Copy; seen: SeenIn }) {
  const s = t.stars;
  const n = s.principles.length;
  const trackRef = useRef<HTMLDivElement>(null);
  // null = not pinned (server HTML, no JS, reduced motion): plain list, all stars lit.
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const read = () => {
      frame = 0;
      if (query.matches) {
        setActive(null);
        return;
      }
      const rect = track.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      track.style.setProperty("--p", p.toFixed(4));
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    query.addEventListener("change", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      query.removeEventListener("change", onScroll);
    };
  }, [n]);

  const pinned = active !== null;
  const on = (i: number) => !pinned || i <= active;
  const caption = pinned ? `${s.starNames[active]} · ${active + 1} / ${n}` : " ";

  /** A star was clicked: scroll to its principle (pinned) or its list item, and open "Seen in". */
  const openPrinciple = useCallback(
    (e: React.MouseEvent, i: number) => {
      const track = trackRef.current;
      const li = document.getElementById(`principle-${i + 1}`);
      if (!track || !li) return;
      e.preventDefault();
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (pinned) {
        const top = track.getBoundingClientRect().top + window.scrollY;
        const total = track.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + ((i + 0.5) / n) * total, behavior: still ? "auto" : "smooth" });
      } else {
        li.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "center" });
      }
      const details = li.querySelector("details");
      if (details) details.open = true;
      window.setTimeout(() => li.querySelector<HTMLElement>("summary")?.focus({ preventScroll: true }), still ? 0 : 700);
    },
    [pinned, n],
  );

  return (
    <section id="principles" className="stars" aria-labelledby="stars-title">
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

      <div ref={trackRef} className="stars-track" data-pinned={pinned ? "" : undefined} style={{ "--n": n } as React.CSSProperties}>
        <div className="stars-pin">
          <div className="wrap stars-grid">
            <figure className="dipper">
              <div className="dipper-drift">
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
                    <a
                      key={`star-${i}`}
                      href={`#principle-${i + 1}`}
                      className="dipper-hit"
                      aria-label={`${i + 1}. ${s.principles[i]!.title}: ${s.openStar}`}
                      onClick={(e) => openPrinciple(e, i)}
                    >
                      <circle cx={x} cy={y} r="24" className="dipper-target" />
                      <path
                        d={STAR_D}
                        className="dipper-star"
                        style={{ "--x": x, "--y": y } as React.CSSProperties}
                        data-on={on(i) ? "" : undefined}
                        data-active={pinned && i === active ? "" : undefined}
                      />
                    </a>
                  ))}
                  {STARS.map(([x, y], i) => (
                    <text key={`num-${i}`} x={i === 1 ? x - 30 : x + 16} y={i === 0 ? y + 42 : y + 36} className="dipper-num" aria-hidden="true">
                      {i + 1}
                    </text>
                  ))}
                </svg>
              </div>
              <figcaption className="dipper-caption" aria-hidden="true">
                {caption}
              </figcaption>
            </figure>

            <ol className="principles">
              {s.principles.map((p, i) => (
                <li
                  key={p.title}
                  id={`principle-${i + 1}`}
                  className="principle"
                  data-state={!pinned ? undefined : i === active ? "active" : i < active ? "past" : "future"}
                  inert={pinned && i !== active ? true : undefined}
                >
                  <p className="principle-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                    <span className="principle-star">{s.starNames[i]}</span>
                  </p>
                  <h3 className="principle-title">{p.title}</h3>
                  <p className="principle-proof">{p.proof}</p>
                  {seen[i] && seen[i].length > 0 && (
                    <details className="principle-seen">
                      <summary>
                        {s.seenIn} <span className="principle-seen-names">{seen[i].map((x) => x.name).join(" · ")}</span>
                      </summary>
                      <ul>
                        {seen[i].map((x) => (
                          <li key={x.slug} data-accent={x.accent}>
                            <Link href={lp(t.locale, `/inventions/${x.slug}`)} className="principle-seen-link">
                              {x.name}
                            </Link>
                            <span>{x.line}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </li>
              ))}
            </ol>
          </div>
          {pinned && (
            <ol className="stars-steps" aria-hidden="true">
              {s.principles.map((p, i) => (
                <li key={p.title} data-on={i <= active ? "" : undefined} />
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
