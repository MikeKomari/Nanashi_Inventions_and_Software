import type { Metadata, Viewport } from "next";
import { SITE_ORIGIN } from "@/lib/site";
import { COLOR } from "@/styles/tokens";
import { id as t } from "@/content/i18n/id";
import { RootShell } from "@/components/layout/RootShell";
import "@/styles/site.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  icons: { icon: { url: "/brand/nanashi-symbol-small-color.svg", type: "image/svg+xml" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: COLOR.bg };

/** Indonesian pages (/id): their own root layout so <html lang="id">. */
export default function IndonesianLayout({ children }: { children: React.ReactNode }) {
  return <RootShell t={t}>{children}</RootShell>;
}
