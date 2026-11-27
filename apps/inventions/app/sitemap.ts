import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
import { lp } from "@/lib/i18n";
import { liveInventions } from "@/content/inventions";
import { ARTICLES } from "@/content/engineering";

// Every public page, built at deploy time, in both languages (English at /, Indonesian under /id).
// /dev/logo is a review page and is left out (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const both = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: abs(path),
    priority,
    alternates: { languages: { en: abs(path), id: abs(lp("id", path)) } },
  });
  const bilingual = [
    "/",
    "/inventions",
    ...liveInventions().map((i) => `/inventions/${i.slug}`),
    "/engineering",
    ...ARTICLES.map((a) => `/engineering/${a.slug}`),
    "/about",
    "/privacy",
    "/press",
  ];
  const weight = (p: string) => (p === "/" ? 1 : p === "/press" ? 0.4 : 0.8);
  return [
    ...bilingual.map((p) => both(p, weight(p))),
    ...bilingual.map((p) => ({ ...both(p, weight(p) - 0.1), url: abs(lp("id", p)) })),
  ];
}
