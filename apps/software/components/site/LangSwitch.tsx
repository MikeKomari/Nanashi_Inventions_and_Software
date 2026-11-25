"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { counterpart, type Locale } from "@/lib/i18n";

/** Switches to the same page in the other language. usePathname() excludes the /software basePath. */
export function LangSwitch({ to, label, ariaLabel, className }: { to: Locale; label: string; ariaLabel: string; className: string }) {
  const pathname = usePathname();
  return (
    <Link href={counterpart(pathname, to)} hrefLang={to} lang={to} aria-label={ariaLabel} className={className}>
      {label}
    </Link>
  );
}
