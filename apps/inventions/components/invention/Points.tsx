import { Parallax } from "@/components/scroll/Parallax";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import type { LiveInvention } from "@/content/inventions";

const pad = (n: number) => String(n).padStart(2, "0");

/** Numbered points, alternating sides, each with its own screenshot drifting slower than the text. */
export function Points({ inv, label }: { inv: LiveInvention; label: string }) {
  return (
    <ol className="points wrap" aria-label={`${inv.name}: ${label}`}>
      {inv.points.map((point, i) => (
        <li key={point.title}>
          <Reveal className={`point${i % 2 === 1 ? " point-flip" : ""}`} amount={0.25}>
            <div className="point-text">
              <p className="eyebrow" aria-hidden="true">
                <span>{pad(i + 1)}</span>
                <span className="eyebrow-rule" />
                <span>{pad(inv.points.length)}</span>
              </p>
              <h3 className="point-title">
                <Words text={point.title} />
              </h3>
              <p className="point-body">{point.body}</p>
              <ul className="facts" aria-label={`${inv.name} facts`}>
                {point.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
            <Parallax distance={70} className={`point-media${point.frame === "phone" ? " point-media-phone" : ""}`}>
              <Screenshot
                name={point.screen}
                frame={point.frame ?? "desktop"}
                sizes={point.frame === "phone" ? "(min-width: 1024px) 300px, 60vw" : "(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 92vw"}
              />
            </Parallax>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
