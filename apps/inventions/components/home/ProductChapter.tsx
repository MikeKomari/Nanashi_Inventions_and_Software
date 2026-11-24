import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/scroll/Parallax";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import type { Copy, ProductCopy } from "@/content/i18n/en";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One live product as a full chapter (D-13, refined): name in its accent, one line, status, "Try"
 * and "Read more"; a big real screenshot with the phone capture floating in front; then numbered
 * points drawn from its README, alternating sides, each with its own screenshot drifting slower
 * than the text (parallax). The accent only colours labels, edges and glows.
 */
export function ProductChapter({
  t,
  product,
  index,
  total,
  href,
}: {
  t: Copy;
  product: ProductCopy;
  index: number;
  total: number;
  href: string;
}) {
  const titleId = `${product.id}-title`;
  return (
    <section id={product.id} className="chapter" data-accent={product.id} aria-labelledby={titleId}>
      <Reveal className="chapter-head wrap">
        <p className="eyebrow">
          <span>{pad(index)}</span>
          <span className="eyebrow-rule" aria-hidden="true" />
          <span>{pad(total)}</span>
          <span className="eyebrow-sep" aria-hidden="true">
            ·
          </span>
          <span>{product.audience}</span>
        </p>
        <div className="chapter-head-grid">
          <h3 id={titleId} className="chapter-name">
            <Words text={product.name} />
          </h3>
          <div className="chapter-intro">
            <p className="chapter-line">{product.oneLiner}</p>
            <div className="chapter-meta">
              <span className="status">
                <span className="status-dot" aria-hidden="true" />
                {product.status}
              </span>
              <span className="chapter-traction">{t.inventions.traction}</span>
            </div>
            <div className="chapter-actions">
              <Magnetic>
                <a href={href} target="_blank" rel="noopener" className="btn-primary">
                  {product.tryLabel}
                  <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
                  <span className="sr-only">{t.inventions.newTab}</span>
                </a>
              </Magnetic>
              <Link href={`/inventions/${product.id}`} className="link-arrow">
                {product.readMore}
                <span className="sr-only"> about {product.name}</span>
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="chapter-hero wrap" amount={0.1}>
        <Parallax distance={90} className="chapter-hero-main">
          <Screenshot name={product.hero.desktop} sizes="(min-width: 1280px) 1180px, 92vw" />
        </Parallax>
        <Parallax distance={-160} className="chapter-hero-phone">
          <Screenshot name={product.hero.phone} frame="phone" sizes="240px" />
        </Parallax>
      </Reveal>

      <ol className="points wrap" aria-label={`${product.name}: ${t.inventions.pointsLabel}`}>
        {product.points.map((point, i) => (
          <li key={point.title}>
            <Reveal className={`point${i % 2 === 1 ? " point-flip" : ""}`} amount={0.25}>
              <div className="point-text">
                <p className="eyebrow" aria-hidden="true">
                  <span>{pad(i + 1)}</span>
                  <span className="eyebrow-rule" />
                  <span>{pad(product.points.length)}</span>
                </p>
                <h4 className="point-title">
                  <Words text={point.title} />
                </h4>
                <p className="point-body">{point.body}</p>
                <ul className="facts" aria-label={`${product.name} facts`}>
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
    </section>
  );
}
