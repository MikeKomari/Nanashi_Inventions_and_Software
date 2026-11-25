import type { Copy } from "@/content/i18n/en";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { InventionGrid } from "@/components/invention/InventionGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/seo";
import { lp } from "@/lib/i18n";

export function InventionsIndex({ t }: { t: Copy }) {
  return (
    <div className="inventions-page">
      <JsonLd data={breadcrumbs([["Nanashi", lp(t.locale, "/")], [t.inventions.pageTitle, lp(t.locale, "/inventions")]])} />
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
