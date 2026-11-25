import type { Metadata } from "next";
import { en as t } from "@/content/site/en";
import { alternates } from "@/lib/i18n";
import { AboutPage } from "@/components/site/pages/AboutPage";

export const metadata: Metadata = {
  title: t.meta.aboutTitle,
  description: t.meta.aboutDescription,
  alternates: alternates("about", t.locale),
};

export default function About() {
  return <AboutPage t={t} />;
}
