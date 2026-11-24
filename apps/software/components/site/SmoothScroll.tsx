"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling (founder request, 24 Nov 2026; overrides SD-08 "no smooth-scroll library").
 * Lenis drives the real window scroll, so anchors, IntersectionObserver and window.scrollY keep working.
 * Under reduced motion it is destroyed rather than never created, so switching the setting mid-visit
 * gives native scrolling back without a reload. Same pattern as Chromiq's components/scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    const sync = () => {
      if (query.matches) {
        lenis?.destroy();
        lenis = null;
      } else if (!lenis) {
        lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true });
      }
    };
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);
  return null;
}
