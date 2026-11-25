"use client";

// Adapted from CHROMIQ's components/scroll/smooth-scroll.tsx (same founder; CHROMIQ ADR-0015 kept
// those primitives free of CHROMIQ imports so a second project could reuse them).

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum smoothing for the page scroll (W-16). Lenis drives the real window scroll, so
 * position: fixed and sticky, IntersectionObserver, anchors and window.scrollY all keep working:
 * nothing is scroll-jacked.
 *
 * Under prefers-reduced-motion the instance is destroyed rather than never created, so a visitor
 * who changes the setting mid-visit gets native scrolling back without a reload.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frame = 0;

    const start = () => {
      if (lenis) return;
      // A lerp tracks the wheel closely and settles in proportion to the distance left.
      // CHROMIQ measured 0.08 as a clear glide that still stops where the gesture asked.
      lenis = new Lenis({ lerp: 0.08, anchors: true, syncTouch: false, touchMultiplier: 1 });
      const tick = (time: number) => {
        lenis?.raf(time);
        frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      lenis?.destroy();
      lenis = null;
    };

    const sync = () => (query.matches ? stop() : start());
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
