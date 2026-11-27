// One place for site-wide facts. Pages, links and SEO read from here.

/**
 * Public origin, e.g. https://nanashi.xyz (domain not bought yet).
 * Until NEXT_PUBLIC_SITE_URL is set, Vercel's production address is used, then localhost.
 */
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelProd ? `https://${vercelProd}` : "http://localhost:3000")
).replace(/\/$/, "");

/** The brand name Google should show. Full name on purpose: "Nanashi" alone is a common anime term. */
export const SITE_NAME = "Nanashi Inventions";

/** Google Search Console "HTML tag" code (only the content="…" value). Unset: no tag. */
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

/** True when /software is served on this domain (SOFTWARE_ORIGIN set, see next.config.ts). */
export const SOFTWARE_ON = Boolean(process.env.SOFTWARE_ORIGIN);

export const abs = (path = "/") => `${SITE_ORIGIN}${path === "/" ? "" : path}`;

export const CONTACT = { email: "michaelk.projects@gmail.com" } as const;

export const FOUNDER = { name: "Michael Kimeison", url: "https://michaelkimeison.com" } as const;

export const SOCIAL = {
  github: "https://github.com/MikeKomari",
  linkedin: "https://www.linkedin.com/in/michkimei",
} as const;
