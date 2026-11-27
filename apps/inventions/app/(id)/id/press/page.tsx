import type { Metadata } from "next";
import { id as t } from "@/content/i18n/id";
import { alternates } from "@/lib/i18n";
import { PressPage } from "@/components/pages/PressPage";

export const metadata: Metadata = {
  title: t.press.metaTitle,
  description: t.press.metaDescription,
  alternates: alternates("id", "/press"),
};

export default function Page() {
  return <PressPage t={t} />;
}
