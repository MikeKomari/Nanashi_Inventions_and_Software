// Share images (Open Graph) in the Nanashi night-sky style, generated at build with next/og.
// Colours come from the generated token file; the logo uses its exact paths (no recolouring).
import { ImageResponse } from "next/og";
import { COLOR } from "@/styles/tokens";
import { ORBIT_D, STAR_D } from "@/components/brand/symbol-paths";

export const OG_SIZE = { width: 1200, height: 630 };

const ACCENT: Record<string, string> = {
  comet: COLOR["accent-comet"],
  tide: COLOR["accent-tide"],
  nova: COLOR["accent-nova"],
  orbit: COLOR["accent-orbit"],
};

export function ogCard({ eyebrow, title, line, accent }: { eyebrow: string; title: string; line?: string; accent?: string }) {
  const titleColor = accent ? ACCENT[accent] ?? COLOR.text : COLOR.text;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(70% 90% at 80% 10%, ${COLOR["brand-indigo"]}, ${COLOR.bg} 70%)`,
          color: COLOR.text,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 256 256">
            <path d={ORBIT_D} fill={COLOR["moon-0"]} />
            <path d={STAR_D} fill={COLOR.star} />
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>nanashi</div>
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 22, color: COLOR["text-muted"], letterSpacing: 3 }}>七星 · NANA HOSHI</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: COLOR["text-muted"] }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 64 : 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, color: titleColor }}>
            {title}
          </div>
          {line && <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, color: COLOR["text-muted"], maxWidth: 980 }}>{line}</div>}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
