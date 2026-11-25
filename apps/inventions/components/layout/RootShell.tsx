import { JetBrains_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import type { Copy } from "@/content/i18n/en";
import { Header } from "@/components/layout/Header";
import { SoftwareBand } from "@/components/layout/SoftwareBand";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { TrackClicks } from "@/components/layout/TrackClicks";
import { JsonLd } from "@/components/seo/JsonLd";
import { organization } from "@/lib/seo";
import { Intro } from "@/components/motion/Intro";
import { PageTransitions } from "@/components/motion/PageTransitions";

const sora = Sora({ subsets: ["latin"], weight: ["600"], variable: "--font-sora", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains", display: "swap" });

/** The page shell shared by the English and Indonesian root layouts. */
export function RootShell({ t, children }: { t: Copy; children: React.ReactNode }) {
  return (
    <html lang={t.locale} className={`${sora.variable} ${jakarta.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      {/* Rendered by the root layouts (app/(en), app/(id)/id), where <head> is correct. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* js: scripts run. intro-on: play the preloader, once per visit, only when motion is allowed. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');try{if(!sessionStorage.getItem('nanashi-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-on');sessionStorage.setItem('nanashi-intro','1')}}catch(e){}})(document.documentElement)",
          }}
        />
      </head>
      <body>
        <Intro />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-surface focus:px-3 focus:py-2">
          {t.nav.skip}
        </a>
        <Header t={t} />
        <main id="main">{children}</main>
        <SoftwareBand t={t} />
        <Footer t={t} />
        <SmoothScroll />
        <PageTransitions />
        <TrackClicks />
        <JsonLd data={organization()} />
        {/* Cookieless page views and the two events above; no personal data (see /privacy). */}
        <Analytics />
      </body>
    </html>
  );
}
