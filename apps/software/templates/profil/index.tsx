// The 06 Profil Pribadi template as the demo route sees it: parse a content file, then render it.
import { parseContent } from "../shared/schema";
import type { TemplateKind } from "../shared/kind";
import { profilContentSchema } from "./schema";
import { profilFontClassName, profilThemeStyle } from "./theme";
import { ProfilTemplate } from "./ProfilTemplate";

export const profil: TemplateKind = {
  load(data, file, credit) {
    const content = parseContent(profilContentSchema, data, file);
    return {
      lang: content.lang,
      title: content.seo.title,
      description: content.seo.description,
      name: content.person.name,
      accent: content.colors.accent,
      onAccent: content.colors.onAccent,
      fontClassName: profilFontClassName,
      bodyStyle: profilThemeStyle(content.colors),
      page: <ProfilTemplate content={content} credit={credit} />,
    };
  },
};
