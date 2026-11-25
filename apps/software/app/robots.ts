import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

// Served at /software/robots.txt; on this app's own address /robots.txt redirects here (next.config.ts).
// On the main domain /robots.txt belongs to Nanashi Inventions, which lists this sitemap too.
// Demos are not disallowed: crawlers must be able to read their noindex tag.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: abs("/sitemap.xml") };
}
