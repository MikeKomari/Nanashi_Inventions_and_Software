// The live CHROMIQ inspector demo on /inventions/chromiq (components/invention/InspectorDemo.tsx).
// The demo calls CHROMIQ's own /api/inspect from the visitor's browser; CHROMIQ allows this site's
// origin (CHROMIQ_INSPECT_ORIGINS). When CHROMIQ can't answer, an example shows its saved result.
//
// Saved results are real: CHROMIQ's inspector extraction (lib/css-extract.ts) run on each site's
// production build of main on 27 Nov 2026. Headings are trimmed for display (repeats of the title
// dropped). Re-capture them if a site's look changes.

export type InspectResult = {
  url: string;
  title: string;
  headings: string[];
  colors: string[];
  tokens: Partial<Record<"paper" | "ink" | "muted" | "line" | "accent" | "displayFont" | "bodyFont" | "monoFont", string>> & {
    radius?: number;
  };
  clientRendered: boolean;
};

export const SAVED_AT = "2026-11-27";

export const EXAMPLES: { label: string; result: InspectResult }[] = [
  {
    label: "CHROMIQ",
    result: {
      url: "https://prism-gamma-three.vercel.app/",
      title: "CHROMIQ: design token workbench for CSS, Tailwind and shadcn/ui",
      headings: ["Start from a real site", "Tune the system, not the pixels"],
      colors: ["#8d97a8", "#2a2b30", "#dcdde4", "#8f72f5", "#1d1d21", "#17171a", "#0b0b0d", "#a585ff", "#e07a6b", "#7fa6e8", "#131316", "#e07bff"],
      tokens: { paper: "#0b0b0d", ink: "#dcdde4", muted: "#8d97a8", line: "#2a2b30", accent: "#8f72f5", displayFont: "Space Grotesk", bodyFont: "Inter", radius: 4 },
      clientRendered: false,
    },
  },
  {
    label: "Nanashi Software",
    result: {
      url: "https://nanashi-software.vercel.app/software",
      title: "Jasa Pembuatan Website untuk Kafe dan UMKM | Nanashi Software",
      headings: ["Website untuk kafe, warung, dan UMKM, biar pelanggan gampang menemukanmu.", "Ditemukan di Google", "Menu selalu yang terbaru"],
      colors: ["#ffffff", "#1f1a2b", "#7b768c", "#6a3bc6", "#e0dde8", "#177a55", "#8257d8", "#ffc857", "#5d5870", "#fbfafd", "#9a6206", "#f6f5f9"],
      tokens: { paper: "#fbfafd", ink: "#1f1a2b", muted: "#5d5870", line: "#e0dde8", accent: "#6a3bc6", radius: 6 },
      clientRendered: false,
    },
  },
  {
    label: "Nanashi Inventions",
    result: {
      url: "https://nanashi-inventions.vercel.app/",
      title: "Nanashi Inventions: an independent product lab",
      headings: ["An independent product lab.", "Nanashi means seven stars.", "Seven stars, seven principles."],
      colors: ["#a29db2", "#2d2a3a", "#eeecf3", "#ffc857", "#18161f", "#7b768c", "#0f0d14", "#b79cf0", "#a283e6", "#ffffff", "#5729a6", "#5d5870"],
      tokens: { paper: "#0f0d14", ink: "#eeecf3", muted: "#a29db2", line: "#2d2a3a", accent: "#a283e6", monoFont: "JetBrains Mono", radius: 10 },
      clientRendered: false,
    },
  },
];
