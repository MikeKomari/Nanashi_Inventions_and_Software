import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Copy } from "@/content/i18n/en";
import { HeaderShrink } from "./HeaderShrink";
import { LangLink } from "./LangLink";
import { SoundToggle } from "@/components/motion/SoundToggle";

/**
 * Logo · Inventions · Engineering · About (true centre) · ID · small outlined "Nanashi Software" pill.
 * A three-column grid keeps the links centred on the page regardless of how wide the two sides are.
 * Full width and transparent at the top; a slim floating pill after scrolling (HeaderShrink).
 * Phones: logo and the Software pill on the first row, page links on a second row.
 * Founder decision (24 Nov 2026): the Software button is a small gold outline that fills on hover,
 * replacing W-08's solid high-contrast button. The full-width Software band stays the loud one.
 */
export function Header({ t }: { t: Copy }) {
  const id = t.locale === "id";
  const base = id ? "/id" : "";
  const link = "inline-flex min-h-11 items-center text-[15px] text-text-muted transition-colors hover:text-text";
  return (
    <>
      <HeaderShrink />
      <header className="site-header fixed inset-x-0 top-0 z-40" style={{ viewTransitionName: "site-header" }}>
        <div className="header-bar mx-auto grid max-w-[1240px] grid-cols-[1fr_auto] items-center gap-x-4 px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-8">
          <Link href={id ? "/id" : "/"} aria-label={t.nav.home} className="inline-flex min-h-11 items-center justify-self-start">
            <Image src="/brand/nanashi-horizontal-reversed.svg" alt="Nanashi" width={130} height={25} priority unoptimized className="h-[25px] w-auto" />
          </Link>
          <nav
            aria-label={t.nav.primary}
            className="header-links col-span-2 row-start-2 flex items-center gap-5 sm:col-span-1 sm:row-start-auto sm:gap-8"
          >
            <Link href={`${base}/inventions`} className={link}>{t.nav.inventions}</Link>
            {/* Engineering is English only (W-10). Not built yet: no prefetch, so no 404 noise. */}
            <Link href="/engineering" className={link}>{t.nav.engineering}</Link>
            <Link href={`${base}/about`} className={link}>{t.nav.about}</Link>
            <LangLink to={id ? "en" : "id"} ariaLabel={t.nav.switchAria} className={`${link} ml-auto min-w-11 justify-center font-mono text-[13px] tracking-[0.08em] sm:hidden`}>
              {t.nav.switchLabel}
            </LangLink>
          </nav>
          <div className="flex items-center gap-2 justify-self-end sm:gap-3">
            <SoundToggle onLabel={t.nav.soundOn} offLabel={t.nav.soundOff} />
            <LangLink to={id ? "en" : "id"} ariaLabel={t.nav.switchAria} className={`${link} hidden min-w-11 justify-center font-mono text-[13px] tracking-[0.08em] sm:inline-flex`}>
              {t.nav.switchLabel}
            </LangLink>
            {/* Plain <a>: /software is the separate Nanashi Software app behind a rewrite.
                The visible pill is 34px tall; the padding around it keeps a 44px touch target. */}
            <a href="/software" className="group inline-flex min-h-11 items-center">
              <span className="inline-flex h-[34px] items-center gap-1.5 rounded-full border border-star/70 px-3.5 text-[13px] font-medium text-text transition-colors group-hover:border-star group-hover:bg-star group-hover:text-on-star">
                {t.nav.softwareTarget}
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" className="text-star transition-colors group-hover:text-on-star" />
              </span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
