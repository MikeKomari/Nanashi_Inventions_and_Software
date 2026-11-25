import type { Metadata } from "next";
import { id as t } from "@/content/site/id";
import { alternates } from "@/lib/i18n";
import { TemplatesPage } from "@/components/site/pages/TemplatesPage";

export const metadata: Metadata = {
  title: t.meta.templatesTitle,
  description: t.meta.templatesDescription,
  alternates: alternates("templates", t.locale),
};

export default function Template() {
  return <TemplatesPage t={t} />;
}
