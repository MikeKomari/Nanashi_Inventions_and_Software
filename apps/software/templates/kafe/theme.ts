// Fonts and colours of the 01 Kafe template. Fraunces (headings, wordmark) and Figtree (text),
// used only on the kafe demo route. Never Sora or Plus Jakarta Sans here.
import type { CSSProperties } from "react";
// preload: false — the bundler puts every template's @font-face in one shared CSS file, so preloading
// would make each demo download the other template's fonts too. Unused faces are never downloaded.
import { Figtree, Fraunces } from "next/font/google";
import type { KafeContent } from "./schema";

// Weight axis only: the SOFT and opsz axes would triple the font file (37 KB → 118 KB) and slow the hero.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", preload: false });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap", preload: false });

export const kafeFontClassName = `${fraunces.variable} ${figtree.variable}`;

/** The client's colours as the CSS variables kafe.css maps into its theme. */
export function kafeThemeStyle(colors: KafeContent["colors"]): CSSProperties {
  return {
    "--kafe-background": colors.background,
    "--kafe-text": colors.text,
    "--kafe-text-muted": colors.textMuted,
    "--kafe-panel": colors.panel,
    "--kafe-accent": colors.accent,
    "--kafe-on-accent": colors.onAccent,
    "--kafe-tag": colors.tag,
    "--kafe-on-tag": colors.onTag,
    "--kafe-band": colors.band,
    "--kafe-on-band": colors.onBand,
  } as CSSProperties;
}
