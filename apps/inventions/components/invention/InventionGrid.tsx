import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InventionCard, type CardSize } from "./InventionCard";
import { INVENTIONS, inventionNumber, type Invention } from "@/content/inventions";
import type { Copy } from "@/content/i18n/en";

/**
 * A bento grid (founder, 25 Nov 2026: a plain grid looked flat). The first live invention gets a
 * large 2x2 tile, the second a tall tile with its phone screenshot, further live ones and lab ones
 * regular tiles. On the home page (`limit`), an "All inventions" tile closes the grid. Phones: one
 * column. Scales to any number of inventions without changing the layout code.
 */
export function InventionGrid({ t, limit }: { t: Copy; limit?: number }) {
  const all: Invention[] = limit ? INVENTIONS.slice(0, limit) : INVENTIONS;
  const live = all.filter((i) => i.status === "live");
  const lab = all.filter((i) => i.status === "lab");
  const ordered = [...live, ...lab];
  const labels = { live: t.inventions.live, lab: t.inventions.lab, explore: t.inventions.explore };
  const sizeOf = (inv: Invention, i: number): CardSize =>
    inv.status === "lab" ? "sm" : i === 0 ? "hero" : i === 1 ? "tall" : "lg";
  return (
    <ul className="bento">
      {ordered.map((inv, i) => {
        const size = sizeOf(inv, i);
        return (
          <li key={inv.slug} className={`bento-${size}`}>
            <InventionCard inv={inv} number={inventionNumber(inv.slug)} labels={labels} size={size} />
          </li>
        );
      })}
      {limit && (
        <li className="bento-sm">
          <Link href="/inventions" className="bento-all">
            <span className="bento-all-sky" aria-hidden="true">
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i} style={{ "--i": i } as React.CSSProperties} />
              ))}
            </span>
            <span className="eyebrow">{t.inventions.label}</span>
            <span className="bento-all-title">
              {t.inventions.all}
              <ArrowRight size={22} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="bento-all-count">
              {String(live.length).padStart(2, "0")} {t.inventions.countLive} · {String(lab.length).padStart(2, "0")} {t.inventions.countLab}
            </span>
          </Link>
        </li>
      )}
    </ul>
  );
}
