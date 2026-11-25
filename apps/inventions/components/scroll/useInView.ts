"use client";

// Adapted from CHROMIQ's components/scroll/use-in-view.ts (CHROMIQ ADR-0015).

import { useEffect, useRef, useState } from "react";

const reducedMotion = () =>
  typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reports whether an element has scrolled into view. Reveal-on-scroll is decoration: under reduced
 * motion, or without IntersectionObserver, it reports true at once so content is never trapped
 * behind an animation that will not run. `ready` stays false until the client has mounted, so the
 * server-rendered HTML (and a visitor without JavaScript) sees everything.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: { amount?: number; once?: boolean; margin?: string }) {
  const { amount = 0.2, once = true, margin = "0px" } = options ?? {};
  const ref = useRef<T>(null);
  const [state, setState] = useState({ inView: false, ready: false });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reducedMotion() || typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off sync with the browser
      setState({ inView: true, ready: true });
      return;
    }
    setState((s) => ({ ...s, ready: true }));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState({ inView: true, ready: true });
            if (once) observer.disconnect();
          } else if (!once) {
            setState({ inView: false, ready: true });
          }
        }
      },
      { threshold: amount, rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [amount, once, margin]);

  return { ref, ...state };
}

/** data-in-view for CSS: omitted until the client is ready, so the no-JS render stays visible. */
export const inViewAttr = (ready: boolean, inView: boolean) => (ready ? (inView ? "true" : "false") : undefined);
