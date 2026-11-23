// One place for site-wide facts. Pages, links and SEO read from here.

/** Next.js basePath. Must match next.config.ts. */
export const BASE_PATH = "/software";

/**
 * Public origin of the whole Nanashi domain, e.g. https://nanashi.xyz (not bought yet).
 * Until NEXT_PUBLIC_SITE_URL is set, Vercel's production address is used, then localhost.
 */
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelProd ? `https://${vercelProd}` : "http://localhost:3000")
).replace(/\/$/, "");

/** Absolute URL of a page on this site, e.g. abs("/template") → https://…/software/template */
export const abs = (path = "/") => `${SITE_ORIGIN}${BASE_PATH}${path === "/" ? "" : path}`;

/** Path to a file in public/. next/link adds the basePath itself; images and plain <a> do not. */
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const CONTACT = {
  /** WhatsApp in international form, no "+" (0822-8305-8878). */
  whatsapp: "6282283058878",
  whatsappDisplay: "0822-8305-8878",
  email: "michaelk.projects@gmail.com",
} as const;

export const FOUNDER = { name: "Michael Kimeison", url: "https://michaelkimeison.com" } as const;

/** Nanashi Inventions lives at the root of the same domain, outside this app's basePath. */
export const INVENTIONS_HREF = "/";
