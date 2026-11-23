"use client";

import { useEffect, useId, useRef } from "react";
import { animate } from "motion/mini";
import { ORBIT_D, STAR_D, SYMBOL_VIEWBOX } from "./symbol-paths";

/**
 * The Comet Orbit symbol, animated (D-03). Built from nanashi-symbol-reversed.svg with its exact paths.
 *
 * Loop (7s): the orbit draws itself from the thin tail to the thick head at the gap → the star grows
 * out from the centre and pushes its ray through the gap, with a short twinkle → hold → fade → repeat.
 *
 * The orbit is a filled shape, so "drawing" it reveals the fill through a mask: a wide stroke on the
 * orbit's centreline whose dash goes from 0 to 1. At rest the mask covers the whole ring, so the
 * resting frame is the static logo. Reduced motion: the static frame, no loop.
 *
 * Motion's mini animate() runs the timeline on the browser's own animation engine (about 3 KB).
 */

const LOOP = 7; // seconds
const EASE_DRAW = [0.65, 0, 0.35, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Centreline arc for the mask: r=86 around (128,128), from -30° (just inside the gap, before the thin
// tail) clockwise to 300° (just past the thick head). Stroke 46 wide covers the ring (radii 66–104).
const REVEAL_D = "M202.48 85 A86 86 0 1 1 171 53.52";

// Star starts tucked in towards the centre-left and moves out along its ray (up-right).
const STAR_FROM = "translate(-10px, 10px) scale(0)";

export function AnimatedLogo({ className, label = "Nanashi" }: { className?: string; label?: string }) {
  const maskId = `nanashi-orbit-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const revealRef = useRef<SVGPathElement>(null);
  const starRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const reveal = revealRef.current;
    const star = starRef.current;
    const group = groupRef.current;
    if (!svg || !reveal || !star || !group) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const loop = { duration: LOOP, repeat: Infinity } as const;
    const controls = [
      animate(
        reveal,
        { strokeDashoffset: ["1", "1", "0", "0", "1"] },
        { ...loop, times: [0, 0.05, 0.34, 0.96, 1], ease: ["linear", EASE_DRAW, "linear", "linear"] },
      ),
      animate(
        star,
        {
          transform: [
            STAR_FROM,
            STAR_FROM,
            "translate(0px, 0px) scale(1.14)",
            "translate(0px, 0px) scale(0.95)",
            "translate(0px, 0px) scale(1)",
            "translate(0px, 0px) scale(1)",
            STAR_FROM,
          ],
          opacity: [0, 0, 1, 1, 1, 1, 0],
        },
        {
          ...loop,
          times: [0, 0.29, 0.41, 0.45, 0.48, 0.96, 1],
          ease: ["linear", EASE_OUT, "easeInOut", "easeInOut", "linear", "linear"],
        },
      ),
      animate(group, { opacity: [1, 1, 0, 0] }, { ...loop, times: [0, 0.82, 0.93, 1], ease: ["linear", "easeInOut", "linear"] }),
    ];

    // Save work while the logo is off screen.
    const io = new IntersectionObserver(([entry]) => {
      for (const c of controls) {
        if (entry?.isIntersecting) c.play();
        else c.pause();
      }
    });
    io.observe(svg);
    return () => {
      io.disconnect();
      for (const c of controls) c.stop();
    };
  }, []);

  return (
    <svg ref={svgRef} viewBox={SYMBOL_VIEWBOX} role="img" aria-label={label} className={`nanashi-anim ${className ?? ""}`}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256">
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
      <g ref={groupRef}>
        <path d={ORBIT_D} mask={`url(#${maskId})`} style={{ fill: "var(--color-moon-0)" }} />
        <path
          ref={starRef}
          data-star
          d={STAR_D}
          style={{ fill: "var(--color-star)", transformBox: "view-box", transformOrigin: "128px 128px" }}
        />
      </g>
    </svg>
  );
}
