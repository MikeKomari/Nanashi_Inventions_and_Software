import type { Metadata } from "next";
import { id as t } from "@/content/i18n/id";
import { alternates } from "@/lib/i18n";
import { EngineeringIndex } from "@/components/pages/EngineeringIndex";

export const metadata: Metadata = {
  title: t.engineering.metaTitle,
  description: t.engineering.lead,
  alternates: alternates("id", "/engineering"),
};

export default function Page() {
  return <EngineeringIndex t={t} />;
}
