import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import { inventionNumber, liveInventions, type LiveInvention } from "@/content/inventions";
import type { Copy } from "@/content/i18n/en";
import { Points } from "./Points";

/**
 * One live invention (W-05, D-15): hero with the name in its accent → where the name comes from →
 * the demo video → the story (problem → what it does → under the hood → result) → numbered points →
 * real screenshots → traction → its Engineering deep dive → next invention.
 */
export function InventionPage({ t, inv }: { t: Copy; inv: LiveInvention }) {
  const c = t.invention;
  const all = liveInventions();
  const next = all[(all.findIndex((i) => i.slug === inv.slug) + 1) % all.length]!;
  const story = [
    ["problem", inv.story.problem],
    ["whatItDoes", inv.story.whatItDoes],
    ["underTheHood", inv.story.underTheHood],
    ["result", inv.story.result],
  ] as const;
  return (
    <article className="ipage" data-accent={inv.accent}>
      {/* Hero */}
      <header className="ipage-hero wrap">
        <Link href="/inventions" className="link-quiet ipage-back">
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          {c.back}
        </Link>
        <p className="eyebrow">
          <span>{inventionNumber(inv.slug)}</span>
          <span className="eyebrow-rule" aria-hidden="true" />
          <span>{inv.audience}</span>
        </p>
        <h1 className="ipage-name">
          <Words text={inv.name} />
        </h1>
        <p className="ipage-line">{inv.oneLiner}</p>
        <div className="ipage-meta">
          <span className="status">
            <span className="status-dot" aria-hidden="true" />
            {t.inventions.live}
          </span>
          <Magnetic>
            <a href={inv.url} target="_blank" rel="noopener" className="btn-primary">
              {inv.tryLabel}
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
              <span className="sr-only">{t.inventions.newTab}</span>
            </a>
          </Magnetic>
        </div>
        <div className="ipage-stack">
          <p className="eyebrow">{c.stackLabel}</p>
          <ul aria-label={c.stackLabel}>
            {inv.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </header>

      {/* The name */}
      <section className="ipage-section wrap" aria-labelledby="name-title">
        <Reveal className="iname">
          <p className="eyebrow" id="name-title">
            {c.nameLabel}
          </p>
          {inv.meaning.letters ? (
            <ol className="iname-letters" aria-label={inv.meaning.teaser}>
              {inv.meaning.letters.map(([l, word], i) => (
                <li key={l + i} style={{ "--i": i } as React.CSSProperties}>
                  <span className="iname-letter" aria-hidden="true">
                    {l}
                  </span>
                  <span className="iname-word">{word}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="iname-teaser">{inv.meaning.teaser}</p>
          )}
          <p className="iname-body">{inv.meaning.body}</p>
        </Reveal>
      </section>

      {/* Demo */}
      <section className="ipage-section wrap" aria-labelledby="demo-title">
        <Reveal>
          <p className="eyebrow" id="demo-title">
            {c.demoLabel}
          </p>
          <figure className="idemo">
            <div className="idemo-frame">
              <video controls muted playsInline preload="metadata" poster={inv.video.poster} className="idemo-video" width={1280} height={800}>
                <source src={inv.video.src} type="video/mp4" />
                {c.videoFallback}
              </video>
            </div>
            <figcaption className="idemo-caption">{inv.video.caption}</figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Story */}
      <section className="ipage-section wrap" aria-labelledby="story-title">
        <Reveal>
          <p className="eyebrow" id="story-title">
            {c.storyLabel}
          </p>
        </Reveal>
        <ol className="istory">
          {story.map(([key, text], i) => (
            <li key={key}>
              <Reveal className="istory-item" amount={0.3}>
                <span className="istory-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="istory-title">{c.story[key]}</h2>
                <p className="istory-text">{text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Points */}
      <section className="ipage-points" aria-label={c.pointsLabel}>
        <Points inv={inv} label={c.pointsLabel} />
      </section>

      {/* Gallery */}
      <section className="ipage-section wrap" aria-labelledby="gallery-title">
        <Reveal>
          <p className="eyebrow">{c.galleryLabel}</p>
          <h2 id="gallery-title" className="ipage-h2">
            <Words text={c.galleryTitle} />
          </h2>
        </Reveal>
        <ul className="igallery">
          {inv.gallery.map((g) => (
            <li key={g.screen} className={g.frame === "phone" ? "igallery-phone" : "igallery-desktop"}>
              <Reveal amount={0.15}>
                <Screenshot name={g.screen} frame={g.frame ?? "desktop"} sizes={g.frame === "phone" ? "(min-width: 1024px) 260px, 45vw" : "(min-width: 1024px) 580px, 92vw"} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Traction + engineering + next */}
      <section className="ipage-section wrap ipage-end">
        <Reveal className="iend-card">
          <p className="eyebrow">{c.tractionLabel}</p>
          <p className="iend-text">{t.inventions.traction}</p>
        </Reveal>
        {inv.engineering && (
          <Reveal className="iend-card lift">
            <p className="eyebrow">{c.engineeringLabel}</p>
            <Link href={`/engineering/${inv.engineering.slug}`} className="iend-link">
              {inv.engineering.title}
            </Link>
          </Reveal>
        )}
        {next.slug !== inv.slug && (
          <Reveal className="iend-card lift" accent={next.accent}>
            <p className="eyebrow">{c.next}</p>
            <Link href={`/inventions/${next.slug}`} className="iend-link iend-next">
              {next.name}
              <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
            </Link>
          </Reveal>
        )}
      </section>
    </article>
  );
}
