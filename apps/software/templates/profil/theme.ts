// Fonts and colours of the 06 Profil Pribadi template. Bricolage Grotesque only (800 for the name and
// titles, 500 for everything else), used only on the profil demo route. Never Sora or Plus Jakarta Sans here.
import type { CSSProperties } from "react";
// preload: false — see toko/theme.ts: every template's @font-face lands in one shared CSS file.
import { Bricolage_Grotesque } from "next/font/google";
import type { ProfilContent } from "./schema";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "800"],
  variable: "--font-bricolage",
  display: "swap",
  preload: false,
});

export const profilFontClassName = bricolage.variable;

/** The client's colours as the CSS variables profil.css maps into its theme. */
export function profilThemeStyle(c: ProfilContent["colors"]): CSSProperties {
  return {
    "--profil-background": c.background,
    "--profil-text": c.text,
    "--profil-text-muted": c.textMuted,
    "--profil-panel": c.panel,
    "--profil-accent": c.accent,
    "--profil-on-accent": c.onAccent,
  } as CSSProperties;
}
