import type { Metadata } from "next";
import { en as t } from "@/content/i18n/en";
import { alternates } from "@/lib/i18n";
import { PressPage } from "@/components/pages/PressPage";

export const metadata: Metadata = {
  title: t.press.metaTitle,
  description: t.press.metaDescription,
  alternates: alternates("en", "/press"),
};

export default function Page() {
  return <PressPage t={t} />;
}
