import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/site";
import type { SiteCopy } from "@/content/site/id";
import { href } from "@/lib/i18n";
import { LangSwitch } from "./LangSwitch";

/** Logo, two page links and the language switch. Fits a 375px phone without a menu button. */
export function Header({ t }: { t: SiteCopy }) {
  const link = "inline-flex min-h-11 items-center px-1 text-[14px] sm:text-[15px] font-medium text-text-muted hover:text-text";
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-2 sm:px-8">
        <Link href={href("home", t.locale)} className="press shrink-0" aria-label={t.nav.homeAria}>
          <Image src={asset("/brand/nanashi-horizontal-color.svg")} alt="Nanashi" width={145} height={28} priority unoptimized className="h-6 w-auto sm:h-7" />
        </Link>
        <nav aria-label={t.nav.primary} className="flex items-center gap-2 sm:gap-6">
          <Link href={href("templates", t.locale)} className={link}>
            {t.nav.templates}
          </Link>
          <Link href={href("about", t.locale)} className={link}>
            {t.nav.about}
          </Link>
          <LangSwitch to={t.locale === "id" ? "en" : "id"} label={t.nav.switchLabel} ariaLabel={t.nav.switchAria} className={`${link} rounded-sm border border-border px-2 font-semibold text-text`} />
        </nav>
      </div>
    </header>
  );
}
