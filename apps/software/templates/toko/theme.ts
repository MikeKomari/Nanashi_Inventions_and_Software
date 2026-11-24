// Fonts and colours of the 04 Toko UMKM template. Anton (giant condensed headlines) and Outfit (text),
// loaded only where this module is imported: the toko demo route. Never Sora or Plus Jakarta Sans here.
import type { CSSProperties } from "react";
import { Anton, Outfit } from "next/font/google";
import type { TokoContent } from "./schema";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const tokoFontClassName = `${anton.variable} ${outfit.variable}`;

/** The client's colours as the CSS variables toko.css maps into its theme. */
export function tokoThemeStyle(c: TokoContent["colors"]): CSSProperties {
  return {
    "--toko-background": c.background,
    "--toko-text": c.text,
    "--toko-text-muted": c.textMuted,
    "--toko-panel": c.panel,
    "--toko-soft": c.soft,
    "--toko-hero": c.hero,
    "--toko-on-hero": c.onHero,
    "--toko-hero-text": c.heroText,
    "--toko-accent": c.accent,
    "--toko-on-accent": c.onAccent,
    "--toko-sticker": c.sticker,
    "--toko-on-sticker": c.onSticker,
    "--toko-band": c.band,
    "--toko-on-band": c.onBand,
  } as CSSProperties;
}
