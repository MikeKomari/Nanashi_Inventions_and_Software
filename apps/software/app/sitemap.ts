import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
import { ROUTES, type PageKey } from "@/lib/i18n";
import { PRICING_PAGE } from "@/content/site/pricing";

// The site pages in both languages. Template demos are made-up businesses: noindex and left out.
// The pricing page joins only once it is ready (until then it is a noindex draft).
export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(ROUTES) as PageKey[])
    .filter((page) => page !== "pricing" || PRICING_PAGE.ready)
    .flatMap((page) => {
    const languages = { id: abs(ROUTES[page].id), en: abs(ROUTES[page].en) };
    const priority = page === "home" ? 1 : 0.8;
    return [
      { url: languages.id, alternates: { languages }, priority },
      { url: languages.en, alternates: { languages }, priority: priority - 0.2 },
    ];
  });
}
