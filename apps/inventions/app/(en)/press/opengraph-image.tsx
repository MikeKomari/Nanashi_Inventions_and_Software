import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Nanashi press kit";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Press kit", title: "Nanashi, in one place.", line: "Logos, descriptions, the name story and contact." });
}
