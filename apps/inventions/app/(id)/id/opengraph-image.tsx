import { ogCard, OG_SIZE } from "@/lib/og/card";

export const alt = "Nanashi: lab produk independen";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Lab produk independen", title: "Lab produk independen.", line: "Namanya berarti tujuh bintang, dan setiap penemuannya dibangun dengan tujuh prinsip." });
}
