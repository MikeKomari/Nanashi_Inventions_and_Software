import type { Metadata, Viewport } from "next";
import { asset, SITE_ORIGIN } from "@/lib/site";
import { en as t } from "@/content/site/en";
import { SiteShell } from "@/components/site/SiteShell";
import "@/styles/site.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  icons: { icon: { url: asset("/brand/nanashi-symbol-small-color.svg"), type: "image/svg+xml" } },
  openGraph: { siteName: "Nanashi Software", locale: "en_US", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

/** English root layout: /en, /en/templates, /en/about. */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell t={t}>{children}</SiteShell>;
}
