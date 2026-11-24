import { Reveal, Words } from "@/components/scroll/Reveal";
import { FounderLinked } from "@/components/ui/RichText";
import type { Copy } from "@/content/i18n/en";

/** Home §4: how the lab works, the same for every invention. A line draws across the four steps. */
export function HowNanashiBuilds({ t }: { t: Copy }) {
  const h = t.how;
  return (
    <section id="how" className="how" aria-labelledby="how-title">
      <Reveal className="wrap">
        <p className="eyebrow">{h.label}</p>
        <h2 id="how-title" className="section-title">
          <Words text={h.title} />
        </h2>
        <p className="section-lead">
          <FounderLinked text={h.lead} />
        </p>
      </Reveal>
      <Reveal as="ol" className="wrap how-steps" amount={0.3}>
        {h.steps.map((s, i) => (
          <li key={s.title} className="how-step" style={{ "--i": i } as React.CSSProperties}>
            <span className="how-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="how-dot" aria-hidden="true" />
            <h3 className="how-title">{s.title}</h3>
            <p className="how-body">{s.body}</p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
