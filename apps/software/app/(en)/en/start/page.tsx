import type { Metadata } from "next";
import { en as t } from "@/content/site/en";
import { BRIEF } from "@/content/site/brief";
import { alternates } from "@/lib/i18n";
import { BriefPage } from "@/components/site/pages/BriefPage";

const copy = BRIEF[t.locale];

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: alternates("brief", t.locale),
};

export default function Start() {
  return <BriefPage t={t} />;
}
