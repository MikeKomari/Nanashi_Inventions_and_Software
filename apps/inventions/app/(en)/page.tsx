import type { Metadata } from "next";
import { en as t } from "@/content/i18n/en";
import { abs } from "@/lib/site";
import { Stage } from "@/components/home/Stage";
import { NameStory } from "@/components/home/NameStory";
import { SevenStars } from "@/components/home/SevenStars";
import { seenIn } from "@/content/inventions";
import { InventionsSection } from "@/components/home/InventionsSection";
import { Engineering } from "@/components/home/Engineering";
import { Founder } from "@/components/home/Founder";

export const metadata: Metadata = {
  title: t.meta.homeTitle,
  description: t.meta.homeDescription,
  alternates: { canonical: abs("/") },
};

/**
 * Home, brand first (founder, 24 Nov 2026): stage → the name → the seven principles → how Nanashi
 * builds → the inventions → Engineering → founder line. The Nanashi Software band and the footer
 * come from the layout. Stage takes logo="flat" to switch back to the flat animated logo.
 */
export default function Home() {
  return (
    <>
      <Stage t={t} logo="3d" />
      <NameStory t={t} />
      <SevenStars t={t} seen={seenIn()} />
      {/* <HowNanashiBuilds t={t} /> held back: founder said the wording is wrong (24 Nov 2026). */}
      <InventionsSection t={t} />
      <Engineering t={t} />
      <Founder t={t} />
    </>
  );
}
