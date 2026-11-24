import Image from "next/image";
import Link from "next/link";
import { NanaHoshi } from "@/components/brand/NanaHoshi";
import { FounderLinked } from "@/components/ui/RichText";
import { CONTACT, SOCIAL } from "@/lib/site";
import type { Copy } from "@/content/i18n/en";

/**
 * Footer (D-17): logo with 七星 · nana hoshi, the page links, email, GitHub, LinkedIn,
 * "Founded by Michael Kimeison" (linked, founder rule) and the EN/ID switch.
 */
export function Footer({ t, switchHref }: { t: Copy; switchHref: string }) {
  const id = t.locale === "id";
  const base = id ? "/id" : "";
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href={id ? "/id" : "/"} aria-label={t.nav.home} className="inline-flex min-h-11 items-center">
            <Image src="/brand/nanashi-horizontal-reversed.svg" alt="Nanashi" width={146} height={28} unoptimized className="h-7 w-auto" />
          </Link>
          <p className="mt-4">
            <NanaHoshi className="text-[14px]" />
          </p>
          <p className="mt-4 text-text-muted">{f.tagline}</p>
          <p className="mt-1 text-text-muted">
            <FounderLinked text={f.founded} />
          </p>
        </div>
        <nav aria-label={f.pages} className="footer-col">
          <h2 className="footer-h">{f.pages}</h2>
          <ul>
            <li>
              <Link href={`${base}/inventions`} className="footer-link">{t.nav.inventions}</Link>
            </li>
            <li>
              <Link href="/engineering" className="footer-link">{t.nav.engineering}</Link>
            </li>
            <li>
              <Link href={`${base}/about`} className="footer-link">{t.nav.about}</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-col">
          <h2 className="footer-h">{f.contact}</h2>
          <ul>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="footer-link">{CONTACT.email}</a>
            </li>
            <li>
              <a href={SOCIAL.github} className="footer-link">GitHub</a>
            </li>
            <li>
              <a href={SOCIAL.linkedin} className="footer-link">LinkedIn</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h2 className="footer-h">{f.language}</h2>
          <ul>
            <li>
              <span className="footer-current" aria-current="true">{f.english}</span>
            </li>
            <li>
              <Link href={switchHref} hrefLang="id" lang="id" className="footer-link">{f.indonesian}</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-legal">© {new Date().getFullYear()} Nanashi</p>
    </footer>
  );
}
