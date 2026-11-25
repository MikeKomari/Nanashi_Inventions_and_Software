import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Tentang Nanashi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Tentang", title: "Orang-orang di balik Nanashi.", line: "Didirikan oleh Michael Kimeison." });
}
