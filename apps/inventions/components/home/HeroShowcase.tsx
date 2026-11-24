"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Screenshot } from "@/components/ui/Screenshot";
import type { Copy } from "@/content/i18n/en";

/**
 * Real screenshots of the live products, rising under the stage so the first screen already shows
 * work. Desktop: two app windows in perspective that straighten as the page scrolls. Phones: the
 * two mobile captures side by side (D-06). Each window links to its product's chapter.
 */
export function HeroShowcase({ t }: { t: Copy }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 640], [reduced ? 0 : 16, 0], { clamp: true });
  const scale = useTransform(scrollY, [0, 640], [reduced ? 1 : 0.94, 1], { clamp: true });
  const sideY = useTransform(scrollY, [0, 900], [reduced ? 0 : 60, reduced ? 0 : -40], { clamp: true });
  const phoneY = useTransform(scrollY, [0, 700], [reduced ? 0 : 40, 0], { clamp: true });
  const [chromiq, lexi] = t.products;
  if (!chromiq || !lexi) return null;
  const tag = (name: string, status: string) => (
    <span className="showcase-tag">
      <span className="dot" aria-hidden="true" />
      {name} <span className="text-text-muted">· {status}</span>
    </span>
  );

  return (
    <div className="showcase">
      <p className="sr-only">{t.hero.showcaseLabel}</p>
      {/* Desktop and tablet */}
      <div className="showcase-desk">
        <motion.a href="#chromiq" className="showcase-main" data-accent="chromiq" style={{ rotateX, scale }} aria-label={`${chromiq.name}, ${chromiq.status}: see its chapter`}>
          <Screenshot name="chromiq-workspace-desktop" sizes="(min-width: 1280px) 980px, 78vw" />
          {tag(chromiq.name, chromiq.status)}
        </motion.a>
        <motion.a href="#lexi" className="showcase-side" data-accent="lexi" style={{ y: sideY }} aria-label={`${lexi.name}, ${lexi.status}: see its chapter`}>
          <Screenshot name="lexi-vocabulary-desktop" sizes="(min-width: 1280px) 480px, 38vw" />
          {tag(lexi.name, lexi.status)}
        </motion.a>
      </div>
      {/* Phones */}
      <motion.div className="showcase-phones" style={{ y: phoneY }}>
        <a href="#chromiq" className="showcase-phone" data-accent="chromiq" aria-label={`${chromiq.name}, ${chromiq.status}: see its chapter`}>
          <Screenshot name="chromiq-workspace-mobile" frame="phone" sizes="46vw" />
          {tag(chromiq.name, chromiq.status)}
        </a>
        <a href="#lexi" className="showcase-phone" data-accent="lexi" aria-label={`${lexi.name}, ${lexi.status}: see its chapter`}>
          <Screenshot name="lexi-vocabulary-mobile" frame="phone" sizes="46vw" />
          {tag(lexi.name, lexi.status)}
        </a>
      </motion.div>
    </div>
  );
}
