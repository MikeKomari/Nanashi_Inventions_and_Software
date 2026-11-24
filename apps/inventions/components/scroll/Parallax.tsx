"use client";

// Adapted from Chromiq's components/scroll/parallax.tsx (Chromiq ADR-0015).

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Moves its children against the scroll as they cross the viewport. `distance` is the total travel
 * in pixels: +distance/2 below the layout position on entry, -distance/2 on exit, exactly in place
 * when centred. Negative distance leads the scroll instead of trailing it.
 *
 * Decoration only: under prefers-reduced-motion the transform is dropped.
 */
export function Parallax({
  children,
  distance = 60,
  className,
  style,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const travel = reduced ? 0 : distance / 2;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: reduced ? 0 : y }}>
      {children}
    </motion.div>
  );
}
