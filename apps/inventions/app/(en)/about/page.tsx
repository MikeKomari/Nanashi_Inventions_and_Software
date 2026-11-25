import type { Metadata } from "next";
import { en as t } from "@/content/i18n/en";
import { alternates } from "@/lib/i18n";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: t.about.metaTitle,
  description: t.about.metaDescription,
  alternates: alternates("en", "/about"),
};

export default function Page() {
  return <AboutPage t={t} />;
}
