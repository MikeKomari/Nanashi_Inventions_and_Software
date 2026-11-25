import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { abs } from "@/lib/site";
import { slugify } from "@/lib/slug";
import { ARTICLES, getArticle } from "@/content/engineering";
import { getInvention } from "@/content/inventions";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosting, breadcrumbs } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: `${a.title} · Nanashi Engineering`,
    description: a.summary,
    alternates: { canonical: abs(`/engineering/${a.slug}`) },
    openGraph: { type: "article", publishedTime: a.date },
  };
}

const date = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** An Engineering article (D-16): narrow reading column, sticky contents on desktop, almost no motion. */
export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const inv = getInvention(a.invention);
  const { Body } = a;
  return (
    <article className="art" data-accent={a.accent}>
      <JsonLd
        data={[
          blogPosting({ title: a.title, description: a.summary, date: a.date, path: `/engineering/${a.slug}` }),
          breadcrumbs([["Nanashi", "/"], ["Engineering", "/engineering"], [a.title, `/engineering/${a.slug}`]]),
        ]}
      />
      <header className="wrap art-head">
        <Link href="/engineering" className="link-quiet">
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          Engineering
        </Link>
        <p className="eyebrow art-eyebrow">
          <span className="art-product">{a.product}</span>
          <span aria-hidden="true">·</span>
          <span>{a.topic}</span>
        </p>
        <h1 className="art-title">{a.title}</h1>
        <p className="art-dek">{a.summary}</p>
        <p className="art-meta">
          <time dateTime={a.date}>{date(a.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{a.minutes} min read</span>
        </p>
      </header>
      <div className="wrap art-layout">
        <nav className="art-toc" aria-label="Contents">
          <p className="eyebrow">Contents</p>
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
              <p className="eyebrow">The invention</p>
              <Link href={`/inventions/${inv.slug}`} className="iend-link iend-next">
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
