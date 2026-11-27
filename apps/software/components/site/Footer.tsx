import Link from "next/link";
import Image from "next/image";
import { asset, CONTACT, FOUNDER, INVENTIONS_HREF } from "@/lib/site";
import type { SiteCopy } from "@/content/site/id";
import { href } from "@/lib/i18n";
import { AUTOMATION } from "@/content/site/automation";
import { PRICING, PRICING_PAGE } from "@/content/site/pricing";

export function Footer({ t }: { t: SiteCopy }) {
  const link = "inline-flex min-h-11 items-center text-text-muted hover:text-text";
  const inline = "font-medium text-text underline decoration-border-strong underline-offset-4 hover:decoration-text";
  const inventions = t.locale === "id" ? "/id/inventions" : "/inventions";
  return (
    <footer className="border-t border-border bg-surface/70">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-8">
        <div className="max-w-sm">
          <Image src={asset("/brand/nanashi-horizontal-color.svg")} alt="Nanashi" width={145} height={28} unoptimized className="h-7 w-auto" />
          <p className="mt-4 text-text-muted">{t.footer.tagline}</p>
          <p className="mt-2 text-sm text-text-muted">
            {t.footer.partOf}{" "}
            <a href={FOUNDER.url} className="font-medium text-text underline decoration-border-strong underline-offset-4 hover:decoration-text">
              {FOUNDER.name}
            </a>
            .
          </p>
          {/* Plain <a>: the invention pages belong to the Inventions app at the domain root. */}
          <p className="mt-2 text-sm text-text-muted">
            {t.footer.builtBy}{" "}
            <a href={`${inventions}/chromiq`} className={inline}>CHROMIQ</a>{" "}
            {t.footer.builtByAnd}{" "}
            <a href={`${inventions}/lexi`} className={inline}>LEXI</a>.
          </p>
        </div>
        <nav aria-label={t.footer.pages}>
          <h2 className="font-sans text-xs font-semibold tracking-[0.06em] text-text uppercase">{t.footer.pages}</h2>
          <ul className="mt-2">
            <li><Link href={href("home", t.locale)} className={link}>{t.nav.home}</Link></li>
            <li><Link href={href("templates", t.locale)} className={link}>{t.nav.templates}</Link></li>
            <li><Link href={href("about", t.locale)} className={link}>{t.nav.about}</Link></li>
            <li><Link href={href("automation", t.locale)} className={link}>{AUTOMATION[t.locale].nav}</Link></li>
            {/* Hidden while the pricing page is a draft; Mike reviews it at its URL directly. */}
            {PRICING_PAGE.ready && <li><Link href={href("pricing", t.locale)} className={link}>{PRICING[t.locale].navLabel}</Link></li>}
            {/* Plain <a>: Nanashi Inventions is the domain root, outside this app's basePath. */}
            <li><a href={INVENTIONS_HREF} className={link}>{t.footer.inventions} ↗</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.06em] text-text uppercase">{t.footer.contact}</h2>
          <ul className="mt-2">
            <li><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp {CONTACT.whatsappDisplay}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className={`${link} break-all`}>{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-border px-4 py-5 text-sm text-text-muted sm:px-8">© 2026 Nanashi</div>
    </footer>
  );
}
