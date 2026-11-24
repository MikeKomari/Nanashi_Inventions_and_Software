import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Words } from "@/components/scroll/Reveal";
import type { Copy } from "@/content/i18n/en";

/** Home §5: the first two Engineering deep dives (W-06, W-14). The article pages come later.
 * Links to pages that are not built yet use prefetch={false} so they do not log 404s; turn
 * prefetch back on once those pages exist.
 */
export function Engineering({ t }: { t: Copy }) {
  const e = t.engineering;
  return (
    <section id="engineering" className="engineering" aria-labelledby="engineering-title">
      <Reveal className="wrap">
        <p className="eyebrow">{e.label}</p>
        <h2 id="engineering-title" className="section-title">
          <Words text={e.title} />
        </h2>
        <p className="section-lead">{e.lead}</p>
      </Reveal>
      <ul className="wrap articles">
        {e.articles.map((a, i) => (
          <li key={a.slug}>
            <Reveal className="article lift" accent={a.accent}>
              <p className="article-meta">
                <span className="article-index">{String(i + 1).padStart(2, "0")}</span>
                <span>{a.product}</span>
                <span aria-hidden="true">·</span>
                <span>{a.topic}</span>
              </p>
              <h3 className="article-title">
                <Link prefetch={false} href={`/engineering/${a.slug}`} className="article-link">
                  {a.title}
                </Link>
              </h3>
              <p className="article-summary">{a.summary}</p>
              <p className="article-cta" aria-hidden="true">
                {e.read}
                <ArrowRight size={16} strokeWidth={2} />
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
