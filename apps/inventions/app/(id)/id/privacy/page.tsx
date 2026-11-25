import type { Metadata } from "next";
import { id as t } from "@/content/i18n/id";
import { alternates } from "@/lib/i18n";
import { PrivacyPage } from "@/components/pages/PrivacyPage";

export const metadata: Metadata = {
  title: t.privacy.metaTitle,
  description: t.privacy.metaDescription,
  alternates: alternates("id", "/privacy"),
};

export default function Page() {
  return <PrivacyPage t={t} />;
}
