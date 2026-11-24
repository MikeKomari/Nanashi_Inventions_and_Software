"use client";

import type { ElementType, ReactNode } from "react";
import { inViewAttr, useInView } from "./useInView";

/**
 * Fades and rises its content into place the first time it scrolls into view (W-16). The
 * transition itself lives in styles/scroll.css ([data-reveal]); only transform and opacity move.
 * Children marked .reveal-words split their words for a staggered heading reveal.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  amount = 0.2,
  id,
  labelledBy,
  accent,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  amount?: number;
  id?: string;
  labelledBy?: string;
  /** Sets data-accent, which picks the product accent in CSS. */
  accent?: string;
}) {
  const { ref, inView, ready } = useInView<HTMLElement>({ amount });
  return (
    <Tag ref={ref} id={id} aria-labelledby={labelledBy} className={className} data-accent={accent} data-reveal="" data-in-view={inViewAttr(ready, inView)}>
      {children}
    </Tag>
  );
}

/** Splits a heading into words that rise one after another when an ancestor [data-reveal] arrives. */
export function Words({ text }: { text: string }) {
  return text.split(" ").map((w, i, all) => (
    <span key={i} className="rw" style={{ "--i": i } as React.CSSProperties}>
      {w}
      {i < all.length - 1 ? " " : ""}
    </span>
  ));
}
