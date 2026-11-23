import { HOSHI_D, KANJI_VIEWBOX, NANA_D } from "./kanji-paths";

/** 七星 · nana hoshi (B-07): the kanji drawn as SVG, the reading to its right in small muted text. */
export function NanaHoshi({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span lang="ja" className="sr-only">
        七星
      </span>
      <svg viewBox={KANJI_VIEWBOX} aria-hidden="true" className="h-[1.15em] w-[2.3em] text-text" fill="currentColor">
        <path d={NANA_D} />
        <path d={HOSHI_D} transform="translate(1000 0)" />
      </svg>
      <span className="font-mono text-[0.8em] tracking-[0.08em] text-text-muted">nana hoshi</span>
    </span>
  );
}
