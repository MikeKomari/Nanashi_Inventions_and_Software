import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/site";
import type { SiteCopy } from "@/content/site/id";

/** Logo, two page links and the language switch. Fits a 375px phone without a menu button. */
export function Header({ t, switchHref }: { t: SiteCopy; switchHref: string }) {
  const link = "inline-flex min-h-11 items-center px-1 text-[14px] sm:text-[15px] font-medium text-text-muted hover:text-text";
  const home = t.locale === "id" ? "/" : "/en";
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-2 sm:px-8">
        <Link href={home} className="press shrink-0" aria-label="Nanashi Software, beranda">
          <Image src={asset("/brand/nanashi-horizontal-color.svg")} alt="Nanashi" width={145} height={28} priority unoptimized className="h-6 w-auto sm:h-7" />
        </Link>
        <nav aria-label="Utama" className="flex items-center gap-2 sm:gap-6">
          <Link href={t.locale === "id" ? "/template" : "/en/templates"} className={link}>
            {t.nav.templates}
          </Link>
          <Link href={t.locale === "id" ? "/tentang" : "/en/about"} className={link}>
            {t.nav.about}
          </Link>
          <Link href={switchHref} hrefLang={t.locale === "id" ? "en" : "id"} aria-label={t.nav.switchAria} className={`${link} rounded-sm border border-border px-2 font-semibold text-text`}>
            {t.nav.switchLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
