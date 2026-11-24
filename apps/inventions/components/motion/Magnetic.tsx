"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A slight pull towards the pointer for buttons (DESIGN.md §6), desktop only: fine pointers that
 * hover, and never under reduced motion. Moves the wrapper with transform; the link inside keeps
 * its own focus ring and hit area.
 */
export function Magnetic({ children, strength = 0.22, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const write = () => {
      frame = 0;
      node.style.transform = x || y ? `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)` : "";
    };
    const onMove = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches) return;
      const box = node.getBoundingClientRect();
      const max = 8;
      x = Math.max(-max, Math.min(max, (event.clientX - (box.left + box.width / 2)) * strength));
      y = Math.max(-max, Math.min(max, (event.clientY - (box.top + box.height / 2)) * strength));
      if (!frame) frame = requestAnimationFrame(write);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(write);
    };
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic inline-flex ${className}`}>
      {children}
    </span>
  );
}
