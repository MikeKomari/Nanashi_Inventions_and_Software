import { ogCard, OG_SIZE } from "@/lib/og/card";
import { getInvention, liveInventions } from "@/content/inventions";

export const alt = "A Nanashi invention";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return liveInventions().map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const inv = getInvention((await params).slug)!;
  return ogCard({ eyebrow: `Invention · ${inv.audience}`, title: inv.name, line: inv.oneLiner, accent: inv.accent });
}
