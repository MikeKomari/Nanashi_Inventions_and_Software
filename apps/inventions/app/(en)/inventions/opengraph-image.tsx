import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Nanashi inventions";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Inventions", title: "Things Nanashi has made.", line: "Live in your browser today, and what is in the lab next." });
}
