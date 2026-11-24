// A live template filled with a made-up business. One static page per live template in the registry.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { id as t } from "@/content/site/id";
import { demoSlugs, getDemo } from "@/templates/demos";
import { RevealOnScroll } from "@/templates/shared/RevealOnScroll";

export const dynamicParams = false;

export function generateStaticParams() {
  return demoSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

/** A favicon drawn from the business's initial and accent colour, so the tab never shows Nanashi's. */
function favicon(name: string, bg: string, fg: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${bg}"/><text x="32" y="44" font-family="Georgia,serif" font-size="36" font-weight="700" text-anchor="middle" fill="${fg}">${name.charAt(0).toUpperCase()}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const demo = getDemo((await params).slug);
  if (!demo) return {};
  return {
    title: `${demo.title} (${t.demo.titleSuffix(demo.entry.waName.id)})`,
    description: demo.description,
    // Demos are made-up businesses: keep them out of search (SD-05). No business JSON-LD either.
    robots: { index: false, follow: false },
    icons: { icon: { url: favicon(demo.name, demo.accent, demo.onAccent), type: "image/svg+xml" } },
  };
}

export default async function DemoPage({ params }: Props) {
  const demo = getDemo((await params).slug);
  if (!demo) notFound();
  return (
    <>
      {demo.page}
      <RevealOnScroll />
    </>
  );
}
