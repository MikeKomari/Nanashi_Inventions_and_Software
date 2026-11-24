import Link from "next/link";
import { Plus } from "lucide-react";
import { CONTACT } from "@/lib/site";
import type { SiteCopy } from "@/content/site/id";
import { Corners, SectionLabel, TwoTone } from "../SectionLabel";
import { StreetIllustration } from "../StreetIllustration";
import { TemplateGrid } from "../TemplateGrid";
import { WhatsAppButton } from "../WhatsAppButton";

const wrap = "mx-auto max-w-[1200px] px-4 sm:px-8";
const h2 = "text-[28px] leading-[1.15] sm:text-[40px]";

/** 1. Does my business need a website? */
export function Hero({ t }: { t: SiteCopy }) {
  return (
    <section className="pt-10 sm:pt-20">
      <div className={`${wrap} grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16`}>
        <TwoTone as="h1" a={t.hero.titleA} b={t.hero.titleB} className="hero-in text-[34px] leading-[1.1] sm:text-[52px] lg:text-[58px]" />
        <div className="hero-in-late lg:pb-2">
          <p className="text-[17px] text-text-muted">{t.hero.lead}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <WhatsAppButton where="hero" message={t.hero.ctaMessage}>
              {t.hero.cta}
            </WhatsAppButton>
            <Link href={t.locale === "id" ? "/template" : "/en/templates"} className="ulink inline-flex min-h-11 items-center font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:text-primary-hover">
              {t.hero.secondary}
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1200px] sm:mt-14 sm:px-8">
        <StreetIllustration label={t.hero.illustration} />
      </div>
    </section>
  );
}

/** 2. Isn't Instagram enough? */
export function WhyWebsite({ t }: { t: SiteCopy }) {
  return (
    <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="why">
      <SectionLabel>{t.why.label}</SectionLabel>
      <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
        <div data-reveal>
          <h2 id="why" className={h2}>
            <span className="block text-text">{t.why.titleA}</span>
            <span className="block text-text-muted">{t.why.titleB}</span>
          </h2>
          <p className="mt-5 max-w-md text-text-muted">{t.why.intro}</p>
        </div>
        <ol className="divide-y divide-border border-y border-border">
          {t.why.points.map((p, i) => (
            <li key={p.title} data-reveal style={{ "--i": i + 1 } as React.CSSProperties} className="grid grid-cols-[2.5rem_1fr] gap-2 py-5">
              <span className="pt-0.5 text-sm font-semibold text-text-muted tabular-nums">0{i + 1}</span>
              <div>
                <h3 className="text-lg">{p.title}</h3>
                <p className="mt-1 text-text-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 3. What would it look like? */
export function Templates({ t }: { t: SiteCopy }) {
  return (
    <section id="template" className="relative border-t border-border py-16 sm:py-24" aria-labelledby="templates-title">
      <SectionLabel>{t.templates.label}</SectionLabel>
      <div className={wrap}>
        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16" data-reveal>
          <TwoTone a={t.templates.titleA} b={t.templates.titleB} className={h2} id="templates-title" />
          <p className="text-text-muted lg:pb-1">{t.templates.intro}</p>
        </div>
        <div className="mt-10">
          <TemplateGrid t={t} />
        </div>
      </div>
    </section>
  );
}

/** 4. How does it work? */
export function Steps({ t }: { t: SiteCopy }) {
  return (
    <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="steps-title">
      <SectionLabel>{t.steps.label}</SectionLabel>
      <div className={wrap}>
        <h2 id="steps-title" className={h2} data-reveal>
          <span className="block text-text">{t.steps.titleA}</span>
          <span className="block text-text-muted">{t.steps.titleB}</span>
        </h2>
        <ol className="mt-10 grid border-t border-border md:grid-cols-3 md:border-t-0 md:border-l">
          {t.steps.items.map((s, i) => (
            <li key={s.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="border-b border-border py-6 md:border-t md:border-r md:px-6 md:py-8">
              <span className="font-display text-[40px] leading-none text-border-strong tabular-nums">0{i + 1}</span>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 5. Can I have my own design? */
export function Custom({ t }: { t: SiteCopy }) {
  return (
    <section id="desain-khusus" className="relative scroll-mt-6 border-t border-border py-16 sm:py-24" aria-labelledby="custom-title">
      <SectionLabel>{t.custom.label}</SectionLabel>
      <div className={wrap}>
        <div className="relative grid gap-6 bg-surface p-6 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16" data-reveal>
          <Corners />
          <TwoTone a={t.custom.titleA} b={t.custom.titleB} className={h2} id="custom-title" />
          <div>
            <p className="text-text-muted">{t.custom.body}</p>
            <WhatsAppButton where="custom" message={t.custom.ctaMessage} className="mt-6">
              {t.custom.cta}
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 6. I'm still not sure. Native <details>: works without JavaScript. */
export function Faq({ t }: { t: SiteCopy }) {
  return (
    <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="faq-title">
      <SectionLabel>{t.faq.label}</SectionLabel>
      <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
        <h2 id="faq-title" className={h2} data-reveal>
          <span className="block text-text">{t.faq.titleA}</span>
          <span className="block text-text-muted">{t.faq.titleB}</span>
        </h2>
        <div className="border-t border-border">
          {t.faq.items.map((item, i) => (
            <details key={item.q} data-reveal style={{ "--i": i } as React.CSSProperties} className="group border-b border-border">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-[17px] font-semibold">
                {item.q}
                <Plus size={20} strokeWidth={2} aria-hidden="true" className="faq-icon shrink-0 text-text-muted" />
              </summary>
              {/* TODO(founder): answers with item.todo wait on a parked business decision. */}
              <p className="pb-5 text-text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 7. How do I start? */
export function Band({ t }: { t: SiteCopy }) {
  return (
    <section className="border-t border-border bg-surface py-16 sm:py-20" aria-labelledby="band-title">
      <div className={`${wrap} flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between`} data-reveal>
        <h2 id="band-title" className="text-[30px] leading-[1.15] sm:text-[44px]">
          <span className="block text-text">{t.band.titleA}</span>
          <span className="block text-text-muted">{t.band.titleB}</span>
        </h2>
        <div className="flex flex-col gap-3 lg:items-end">
          <WhatsAppButton where="band" message={t.band.ctaMessage}>
            {t.band.cta}
          </WhatsAppButton>
          <p className="text-sm text-text-muted">
            {t.band.emailLead}{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-medium text-text underline decoration-border-strong underline-offset-4">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
