"use client";

import { useEffect, useId, useRef } from "react";
import { ORBIT_D, STAR_D, SYMBOL_VIEWBOX } from "./symbol-paths";
import { ORIGIN, REVEAL_D, startLogoLoop } from "./logo-loop";

/**
 * The Comet Orbit symbol, animated (D-03), built from nanashi-symbol-reversed.svg with its exact
 * paths. The timeline lives in logo-loop.ts (shared with Logo3D). Reduced motion: the static
 * frame, no loop.
 */
export function AnimatedLogo({ className, label = "Nanashi" }: { className?: string; label?: string }) {
  const maskId = `nanashi-orbit-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const revealRef = useRef<SVGPathElement>(null);
  const orbitRef = useRef<SVGPathElement>(null);
  const starRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const reveal = revealRef.current;
    const ring = orbitRef.current;
    const st = starRef.current;
    if (!svg || !reveal || !ring || !st) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    return startLogoLoop({ observe: svg, reveals: [reveal], rings: [ring], stars: [st] });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={SYMBOL_VIEWBOX}
      role="img"
      aria-label={label}
      overflow="visible"
      className={`nanashi-anim ${className ?? ""}`}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-64" y="-64" width="384" height="384">
          {/* Mask luminance, not a brand colour: white = visible. */}
          <path
            ref={revealRef}
            data-orbit-reveal
            d={REVEAL_D}
            pathLength={1}
            fill="none"
            stroke="white"
            strokeWidth={46}
            strokeLinecap="butt"
            strokeDasharray="1 1"
          />
        </mask>
      </defs>
      <path ref={orbitRef} d={ORBIT_D} mask={`url(#${maskId})`} style={{ fill: "var(--color-moon-0)", ...ORIGIN }} />
      <path ref={starRef} data-star d={STAR_D} style={{ fill: "var(--color-star)", ...ORIGIN }} />
    </svg>
  );
}
