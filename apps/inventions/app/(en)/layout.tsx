import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import { SITE_ORIGIN } from "@/lib/site";
import { COLOR } from "@/styles/tokens";
import { en as t } from "@/content/i18n/en";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "@/styles/site.css";

const sora = Sora({ subsets: ["latin"], weight: ["600"], variable: "--font-sora", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  icons: { icon: { url: "/brand/nanashi-symbol-small-color.svg", type: "image/svg+xml" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: COLOR.bg };

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-surface focus:px-3 focus:py-2">
          {t.nav.skip}
        </a>
        <Header t={t} switchHref="/id" />
        <main id="main">{children}</main>
        <SmoothScroll />
      </body>
    </html>
  );
}
