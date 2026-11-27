import type { Metadata } from "next";
import { id as t } from "@/content/site/id";
import { AUTOMATION } from "@/content/site/automation";
import { alternates } from "@/lib/i18n";
import { AutomationPage } from "@/components/site/pages/AutomationPage";

const c = AUTOMATION.id;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: alternates("automation", t.locale),
};

export default function Otomasi() {
  return <AutomationPage t={t} />;
}
