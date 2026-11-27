// English is the default at "/", Indonesian lives under "/id" (B-09, W-10). Home, Inventions, each
// invention, About, Privacy, Engineering (each article) and the press kit exist in both languages.
import { abs } from "@/lib/site";

export type Locale = "en" | "id";

/** Paths that have an Indonesian version. */
const LOCALIZED = /^\/(?:inventions(?:\/[^/]+)?|engineering(?:\/[^/]+)?|about|privacy|press)?$/;

export const isLocalized = (path: string) => LOCALIZED.test(path);

/** A site path in the given language: lp("id", "/about") → "/id/about"; English-only paths stay as they are. */
export function lp(locale: Locale, path: string): string {
  if (locale !== "id" || !isLocalized(path)) return path;
  return path === "/" ? "/id" : `/id${path}`;
}

/** The same page in the other language (or that language's home when it has no version). */
export function counterpart(pathname: string, to: Locale): string {
  const enPath = pathname === "/id" ? "/" : pathname.startsWith("/id/") ? pathname.slice(3) : pathname;
  if (to === "en") return enPath;
  return isLocalized(enPath) ? lp("id", enPath) : "/id";
}

/** canonical + hreflang pairs for a page that exists in both languages (path is the English path). */
export function alternates(locale: Locale, path: string) {
  return {
    canonical: abs(lp(locale, path)),
    languages: { en: abs(path), id: abs(lp("id", path)), "x-default": abs(path) },
  };
}
