import type { Copy } from "@/content/i18n/en";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/seo";
import { lp } from "@/lib/i18n";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { RichText } from "@/components/ui/RichText";

/** Privacy (W-13): short and plain. Cookieless analytics, no accounts, no forms. */
export function PrivacyPage({ t }: { t: Copy }) {
  const p = t.privacy;
  return (
    <div className="privacy">
      <JsonLd data={breadcrumbs([["Nanashi", lp(t.locale, "/")], [t.privacy.label, lp(t.locale, "/privacy")]])} />
      <Reveal className="wrap">
        <p className="eyebrow">{p.label}</p>
        <h1 className="section-title">
          <Words text={p.title} />
        </h1>
        <p className="section-lead">{p.lead}</p>
        <p className="art-meta">{p.updated}</p>
      </Reveal>
      <div className="wrap">
        <div className="privacy-body">
        {p.sections.map((s) => (
          <section key={s.title} className="privacy-section">
            <h2 className="istory-title">{s.title}</h2>
            <p className="istory-text">
              <RichText value={s.body} />
            </p>
          </section>
        ))}
        </div>
      </div>
    </div>
  );
}
