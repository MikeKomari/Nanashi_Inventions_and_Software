import type { Metadata } from "next";
import { en as t } from "@/content/i18n/en";
import { alternates } from "@/lib/i18n";
import { EngineeringIndex } from "@/components/pages/EngineeringIndex";

export const metadata: Metadata = {
  title: t.engineering.metaTitle,
  description: t.engineering.lead,
  alternates: alternates("en", "/engineering"),
};

export default function Page() {
  return <EngineeringIndex t={t} />;
}
