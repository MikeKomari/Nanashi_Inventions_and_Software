"use client";

import { useEffect, useId, useRef } from "react";
import { animate } from "motion/mini";
import { ORBIT_D, STAR_D, SYMBOL_VIEWBOX } from "./symbol-paths";

/**
 * The Comet Orbit symbol, animated (D-03). Built from nanashi-symbol-reversed.svg with its exact paths.
 *
 * Loop (7s): the orbit draws itself from the thin tail to the thick head at the gap → the star's core
 * pops in at the centre → its long ray shoots out to the gap like a meteor, with a short twinkle on
 * arrival → hold → fade → repeat.
 *
 * Both shapes are filled, so "drawing" them reveals the fill through masks whose stroke dash goes from
 * 0 to 1: a wide stroke on the orbit's centreline, and a stroke from the star's centre out along its
 * ray (plus a disc for the core). At rest both masks cover their whole shape, so the resting frame is
 * the static logo. Reduced motion: the static frame, no loop.
 *
 * Motion's mini animate() runs the timeline on the browser's own animation engine (about 3 KB).
 */

const LOOP = 7; // seconds
const EASE_DRAW = [0.65, 0, 0.35, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Centreline arc for the mask: r=86 around (128,128), from -30° (just inside the gap, before the thin
// tail) clockwise to 300° (just past the thick head). Stroke 46 wide covers the ring (radii 66–104).
const REVEAL_D = "M202.48 85 A86 86 0 1 1 171 53.52";

// Star mask: a disc over the core (its four points reach r≈46) and a stroke from the centre out along
// the ray (-45°) to past its tip (r=128). Outside r=50 the star stays within 8.1 of that diagonal.
const RAY_D = "M128 128 L223.5 32.5";
const STAR_FROM = "scale(0)";

export function AnimatedLogo({ className, label = "Nanashi" }: { className?: string; label?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const maskId = `nanashi-orbit-${uid}`;
  const starMaskId = `nanashi-star-${uid}`;
  const svgRef = useRef<SVGSVGElement>(null);
  const revealRef = useRef<SVGPathElement>(null);
  const starRef = useRef<SVGPathElement>(null);
  const rayRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const reveal = revealRef.current;
    const star = starRef.current;
    const group = groupRef.current;
    const ray = rayRef.current;
    if (!svg || !reveal || !star || !group || !ray) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const loop = { duration: LOOP, repeat: Infinity } as const;
    const controls = [
      animate(
        reveal,
        { strokeDashoffset: ["1", "1", "0", "0", "1"] },
        { ...loop, times: [0, 0.05, 0.34, 0.96, 1], ease: ["linear", EASE_DRAW, "linear", "linear"] },
      ),
      // Core pops in at the centre, then a short twinkle when the ray arrives.
      animate(
        star,
        {
          transform: [STAR_FROM, STAR_FROM, "scale(1.15)", "scale(1)", "scale(1)", "scale(1.05)", "scale(1)", "scale(1)", STAR_FROM],
          opacity: [0, 0, 1, 1, 1, 1, 1, 1, 0],
        },
        {
          ...loop,
          times: [0, 0.3, 0.36, 0.4, 0.45, 0.475, 0.5, 0.96, 1],
          ease: ["linear", EASE_OUT, "easeInOut", "linear", "easeOut", "easeInOut", "linear", "linear"],
        },
      ),
      // The ray shoots from the centre to the gap: fast launch, soft arrival.
      animate(
        ray,
        { strokeDashoffset: ["1", "1", "0", "0", "1"] },
        { ...loop, times: [0, 0.39, 0.45, 0.96, 1], ease: ["linear", EASE_OUT, "linear", "linear"] },
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
        <mask id={starMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256">
          <circle cx="128" cy="128" r="50" fill="white" />
          <path
            ref={rayRef}
            data-star-ray
            d={RAY_D}
            pathLength={1}
            fill="none"
            stroke="white"
            strokeWidth={40}
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
          mask={`url(#${starMaskId})`}
          style={{ fill: "var(--color-star)", transformBox: "view-box", transformOrigin: "128px 128px" }}
        />
      </g>
    </svg>
  );
}
