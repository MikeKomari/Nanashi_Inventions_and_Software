"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { sfx } from "@/lib/sound";

/**
 * Animated page changes using the browser's View Transitions API (styles in styles/motion.css).
 * Ordinary links: orbit wipe from the click point. Links inside an invention card, and the
 * invention page's back link (data-morph): card morph. The screenshot and name get their
 * view-transition-names only while html.vt-morph is set, so no other link morphs by accident.
 *
 * Handles plain left-clicks on links to other pages of this app only. Skipped, so the browser
 * behaves as before, for: new-tab clicks, other sites, /software (a separate app), a switch
 * between English and Indonesian (separate root layouts, which always reload), back/forward,
 * browsers without the API, and visitors who turn off motion.
 */
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<(() => void) | null>(null);

  // The new page has rendered: let the transition capture it.
  useEffect(() => {
    if (!pending.current) return;
    const finish = pending.current;
    pending.current = null;
    requestAnimationFrame(() => finish());
  }, [pathname]);

  useEffect(() => {
    const isId = (p: string) => p === "/id" || p.startsWith("/id/");
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as Element | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (
        !a ||
        (a.target && a.target !== "_self") ||
        a.hasAttribute("download")
      )
        return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname)
        return;
      if (url.pathname === "/software" || url.pathname.startsWith("/software/"))
        return;
      if (isId(url.pathname) !== isId(location.pathname)) return;
      if (
        !("startViewTransition" in document) ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      // Take over from next/link (whose own handler would otherwise navigate without the transition).
      e.preventDefault();
      e.stopPropagation();
      const root = document.documentElement;
      const x = e.clientX || innerWidth / 2;
      const y = e.clientY || innerHeight / 2;
      const r = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      );
      root.style.setProperty("--vt-x", `${x}px`);
      root.style.setProperty("--vt-y", `${y}px`);
      root.style.setProperty("--vt-r", `${r}px`);
      const morph = !!a.closest(".icard, [data-morph]");
      root.classList.toggle("vt-morph", morph);
      sfx.page();

      let ring: HTMLDivElement | null = null;
      const vt = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            // The gold ring exists only in the new state, so it animates on top of the wipe.
            if (!morph) {
              ring = document.createElement("div");
              ring.className = "vt-ring";
              Object.assign(ring.style, {
                left: `${x - r}px`,
                top: `${y - r}px`,
                width: `${r * 2}px`,
                height: `${r * 2}px`,
              });
              document.body.appendChild(ring);
            }
            pending.current = resolve;
            window.setTimeout(resolve, 2500); // Never hold the page if navigation is slow.
            router.push(url.pathname + url.search + url.hash);
          }),
      );
      vt.finished.finally(() => {
        ring?.remove();
        root.classList.remove("vt-morph");
      });
    };
    // Capture phase on window: runs before React's listeners, which next/link uses.
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
