// The 04 Toko UMKM template as the demo route sees it: parse a content file, then render it.
import { parseContent } from "../shared/schema";
import type { TemplateKind } from "../shared/kind";
import { tokoContentSchema } from "./schema";
import { tokoFontClassName, tokoThemeStyle } from "./theme";
import { TokoTemplate } from "./TokoTemplate";

export const toko: TemplateKind = {
  load(data, file, credit) {
    const content = parseContent(tokoContentSchema, data, file);
    return {
      lang: content.lang,
      title: content.seo.title,
      description: content.seo.description,
      name: content.business.name,
      accent: content.colors.accent,
      onAccent: content.colors.onAccent,
      fontClassName: tokoFontClassName,
      bodyStyle: tokoThemeStyle(content.colors),
      tryIt: { accentVar: "--toko-accent", onAccentVar: "--toko-on-accent", contrastAgainst: [content.colors.background] },
      page: <TokoTemplate content={content} credit={credit} />,
    };
  },
};
