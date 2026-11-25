import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Privasi di Nanashi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Privasi", title: "Apa yang dicatat situs ini.", line: "Singkat dan jelas: tanpa cookie pelacak, tanpa iklan." });
}
