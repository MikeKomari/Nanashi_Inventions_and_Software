import { Reveal, Words } from "@/components/scroll/Reveal";
import type { Copy } from "@/content/i18n/en";
import { ComingSoon } from "./ComingSoon";
import { ProductChapter } from "./ProductChapter";

/** Home §3: one full chapter per live product (Chromiq, then Lexi), then the "Coming soon" row. */
export function Inventions({ t }: { t: Copy }) {
  return (
    <section id="inventions" className="inventions" aria-labelledby="inventions-title">
      <Reveal className="wrap inventions-head">
        <p className="eyebrow">{t.inventions.label}</p>
        <h2 id="inventions-title" className="section-title">
          <Words text={t.inventions.title} />
        </h2>
        <p className="section-lead">{t.inventions.lead}</p>
      </Reveal>
      {t.products.map((product, i) => (
        <ProductChapter key={product.id} t={t} product={product} index={i + 1} total={t.products.length} href={t.links[product.id]} />
      ))}
      <ComingSoon t={t} />
    </section>
  );
}
