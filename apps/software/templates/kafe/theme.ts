// Fonts and colours of the 01 Kafe template. Fraunces (headings, wordmark) and Figtree (text),
// loaded only where this module is imported: the demo route. Never Sora or Plus Jakarta Sans here.
import type { CSSProperties } from "react";
import { Figtree, Fraunces } from "next/font/google";
import type { KafeContent } from "./schema";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

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
