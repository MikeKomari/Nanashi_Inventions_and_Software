"use client";

import { useEffect, useId, useRef } from "react";
import { animate } from "motion/mini";
import { ORBIT_D, STAR_D, SYMBOL_VIEWBOX } from "./symbol-paths";

/**
 * The Comet Orbit symbol, animated (D-03). Built from nanashi-symbol-reversed.svg with its exact paths.
 *
 * Loop (8s):
 *  1. The orbit draws itself from its thin tail to its thick head.
 *  2. The whole star is born at the centre, spinning in from nothing.
 *  3. It shoots out through the gap, accelerating, and is gone.
 *  4. It comes back in through the gap like a meteor (its long ray trails behind as the tail) and lands.
 *  5. Impact: the ring pulses, the star twinkles and settles. Hold on the static logo (one twinkle).
 *  6. Exit: the star shoots out again while the ring erases itself tail first.
 *
 * The orbit is a filled shape, so "drawing" it reveals the fill through a mask: a wide stroke on its
 * centreline whose dash moves from hidden (1) to shown (0) to erased (-1). The star is never masked.
 * The ring never rotates (brand rule). At rest every transform is the identity and the mask covers the ring, so the resting frame is the
 * static logo. Reduced motion: the static frame, no loop.
 *
 * Motion's mini animate() runs the timeline on the browser's own animation engine (about 3 KB).
 */

const LOOP = 8; // seconds
const EASE_DRAW = [0.33, 1, 0.68, 1] as const; // decelerate
const EASE_IN = [0.55, 0, 0.9, 0.4] as const; // accelerate: launch
const EASE_OUT = [0.16, 1, 0.3, 1] as const; // decelerate: landing
const EASE_POP = [0.34, 1.56, 0.64, 1] as const; // slight overshoot

// Centreline arc for the mask: r=86 around (128,128), from -30° (just inside the gap, before the thin
// tail) clockwise to 300° (just past the thick head). Stroke 46 wide covers the ring (radii 66–104).
const REVEAL_D = "M202.48 85 A86 86 0 1 1 171 53.52";

// Transforms always use the same function list so the browser can interpolate between them.
const orbit = (s: number) => `scale(${s})`;
const star = (x: number, deg: number, s: number) => `translate(${x}px, ${-x}px) rotate(${deg}deg) scale(${s})`;
const REST = star(0, 0, 1);
const ORIGIN = { transformBox: "view-box", transformOrigin: "128px 128px" } as const;

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

    const loop = { duration: LOOP, repeat: Infinity } as const;
    const controls = [
      // Orbit: draw (0.24–1.5s), erase tail first (6.0–7.0s).
      animate(
        reveal,
        { strokeDashoffset: ["1", "1", "0", "0", "-1", "-1"] },
        { ...loop, times: [0, 0.03, 0.19, 0.75, 0.875, 1], ease: ["linear", EASE_DRAW, "linear", EASE_IN, "linear"] },
      ),
      // Orbit: a small pulse when the star lands.
      animate(
        ring,
        { transform: [orbit(1), orbit(1), orbit(1.045), orbit(1), orbit(1)] },
        { ...loop, times: [0, 0.425, 0.445, 0.48, 1], ease: ["linear", "easeOut", "easeInOut", "linear"] },
      ),
      // Star: born spinning → shoots out → meteor back in → land, twinkle → hold (one twinkle) → shoots out.
      animate(
        st,
        {
          transform: [
            star(0, -120, 0),
            star(0, -120, 0),
            REST, // born (1.7s)
            REST,
            star(110, 0, 0.7), // out through the gap (2.5s)
            star(160, 0, 0.75), // off stage, lined up for the return
            star(-6, 0, 1.1), // meteor lands, a touch past centre (3.35s)
            star(0, 0, 0.96),
            REST, // rest (3.85s)
            REST,
            star(0, 0, 1.07), // twinkle during the hold (5.1s)
            REST,
            REST,
            star(140, 0, 0.6), // shoots out again (6.8s)
            star(140, 0, 0.6),
          ],
          opacity: [0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        },
        {
          ...loop,
          times: [0, 0.15, 0.2125, 0.24, 0.31, 0.34, 0.42, 0.45, 0.48, 0.62, 0.64, 0.66, 0.75, 0.85, 1],
          ease: [
            "linear",
            EASE_POP,
            "linear",
            EASE_IN,
            "linear",
            EASE_OUT,
            "easeInOut",
            "easeInOut",
            "linear",
            "easeOut",
            "easeIn",
            "linear",
            EASE_IN,
            "linear",
          ],
        },
      ),
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
