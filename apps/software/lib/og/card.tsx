// Share images (Open Graph) in the light Nanashi Software style, generated at build with next/og.
// Colours come from the generated token file; the logo uses its exact paths and brand colours.
import { ImageResponse } from "next/og";
import { COLOR } from "@/styles/tokens";
import { ORBIT_D, STAR_D } from "@/components/brand/symbol-paths";

export const OG_SIZE = { width: 1200, height: 630 };

export function ogCard({ eyebrow, a, b }: { eyebrow: string; a: string; b: string }) {
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
          background: COLOR.bg,
          color: COLOR.text,
          fontFamily: "sans-serif",
          borderTop: `14px solid ${COLOR.star}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="60" height="60" viewBox="0 0 256 256">
            <path d={ORBIT_D} fill={COLOR["brand-indigo"]} />
            <path d={STAR_D} fill={COLOR.star} />
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: -0.5, color: COLOR["brand-indigo"] }}>nanashi</div>
          <div style={{ display: "flex", fontSize: 30, color: COLOR["text-muted"] }}>software</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: COLOR.star,
              color: COLOR["on-star"],
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 2,
              padding: "6px 12px",
              borderRadius: 4,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 64, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 1000 }}>
            <span style={{ color: COLOR.text }}>{a}</span>
            <span style={{ color: COLOR["text-muted"] }}>{b}</span>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
