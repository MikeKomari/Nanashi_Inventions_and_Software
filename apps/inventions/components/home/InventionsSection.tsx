import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { InventionGrid } from "@/components/invention/InventionGrid";
import { INVENTIONS } from "@/content/inventions";
import type { Copy } from "@/content/i18n/en";
import { lp } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

/** Home §5: the inventions as cards. Shows up to six; the rest live on /inventions. */
export function InventionsSection({ t }: { t: Copy }) {
  const i = t.inventions;
  const live = INVENTIONS.filter((x) => x.status === "live").length;
  return (
    <section id="inventions" className="inventions-section" aria-labelledby="inventions-title">
      <Reveal className="wrap inventions-head">
        <div>
          <p className="eyebrow">
            <span>{i.label}</span>
            <span className="eyebrow-sep" aria-hidden="true">·</span>
            <span>
              {pad(live)} {i.countLive} · {pad(INVENTIONS.length - live)} {i.countLab}
            </span>
          </p>
          <h2 id="inventions-title" className="section-title">
            <Words text={i.title} />
          </h2>
          <p className="section-lead">{i.lead}</p>
        </div>
        <Link href={lp(t.locale, "/inventions")} className="link-arrow">
          {i.all}
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </Reveal>
      <div className="wrap">
        <InventionGrid t={t} limit={6} />
      </div>
    </section>
  );
}
