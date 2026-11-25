import { Check, Plus } from "lucide-react";
import type { SiteCopy } from "@/content/site/id";
import { PRICING, PRICING_PAGE } from "@/content/site/pricing";
import { abs } from "@/lib/site";
import { href } from "@/lib/i18n";
import { breadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Corners, SectionLabel, TwoTone } from "../SectionLabel";
import { Fillable } from "../Fillable";
import { Band } from "../home/Sections";
import { WhatsAppButton } from "../WhatsAppButton";
import { PageIntro } from "./PageIntro";

const wrap = "mx-auto max-w-[1200px] px-4 sm:px-8";
const h2 = "text-[28px] leading-[1.15] sm:text-[40px]";
const small = "text-xs font-semibold tracking-[0.06em] text-text-muted uppercase";

/** Harga / Pricing: three packages, what is always included, ongoing costs and a short FAQ.
 *  While PRICING_PAGE.ready is false it shows a draft banner and is noindex (see the page wrappers). */
export function PricingPage({ t }: { t: SiteCopy }) {
  const p = PRICING[t.locale];
  return (
    <>
      {!PRICING_PAGE.ready && (
        <div role="status" className="bg-star text-on-star">
          <p className={`${wrap} py-3 text-[15px] font-semibold`}>{p.draftBanner}</p>
        </div>
      )}

      <PageIntro a={p.titleA} b={p.titleB} intro={p.intro} />

      <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="packages-title">
        <SectionLabel>{p.packagesLabel}</SectionLabel>
        <div className={wrap}>
          <TwoTone a={p.packagesTitleA} b={p.packagesTitleB} className={h2} id="packages-title" />
          <ol className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-3">
            {p.packages.map((pkg, i) => (
              <li key={pkg.slug} data-reveal style={{ "--i": i } as React.CSSProperties} className="relative flex flex-col bg-surface p-6 sm:p-8">
                {i === 0 && <Corners />}
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-[32px] leading-none text-border-strong tabular-nums">0{i + 1}</span>
                  {pkg.tag && <span className="rounded-sm border border-primary px-2 py-0.5 text-[13px] font-semibold text-primary">{pkg.tag}</span>}
                </div>
                <h3 className="mt-4 text-2xl">{pkg.name}</h3>
                <p className="mt-2 text-text-muted lg:min-h-[3lh]">{pkg.forWho}</p>

                <dl className="mt-6 grid gap-4 border-y border-border py-5">
                  <div>
                    <dt className={small}>{p.priceLabel}</dt>
                    <dd className="mt-1">
                      <Fillable className="font-display text-[28px] leading-tight">{pkg.price}</Fillable>
                      <span className="mt-1 block text-sm text-text-muted">
                        <Fillable>{pkg.priceNote}</Fillable>
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className={small}>{p.turnaroundLabel}</dt>
                    <dd className="mt-1 font-semibold">
                      <Fillable>{pkg.turnaround}</Fillable>
                    </dd>
                  </div>
                </dl>

                <p className={`${small} mt-6`}>{p.includedLabel}</p>
                <ul className="mt-3 grid gap-2.5">
                  {pkg.included.map((item) => (
                    <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2">
                      <Check size={18} strokeWidth={2.25} aria-hidden="true" className="mt-1 text-success" />
                      <Fillable>{item}</Fillable>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <WhatsAppButton where={`pricing_${pkg.slug}`} message={pkg.ctaMessage} className="w-full">
                    {pkg.cta}
                  </WhatsAppButton>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative border-t border-border bg-surface-raised py-12 sm:py-16" aria-labelledby="always-title">
        <SectionLabel>{p.alwaysLabel}</SectionLabel>
        <div className={`${wrap} grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-16`}>
          <h2 id="always-title" className="text-xl sm:text-2xl" data-reveal>
            {p.alwaysTitle}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {p.always.map((item, i) => (
              <li key={item} data-reveal style={{ "--i": i } as React.CSSProperties} className="flex items-start gap-2.5 font-medium">
                <Check size={20} strokeWidth={2.25} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="extras-title">
        <SectionLabel>{p.extrasLabel}</SectionLabel>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
          <div data-reveal>
            <TwoTone a={p.extrasTitleA} b={p.extrasTitleB} className={h2} id="extras-title" />
            <p className="mt-5 max-w-md text-text-muted">{p.extrasIntro}</p>
          </div>
          <table className="w-full border-collapse text-left" data-reveal>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className={`${small} py-3 pr-4 font-semibold`}>{p.extrasCols.item}</th>
                <th scope="col" className={`${small} py-3 text-right font-semibold`}>{p.extrasCols.price}</th>
              </tr>
            </thead>
            <tbody>
              {p.extras.map((row) => (
                <tr key={row.name} className="border-b border-border align-top">
                  <th scope="row" className="py-4 pr-4 font-normal">
                    <span className="block text-[17px] font-semibold">{row.name}</span>
                    <span className="mt-1 block text-text-muted">{row.explain}</span>
                  </th>
                  <td className="py-4 text-right font-semibold">
                    <Fillable>{row.price}</Fillable>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="relative border-t border-border py-16 sm:py-24" aria-labelledby="pricing-faq-title">
        <SectionLabel>{p.faqLabel}</SectionLabel>
        <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
          <TwoTone a={p.faqTitleA} b={p.faqTitleB} className={h2} id="pricing-faq-title" />
          <div className="border-t border-border">
            {p.faq.map((item, i) => (
              <details key={item.q} data-reveal style={{ "--i": i } as React.CSSProperties} className="group border-b border-border">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-[17px] font-semibold">
                  {item.q}
                  <Plus size={20} strokeWidth={2} aria-hidden="true" className="faq-icon shrink-0 text-text-muted" />
                </summary>
                <p className="pb-5 text-text-muted">
                  <Fillable>{item.a}</Fillable>
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Band t={t} />
      <JsonLd
        data={breadcrumbs([
          { name: t.nav.home, url: abs(href("home", t.locale)) },
          { name: p.navLabel, url: abs(href("pricing", t.locale)) },
        ])}
      />
    </>
  );
}
