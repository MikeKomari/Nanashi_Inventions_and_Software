import { ArrowDown } from "lucide-react";
import { formatPrice } from "../../shared/format";
import type { KafeContent, KafeMenuItem } from "../schema";
import { container, OrderButton, Photo, Tag } from "../parts";

/**
 * The signature drink on a tinted stage, with the business name as a giant outlined wordmark behind it
 * and a price block in front. Phones: the stage comes first; desktop: text left, stage right.
 */
export function Hero({ c, signature, orderHref }: { c: KafeContent; signature: KafeMenuItem; orderHref: string }) {
  const words = c.business.name.split(/\s+/);
  const longest = Math.max(...words.map((w) => w.length));
  return (
    <section aria-labelledby="hero-title" className={`${container} pt-2 pb-8 sm:pb-16`}>
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.12fr] lg:gap-16">
        <div
          className="@container relative overflow-hidden rounded-kafe bg-kafe-panel lg:order-2"
          style={{ "--longest": longest } as React.CSSProperties}
        >
          <p
            aria-hidden="true"
            className="kafe-wordmark pointer-events-none absolute inset-x-0 top-[4cqw] text-center select-none"
          >
            {words.map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
          </p>
          <div className="kafe-stage-photo relative z-10 mx-auto w-[68%]">
            <Photo
              photo={c.hero.photo}
              preload
              sizes="(min-width: 1180px) 400px, (min-width: 1024px) 35vw, 62vw"
              className="aspect-[4/5] rounded-kafe-sm shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)]"
            />
          </div>
          <div className="relative z-20 mx-3 -mt-12 mb-3 flex items-end justify-between gap-4 rounded-kafe-sm bg-kafe-bg p-4 sm:mx-5 sm:mb-5 sm:p-5">
            <div className="min-w-0">
              <Tag>{c.hero.tag}</Tag>
              <p className="mt-2 font-kafe-display text-xl leading-tight sm:text-2xl">{signature.name}</p>
            </div>
            <p className="shrink-0 font-kafe-display text-2xl font-semibold text-kafe-accent tabular-nums sm:text-3xl">
              {formatPrice(signature.price)}
            </p>
          </div>
        </div>

        <div className="lg:order-1">
          <h1 id="hero-title" className="kafe-rise text-[36px] sm:text-[52px] lg:text-[58px]">
            {c.hero.title}
          </h1>
          <p className="kafe-rise mt-5 max-w-[34rem] text-[17px] text-kafe-muted sm:text-lg" style={{ "--i": 1 } as React.CSSProperties}>
            {c.hero.lead}
          </p>
          <div className="kafe-rise mt-8 flex flex-wrap items-center gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <OrderButton href={orderHref}>{c.labels.order}</OrderButton>
            <a
              href="#menu"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-kafe-text/25 px-6 text-[15px] font-semibold transition-colors hover:border-kafe-text/60"
            >
              {c.labels.seeMenu}
              <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
