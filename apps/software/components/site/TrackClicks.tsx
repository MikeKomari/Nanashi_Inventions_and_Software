"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Vercel Web Analytics events (cookieless). One listener for the whole page:
 * whatsapp_click { where } for every WhatsApp link. `where` comes from the nearest data-wa-where
 * (hero, a template slug, band, custom, demo_bar); any other WhatsApp link inside a demo is "demo_order".
 */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='https://wa.me/']");
      if (!a) return;
      const where = a.closest("[data-wa-where]")?.getAttribute("data-wa-where") ?? (a.closest("[data-demo]") ? "demo_order" : "other");
      track("whatsapp_click", { where });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

/** demo_view { template } once per demo page load. */
export function TrackDemoView({ template }: { template: string }) {
  useEffect(() => {
    track("demo_view", { template });
  }, [template]);
  return null;
}
