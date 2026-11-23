"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling on the window (native scroll position, no scroll-jacking). Off under reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
