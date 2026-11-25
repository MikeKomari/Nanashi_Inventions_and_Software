import { ogCard, OG_SIZE } from "@/lib/og/card";
import { en as t } from "@/content/site/en";
import { BRIEF } from "@/content/site/brief";

const copy = BRIEF[t.locale];

export const alt = copy.meta.title.split(" | ")[0];
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: copy.nav, a: copy.titleA, b: copy.titleB });
}
