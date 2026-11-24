import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { CONTACT } from "@/lib/site";
import type { Copy } from "@/content/i18n/en";

/** The closing call to action (W-01): try a product, or email Nanashi. */
export function Close({ t }: { t: Copy }) {
  return (
    <Reveal as="section" className="close wrap" labelledBy="close-title">
      <div aria-hidden="true" className="close-glow" />
      <h2 id="close-title" className="close-title">
        <Words text={t.close.title} />
      </h2>
      <p className="close-body">{t.close.body}</p>
      <div className="close-actions">
        {t.products.map((p) => (
          <Magnetic key={p.id}>
            <a href={t.links[p.id]} target="_blank" rel="noopener" className="btn-primary">
              {p.tryLabel}
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              <span className="sr-only">{t.inventions.newTab}</span>
            </a>
          </Magnetic>
        ))}
        <a href={`mailto:${CONTACT.email}`} className="btn-ghost">
          {t.close.email}
        </a>
      </div>
    </Reveal>
  );
}
