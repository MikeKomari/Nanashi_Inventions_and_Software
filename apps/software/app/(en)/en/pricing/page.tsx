import type { Metadata } from "next";
import { en as t } from "@/content/site/en";
import { PRICING, PRICING_PAGE } from "@/content/site/pricing";
import { alternates } from "@/lib/i18n";
import { PricingPage } from "@/components/site/pages/PricingPage";

const p = PRICING.en;

export const metadata: Metadata = {
  title: p.meta.title,
  description: p.meta.description,
  alternates: alternates("pricing", t.locale),
  // Draft until the founder fills in the prices: kept out of search results.
  robots: PRICING_PAGE.ready ? undefined : { index: false, follow: true },
};

export default function Pricing() {
  return <PricingPage t={t} />;
}
