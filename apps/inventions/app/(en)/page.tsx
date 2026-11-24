import type { Metadata } from "next";
import { en as t } from "@/content/i18n/en";
import { abs } from "@/lib/site";
import { Stage } from "@/components/home/Stage";
import { Statement } from "@/components/home/Statement";
import { Inventions } from "@/components/home/Inventions";
import { SevenStars } from "@/components/home/SevenStars";
import { Engineering } from "@/components/home/Engineering";
import { Close } from "@/components/home/Close";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: t.meta.homeTitle,
  description: t.meta.homeDescription,
  alternates: { canonical: abs("/") },
};

/**
 * Home: stage → statement → one chapter per live product → coming soon → the seven stars →
 * Engineering → closing call to action → FAQ. The Nanashi Software band and the footer come from
 * the layout. Stage takes logo="flat" to switch back to the flat animated logo.
 */
export default function Home() {
  return (
    <>
      <Stage t={t} logo="3d" />
      <Statement t={t} />
      <Inventions t={t} />
      <SevenStars t={t} />
      <Engineering t={t} />
      <Close t={t} />
      <Faq t={t} />
    </>
  );
}
