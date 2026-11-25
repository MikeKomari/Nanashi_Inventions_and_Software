"use client";

// Adapted from CHROMIQ's components/scroll/color-wash-text.tsx (CHROMIQ ADR-0015). Changed for
// Nanashi: target colours come from a default plus per-word highlights instead of a spectrum.

import { useEffect, useMemo, useRef } from "react";

/**
 * Text whose words take on colour one after another as the block rises through the viewport,
 * finishing when the block is centred. One CSS variable (--sc-wash-p, 0 to 1) is written per
 * frame; styles/scroll.css turns it into each word's own progress. Under reduced motion the
 * finished state is shown. The starting colour (--sc-wash-from) is readable on its own.
 */
export function ColorWashText({
  text,
  to,
  highlights = {},
  spread = 4,
  className,
}: {
  text: string;
  /** Default target colour (a CSS colour, e.g. a token variable). */
  to: string;
  /** Words (punctuation ignored) that wash to their own colour instead. */
  highlights?: Record<string, string>;
  spread?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Each part with the index of its word (-1 for whitespace), computed once per text.
  const parts = useMemo(() => {
    const out: { part: string; index: number }[] = [];
    let n = 0;
    for (const part of text.split(/(\s+)/)) {
      if (!part) continue;
      const word = !/^\s+$/.test(part);
      out.push({ part, index: word ? n : -1 });
      if (word) n += 1;
    }
    return out;
  }, [text]);
  const wordCount = parts.filter((p) => p.index >= 0).length;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--sc-wash-p", "1");
      return;
    }

    let frame = 0;
    // Geometry is measured outside the scroll handler so a frame costs one style write, no layout.
    let docTop = 0;
    let height = 0;
    let viewport = 0;
    const measure = () => {
      const box = node.getBoundingClientRect();
      docTop = box.top + window.scrollY;
      height = box.height;
      viewport = window.innerHeight;
    };
    // Starts as the block's top passes 90% of the viewport, ends when the block is centred.
    const progressAt = (scrollY: number) => {
      const top = docTop - scrollY;
      const from = viewport * 0.9;
      const end = (viewport - height) / 2;
      const span = from - end;
      return span <= 0 ? 1 : (from - top) / span;
    };
    const ease = (t: number) => t * t * (3 - 2 * t);
    const read = () => {
      frame = 0;
      const raw = Math.min(1, Math.max(0, progressAt(window.scrollY)));
      node.style.setProperty("--sc-wash-p", String(ease(raw)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(onResize) : null;
    observer?.observe(node);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [text]);

  return (
    <span
      ref={ref}
      className={`sc-wash ${className ?? ""}`.trim()}
      style={{ "--sc-wash-n": wordCount, "--sc-wash-spread": spread } as React.CSSProperties}
    >
      {parts.map(({ part, index }, i) => {
        if (index < 0) return part;
        const key = part.replace(/[^\p{L}\p{N}]/gu, "");
        return (
          <span
            key={i}
            className="sc-wash-word"
            style={{ "--sc-wash-i": index, "--sc-wash-to": highlights[key] ?? to } as React.CSSProperties}
          >
            {part}
          </span>
        );
      })}
    </span>
  );
}
