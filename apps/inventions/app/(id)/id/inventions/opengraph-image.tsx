import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Penemuan Nanashi";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Penemuan", title: "Hal-hal yang dibuat Nanashi.", line: "Yang sudah bisa dipakai di browser hari ini, dan yang masih di lab." });
}
