import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import { inventionNumber, liveInventions, type LiveInvention } from "@/content/inventions";
import type { Copy } from "@/content/i18n/en";
import { lp, type Locale } from "@/lib/i18n";
import { getArticle, localArticle } from "@/content/engineering";
import { Points } from "./Points";
import { InspectorDemo } from "./InspectorDemo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs, softwareApplication } from "@/lib/seo";

/**
 * One live invention (W-05, D-15): hero with the name in its accent → where the name comes from →
 * the demo video → the story (problem → what it does → under the hood → result) → numbered points →
 * real screenshots → traction → its Engineering deep dive → next invention.
 */
const DATE_LOCALE = { en: "en-GB", id: "id-ID" } as const;

/** The deep dive's title in the page's language (the article holds both versions). */
function engineeringTitle(e: { slug: string; title: string }, locale: Locale) {
  const a = getArticle(e.slug);
  return a ? localArticle(a, locale).title : e.title;
}

export function InventionPage({ t, inv }: { t: Copy; inv: LiveInvention }) {
  const c = t.invention;
  const all = liveInventions(t.locale);
  const next = all[(all.findIndex((i) => i.slug === inv.slug) + 1) % all.length]!;
  const date = (iso: string) =>
    new Date(iso).toLocaleDateString(DATE_LOCALE[t.locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const story = [
    ["problem", inv.story.problem],
    ["whatItDoes", inv.story.whatItDoes],
    ["underTheHood", inv.story.underTheHood],
    ["result", inv.story.result],
  ] as const;
  return (
    <article className="ipage" data-accent={inv.accent}>
      <JsonLd
        data={[
          softwareApplication({
            name: inv.name,
            description: inv.oneLiner,
            url: inv.url,
            page: lp(t.locale, `/inventions/${inv.slug}`),
            category: inv.category,
          }),
          breadcrumbs([
            ["Nanashi", lp(t.locale, "/")],
            [t.inventions.pageTitle, lp(t.locale, "/inventions")],
            [inv.name, lp(t.locale, `/inventions/${inv.slug}`)],
          ]),
        ]}
      />
      {/* Hero */}
      <header className="ipage-hero wrap">
        <Link href={lp(t.locale, "/inventions")} className="link-quiet ipage-back" data-morph>
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          {c.back}
        </Link>
        <div className="ipage-hero-grid">
          <div className="min-w-0">
        <p className="eyebrow">
          <span>{inventionNumber(inv.slug)}</span>
          <span className="eyebrow-rule" aria-hidden="true" />
          <span>{inv.audience}</span>
        </p>
        <h1 className="ipage-name vt-name" style={{ "--vt-name": `inv-name-${inv.slug}` } as React.CSSProperties}>
          <Words text={inv.name} />
        </h1>
        <p className="ipage-line">{inv.oneLiner}</p>
        <div className="ipage-meta">
          <span className="status">
            <span className="status-dot" aria-hidden="true" />
            {t.inventions.live}
          </span>
          <Magnetic>
            <a href={inv.url} target="_blank" rel="noopener" className="btn-primary" data-track="try_product" data-product={inv.slug}>
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
          </div>
          {/* The same screenshot as the invention's card, so the card morph has somewhere to land. */}
          <Screenshot
            name={inv.cover}
            eager
            sizes="(min-width: 1024px) 560px, 92vw"
            className="ipage-shot vt-shot"
            style={{ "--vt-shot": `inv-shot-${inv.slug}` } as React.CSSProperties}
          />
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
        {inv.liveDemo === "chromiq-inspector" && (
          <div className="idemo-try">
            <Reveal>
              <p className="eyebrow">{c.liveDemo.label}</p>
              <h2 className="ipage-h2">
                <Words text={c.liveDemo.title} />
              </h2>
              <p className="section-lead">{c.liveDemo.lead}</p>
            </Reveal>
            <InspectorDemo
              labels={c.liveDemo}
              endpoint={`${new URL(inv.url).origin}/api/inspect`}
              appUrl={inv.url}
              locale={t.locale}
              newTab={t.inventions.newTab}
            />
          </div>
        )}
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

      {/* What's new */}
      {inv.changelog && inv.changelog.length > 0 && (
        <section className="ipage-section wrap" aria-labelledby="changelog-title">
          <Reveal>
            <p className="eyebrow">{c.changelogLabel}</p>
            <h2 id="changelog-title" className="ipage-h2">
              <Words text={c.changelogTitle} />
            </h2>
          </Reveal>
          <ol className="ichangelog">
            {inv.changelog.map((e) => (
              <li key={e.date + e.title}>
                <Reveal className="ichangelog-item" amount={0.3}>
                  <time className="ichangelog-date" dateTime={e.date}>
                    {date(e.date)}
                  </time>
                  <h3 className="ichangelog-title">{e.title}</h3>
                  <p className="ichangelog-body">{e.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Traction + engineering + next */}
      <section className="ipage-section wrap ipage-end">
        <Reveal className="iend-card">
          <p className="eyebrow">{c.tractionLabel}</p>
          <p className="iend-text">{t.inventions.traction}</p>
        </Reveal>
        {inv.engineering && (
          <Reveal className="iend-card lift">
            <p className="eyebrow">{c.engineeringLabel}</p>
            <Link href={lp(t.locale, `/engineering/${inv.engineering.slug}`)} className="iend-link">
              {engineeringTitle(inv.engineering, t.locale)}
            </Link>
          </Reveal>
        )}
        {next.slug !== inv.slug && (
          <Reveal className="iend-card lift" accent={next.accent}>
            <p className="eyebrow">{c.next}</p>
            <Link href={lp(t.locale, `/inventions/${next.slug}`)} className="iend-link iend-next">
              {next.name}
              <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
            </Link>
          </Reveal>
        )}
      </section>
    </article>
  );
}
