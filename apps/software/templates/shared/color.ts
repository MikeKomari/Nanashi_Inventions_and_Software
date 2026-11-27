// Colour helpers for "client colour safety": every text/background pair a template uses
// must reach WCAG AA contrast (4.5:1), whatever colours the client's content file brings.

export const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

/** WCAG minimum contrast for normal body text. */
export const MIN_CONTRAST = 4.5;

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance of a #RRGGBB colour (WCAG 2.x). */
export function luminance(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

/** Contrast ratio between two #RRGGBB colours, from 1 to 21. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** Mixes a #RRGGBB colour toward another by t (0 = a, 1 = b). */
export function mixHex(a: string, b: string, t: number): string {
  const x = Number.parseInt(a.slice(1), 16);
  const y = Number.parseInt(b.slice(1), 16);
  const ch = (shift: number) => Math.round(((x >> shift) & 255) * (1 - t) + ((y >> shift) & 255) * t);
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0").toUpperCase()}`;
}

/** White or near-black, whichever reads better on the colour. */
export function onColor(bg: string): string {
  return contrastRatio(bg, "#FFFFFF") >= contrastRatio(bg, "#111111") ? "#FFFFFF" : "#111111";
}

/**
 * Makes a visitor-picked accent safe: it must reach 4.5:1 on every colour in `against`, and the text on it
 * must too. Darkens step by step (mixing toward black); if that never gets there, lightens instead.
 */
export function readableAccent(accent: string, against: string[]): { accent: string; onAccent: string; adjusted: boolean } {
  const ok = (c: string) =>
    against.every((b) => contrastRatio(c, b) >= MIN_CONTRAST) && contrastRatio(c, onColor(c)) >= MIN_CONTRAST;
  const base = accent.toUpperCase();
  if (ok(base)) return { accent: base, onAccent: onColor(base), adjusted: false };
  for (const target of ["#000000", "#FFFFFF"]) {
    for (let step = 1; step <= 20; step++) {
      const c = mixHex(base, target, step / 20);
      if (ok(c)) return { accent: c, onAccent: onColor(c), adjusted: true };
    }
  }
  return { accent: base, onAccent: onColor(base), adjusted: false };
}
