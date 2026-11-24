import { formatTime, formatWhatsAppDisplay } from "../../shared/format";
import type { Credit } from "../../shared/kind";
import type { KafeContent } from "../schema";
import { container } from "../parts";

export function Footer({ c, orderHref, credit }: { c: KafeContent; orderHref: string; credit?: Credit }) {
  const { business, labels } = c;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-kafe-text/15">
      <div className={`${container} grid gap-8 py-12 sm:grid-cols-[1.4fr_1fr_1fr]`}>
        <div>
          <p className="font-kafe-display text-[28px] leading-none font-semibold">{business.name}</p>
          {c.footer.note && <p className="mt-3 max-w-[22rem] text-kafe-muted">{c.footer.note}</p>}
        </div>
        <div className="text-[15px]">
          <p className="font-semibold">{labels.address}</p>
          <address className="mt-2 text-kafe-muted not-italic">
            {business.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center text-kafe-muted underline decoration-kafe-text/30 underline-offset-4 hover:text-kafe-text"
          >
            {labels.whatsapp} {formatWhatsAppDisplay(business.whatsapp.number)}
          </a>
        </div>
        <div className="text-[15px]">
          <p className="font-semibold">{labels.hours}</p>
          <dl className="mt-2 text-kafe-muted">
            {business.hours.map((h) => (
              <div key={h.days}>
                <dt className="inline">{h.days}: </dt>
                <dd className="inline tabular-nums">
                  {formatTime(h.opens)}–{formatTime(h.closes)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-kafe-text/15 py-4 text-sm text-kafe-muted`}>
        <p>
          © {year} {business.name}
        </p>
        {credit && (
          <a href={credit.href} className="inline-flex min-h-11 items-center underline decoration-kafe-text/30 underline-offset-4 hover:text-kafe-text">
            {credit.label}
          </a>
        )}
      </div>
    </footer>
  );
}
