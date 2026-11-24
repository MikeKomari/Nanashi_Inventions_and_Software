import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Coffee, Croissant, Scissors, Store, UtensilsCrossed } from "lucide-react";
import { TEMPLATES, type TemplateEntry } from "@/templates/registry";
import type { SiteCopy } from "@/content/site/id";
import { asset } from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";

const ICONS = { Coffee, Croissant, Scissors, Store, UtensilsCrossed } as const;

/** Real screenshot of the live demo (made by `npm run screens`). */
function Screenshot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-surface-raised">
      <Image
        src={asset(src)}
        alt={alt}
        width={1200}
        height={750}
        sizes="(min-width: 1200px) 350px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
        className="block aspect-[16/10] h-auto w-full"
      />
    </div>
  );
}

/** Soft placeholder: no fake screenshot. Used for "Segera hadir" and until a demo screenshot exists. */
function Placeholder({ entry, note }: { entry: TemplateEntry; note: string }) {
  const Icon = ICONS[entry.icon];
  const ratio = entry.status === "soon" ? "aspect-[16/6] sm:aspect-[16/10]" : "aspect-[16/10]";
  return (
    <div className={`flex ${ratio} flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-border bg-surface-raised text-text-muted`}>
      <Icon size={28} strokeWidth={1.5} aria-hidden="true" className="ph-icon" />
      <span className="text-sm">{note}</span>
    </div>
  );
}

function TemplateCard({ entry, t, i }: { entry: TemplateEntry; t: SiteCopy; i: number }) {
  const loc = t.locale;
  const live = entry.status === "live";
  const name = entry.waName[loc];
  return (
    // The reveal sits on a wrapper so its slow, staggered transition never delays the card's hover lift.
    <div data-reveal style={{ "--i": i } as React.CSSProperties} className="bg-surface">
    <article className="lift flex h-full flex-col gap-4 bg-surface p-4 sm:p-6">
      {live && entry.demo?.screenshot ? (
        <Screenshot src={entry.demo.screenshot} alt={t.templates.previewAlt(name)} />
      ) : (
        <Placeholder entry={entry} note={live ? t.templates.previewPending : t.templates.soon} />
      )}
      <div className="flex items-center justify-between text-xs font-semibold tracking-[0.06em] uppercase">
        <span className="text-text-muted tabular-nums">{entry.number}</span>
        <span className={`rounded-full border px-2 py-0.5 ${live ? "border-success text-success" : "border-border text-text-muted"}`}>
          {live ? t.templates.live : t.templates.soon}
        </span>
      </div>
      <div>
        <h3 className="text-xl">{entry.title[loc]}</h3>
        <p className="mt-1 text-[15px] text-text-muted">{entry.blurb[loc]}</p>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
        {live && (
          <Link
            href={`/template/${entry.slug}`}
            className="press nudge inline-flex min-h-11 items-center gap-1 font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:text-primary-hover"
          >
            {t.templates.viewDemo}
            <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        )}
        <WhatsAppButton
          size="sm"
          where={entry.slug}
          message={live ? t.templates.orderMessage(name) : t.templates.askMessage(name)}
        >
          {live ? t.templates.order : t.templates.ask}
        </WhatsAppButton>
      </div>
    </article>
    </div>
  );
}

/** Numbered grid of the five templates, cells divided by hairlines (Pleurat "Themes"). */
export function TemplateGrid({ t }: { t: SiteCopy }) {
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {TEMPLATES.map((entry, i) => (
        <TemplateCard key={entry.number} entry={entry} t={t} i={i} />
      ))}
      <a href="#desain-khusus" data-reveal style={{ "--i": TEMPLATES.length } as React.CSSProperties} className="group flex flex-col justify-end gap-2 bg-surface-raised p-4 hover:bg-surface sm:p-6">
        <span className="font-display text-xl text-text">{t.templates.customTitle}</span>
        <span className="text-[15px] text-text-muted">{t.templates.customBody}</span>
        <span className="mt-2 inline-flex min-h-11 items-center gap-1 font-semibold text-primary">
          {t.templates.customLink}
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>
    </div>
  );
}
