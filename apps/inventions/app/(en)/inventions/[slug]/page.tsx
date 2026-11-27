import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { en as t } from "@/content/i18n/en";
import { alternates } from "@/lib/i18n";
import { getInvention, liveInventions } from "@/content/inventions";
import { InventionPage } from "@/components/invention/InventionPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return liveInventions().map((i) => ({ slug: i.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const inv = getInvention((await params).slug, "en");
  if (!inv) return {};
  return {
    title: `${inv.name}: ${inv.audience.toLowerCase()} · Nanashi Inventions`,
    description: inv.oneLiner,
    alternates: alternates("en", `/inventions/${inv.slug}`),
  };
}

export default async function Page({ params }: Props) {
  const inv = getInvention((await params).slug, "en");
  if (!inv) notFound();
  return <InventionPage t={t} inv={inv} />;
}
