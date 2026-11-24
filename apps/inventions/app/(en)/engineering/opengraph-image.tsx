import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Nanashi Engineering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Engineering", title: "How the inventions are built.", line: "Deep dives into the decisions behind each invention." });
}
