import { ColorWashText } from "@/components/scroll/ColorWashText";
import type { Copy } from "@/content/i18n/en";

/**
 * What Nanashi is (B-02, B-04), as one large paragraph whose words wash from muted to full text
 * colour as it rises into view; the product names wash into their own accents.
 */
export function Statement({ t }: { t: Copy }) {
  return (
    <section className="statement wrap" aria-labelledby="statement-title">
      <h2 id="statement-title" className="eyebrow statement-label">
        {t.statement.label}
      </h2>
      <p className="statement-text">
        <ColorWashText text={t.statement.text} to="var(--color-text)" highlights={t.statement.highlights} spread={5} />
      </p>
    </section>
  );
}
