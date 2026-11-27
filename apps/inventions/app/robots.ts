import type { MetadataRoute } from "next";
import { abs, SOFTWARE_ON } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dev/"] }],
    // The Nanashi Software sitemap too, but only when /software is actually served here (a dead sitemap is an error in Search Console).
    sitemap: SOFTWARE_ON ? [abs("/sitemap.xml"), abs("/software/sitemap.xml")] : abs("/sitemap.xml"),
    host: abs("/"),
  };
}
