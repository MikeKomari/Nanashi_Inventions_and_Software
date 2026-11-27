import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Copy } from "@/content/i18n/en";
import { lp } from "@/lib/i18n";
import { articlesFor } from "@/content/engineering";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/seo";

/** Engineering (W-06): deep dives, newest first, in English or Indonesian. */
export function EngineeringIndex({ t }: { t: Copy }) {
  const e = t.engineering;
  const date = (iso: string) => new Date(iso).toLocaleDateString(e.dateLocale, { day: "numeric", month: "short", year: "numeric" });
  return (
    <div className="eng-index">
      <JsonLd data={breadcrumbs([["Nanashi", lp(t.locale, "/")], [e.label, lp(t.locale, "/engineering")]])} />
      <Reveal className="wrap">
        <p className="eyebrow">{e.label}</p>
        <h1 className="section-title">
          <Words text={e.title} />
        </h1>
        <p className="section-lead">{e.lead}</p>
      </Reveal>
      <ul className="wrap eng-list">
        {articlesFor(t.locale).map((a) => (
          <li key={a.slug}>
            <Reveal className="eng-row" accent={a.accent} amount={0.3}>
              <p className="article-meta">
                <span>{a.product}</span>
                <span aria-hidden="true">·</span>
                <span>{a.topic}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={a.date}>{date(a.date)}</time>
                <span aria-hidden="true">·</span>
                <span>
                  {a.minutes} {e.minRead}
                </span>
              </p>
              <h2 className="eng-row-title">
                <Link href={lp(t.locale, `/engineering/${a.slug}`)} className="article-link">
                  {a.title}
                </Link>
              </h2>
              <p className="article-summary">{a.summary}</p>
              <p className="article-cta" aria-hidden="true">
                {e.read}
                <ArrowRight size={16} strokeWidth={2} />
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
