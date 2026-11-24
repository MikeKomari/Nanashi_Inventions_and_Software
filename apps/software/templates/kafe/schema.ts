// What a café's content file must contain for the 01 Kafe template. Server only (see shared/schema.ts).
// Everything the visitor reads comes from the content file: business facts, menu, photos and the UI labels.
import { z } from "zod";
import {
  contrastPairs,
  hexColor,
  httpsUrl,
  opening,
  photo,
  price,
  publicFile,
  text,
  whatsappNumber,
} from "../shared/schema";

const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'must be lowercase words joined by "-", e.g. "es-kopi-susu"');

const colors = z
  .strictObject({
    /** Page background. */
    background: hexColor,
    /** Headings and body text. */
    text: hexColor,
    /** Secondary text. */
    textMuted: hexColor,
    /** Tinted rounded panels (menu, hero card). */
    panel: hexColor,
    /** Buttons and prices. */
    accent: hexColor,
    /** Text on buttons. */
    onAccent: hexColor,
    /** Small tags like "Favorit" (used as a background). */
    tag: hexColor,
    onTag: hexColor,
    /** The dark order band near the end. */
    band: hexColor,
    onBand: hexColor,
  })
  // Client colour safety: every pair the template actually draws must reach 4.5:1.
  .superRefine(
    contrastPairs([
      ["text", "background"],
      ["textMuted", "background"],
      ["text", "panel"],
      ["textMuted", "panel"],
      ["accent", "background"],
      ["accent", "panel"],
      ["onAccent", "accent"],
      ["onTag", "tag"],
      ["onBand", "band"],
    ]),
  );

const menuItem = z.strictObject({
  id,
  name: text,
  description: text.optional(),
  price,
  /** Items with a photo are shown as cards at the top of the menu. */
  photo: photo.optional(),
  /** A short label like "Favorit" or "Baru". */
  tag: text.optional(),
});

const section = { tag: text, title: text };

export const kafeContentSchema = z
  .strictObject({
    template: z.literal("kafe"),
    /** Language of the page, for <html lang>. */
    lang: z.enum(["id", "en"]),
    business: z.strictObject({
      name: text,
      /** null: the name is set in the template's display font instead. */
      logo: z
        .strictObject({ src: publicFile, alt: text, width: z.int().positive(), height: z.int().positive() })
        .nullable(),
      tagline: text,
      whatsapp: z.strictObject({ number: whatsappNumber, message: text }),
      address: z.strictObject({ lines: z.array(text).min(1), mapUrl: httpsUrl }),
      hours: z.array(opening).min(1),
    }),
    colors,
    seo: z.strictObject({ title: text, description: text.max(170, "keep under 170 characters for search results") }),
    labels: z.strictObject({
      skipLink: text,
      nav: z.strictObject({ story: text, menu: text, location: text }),
      /** Short order button in the header. */
      orderShort: text,
      /** Main order button (hero and order band). */
      order: text,
      seeMenu: text,
      featured: text,
      address: text,
      hours: text,
      openMap: text,
      whatsapp: text,
    }),
    hero: z.strictObject({
      ...section,
      lead: text,
      photo,
      /** id of the menu item shown in the hero's price block. */
      signatureItem: id,
    }),
    story: z.strictObject({ ...section, paragraphs: z.array(text).min(1), photo }),
    menu: z.strictObject({
      ...section,
      intro: text.optional(),
      categories: z.array(z.strictObject({ id, name: text, items: z.array(menuItem).min(1) })).min(1),
    }),
    gallery: z.strictObject({ ...section, photos: z.array(photo.extend({ caption: text.optional() })).min(3) }),
    reviews: z.strictObject({
      ...section,
      /** Customers' own words. First name or initial only. */
      items: z.array(z.strictObject({ quote: text, name: text.max(24) })).min(1),
    }),
    location: z.strictObject({ ...section, notes: z.array(text).default([]) }),
    order: z.strictObject({ title: text, body: text, photo: photo.optional() }),
    footer: z.strictObject({ note: text.optional() }),
  })
  .superRefine((c, ctx) => {
    const items = c.menu.categories.flatMap((cat) => cat.items);
    const seen = new Set<string>();
    for (const [i, item] of items.entries()) {
      if (seen.has(item.id)) ctx.addIssue({ code: "custom", path: ["menu", "items", i, "id"], message: `menu item id "${item.id}" is used twice` });
      seen.add(item.id);
    }
    const cats = new Set<string>();
    for (const [i, cat] of c.menu.categories.entries()) {
      if (cats.has(cat.id)) ctx.addIssue({ code: "custom", path: ["menu", "categories", i, "id"], message: `category id "${cat.id}" is used twice` });
      cats.add(cat.id);
    }
    if (!seen.has(c.hero.signatureItem)) {
      ctx.addIssue({
        code: "custom",
        path: ["hero", "signatureItem"],
        message: `"${c.hero.signatureItem}" is not the id of any menu item`,
      });
    }
  });

export type KafeContent = z.output<typeof kafeContentSchema>;
export type KafeMenuItem = KafeContent["menu"]["categories"][number]["items"][number];
export type KafePhoto = KafeContent["hero"]["photo"];
