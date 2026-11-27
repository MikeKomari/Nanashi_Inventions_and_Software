// Page addresses in both languages. Indonesian is the default at the root; English lives under /en.
// Paths are relative to the /software basePath (next/link adds it; use abs() for full URLs).
import { abs } from "./site";

export type Locale = "id" | "en";
export type PageKey = "home" | "templates" | "about" | "automation" | "brief";

export const ROUTES: Record<PageKey, Record<Locale, string>> = {
  home: { id: "/", en: "/en" },
  templates: { id: "/template", en: "/en/templates" },
  about: { id: "/tentang", en: "/en/about" },
  brief: { id: "/mulai", en: "/en/start" },
  automation: { id: "/otomasi", en: "/en/automation" },
};

export const href = (page: PageKey, locale: Locale) => ROUTES[page][locale];

/** The same page in the other language; falls back to that language's home. */
export function counterpart(pathname: string, to: Locale): string {
  const from: Locale = to === "en" ? "id" : "en";
  const page = (Object.keys(ROUTES) as PageKey[]).find((k) => ROUTES[k][from] === pathname);
  return page ? ROUTES[page][to] : ROUTES.home[to];
}

/** Canonical plus hreflang pairs. Indonesian is the x-default: it is the site's main language. */
export function alternates(page: PageKey, locale: Locale) {
  return {
    canonical: abs(ROUTES[page][locale]),
    languages: { id: abs(ROUTES[page].id), en: abs(ROUTES[page].en), "x-default": abs(ROUTES[page].id) },
  };
}
