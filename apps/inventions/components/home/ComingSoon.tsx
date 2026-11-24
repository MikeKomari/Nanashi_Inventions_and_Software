import { Reveal } from "@/components/scroll/Reveal";
import type { Copy } from "@/content/i18n/en";

/** Studio and Home share one small row (D-13): a card each, no pages and no screenshots yet (W-03). */
export function ComingSoon({ t }: { t: Copy }) {
  const c = t.comingSoon;
  return (
    <Reveal as="div" className="wrap soon" labelledBy="soon-title">
      <div className="soon-head">
        <p className="eyebrow">{c.label}</p>
        <h3 id="soon-title" className="soon-title">
          {c.title}
        </h3>
      </div>
      <ul className="soon-list">
        {c.items.map((item) => (
          <li key={item.id} className="soon-card lift" data-accent={item.accent}>
            <span className="status status-soon">
              <span className="status-dot" aria-hidden="true" />
              {c.badge}
            </span>
            <h4 className="soon-name">{item.name}</h4>
            <p className="soon-line">{item.line}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
