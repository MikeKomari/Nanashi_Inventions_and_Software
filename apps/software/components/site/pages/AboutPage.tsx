import { ArrowUpRight } from "lucide-react";
import type { SiteCopy } from "@/content/site/id";
import { abs, FOUNDER, INVENTIONS_HREF } from "@/lib/site";
import { href } from "@/lib/i18n";
import { breadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Corners, SectionLabel, TwoTone } from "../SectionLabel";
import { Band } from "../home/Sections";
import { PageIntro } from "./PageIntro";

const wrap = "mx-auto max-w-[1200px] px-4 sm:px-8";
const h2 = "text-[28px] leading-[1.15] sm:text-[40px]";
const textLink = "inline-flex min-h-11 items-center gap-1 font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:text-primary-hover";

/** Tentang / About: what Nanashi Software does, how it works with clients, and who is behind it. */
export function AboutPage({ t }: { t: SiteCopy }) {
  const a = t.about;
  return (
    <>
      <PageIntro a={a.titleA} b={a.titleB} intro={a.intro} />

      <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="values-title">
        <SectionLabel>{a.valuesLabel}</SectionLabel>
        <div className={wrap}>
          <TwoTone a={a.valuesTitleA} b={a.valuesTitleB} className={h2} id="values-title" />
          <ol className="mt-10 grid border-t border-border md:grid-cols-3 md:border-t-0 md:border-l">
            {a.values.map((v, i) => (
              <li key={v.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="border-b border-border py-6 md:border-t md:border-r md:px-6 md:py-8">
                <span className="font-display text-[40px] leading-none text-border-strong tabular-nums">0{i + 1}</span>
                <h3 className="mt-4 text-xl">{v.title}</h3>
                <p className="mt-2 text-text-muted">{v.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="people-title">
        <SectionLabel>{a.peopleLabel}</SectionLabel>
        <div className={wrap}>
        <div className="grid gap-px border border-border bg-border md:grid-cols-[1.3fr_1fr]">
          <div className="relative bg-surface p-6 sm:p-10" data-reveal>
            <Corners />
            <h2 id="people-title" className={h2}>{a.partOfTitle}</h2>
            <p className="mt-4 max-w-xl text-text-muted">{a.partOfBody}</p>
            {/* Plain <a>: Nanashi Inventions is the domain root, outside this app's basePath. */}
            <a href={INVENTIONS_HREF} className={`${textLink} mt-4`}>
              {a.partOfLink}
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
          <div className="bg-surface-raised p-6 sm:p-10" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <p className="text-xs font-semibold tracking-[0.06em] text-text-muted uppercase">{a.founderRole}</p>
            <p className="mt-2 font-display text-2xl">
              <a href={FOUNDER.url} className="underline decoration-border-strong underline-offset-4 hover:decoration-text">
                {FOUNDER.name}
              </a>
            </p>
            <p className="mt-3 text-text-muted">{a.founderBody}</p>
            <a href={FOUNDER.url} className={`${textLink} mt-3`}>
              {a.founderLink}
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
        </div>
      </section>

      <Band t={t} />
      <JsonLd
        data={breadcrumbs([
          { name: t.nav.home, url: abs(href("home", t.locale)) },
          { name: t.nav.about, url: abs(href("about", t.locale)) },
        ])}
      />
    </>
  );
}
