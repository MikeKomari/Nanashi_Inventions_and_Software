import type { TokoContent } from "../schema";
import { container, Photo } from "../parts";
import { Header } from "./Header";

/**
 * A big rounded panel in the hero colour: the floating header, a giant condensed headline that
 * overlaps the top of a wide photo, a hand-drawn squiggle across both, and up to three short facts.
 */
/** First fact left, last right, middle centred (full class names so Tailwind finds them). */
const align = (i: number, n: number) => (i === 0 ? "sm:text-left" : i === n - 1 ? "sm:text-right" : "sm:text-center");

export function Hero({ c, orderHref }: { c: TokoContent; orderHref: string }) {
  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3" aria-labelledby="judul">
      <div className="relative overflow-hidden rounded-toko bg-toko-hero px-3 pt-3 pb-8 sm:px-5 sm:pt-5 sm:pb-10">
        <Header c={c} orderHref={orderHref} />
        <div className={`${container} relative mt-8 sm:mt-12`}>
          <h1 id="judul" className="toko-display toko-display-xl relative z-10 text-center text-toko-on-hero">
            {c.hero.titleLines.map((line, i) => (
              <span key={i} className="toko-rise block" style={{ "--i": i } as React.CSSProperties}>
                {line}
              </span>
            ))}
          </h1>
          {/* The photo tucks under the last headline line. */}
          <div className="relative -mt-[clamp(1.2rem,4.5vw,3.6rem)]">
            <Photo
              photo={c.hero.photo}
              lcp
              sizes="(min-width: 1240px) 1180px, 94vw"
              className="aspect-[4/3] rounded-toko-sm sm:aspect-[16/8]"
            />
            <svg
              className="toko-squiggle pointer-events-none absolute inset-x-[-6%] top-[8%] z-20 h-[90%] w-[112%] text-toko-sticker"
              viewBox="0 0 1200 600"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                pathLength={1}
                d="M-20 140 C 160 60, 260 230, 420 150 S 700 40, 860 120 S 1100 260, 1220 120 M-20 520 C 200 560, 420 420, 640 500 S 980 600, 1220 470"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <dl className="mt-8 grid gap-6 text-toko-hero-text sm:grid-cols-3 sm:gap-10">
            {c.hero.facts.map((f, i) => (
              <div key={f.title} className={align(i, c.hero.facts.length)}>
                <dt className="text-xs font-semibold tracking-[0.14em] uppercase opacity-90">{f.title}</dt>
                <dd className="mt-1 text-[15px] leading-snug">{f.body}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex items-center justify-between" aria-hidden="true">
            <span className="size-5 rounded-full bg-toko-sticker" />
            <span className="size-3 rounded-full bg-toko-sticker" />
            <span className="size-5 rounded-full bg-toko-sticker" />
          </div>
        </div>
      </div>
    </section>
  );
}
