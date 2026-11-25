import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Privacy at Nanashi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Privacy", title: "What this site records.", line: "Short and plain: no tracking cookies, no ads." });
}
