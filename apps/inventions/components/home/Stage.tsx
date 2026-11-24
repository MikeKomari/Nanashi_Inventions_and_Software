import { AnimatedLogo } from "@/components/brand/AnimatedLogo";
import { Logo3D } from "@/components/brand/Logo3D";
import { NanaHoshi } from "@/components/brand/NanaHoshi";
import { Magnetic } from "@/components/motion/Magnetic";
import { CONTACT } from "@/lib/site";
import type { Copy } from "@/content/i18n/en";

/** Splits the headline into words for the word-by-word reveal (CSS only, see .word in home.css). */
function Words({ text }: { text: string }) {
  return text.split(" ").map((w, i, all) => (
    <span key={i} className="word" style={{ "--i": i } as React.CSSProperties}>
      {w}
      {i < all.length - 1 ? " " : ""}
    </span>
  ));
}

/**
 * Home §1, the stage (D-01, D-02, D-10): the logo alone under a soft indigo light cone with a floor
 * glow and reflection, 七星 · nana hoshi above, the headline and two actions below. Brand only
 * (founder, 24 Nov 2026): the inventions appear further down the page.
 *
 * `logo="3d"` (default) shows the 2.5D Logo3D; `logo="flat"` switches back to the approved flat
 * AnimatedLogo. The founder has not confirmed the 3D look yet.
 * Look knobs (cone, floor, reflection) live in styles/home.css under "Stage".
 */
export function Stage({ t, logo = "3d" }: { t: Copy; logo?: "3d" | "flat" }) {
  return (
    <section className="stage relative isolate overflow-x-clip" aria-labelledby="stage-title">
      <div aria-hidden="true" className="stage-sky" />
      <div aria-hidden="true" className="stage-cone" />
      <div className="relative flex flex-col items-center px-4 pt-28 text-center sm:pt-28 lg:pt-24">
        <NanaHoshi className="text-[15px]" />
        <div className="stage-object relative mt-6">
          {logo === "3d" ? (
            <Logo3D className="relative z-10" />
          ) : (
            <>
              <AnimatedLogo className="stage-logo relative z-10" />
              <div aria-hidden="true" className="stage-reflection">
                <AnimatedLogo className="stage-logo" label="" />
              </div>
            </>
          )}
          <div aria-hidden="true" className="stage-floor" />
        </div>
        <h1 id="stage-title" className="stage-title relative z-10 text-[clamp(2.6rem,1.2rem+5.6vw,5.75rem)] leading-[1.02]">
          <Words text={t.hero.title} />
        </h1>
        <p className="stage-lead mt-5 max-w-[34rem] text-[17px] text-text-muted sm:text-lg">{t.hero.lead}</p>
        <div className="stage-actions mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <Magnetic>
            <a href="#inventions" className="btn-primary">
              {t.hero.cta}
            </a>
          </Magnetic>
          <a href={`mailto:${CONTACT.email}`} className="link-quiet">
            {t.hero.email}
          </a>
        </div>
      </div>
    </section>
  );
}
