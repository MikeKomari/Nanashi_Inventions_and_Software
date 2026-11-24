import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/scroll/Reveal";
import { FounderLinked } from "@/components/ui/RichText";
import { CONTACT } from "@/lib/site";
import type { Copy } from "@/content/i18n/en";

/** Home §7: the short founder line (B-05: Nanashi leads, the founder is the small credit). */
export function Founder({ t }: { t: Copy }) {
  const f = t.founder;
  return (
    <section className="founder" aria-label={f.label}>
      <Reveal className="wrap founder-inner">
        <p className="eyebrow">{f.label}</p>
        <p className="founder-text">
          <FounderLinked text={f.text} />
        </p>
        <p className="founder-body">{f.body}</p>
        <div className="founder-actions">
          <a href={`mailto:${CONTACT.email}`} className="btn-ghost">
            {f.email}
          </a>
          <Link href="/about" className="link-arrow">
            {f.about}
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
