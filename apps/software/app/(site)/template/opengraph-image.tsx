import { ogCard, OG_SIZE } from "@/lib/og/card";
import { id as t } from "@/content/site/id";

export const alt = t.meta.templatesTitle.split(" | ")[0];
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: t.nav.templates, a: t.templatePage.titleA, b: t.templatePage.titleB });
}
