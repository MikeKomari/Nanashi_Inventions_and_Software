// The 01 Kafe template as the demo route sees it: parse a content file, then render it.
import { parseContent } from "../shared/schema";
import type { TemplateKind } from "../shared/kind";
import { kafeContentSchema } from "./schema";
import { kafeFontClassName, kafeThemeStyle } from "./theme";
import { KafeTemplate } from "./KafeTemplate";

export const kafe: TemplateKind = {
  load(data, file, credit) {
    const content = parseContent(kafeContentSchema, data, file);
    return {
      lang: content.lang,
      title: content.seo.title,
      description: content.seo.description,
      name: content.business.name,
      accent: content.colors.accent,
      onAccent: content.colors.onAccent,
      fontClassName: kafeFontClassName,
      bodyStyle: kafeThemeStyle(content.colors),
      page: <KafeTemplate content={content} credit={credit} />,
    };
  },
};
