import { TwoTone } from "../SectionLabel";

/** Top of a sub-page: two-tone headline and a short intro, in the home hero's style. */
export function PageIntro({ a, b, intro }: { a: string; b: string; intro: string }) {
  return (
    <section className="pt-10 pb-12 sm:pt-20 sm:pb-16">
      <div className="mx-auto grid max-w-[1200px] gap-6 px-4 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
        <TwoTone as="h1" a={a} b={b} className="hero-in text-[34px] leading-[1.1] sm:text-[52px]" />
        <p className="hero-in-late text-[17px] text-text-muted lg:pb-2">{intro}</p>
      </div>
    </section>
  );
}
