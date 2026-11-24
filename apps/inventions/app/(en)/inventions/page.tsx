import type { Metadata } from "next";
import { en as t } from "@/content/i18n/en";
import { abs } from "@/lib/site";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { InventionGrid } from "@/components/invention/InventionGrid";

export const metadata: Metadata = {
  title: t.meta.inventionsTitle,
  description: t.meta.inventionsDescription,
  alternates: { canonical: abs("/inventions") },
};

export default function InventionsPage() {
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
