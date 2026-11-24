import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "About Nanashi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "About", title: "The people behind Nanashi.", line: "Founded by Michael Kimeison." });
}
