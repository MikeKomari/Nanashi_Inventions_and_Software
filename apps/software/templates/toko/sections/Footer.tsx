import { formatWhatsAppDisplay } from "../../shared/format";
import type { Credit } from "../../shared/kind";
import type { TokoContent } from "../schema";
import { container } from "../parts";

export function Footer({ c, orderHref, credit }: { c: TokoContent; orderHref: string; credit?: Credit }) {
  const link = "inline-flex min-h-11 items-center hover:underline underline-offset-4";
  return (
    <footer className="border-t-2 border-toko-text">
      <div className={`${container} grid gap-10 py-12 sm:grid-cols-[1.4fr_1fr_1fr]`}>
        <div>
          <p className="toko-display text-4xl text-toko-text">{c.business.name}</p>
          <p className="mt-2 max-w-sm text-toko-muted">{c.business.tagline}</p>
          {c.footer.note && <p className="mt-2 max-w-sm text-sm text-toko-muted">{c.footer.note}</p>}
        </div>
        <nav aria-label={c.business.name}>
          <ul>
            <li><a href="#produk" className={link}>{c.labels.nav.products}</a></li>
            <li><a href="#cerita" className={link}>{c.labels.nav.story}</a></li>
            <li><a href="#cara-pesan" className={link}>{c.labels.nav.howTo}</a></li>
          </ul>
        </nav>
        <ul>
          <li>
            <a href={orderHref} target="_blank" rel="noopener noreferrer" className={link}>
              {c.labels.whatsapp} {formatWhatsAppDisplay(c.business.whatsapp.number)}
            </a>
          </li>
          {c.business.instagram && (
            <li>
              <a href={c.business.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                {c.labels.instagram} ↗
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className={`${container} flex flex-wrap justify-between gap-3 border-t border-toko-muted/40 py-5 text-sm text-toko-muted`}>
        <span>© {new Date().getFullYear()} {c.business.name}</span>
        {credit && (
          <a href={credit.href} className="underline underline-offset-4">
            {credit.label}
          </a>
        )}
      </div>
    </footer>
  );
}
