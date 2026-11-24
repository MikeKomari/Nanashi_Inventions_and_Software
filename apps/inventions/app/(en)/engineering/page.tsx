import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { abs } from "@/lib/site";
import { en as t } from "@/content/i18n/en";
import { ARTICLES } from "@/content/engineering";
import { Reveal, Words } from "@/components/scroll/Reveal";

export const metadata: Metadata = {
  title: "Engineering · Nanashi",
  description: t.engineering.lead,
  alternates: { canonical: abs("/engineering") },
};

const date = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Engineering (W-06): deep dives, newest first. English only (W-10). */
export default function EngineeringIndex() {
  const e = t.engineering;
  return (
    <div className="eng-index">
      <Reveal className="wrap">
        <p className="eyebrow">{e.label}</p>
        <h1 className="section-title">
          <Words text={e.title} />
        </h1>
        <p className="section-lead">{e.lead}</p>
      </Reveal>
      <ul className="wrap eng-list">
        {[...ARTICLES]
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((a) => (
            <li key={a.slug}>
              <Reveal className="eng-row" accent={a.accent} amount={0.3}>
                <p className="article-meta">
                  <span>{a.product}</span>
                  <span aria-hidden="true">·</span>
                  <span>{a.topic}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={a.date}>{date(a.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{a.minutes} min read</span>
                </p>
                <h2 className="eng-row-title">
                  <Link href={`/engineering/${a.slug}`} className="article-link">
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
