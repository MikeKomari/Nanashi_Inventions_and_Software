"use client";

import { useEffect, useRef } from "react";
import { ORBIT_D, STAR_D } from "@/components/brand/symbol-paths";
import { sfx } from "@/lib/sound";

// The seven stars of the Big Dipper, placed in a 640 × 400 sky.
const STARS: [number, number][] = [
  [457, 125],
  [460, 186],
  [374, 217],
  [339, 179],
  [275, 191],
  [225, 203],
  [187, 268],
];
const EASE = "cubic-bezier(.2,.7,.2,1)";

/**
 * The preloader (founder's pick, motion preview 25 Nov 2026): the seven stars light one by one,
 * gather into one star in the centre, the orbit draws itself, the star shoots into the gap, and
 * the page opens in a circle from the star. About 1.95 s.
 *
 * Once per visit: the inline script in RootShell adds html.intro-on only when this session has not
 * seen it and the visitor allows motion. The page renders underneath the whole time, so nothing
 * waits for it. If this script never runs, CSS hides the overlay after 4 s.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!el || !root.classList.contains("intro-on")) return;
    const timers: number[] = [];
    const later = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));
    const anim = (node: Element, kf: Keyframe[], o: KeyframeAnimationOptions) =>
      node.animate(kf, { fill: "both", easing: EASE, ...o });
    // Hide by removing the class (React still owns the element, so it stays in the DOM).
    const done = () => root.classList.remove("intro-on");

    const logo = el.querySelector<SVGSVGElement>(".intro-logo")!;
    const orbit = el.querySelector(".intro-orbit")!;
    const star = el.querySelector<SVGPathElement>(".intro-star")!;
    const ghosts = [...el.querySelectorAll(".intro-ghost")];
    const dots = [...el.querySelectorAll<SVGCircleElement>(".intro-dot")];
    const lines = [...el.querySelectorAll(".intro-line")];
    const sky = el.querySelector<SVGSVGElement>(".intro-sky")!;

    // Where things are on screen: the logo centre (where the stars gather) and the star (where the page opens).
    const lr = logo.getBoundingClientRect();
    const sv = sky.getBoundingClientRect();
    const sc = Math.min(sv.width / 640, sv.height / 400);
    const gx =
      (lr.left + lr.width / 2 - sv.left - (sv.width - 640 * sc) / 2) / sc;
    const gy =
      (lr.top + lr.height * (136 / 256) - sv.top - (sv.height - 400 * sc) / 2) /
      sc;
    const hx = lr.left + lr.width * (190 / 256);
    const hy = lr.top + lr.height * (66 / 256);
    const bb = star.getBBox();
    const start = `translate(${128 - (bb.x + bb.width / 2)}px, ${136 - (bb.y + bb.height / 2)}px) scale(.18) rotate(-70deg)`;
    [star, ...ghosts].forEach(
      (g) => ((g as SVGElement).style.transform = start),
    );

    // 1. The seven stars light, one every 90 ms.
    dots.forEach((d, i) => {
      anim(
        d,
        [
          { opacity: 0.12, transform: "scale(.6)" },
          { opacity: 1, transform: "scale(1.5)", offset: 0.4 },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 280, delay: i * 90 },
      );
      if (i)
        anim(lines[i - 1]!, [{ opacity: 0 }, { opacity: 0.45 }], {
          duration: 220,
          delay: i * 90,
        });
      later(i * 90, () => sfx.star(i));
    });
    // 2. They gather into one star in the centre (0.65 s), while the orbit draws itself.
    later(650, () => {
      dots.forEach((d, i) =>
        anim(
          d,
          [
            { transform: "none", opacity: 1 },
            {
              transform: `translate(${gx - d.cx.baseVal.value}px, ${gy - d.cy.baseVal.value}px) scale(.5)`,
              opacity: 0,
            },
          ],
          { duration: 250, delay: i * 12, easing: "cubic-bezier(.6,0,.3,1)" },
        ),
      );
      lines.forEach((l) =>
        anim(l, [{ opacity: 0.45 }, { opacity: 0 }], { duration: 180 }),
      );
      anim(
        star,
        [
          { opacity: 0, filter: "drop-shadow(0 0 0 var(--color-star))" },
          { opacity: 1, filter: "drop-shadow(0 0 18px var(--color-star))" },
        ],
        { duration: 200, delay: 180 },
      );
      anim(orbit, [{ opacity: 0.5 }, { opacity: 1 }], {
        duration: 400,
        delay: 50,
      });
      anim(
        logo,
        [
          { "--sweep": "0deg" } as Keyframe,
          { "--sweep": "360deg" } as Keyframe,
        ],
        { duration: 400, delay: 50, easing: "cubic-bezier(.5,0,.3,1)" },
      );
      anim(
        el.querySelector(".intro-caption")!,
        [
          { opacity: 0, letterSpacing: ".6em" },
          { opacity: 1, letterSpacing: ".3em" },
        ],
        { duration: 500, delay: 100 },
      );
    });
    // 3. The star shoots into the gap of the orbit (0.95 s), with a short trail.
    later(950, () => {
      sfx.shoot();
      anim(
        star,
        [
          {
            transform: start,
            opacity: 1,
            filter: "drop-shadow(0 0 18px var(--color-star))",
          },
          {
            transform: "none",
            opacity: 1,
            filter: "drop-shadow(0 0 0 var(--color-star))",
          },
        ],
        { duration: 450, easing: "cubic-bezier(.3,0,.1,1)" },
      );
      ghosts.forEach((g, i) =>
        anim(
          g,
          [
            { transform: start, opacity: 0 },
            { opacity: 0.35 - i * 0.1, offset: 0.3 },
            { transform: "none", opacity: 0 },
          ],
          {
            duration: 450,
            delay: (i + 1) * 45,
            easing: "cubic-bezier(.3,0,.1,1)",
          },
        ),
      );
    });
    // 4. It lands with a flash (1.4 s).
    later(1400, () => {
      sfx.land();
      anim(
        star,
        [
          { transform: "none" },
          {
            transform: "scale(1.18)",
            filter: "drop-shadow(0 0 14px var(--color-star))",
          },
          { transform: "none" },
        ],
        { duration: 260, fill: "none" },
      );
    });
    // 5. The page opens in a circle from the star (1.5 s to 1.95 s).
    later(1500, () => {
      const far = Math.hypot(
        Math.max(hx, innerWidth - hx),
        Math.max(hy, innerHeight - hy),
      );
      el.style.setProperty("--hx", `${hx}px`);
      el.style.setProperty("--hy", `${hy}px`);
      if (
        CSS.supports(
          "mask-image",
          "radial-gradient(circle, #000, transparent)",
        ) &&
        CSS.registerProperty !== undefined
      ) {
        anim(
          el,
          [
            { "--hole": "0px" } as Keyframe,
            { "--hole": `${far}px` } as Keyframe,
          ],
          { duration: 450, easing: "cubic-bezier(.6,0,.2,1)" },
        ).finished.then(done, done);
      } else {
        anim(el, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 400,
        }).finished.then(done, done);
      }
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div ref={ref} className="intro" aria-hidden="true">
      <svg
        className="intro-sky"
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid meet"
      >
        {STARS.slice(1).map(([x, y], i) => (
          <line
            key={i}
            className="intro-line"
            x1={STARS[i]![0]}
            y1={STARS[i]![1]}
            x2={x}
            y2={y}
          />
        ))}
        {STARS.map(([x, y], i) => (
          <circle key={i} className="intro-dot" cx={x} cy={y} r={4.5} />
        ))}
      </svg>
      <svg className="intro-logo" viewBox="0 0 256 256">
        <path className="intro-orbit" d={ORBIT_D} />
        <path className="intro-ghost" d={STAR_D} />
        <path className="intro-ghost" d={STAR_D} />
        <path className="intro-ghost" d={STAR_D} />
        <path className="intro-star" d={STAR_D} />
      </svg>
      <p className="intro-caption">七星 · NANA HOSHI</p>
    </div>
  );
}
