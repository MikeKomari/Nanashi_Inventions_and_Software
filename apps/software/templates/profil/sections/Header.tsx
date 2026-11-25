import type { ProfilContent } from "../schema";
import { WaButton } from "../parts";
import { MobileMenu } from "../MobileMenu";

export type MenuLink = { href: string; label: string };

/**
 * Floating white pill: short name, up to four menu links (built from the sections that are on), and the
 * WhatsApp button. On phones the links move into a full-screen sheet.
 */
export function Header({ c, links, waHref }: { c: ProfilContent; links: MenuLink[]; waHref: string }) {
  const link = "inline-flex min-h-11 items-center px-1 text-[15px] hover:underline underline-offset-4";
  return (
    <header className="relative z-30 flex items-center justify-between gap-3 rounded-full bg-profil-panel py-1.5 pr-1.5 pl-5 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)]">
      <a href="#top" className="min-h-11 content-center text-lg font-extrabold tracking-tight">
        {c.person.short}
      </a>
      {links.length > 0 && (
        <nav aria-label={c.person.name} className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={link}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
      <div className="flex items-center gap-1.5">
        {/* Wrappers carry the breakpoints: the button itself is always inline-flex. */}
        <span className="hidden sm:contents">
          <WaButton href={waHref} size="sm">
            {c.cta.label}
          </WaButton>
        </span>
        <span className="contents sm:hidden">
          <WaButton href={waHref} size="sm">
            {c.cta.short}
          </WaButton>
        </span>
        {links.length > 0 && <MobileMenu links={links} label={c.labels.menu} close={c.labels.close} name={c.person.name} />}
      </div>
    </header>
  );
}
