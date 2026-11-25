import { ogCard, OG_SIZE } from "@/lib/og/card";
import { id as t } from "@/content/site/id";

export const alt = t.meta.homeTitle.split(" | ")[0];
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Nanashi Software", a: t.hero.titleA, b: t.hero.titleB });
}
