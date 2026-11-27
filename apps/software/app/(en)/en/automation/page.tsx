import type { Metadata } from "next";
import { en as t } from "@/content/site/en";
import { AUTOMATION } from "@/content/site/automation";
import { alternates } from "@/lib/i18n";
import { AutomationPage } from "@/components/site/pages/AutomationPage";

const c = AUTOMATION.en;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: alternates("automation", t.locale),
};

export default function Automation() {
  return <AutomationPage t={t} />;
}
