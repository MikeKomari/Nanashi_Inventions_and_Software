import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Press kit Nanashi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Press kit", title: "Nanashi, dalam satu tempat.", line: "Logo, deskripsi, cerita di balik nama, dan kontak." });
}
