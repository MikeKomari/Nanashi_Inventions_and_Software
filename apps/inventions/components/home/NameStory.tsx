import Image from "next/image";
import { HOSHI_D, NANA_D } from "@/components/brand/kanji-paths";
import { Reveal, Words } from "@/components/scroll/Reveal";
import type { Copy } from "@/content/i18n/en";

/** One kanji drawn from the inlined Noto Sans JP outline (no CJK font is loaded). */
function Kanji({ d, label }: { d: string; label: string }) {
  return (
    <svg viewBox="0 280 1000 1000" role="img" aria-label={label} className="name-kanji" fill="currentColor">
      <path d={d} />
    </svg>
  );
}

/**
 * Home §2, the name (B-01, B-07): 七 nana "seven" + 星 hoshi "star" → "nana hoshi" → the "ho" falls
 * away → "nanashi". Then why seven stars matter (the Big Dipper, the principles) and the logo's star.
 * The collapse animates with transform and opacity only, when the block scrolls into view.
 */
export function NameStory({ t }: { t: Copy }) {
  const n = t.name;
  return (
    <section id="name" className="name" aria-labelledby="name-title">
      <div className="wrap name-grid">
        <Reveal className="name-intro">
          <p className="eyebrow">{n.label}</p>
          <h2 id="name-title" className="section-title">
            <Words text={n.title} />
          </h2>
          <p className="section-lead">{n.body}</p>
          <p className="name-note">{n.note}</p>
        </Reveal>

        <Reveal className="name-equation" amount={0.35}>
          <div className="name-words" lang="ja">
            <div className="name-word">
              <Kanji d={NANA_D} label={n.nana.kanji} />
              <p className="name-reading">{n.nana.reading}</p>
              <p className="name-meaning" lang="en">{n.nana.meaning}</p>
            </div>
            <span className="name-plus" aria-hidden="true">+</span>
            <div className="name-word">
              <Kanji d={HOSHI_D} label={n.hoshi.kanji} />
              <p className="name-reading">{n.hoshi.reading}</p>
              <p className="name-meaning" lang="en">{n.hoshi.meaning}</p>
            </div>
          </div>
          {/* "nana hoshi" → strike "ho" → "nanashi". Screen readers get the plain sentence. */}
          <p className="sr-only">nana hoshi becomes nanashi</p>
          <div className="name-collapse" aria-hidden="true">
            <p className="name-spoken">
              <span>nana</span> <span className="name-drop">ho</span>
              <span>shi</span>
            </p>
            <span className="name-arrow">↓</span>
            <p className="name-result">nanashi</p>
          </div>
          <div className="name-logo">
            <Image src="/brand/nanashi-symbol-reversed.svg" alt="" width={56} height={56} unoptimized className="size-14 shrink-0" />
            <p>{n.logo}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
