"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { counterpart, type Locale } from "@/lib/i18n";

/** A link to the current page in another language (falls back to that language's home). */
export function LangLink({ to, className, children, ariaLabel }: { to: Locale; className?: string; children: React.ReactNode; ariaLabel?: string }) {
  const pathname = usePathname() ?? "/";
  return (
    <Link href={counterpart(pathname, to)} hrefLang={to} lang={to} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}
