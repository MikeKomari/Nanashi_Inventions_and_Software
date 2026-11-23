"use client";

import { useEffect } from "react";

/** Sets data-scrolled on <html> once the page has scrolled, so CSS turns the header into a floating pill. */
export function HeaderShrink() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => root.toggleAttribute("data-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}
