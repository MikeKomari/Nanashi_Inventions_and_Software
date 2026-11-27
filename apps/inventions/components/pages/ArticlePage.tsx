import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Copy } from "@/content/i18n/en";
import { lp } from "@/lib/i18n";
import { slugify } from "@/lib/slug";
import { localArticle, type Article } from "@/content/engineering";
import { getInvention } from "@/content/inventions";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosting, breadcrumbs } from "@/lib/seo";

/** An Engineering article (D-16): narrow reading column, sticky contents on desktop, almost no motion. */
export function ArticlePage({ t, article }: { t: Copy; article: Article }) {
  const e = t.engineering;
  const a = localArticle(article, t.locale);
  const inv = getInvention(a.invention, t.locale);
  const path = lp(t.locale, `/engineering/${a.slug}`);
  const date = new Date(a.date).toLocaleDateString(e.dateLocale, { day: "numeric", month: "long", year: "numeric" });
  const { Body } = a;
  return (
    <article className="art" data-accent={a.accent}>
      <JsonLd
        data={[
          blogPosting({ title: a.title, description: a.summary, date: a.date, path, lang: t.locale }),
          breadcrumbs([["Nanashi", lp(t.locale, "/")], [e.label, lp(t.locale, "/engineering")], [a.title, path]]),
        ]}
      />
      <header className="wrap art-head">
        <Link href={lp(t.locale, "/engineering")} className="link-quiet">
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          {e.label}
        </Link>
        <p className="eyebrow art-eyebrow">
          <span className="art-product">{a.product}</span>
          <span aria-hidden="true">·</span>
          <span>{a.topic}</span>
        </p>
        <h1 className="art-title">{a.title}</h1>
        <p className="art-dek">{a.summary}</p>
        <p className="art-meta">
          <time dateTime={a.date}>{date}</time>
          <span aria-hidden="true">·</span>
          <span>
            {a.minutes} {e.minRead}
          </span>
        </p>
      </header>
      <div className="wrap art-layout">
        <nav className="art-toc" aria-label={e.contents}>
          <p className="eyebrow">{e.contents}</p>
          <ol>
            {a.toc.map((h) => (
              <li key={h}>
                <a href={`#${slugify(h)}`}>{h}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="art-body">
          <Body />
          {inv && (
            <aside className="art-end" data-accent={inv.accent}>
              <p className="eyebrow">{e.inventionLabel}</p>
              <Link href={lp(t.locale, `/inventions/${inv.slug}`)} className="iend-link iend-next">
                {inv.name}
                <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
              </Link>
              <p className="art-end-line">{inv.oneLiner}</p>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}
