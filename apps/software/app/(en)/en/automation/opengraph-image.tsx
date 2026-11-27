import { ogCard, OG_SIZE } from "@/lib/og/card";
import { AUTOMATION } from "@/content/site/automation";

const c = AUTOMATION.en;

export const alt = c.meta.title.split(" | ")[0];
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: c.ogEyebrow, a: c.titleA, b: c.titleB });
}
