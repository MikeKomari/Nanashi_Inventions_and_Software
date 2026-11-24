"use client";

import { useEffect, useId, useRef } from "react";
import { ORBIT_D, STAR_D, SYMBOL_VIEWBOX } from "./symbol-paths";
import { ORIGIN, REVEAL_D, startLogoLoop } from "./logo-loop";

/**
 * The Comet Orbit logo as a 2.5D object on the stage (experimental, founder to confirm).
 * CSS 3D only, no WebGL or canvas (D-03).
 *
 * - Front face: the exact logo (white orbit, gold star) playing the approved loop from logo-loop.ts.
 * - Depth: copies of the orbit (and star) stacked behind the face in darker shades of the same
 *   colour, each pushed back a few pixels in Z, which reads as an extruded edge once it turns.
 *   Each copy is scaled up by exactly what perspective takes away, so facing front they hide
 *   precisely behind the face and the logo looks like the static file.
 * - Motion: a slow idle turntable sway, plus a small tilt towards the pointer on desktop.
 *   A soft light sweep crosses the face once per loop during the hold.
 * - Reflection: a mirrored face on the floor that follows the same turn.
 *
 * Reduced motion: the static front-facing logo, no tilt, no sway, no sweep.
 */

/** The scene is laid out at this size and scaled by CSS (--logo-scale) for each breakpoint. */
const SCENE = 300;
const PERSPECTIVE = 1000;
/** Pixels between depth copies, back to front darker to lighter. */
const STEP = 4;
const RING_SHADES = ["--color-moon-300", "--color-moon-400", "--color-moon-500", "--color-moon-500", "--color-moon-600", "--color-moon-700"];
const STAR_SHADES = ["--color-gold-500", "--color-gold-700"];

const MAX_TILT_Y = 14; // degrees, pointer
const MAX_TILT_X = 8;
const SWAY_Y = 12; // degrees, idle turntable
const SWAY_X = 3;

function depth(i: number) {
  const z = STEP * (i + 1);
  // Perspective shrinks a layer at -z by P / (P + z); scaling by the inverse keeps it coincident.
  return `translateZ(${-z}px) scale(${((PERSPECTIVE + z) / PERSPECTIVE).toFixed(5)})`;
}

export function Logo3D({ className = "", label = "Nanashi" }: { className?: string; label?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const rig = rigRef.current;
    const mirror = mirrorRef.current;
    if (!root || !rig || !mirror) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const all = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const stopLoop = startLogoLoop({
      observe: root,
      reveals: all<SVGPathElement>("[data-orbit-reveal]"),
      rings: all<SVGPathElement>("[data-orbit]"),
      stars: all<SVGPathElement>("[data-star]"),
      sheens: all<SVGRectElement>("[data-sheen]"),
    });

    // Turntable: idle sway, blended with a pointer tilt on devices with a fine pointer.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let rx = 0;
    let ry = 0;
    let px = 0;
    let py = 0;
    let lastPointer = -Infinity;
    let weight = 0;
    let frame = 0;
    let visible = true;
    const t0 = performance.now();

    const write = () => {
      rig.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
      // Mirror image in the floor: same turn, opposite tilt (M·Rx·Ry = Rx(-x)·Ry·M).
      mirror.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${(-rx).toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) scaleY(-1)`;
    };
    const tick = (now: number) => {
      frame = 0;
      const t = (now - t0) / 1000;
      const idleY = Math.sin((t * 2 * Math.PI) / 10) * SWAY_Y;
      const idleX = Math.sin((t * 2 * Math.PI) / 13) * SWAY_X;
      const active = now - lastPointer < 2500;
      weight += ((active ? 1 : 0) - weight) * (active ? 0.08 : 0.02);
      const ty = idleY * (1 - weight) + px * MAX_TILT_Y * weight;
      const tx = idleX * (1 - weight) - py * MAX_TILT_X * weight;
      ry += (ty - ry) * 0.07;
      rx += (tx - rx) * 0.07;
      write();
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const run = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const onPointer = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType !== "mouse") return;
      const box = root.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      px = Math.max(-1, Math.min(1, (event.clientX - cx) / (window.innerWidth / 2)));
      py = Math.max(-1, Math.min(1, (event.clientY - cy) / (window.innerHeight / 2)));
      lastPointer = performance.now();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      run();
    });
    io.observe(root);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", run);
    run();

    return () => {
      stopLoop();
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", run);
      rig.style.transform = "";
      mirror.style.transform = "";
    };
  }, []);

  const mask = (id: string) => (
    <mask id={id} maskUnits="userSpaceOnUse" x="-64" y="-64" width="384" height="384">
      {/* Mask luminance, not a brand colour: white = visible. */}
      <path data-orbit-reveal d={REVEAL_D} pathLength={1} fill="none" stroke="white" strokeWidth={46} strokeLinecap="butt" strokeDasharray="1 1" />
    </mask>
  );

  return (
    <div ref={rootRef} className={`logo3d nanashi-anim ${className}`}>
      <div className="logo3d-scene" style={{ width: SCENE, height: SCENE, perspective: PERSPECTIVE }}>
        <div ref={rigRef} className="logo3d-rig">
          {/* Depth copies, back to front. Decorative. */}
          {[...RING_SHADES.keys()].reverse().map((index) => {
            const id = `l3d-${uid}-d${index}`;
            return (
              <svg key={id} viewBox={SYMBOL_VIEWBOX} overflow="visible" aria-hidden="true" className="logo3d-layer" style={{ transform: depth(index) }}>
                <defs>{mask(id)}</defs>
                <path data-orbit d={ORBIT_D} mask={`url(#${id})`} style={{ fill: `var(${RING_SHADES[index]})`, ...ORIGIN }} />
                {index < STAR_SHADES.length && <path data-star d={STAR_D} style={{ fill: `var(${STAR_SHADES[index]})`, ...ORIGIN }} />}
              </svg>
            );
          })}
          {/* Front face: the exact logo. */}
          <svg viewBox={SYMBOL_VIEWBOX} overflow="visible" role="img" aria-label={label} className="logo3d-layer logo3d-face">
            <defs>
              {mask(`l3d-${uid}-face`)}
              <clipPath id={`l3d-${uid}-clip`}>
                <path d={ORBIT_D} />
                <path d={STAR_D} />
              </clipPath>
              <linearGradient id={`l3d-${uid}-sheen`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="var(--color-violet-300)" stopOpacity="0" />
                <stop offset="0.42" stopColor="var(--color-violet-300)" stopOpacity="0.38" />
                <stop offset="0.5" stopColor="var(--color-moon-0)" stopOpacity="0.55" />
                <stop offset="0.58" stopColor="var(--color-violet-300)" stopOpacity="0.38" />
                <stop offset="1" stopColor="var(--color-violet-300)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path data-orbit d={ORBIT_D} mask={`url(#l3d-${uid}-face)`} style={{ fill: "var(--color-moon-0)", ...ORIGIN }} />
            <path data-star d={STAR_D} style={{ fill: "var(--color-star)", ...ORIGIN }} />
            <g clipPath={`url(#l3d-${uid}-clip)`} aria-hidden="true">
              <g transform="rotate(24 128 128)">
                <rect data-sheen x={53} y={-80} width={150} height={416} fill={`url(#l3d-${uid}-sheen)`} className="logo3d-sheen" />
              </g>
            </g>
          </svg>
        </div>
      </div>
      {/* Reflection on the floor: the face mirrored, fading out downwards. */}
      <div aria-hidden="true" className="stage-reflection logo3d-reflection">
        <svg ref={mirrorRef} viewBox={SYMBOL_VIEWBOX} overflow="visible" className="logo3d-mirror">
          <defs>{mask(`l3d-${uid}-mirror`)}</defs>
          <path data-orbit d={ORBIT_D} mask={`url(#l3d-${uid}-mirror)`} style={{ fill: "var(--color-moon-0)", ...ORIGIN }} />
          <path data-star d={STAR_D} style={{ fill: "var(--color-star)", ...ORIGIN }} />
        </svg>
      </div>
    </div>
  );
}
