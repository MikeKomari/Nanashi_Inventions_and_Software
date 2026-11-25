"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * The two custom events (W-11), counted with Vercel Web Analytics (cookieless):
 *   email_click: any mailto: link;
 *   try_product: any link marked data-track="try_product" data-product="<slug>".
 * One delegated listener, so links stay plain <a> elements everywhere.
 */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      if (a.getAttribute("href")?.startsWith("mailto:")) track("email_click");
      else if (a.dataset.track === "try_product") track("try_product", { product: a.dataset.product ?? "unknown" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
