import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { asset, SITE_ORIGIN } from "@/lib/site";
import { id as t } from "@/content/site/id";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { RevealObserver } from "@/components/site/RevealObserver";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import "@/styles/site.css";

const sora = Sora({ subsets: ["latin"], weight: ["600"], variable: "--font-sora", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  icons: { icon: { url: asset("/brand/nanashi-symbol-small-color.svg"), type: "image/svg+xml" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sora.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as running so scroll reveals may hide content until it is seen. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:rounded-sm focus:bg-surface focus:px-3 focus:py-2">
          {t.nav.skip}
        </a>
        <Header t={t} switchHref="/en" />
        <main id="main">{children}</main>
        <Footer t={t} />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
