import type { Metadata } from "next";
import { id as t } from "@/content/i18n/id";
import { alternates } from "@/lib/i18n";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: t.about.metaTitle,
  description: t.about.metaDescription,
  alternates: alternates("id", "/about"),
};

export default function Page() {
  return <AboutPage t={t} />;
}
