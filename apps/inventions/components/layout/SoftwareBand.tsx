import { ArrowRight } from "lucide-react";
import type { Copy } from "@/content/i18n/en";

/**
 * The Nanashi Software band above the footer on every page (W-08): a light, high-contrast band
 * (text colour background, night text) with a violet button to /software. Plain <a>: /software
 * is the separate Nanashi Software app behind a rewrite.
 */
export function SoftwareBand({ t }: { t: Copy }) {
  const b = t.softwareBand;
  return (
    <section className="band" aria-labelledby="band-title">
      <div className="band-inner">
        <div>
          <p className="band-label">{b.label}</p>
          <h2 id="band-title" className="band-title">
            {b.title}
          </h2>
          <p className="band-body">{b.body}</p>
        </div>
        <a href="/software" className="band-cta">
          {b.cta}
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
