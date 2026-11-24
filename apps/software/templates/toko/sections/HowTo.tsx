import { MapPin, Clock } from "lucide-react";
import { formatTime } from "../../shared/format";
import type { TokoContent } from "../schema";
import { container, Pill } from "../parts";

/** How ordering works (WhatsApp only), shipping notes, the shop's address and hours. */
export function HowTo({ c }: { c: TokoContent }) {
  return (
    <section id="cara-pesan" className="scroll-mt-4 bg-toko-soft py-16 sm:py-24" aria-labelledby="cara-judul">
      <div className={`${container} grid gap-12 lg:grid-cols-[1.4fr_1fr]`}>
        <div>
          <div data-reveal>
            <Pill>{c.howTo.tag}</Pill>
            <h2 id="cara-judul" className="toko-display toko-display-md mt-4 text-toko-text">
              {c.howTo.title}
            </h2>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {c.howTo.steps.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="rounded-toko-sm bg-toko-panel p-5">
                <span className="toko-display text-5xl text-toko-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-toko-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          {c.howTo.notes.length > 0 && (
            <ul className="mt-6 space-y-2 text-toko-muted" data-reveal>
              {c.howTo.notes.map((n) => (
                <li key={n} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-toko-text" />
                  {n}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col gap-6 rounded-toko-sm border-2 border-toko-text bg-toko-panel p-6 sm:p-8" data-reveal>
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase">
              <MapPin size={16} aria-hidden="true" /> {c.labels.address}
            </h3>
            <p className="mt-2">
              {c.business.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase">
              <Clock size={16} aria-hidden="true" /> {c.labels.hours}
            </h3>
            <dl className="mt-2 space-y-1">
              {c.business.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt>{h.days}</dt>
                  <dd className="tabular-nums">
                    {formatTime(h.opens)}–{formatTime(h.closes)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <a
            href={c.business.address.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="toko-lift mt-auto inline-flex min-h-12 items-center justify-center rounded-full border-2 border-toko-text px-5 font-semibold"
          >
            {c.labels.openMap} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
