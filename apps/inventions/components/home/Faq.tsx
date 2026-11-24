import { RichText } from "@/components/ui/RichText";
import type { Copy } from "@/content/i18n/en";

/**
 * The reading layer for investors and recruiters: plain answers, always visible, no reveal.
 * Every claim matches the products' own docs.
 */
export function Faq({ t }: { t: Copy }) {
  return (
    <section id="faq" className="faq wrap" aria-labelledby="faq-title">
      <h2 id="faq-title" className="faq-title">
        {t.faq.title}
      </h2>
      <dl className="faq-list">
        {t.faq.items.map(({ q, a }) => (
          <div key={q} className="faq-item">
            <dt className="faq-q">{q}</dt>
            <dd className="faq-a">
              <RichText value={a} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
