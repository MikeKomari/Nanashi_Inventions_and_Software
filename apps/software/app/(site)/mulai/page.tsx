import type { Metadata } from "next";
import { id as t } from "@/content/site/id";
import { BRIEF } from "@/content/site/brief";
import { alternates } from "@/lib/i18n";
import { BriefPage } from "@/components/site/pages/BriefPage";

const copy = BRIEF[t.locale];

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: alternates("brief", t.locale),
};

export default function Mulai() {
  return <BriefPage t={t} />;
}
