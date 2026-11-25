import { Bell, ChartColumn, ClipboardList, FileStack, Scale, ShieldCheck, SquareTerminal, Tag, Workflow, type LucideIcon } from "lucide-react";
import type { SiteCopy } from "@/content/site/id";
import { AUTOMATION, type AutomationIcon } from "@/content/site/automation";
import { abs } from "@/lib/site";
import { href } from "@/lib/i18n";
import { breadcrumbs, ORG_ID } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Corners, SectionLabel, TwoTone } from "../SectionLabel";
import { Band } from "../home/Sections";
import { WhatsAppButton } from "../WhatsAppButton";
import { PageIntro } from "./PageIntro";

const wrap = "mx-auto max-w-[1200px] px-4 sm:px-8";
const h2 = "text-[28px] leading-[1.15] sm:text-[40px]";

const ICONS: Record<AutomationIcon, LucideIcon> = {
  orders: ClipboardList,
  report: ChartColumn,
  stock: Bell,
  files: FileStack,
  connect: Workflow,
  script: SquareTerminal,
};
const NOTE_ICONS: LucideIcon[] = [ShieldCheck, Scale, Tag];

/** Otomasi / Automation: scripts and small tools for repetitive computer work. */
export function AutomationPage({ t }: { t: SiteCopy }) {
  const c = AUTOMATION[t.locale];
  const url = abs(href("automation", t.locale));
  return (
    <>
      <PageIntro a={c.titleA} b={c.titleB} intro={c.intro} />

      {/* Examples, as numbered rows with a before and after line each. */}
      <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="examples-title">
        <SectionLabel>{c.examples.label}</SectionLabel>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
          <div data-reveal className="lg:sticky lg:top-24 lg:self-start">
            <TwoTone a={c.examples.titleA} b={c.examples.titleB} className={h2} id="examples-title" />
            <p className="mt-5 max-w-md text-text-muted">{c.examples.intro}</p>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {c.examples.items.map((ex, i) => {
              const Icon = ICONS[ex.icon];
              return (
                <li key={ex.title} data-reveal style={{ "--i": i + 1 } as React.CSSProperties} className="grid grid-cols-[2.5rem_1fr] gap-2 py-6">
                  <span className="pt-1 text-sm font-semibold text-text-muted tabular-nums">0{i + 1}</span>
                  <div className="min-w-0">
                    <h3 className="flex items-start gap-2.5 text-lg">
                      <Icon size={22} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                      <span>{ex.title}</span>
                    </h3>
                    <dl className="mt-3 grid gap-3">
                      <div className="grid gap-0.5 sm:grid-cols-[5.5rem_1fr] sm:gap-3">
                        <dt className="text-xs font-semibold tracking-[0.06em] text-text-muted uppercase sm:pt-1">{c.examples.beforeLabel}</dt>
                        <dd className="text-text-muted">{ex.before}</dd>
                      </div>
                      <div className="grid gap-0.5 sm:grid-cols-[5.5rem_1fr] sm:gap-3">
                        <dt className="text-xs font-semibold tracking-[0.06em] text-success uppercase sm:pt-1">{c.examples.afterLabel}</dt>
                        <dd className="text-text">{ex.after}</dd>
                      </div>
                    </dl>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* How it works: same three-column layout as the home page steps. */}
      <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="auto-steps-title">
        <SectionLabel>{c.steps.label}</SectionLabel>
        <div className={wrap}>
          <TwoTone a={c.steps.titleA} b={c.steps.titleB} className={h2} id="auto-steps-title" />
          <ol className="mt-10 grid border-t border-border md:grid-cols-3 md:border-t-0 md:border-l">
            {c.steps.items.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="border-b border-border py-6 md:border-t md:border-r md:px-6 md:py-8">
                <span className="font-display text-[40px] leading-none text-border-strong tabular-nums">0{i + 1}</span>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Honest points: data, fit, price. */}
      <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="notes-title">
        <SectionLabel>{c.notes.label}</SectionLabel>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
          <TwoTone a={c.notes.titleA} b={c.notes.titleB} className={h2} id="notes-title" />
          <ul className="divide-y divide-border border-y border-border">
            {c.notes.items.map((n, i) => {
              const Icon = NOTE_ICONS[i] ?? ShieldCheck;
              return (
                <li key={n.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="grid grid-cols-[2.5rem_1fr] gap-2 py-5">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 text-text-muted" />
                  <div>
                    <h3 className="text-lg">{n.title}</h3>
                    <p className="mt-1 text-text-muted">{n.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* WhatsApp call to action. */}
      <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="auto-cta-title">
        <SectionLabel>{c.cta.label}</SectionLabel>
        <div className={wrap}>
          <div className="relative grid gap-6 bg-surface p-6 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16" data-reveal>
            <Corners />
            <TwoTone a={c.cta.titleA} b={c.cta.titleB} className={h2} id="auto-cta-title" />
            <div>
              <p className="text-text-muted">{c.cta.body}</p>
              <WhatsAppButton where="automation" message={c.cta.message} className="mt-6">
                {c.cta.button}
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <Band t={t} />

      <JsonLd
        data={[
          breadcrumbs([
            { name: t.nav.home, url: abs(href("home", t.locale)) },
            { name: c.nav, url },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: c.meta.title.split(" | ")[0],
            description: c.meta.description,
            serviceType: c.serviceType,
            provider: { "@id": ORG_ID },
            areaServed: { "@type": "Country", name: "Indonesia" },
            inLanguage: t.locale,
            url,
          },
        ]}
      />
    </>
  );
}
