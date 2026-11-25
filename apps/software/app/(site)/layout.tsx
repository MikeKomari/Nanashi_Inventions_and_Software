import type { Metadata, Viewport } from "next";
import { asset, SITE_ORIGIN } from "@/lib/site";
import { id as t } from "@/content/site/id";
import { SiteShell } from "@/components/site/SiteShell";
import "@/styles/site.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  icons: { icon: { url: asset("/brand/nanashi-symbol-small-color.svg"), type: "image/svg+xml" } },
  openGraph: { siteName: "Nanashi Software", locale: "id_ID", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

/** Indonesian (default) root layout: /, /template, /tentang. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell t={t}>{children}</SiteShell>;
}
