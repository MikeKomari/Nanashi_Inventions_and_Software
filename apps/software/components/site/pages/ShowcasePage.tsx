import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SiteCopy } from "@/content/site/id";
import { pick, SHOWCASE, SHOWCASE_READY, VISIBLE_PROJECTS, type ShowcaseProject } from "@/content/site/showcase";
import { TEMPLATES } from "@/templates/registry";
import { abs, asset } from "@/lib/site";
import { href } from "@/lib/i18n";
import { breadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionLabel, TwoTone } from "../SectionLabel";
import { Band } from "../home/Sections";
import { WhatsAppButton } from "../WhatsAppButton";
import { BeforeAfter } from "../showcase/BeforeAfter";
import { PageIntro } from "./PageIntro";

const wrap = "mx-auto max-w-[1200px] px-4 sm:px-8";
const textLink = "inline-flex min-h-11 items-center gap-1 font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:text-primary-hover";

function ProjectCard({ p, t, i }: { p: ShowcaseProject; t: SiteCopy; i: number }) {
  const s = SHOWCASE[t.locale];
  const client = pick(p.client, t.locale);
  const tpl = p.template ? TEMPLATES.find((x) => x.slug === p.template) : undefined;
  const meta = [pick(p.businessType, t.locale), p.city].filter(Boolean).join(" · ");
  const chip = "inline-flex min-h-11 items-center rounded-full border border-border px-3 text-sm text-text-muted";
  return (
    <li data-reveal style={{ "--i": i } as React.CSSProperties} className="flex flex-col gap-4 bg-surface p-4 sm:p-6">
      <BeforeAfter
        after={{ src: asset(p.afterImage), alt: s.imageAlt(client, s.after) }}
        before={p.beforeImage ? { src: asset(p.beforeImage), alt: s.imageAlt(client, s.before) } : undefined}
        labels={{ group: s.toggleLabel(client), before: s.before, after: s.after }}
      />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl">{client}</h3>
          <p className="mt-1 text-[15px] text-text-muted">{meta}</p>
        </div>
        {p.placeholder && (
          <span className="rounded-sm border border-dashed border-border-strong px-2 py-0.5 text-xs font-semibold tracking-[0.06em] text-text-muted uppercase">
            {s.sample}
          </span>
        )}
      </div>
      {tpl && (
        <p>
          {tpl.status === "live" ? (
            <Link href={`/template/${tpl.slug}`} className={`${chip} hover:border-border-strong hover:text-text`}>
              {s.template} {tpl.number} · {tpl.waName[t.locale]}
            </Link>
          ) : (
            <span className={chip}>
              {s.template} {tpl.number} · {tpl.waName[t.locale]}
            </span>
          )}
        </p>
      )}
      <p>{pick(p.story, t.locale)}</p>
      {p.result && <p className="border-l-2 border-star pl-3 font-semibold">{pick(p.result, t.locale)}</p>}
      {p.quote && (
        <figure className="border-t border-border pt-4">
          <blockquote className="text-text-muted">“{pick(p.quote.text, t.locale)}”</blockquote>
          <figcaption className="mt-2 text-sm">
            <span className="font-semibold">{p.quote.name}</span>
            <span className="text-text-muted">, {pick(p.quote.role, t.locale)}</span>
          </figcaption>
        </figure>
      )}
      {p.url && (
        <a href={p.url} target="_blank" rel="noopener noreferrer" className={`${textLink} mt-auto`}>
          {s.visit}
          <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
        </a>
      )}
    </li>
  );
}

/** Karya / Work: client websites with a short story each. A draft (noindex, no footer link) until one real client exists. */
export function ShowcasePage({ t }: { t: SiteCopy }) {
  const s = SHOWCASE[t.locale];
  return (
    <>
      {!SHOWCASE_READY && (
        <div className={`${wrap} pt-6`}>
          <p role="note" className="rounded-sm bg-star px-4 py-3 text-[15px] font-semibold text-on-star">
            {s.draft}
          </p>
        </div>
      )}
      <PageIntro a={s.titleA} b={s.titleB} intro={s.intro} />

      <section className="relative border-t border-border py-16 sm:py-24" aria-label={s.label}>
        <SectionLabel>{s.label}</SectionLabel>
        <div className={wrap}>
          <ul className="grid gap-px border border-border bg-border md:grid-cols-2">
            {VISIBLE_PROJECTS.map((p, i) => (
              <ProjectCard key={p.slug} p={p} t={t} i={i} />
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between" data-reveal>
            <TwoTone a={s.ctaTitleA} b={s.ctaTitleB} className="text-[24px] leading-[1.2] sm:text-[32px]" />
            <WhatsAppButton where="showcase" message={s.ctaMessage}>
              {s.cta}
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <Band t={t} />
      <JsonLd
        data={breadcrumbs([
          { name: t.nav.home, url: abs(href("home", t.locale)) },
          { name: s.nav, url: abs(href("showcase", t.locale)) },
        ])}
      />
    </>
  );
}
