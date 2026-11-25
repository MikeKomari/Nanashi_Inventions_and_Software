import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
import { ROUTES, type PageKey } from "@/lib/i18n";
import { SHOWCASE_READY } from "@/content/site/showcase";

// The site pages in both languages. Template demos are made-up businesses: noindex and left out.
// The showcase (Karya) joins only once it has a real client (see content/site/showcase.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(ROUTES) as PageKey[]).filter((p) => p !== "showcase" || SHOWCASE_READY);
  return pages.flatMap((page) => {
    const languages = { id: abs(ROUTES[page].id), en: abs(ROUTES[page].en) };
    const priority = page === "home" ? 1 : 0.8;
    return [
      { url: languages.id, alternates: { languages }, priority },
      { url: languages.en, alternates: { languages }, priority: priority - 0.2 },
    ];
  });
}
