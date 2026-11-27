import { ogCard, OG_SIZE } from "@/lib/og/card";
import { PRICING } from "@/content/site/pricing";

const p = PRICING.en;

export const alt = p.meta.title.split(" | ")[0];
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: p.navLabel, a: p.titleA, b: p.titleB });
}
