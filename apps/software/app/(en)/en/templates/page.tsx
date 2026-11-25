import type { Metadata } from "next";
import { en as t } from "@/content/site/en";
import { alternates } from "@/lib/i18n";
import { TemplatesPage } from "@/components/site/pages/TemplatesPage";

export const metadata: Metadata = {
  title: t.meta.templatesTitle,
  description: t.meta.templatesDescription,
  alternates: alternates("templates", t.locale),
};

export default function Templates() {
  return <TemplatesPage t={t} />;
}
