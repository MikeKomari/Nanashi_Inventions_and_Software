import type { Copy } from "@/content/i18n/en";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { InventionGrid } from "@/components/invention/InventionGrid";

export function InventionsIndex({ t }: { t: Copy }) {
  return (
    <div className="inventions-page">
      <Reveal className="wrap">
        <p className="eyebrow">{t.inventions.label}</p>
        <h1 className="section-title">
          <Words text={t.inventions.pageTitle} />
        </h1>
        <p className="section-lead">{t.inventions.pageLead}</p>
      </Reveal>
      <div className="wrap inventions-page-grid">
        <InventionGrid t={t} />
      </div>
    </div>
  );
}
