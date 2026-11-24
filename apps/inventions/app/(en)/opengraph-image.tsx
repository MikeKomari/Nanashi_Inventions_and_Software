import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Nanashi: an independent product lab";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Independent product lab", title: "An independent product lab.", line: "Its name means seven stars, and every invention is built by seven principles." });
}
