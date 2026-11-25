import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import type { SiteCopy } from "@/content/site/id";
import { organization } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RevealObserver } from "./RevealObserver";
import { SmoothScroll } from "./SmoothScroll";
import { TrackClicks } from "./TrackClicks";

const sora = Sora({ subsets: ["latin"], weight: ["600"], variable: "--font-sora", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

/** html and body for the Nanashi Software pages, shared by the Indonesian and English root layouts. */
export function SiteShell({ t, children }: { t: SiteCopy; children: React.ReactNode }) {
  return (
    <html lang={t.locale} className={`${sora.variable} ${jakarta.variable}`} suppressHydrationWarning>
      {/* This renders a ROOT layout (called from app/(site)/layout.tsx and app/(en)/en/layout.tsx), where <head> is correct. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Marks JS as running so scroll reveals may hide content until it is seen. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:rounded-sm focus:bg-surface focus:px-3 focus:py-2">
          {t.nav.skip}
        </a>
        <Header t={t} />
        <main id="main">{children}</main>
        <Footer t={t} />
        <RevealObserver />
        <SmoothScroll />
        <TrackClicks />
        <JsonLd data={organization()} />
        <Analytics />
      </body>
    </html>
  );
}
