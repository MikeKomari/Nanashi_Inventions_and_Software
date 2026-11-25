import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { id as t } from "@/content/i18n/id";
import { alternates } from "@/lib/i18n";
import { getInvention, liveInventions } from "@/content/inventions";
import { InventionPage } from "@/components/invention/InventionPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return liveInventions().map((i) => ({ slug: i.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const inv = getInvention((await params).slug, "id");
  if (!inv) return {};
  return {
    title: `${inv.name}: ${inv.audience.toLowerCase()} · Nanashi`,
    description: inv.oneLiner,
    alternates: alternates("id", `/inventions/${inv.slug}`),
  };
}

export default async function Page({ params }: Props) {
  const inv = getInvention((await params).slug, "id");
  if (!inv) notFound();
  return <InventionPage t={t} inv={inv} />;
}
