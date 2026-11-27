import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
import { ROUTES, type PageKey } from "@/lib/i18n";
import { PRICING_PAGE } from "@/content/site/pricing";
import { SHOWCASE_READY } from "@/content/site/showcase";

// Every site page, in both languages. Template demos are made-up businesses: noindex and left out.
// Draft pages join only once they are ready: pricing (PRICING_PAGE.ready) and the showcase (a real client).
const DRAFT: Partial<Record<PageKey, boolean>> = { pricing: !PRICING_PAGE.ready, showcase: !SHOWCASE_READY };

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(ROUTES) as PageKey[])
    .filter((page) => !DRAFT[page])
    .flatMap((page) => {
      const languages = { id: abs(ROUTES[page].id), en: abs(ROUTES[page].en) };
      const priority = page === "home" ? 1 : 0.8;
      return [
        { url: languages.id, alternates: { languages }, priority },
        { url: languages.en, alternates: { languages }, priority: priority - 0.2 },
      ];
    });
}
