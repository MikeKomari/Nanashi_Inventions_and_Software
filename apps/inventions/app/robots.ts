import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dev/"] }],
    // The Nanashi Software sitemap too: on the main domain /software is that app, behind a rewrite.
    sitemap: [abs("/sitemap.xml"), abs("/software/sitemap.xml")],
    host: abs("/"),
  };
}
