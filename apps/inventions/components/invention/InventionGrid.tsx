import { InventionCard } from "./InventionCard";
import { INVENTIONS, inventionNumber, type Invention } from "@/content/inventions";
import type { Copy } from "@/content/i18n/en";

/**
 * Live inventions as large cards (two per row on desktop), lab inventions as smaller cards in a row
 * below. Scales to any number: `limit` caps the home page; /inventions shows all.
 */
export function InventionGrid({ t, limit }: { t: Copy; limit?: number }) {
  const all: Invention[] = limit ? INVENTIONS.slice(0, limit) : INVENTIONS;
  const live = all.filter((i) => i.status === "live");
  const lab = all.filter((i) => i.status === "lab");
  const labels = { live: t.inventions.live, lab: t.inventions.lab, explore: t.inventions.explore };
  return (
    <div className="igrid">
      <ul className="igrid-live">
        {live.map((inv) => (
          <li key={inv.slug}>
            <InventionCard inv={inv} number={inventionNumber(inv.slug)} labels={labels} />
          </li>
        ))}
      </ul>
      {lab.length > 0 && (
        <ul className="igrid-lab">
          {lab.map((inv) => (
            <li key={inv.slug}>
              <InventionCard inv={inv} number={inventionNumber(inv.slug)} labels={labels} size="sm" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
