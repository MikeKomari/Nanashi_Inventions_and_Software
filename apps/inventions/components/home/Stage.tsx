import { AnimatedLogo } from "@/components/brand/AnimatedLogo";
import { NanaHoshi } from "@/components/brand/NanaHoshi";
import { CONTACT } from "@/lib/site";
import type { Copy } from "@/content/i18n/en";

/** Splits a headline into words for the word-by-word reveal (CSS only, see .word in site.css). */
function Words({ text }: { text: string }) {
  return text.split(" ").map((w, i, all) => (
    <span key={i} className="word" style={{ "--i": i } as React.CSSProperties}>
      {w}
      {i < all.length - 1 ? " " : ""}
    </span>
  ));
}

/**
 * Home §1, the stage (D-01, D-02, D-10): the animated logo alone under a soft indigo light cone,
 * a faint reflection on the floor, 七星 · nana hoshi above, the headline and two actions below.
 * Look knobs (cone, floor, reflection) live in styles/site.css under "Stage".
 */
export function Stage({ t }: { t: Copy }) {
  return (
    <section className="stage relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-16 text-center sm:pt-28">
      <div aria-hidden="true" className="stage-cone" />
      <NanaHoshi className="text-[15px]" />
      <div className="relative mt-8 sm:mt-10">
        <AnimatedLogo className="stage-logo relative z-10" />
        <div aria-hidden="true" className="stage-floor" />
        <div aria-hidden="true" className="stage-reflection">
          <AnimatedLogo className="stage-logo" label="" />
        </div>
      </div>
      <h1 className="stage-title relative z-10 text-[40px] leading-[1.05] sm:text-[64px] lg:text-[88px]">
        <Words text={t.hero.title} />
      </h1>
      <p className="mt-5 max-w-xl text-[17px] text-text-muted sm:text-lg">{t.hero.lead}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        <a href="#inventions" className="press inline-flex min-h-12 items-center rounded-md bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover">
          {t.hero.cta}
        </a>
        <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-11 items-center text-text-muted underline decoration-border-strong underline-offset-4 hover:text-text">
          {t.hero.email}
        </a>
      </div>
    </section>
  );
}
