import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Copy } from "@/content/i18n/en";
import { HeaderShrink } from "./HeaderShrink";

/**
 * Logo · Inventions · Engineering · About · EN/ID · gold "Need a website? → Nanashi Software" (D-17, W-08).
 * Full width and transparent at the top; a slim floating pill after scrolling (HeaderShrink).
 * Phones: logo and the gold button on the first row, page links on a second row.
 * Links to pages that are not built yet use prefetch={false} so they do not log 404s; turn
 * prefetch back on once those pages exist.
 */
export function Header({ t, switchHref }: { t: Copy; switchHref: string }) {
  const id = t.locale === "id";
  const base = id ? "/id" : "";
  const link = "inline-flex min-h-11 items-center text-[15px] text-text-muted transition-colors hover:text-text";
  return (
    <>
      <HeaderShrink />
      <header className="site-header fixed inset-x-0 top-0 z-40">
        <div className="header-bar mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 px-4 sm:px-8">
          <Link href={id ? "/id" : "/"} aria-label={t.nav.home} className="inline-flex min-h-11 shrink-0 items-center">
            <Image src="/brand/nanashi-horizontal-reversed.svg" alt="Nanashi" width={130} height={25} priority unoptimized className="h-[25px] w-auto" />
          </Link>
          <nav aria-label={t.nav.primary} className="header-links order-3 flex w-full items-center gap-5 sm:order-none sm:w-auto sm:gap-7">
            <Link prefetch={false} href={`${base}/inventions`} className={link}>{t.nav.inventions}</Link>
            {/* Engineering is English only (W-10). */}
            <Link prefetch={false} href="/engineering" className={link}>{t.nav.engineering}</Link>
            <Link prefetch={false} href={`${base}/about`} className={link}>{t.nav.about}</Link>
            <Link prefetch={false} href={switchHref} hrefLang={id ? "en" : "id"} aria-label={t.nav.switchAria} className={`${link} ml-auto min-w-11 justify-center font-mono text-[13px] tracking-[0.08em] sm:ml-0`}>
              {t.nav.switchLabel}
            </Link>
          </nav>
          {/* Plain <a>: /software is the separate Nanashi Software app behind a rewrite. */}
          <a
            href="/software"
            className="press inline-flex min-h-11 items-center gap-2 rounded-md bg-star px-4 text-[14px] font-semibold text-on-star"
          >
            <span>{t.nav.software}</span>
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            <span className="hidden md:inline">{t.nav.softwareTarget}</span>
          </a>
        </div>
      </header>
    </>
  );
}
