import type { Metadata } from "next";
import { id as t } from "@/content/site/id";
import { alternates } from "@/lib/i18n";
import { AboutPage } from "@/components/site/pages/AboutPage";

export const metadata: Metadata = {
  title: t.meta.aboutTitle,
  description: t.meta.aboutDescription,
  alternates: alternates("about", t.locale),
};

export default function Tentang() {
  return <AboutPage t={t} />;
}
