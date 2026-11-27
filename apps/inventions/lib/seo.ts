// Structured data (JSON-LD) for search engines. Facts only: nothing here that the pages don't say.
import { abs, CONTACT, FOUNDER, SITE_NAME, SOCIAL } from "@/lib/site";

export const ORG_ID = abs("/#organization");

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: ["Nanashi", "Nanashi Lab"],
    url: abs("/"),
    logo: abs("/brand/nanashi-symbol-color.svg"),
    description: "An independent product lab. Its name comes from the Japanese nana hoshi, seven stars.",
    email: CONTACT.email,
    founder: { "@type": "Person", name: FOUNDER.name, url: FOUNDER.url },
    sameAs: [SOCIAL.github, SOCIAL.linkedin],
  };
}

/** Tells Google the site's name, so results read "Nanashi Inventions" and not the bare address. */
export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    name: SITE_NAME,
    alternateName: "Nanashi",
    url: abs("/"),
    inLanguage: ["en", "id"],
    publisher: { "@id": ORG_ID },
  };
}

/** Home › … › current page. Items are [name, path]; paths are absolute site paths. */
export function breadcrumbs(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}

export function softwareApplication(app: { name: string; description: string; url: string; page: string; category: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: app.url,
    mainEntityOfPage: abs(app.page),
    applicationCategory: app.category,
    operatingSystem: "Web browser",
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function blogPosting(a: { title: string; description: string; date: string; path: string; lang?: "en" | "id" }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: a.lang ?? "en",
    mainEntityOfPage: abs(a.path),
    url: abs(a.path),
    image: abs(`${a.path}/opengraph-image`),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
