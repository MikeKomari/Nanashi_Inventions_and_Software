"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Screenshot } from "@/components/ui/Screenshot";
import type { Invention } from "@/content/inventions";

type Labels = { live: string; lab: string; explore: string };

/**
 * One invention as a card that reacts to the pointer (desktop): it tilts a little in 3D, a spotlight
 * in the invention's accent follows the cursor along its edge, and live inventions swap their cover
 * screenshot for the real demo video, loaded only when first hovered. On touch screens, without
 * JavaScript and under reduced motion it is a calm, static card. Only transform and opacity animate.
 */
export function InventionCard({ inv, number, labels, size = "lg" }: { inv: Invention; number: string; labels: Labels; size?: "lg" | "sm" }) {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const live = inv.status === "live";

  const still = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || still()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
  }
  function onEnter(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || still()) return;
    ref.current?.setAttribute("data-hover", "");
    const v = video.current;
    if (v) {
      if (v.preload === "none") v.preload = "auto";
      v.play().catch(() => {});
    }
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.removeAttribute("data-hover");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    video.current?.pause();
  }

  const letters = inv.meaning.letters;
  return (
    <article
      ref={ref}
      className={`icard icard-${size} ${live ? "icard-live" : "icard-lab"}`}
      data-accent={inv.accent}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <div className="icard-glow" aria-hidden="true" />
      <div className="icard-media">
        {live ? (
          <>
            <Screenshot name={inv.cover} decorative sizes="(min-width: 1024px) 600px, 92vw" className="icard-cover" />
            <video
              ref={video}
              className="icard-video"
              src={inv.video.src}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            />
          </>
        ) : (
          <div className="icard-sky" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} className="icard-star" style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
        )}
      </div>
      <div className="icard-body">
        <p className="eyebrow">
          <span>{number}</span>
          <span className="eyebrow-rule" aria-hidden="true" />
          <span>{inv.audience}</span>
        </p>
        <h3 className="icard-name">
          {live ? (
            <Link href={`/inventions/${inv.slug}`} className="icard-link">
              {inv.name}
            </Link>
          ) : (
            inv.name
          )}
        </h3>
        {letters ? (
          <p className="icard-letters" aria-label={inv.meaning.teaser}>
            {letters.map(([l, word], i) => (
              <span key={l + i} className="icard-letter" style={{ "--i": i } as React.CSSProperties}>
                <b>{l}</b>
                <span>{word.slice(1)}</span>
              </span>
            ))}
          </p>
        ) : (
          <p className="icard-teaser">{inv.meaning.teaser}</p>
        )}
        <p className="icard-line">{inv.oneLiner}</p>
        <div className="icard-foot">
          <span className={`status${live ? "" : " status-soon"}`}>
            <span className="status-dot" aria-hidden="true" />
            {live ? labels.live : labels.lab}
          </span>
          {live && (
            <span className="icard-cta" aria-hidden="true">
              {labels.explore}
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
