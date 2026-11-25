import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
import { ROUTES, type PageKey } from "@/lib/i18n";

// The six site pages (three in each language). Template demos are made-up businesses: noindex and left out.
export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(ROUTES) as PageKey[]).flatMap((page) => {
    const languages = { id: abs(ROUTES[page].id), en: abs(ROUTES[page].en) };
    const priority = page === "home" ? 1 : 0.8;
    return [
      { url: languages.id, alternates: { languages }, priority },
      { url: languages.en, alternates: { languages }, priority: priority - 0.2 },
    ];
  });
}
