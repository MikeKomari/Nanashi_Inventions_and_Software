import { ogCard, OG_SIZE } from "@/lib/og/card";
import { ARTICLES, getArticle, localArticle } from "@/content/engineering";

export const alt = "Artikel Nanashi Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = localArticle(getArticle((await params).slug)!, "id");
  return ogCard({ eyebrow: `Engineering · ${a.product} · ${a.topic}`, title: a.title, accent: a.accent });
}
