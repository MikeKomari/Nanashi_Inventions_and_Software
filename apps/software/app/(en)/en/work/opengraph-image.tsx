import { ogCard, OG_SIZE } from "@/lib/og/card";
import { SHOWCASE } from "@/content/site/showcase";

const s = SHOWCASE.en;

export const alt = s.title.split(" | ")[0];
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: s.nav, a: s.titleA, b: s.titleB });
}
