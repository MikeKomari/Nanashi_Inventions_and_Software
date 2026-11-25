// Structured data (JSON-LD) for search engines. Only facts that are visible on the page.
import type { SiteCopy } from "@/content/site/id";
import { abs, CONTACT, FOUNDER, SITE_ORIGIN } from "./site";

const ORG_ID = `${abs("/")}#organization`;

/** Nanashi Software, part of Nanashi. */
export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Nanashi Software",
    url: abs("/"),
    logo: abs("/brand/nanashi-symbol-small-color.svg"),
    email: CONTACT.email,
    founder: { "@type": "Person", name: FOUNDER.name, url: FOUNDER.url },
    parentOrganization: { "@type": "Organization", name: "Nanashi", url: SITE_ORIGIN },
    contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: `+${CONTACT.whatsapp}`, availableLanguage: ["id", "en"] },
  };
}

/** The website-making service, as described on the home page. No prices: none are published yet. */
export function service(t: SiteCopy, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.meta.homeTitle.split(" | ")[0],
    description: t.meta.homeDescription,
    serviceType: t.locale === "id" ? "Pembuatan website" : "Website design and build",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Indonesia" },
    inLanguage: t.locale,
    url,
  };
}

/** The FAQ section, word for word. */
export function faqPage(t: SiteCopy) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: t.locale,
    mainEntity: t.faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}
