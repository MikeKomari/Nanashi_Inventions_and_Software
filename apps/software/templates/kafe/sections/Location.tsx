import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { formatTime } from "../../shared/format";
import type { KafeContent } from "../schema";
import { container, SectionHead } from "../parts";

/** Address, opening hours and a map button. No embedded map (a placeholder panel stands in for it). */
export function Location({ c }: { c: KafeContent }) {
  const { business, labels, location } = c;
  return (
    <section id="lokasi" aria-labelledby="lokasi-title" className={`${container} pb-16 sm:pb-24`}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead tag={location.tag} title={location.title} id="lokasi-title" />
          <div className="mt-8 grid gap-8 sm:grid-cols-2" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <div>
              <h3 className="flex items-center gap-2 font-kafe-body text-sm font-semibold tracking-[0.06em] text-kafe-muted uppercase">
                <MapPin size={16} strokeWidth={2} aria-hidden="true" />
                {labels.address}
              </h3>
              <address className="mt-3 text-[17px] not-italic">
                {business.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-kafe-body text-sm font-semibold tracking-[0.06em] text-kafe-muted uppercase">
                <Clock size={16} strokeWidth={2} aria-hidden="true" />
                {labels.hours}
              </h3>
              <dl className="mt-3 text-[17px]">
                {business.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 sm:block">
                    <dt>{h.days}</dt>
                    <dd className="text-kafe-muted tabular-nums sm:mb-2">
                      {formatTime(h.opens)}–{formatTime(h.closes)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          {location.notes.length > 0 && (
            <ul className="mt-8 space-y-1.5 text-[15px] text-kafe-muted" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              {location.notes.map((n) => (
                <li key={n} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-kafe-accent" />
                  {n}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div data-reveal style={{ "--i": 1 } as React.CSSProperties} className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-kafe bg-kafe-panel p-8 text-center">
          {/* Placeholder for a map: a quiet street grid drawn in the text colour. */}
          <svg aria-hidden="true" className="absolute inset-0 size-full text-kafe-text opacity-[0.12]" preserveAspectRatio="none" viewBox="0 0 400 300">
            <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
              <path d="M-20 90 C 120 70, 240 120, 420 80" />
              <path d="M-20 220 C 140 200, 260 250, 420 210" />
              <path d="M120 -20 C 110 100, 150 200, 130 320" />
              <path d="M290 -20 C 300 120, 270 200, 300 320" />
            </g>
          </svg>
          <span className="relative grid size-14 place-items-center rounded-full bg-kafe-accent text-kafe-on-accent shadow-[0_12px_24px_-12px_rgb(0_0_0/0.5)]">
            <MapPin size={26} strokeWidth={2} aria-hidden="true" />
          </span>
          <p className="relative mt-4 font-kafe-display text-2xl">{business.name}</p>
          <p className="relative mt-1 text-kafe-muted">{business.address.lines[0]}</p>
          <a
            href={business.address.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="kafe-lift relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-kafe-accent bg-kafe-bg px-6 text-[15px] font-semibold text-kafe-accent"
          >
            {labels.openMap}
            <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
