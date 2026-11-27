import type { Metadata } from "next";
import { en as t } from "@/content/site/en";
import { SHOWCASE, SHOWCASE_READY } from "@/content/site/showcase";
import { alternates } from "@/lib/i18n";
import { ShowcasePage } from "@/components/site/pages/ShowcasePage";

const s = SHOWCASE[t.locale];

export const metadata: Metadata = {
  title: s.title,
  description: s.description,
  alternates: alternates("showcase", t.locale),
  // A draft until one real client exists (content/site/showcase.ts).
  ...(SHOWCASE_READY ? {} : { robots: { index: false, follow: true } }),
};

export default function Work() {
  return <ShowcasePage t={t} />;
}
