import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { id as t } from "@/content/i18n/id";
import { alternates } from "@/lib/i18n";
import { ARTICLES, getArticle, localArticle } from "@/content/engineering";
import { ArticlePage } from "@/components/pages/ArticlePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = getArticle((await params).slug);
  if (!found) return {};
  const a = localArticle(found, "id");
  return {
    title: `${a.title} · Nanashi Engineering`,
    description: a.summary,
    alternates: alternates("id", `/engineering/${a.slug}`),
    openGraph: { type: "article", publishedTime: a.date },
  };
}

export default async function Page({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  return <ArticlePage t={t} article={a} />;
}
