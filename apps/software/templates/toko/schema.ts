// What a shop's content file must contain for the 04 Toko UMKM template. Server only (see shared/schema.ts).
// Everything the visitor reads comes from the content file: business facts, products, photos and UI labels.
import { z } from "zod";
import { contrastPairs, hexColor, httpsUrl, opening, photo, price, publicFile, text, whatsappNumber } from "../shared/schema";

const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'must be lowercase words joined by "-", e.g. "singkong-balado"');

const colors = z
  .strictObject({
    /** Page background. */
    background: hexColor,
    text: hexColor,
    textMuted: hexColor,
    /** Product cards and quote cards. */
    panel: hexColor,
    /** Soft tinted sections (statement, how to order). */
    soft: hexColor,
    /** The big hero panel and the story panel. */
    hero: hexColor,
    /** Giant headline on the hero panel. */
    onHero: hexColor,
    /** Small text on the hero panel. */
    heroText: hexColor,
    /** Buttons. */
    accent: hexColor,
    onAccent: hexColor,
    /** Rotated stickers and the hero's squiggle. */
    sticker: hexColor,
    onSticker: hexColor,
    /** The order band near the end. */
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
      ["text", "soft"],
      ["textMuted", "soft"],
      ["onHero", "hero"],
      ["heroText", "hero"],
      ["onAccent", "accent"],
      ["accent", "background"],
      ["onSticker", "sticker"],
      ["onBand", "band"],
    ]),
  );

const product = z.strictObject({
  id,
  name: text,
  /** Shown as written, e.g. "150 g". */
  size: text,
  price,
  photo,
  description: text.optional(),
  /** A short label like "Terlaris" or "Pedas". */
  tag: text.optional(),
});

const section = { tag: text, title: text };

export const tokoContentSchema = z
  .strictObject({
    template: z.literal("toko"),
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
      instagram: httpsUrl.optional(),
    }),
    colors,
    seo: z.strictObject({ title: text, description: text.max(170, "keep under 170 characters for search results") }),
    labels: z.strictObject({
      skipLink: text,
      nav: z.strictObject({ products: text, story: text, howTo: text }),
      orderShort: text,
      order: text,
      /** Small button on each product card. */
      orderProduct: text,
      address: text,
      hours: text,
      openMap: text,
      whatsapp: text,
      instagram: text,
    }),
    hero: z.strictObject({
      /** The giant headline, one entry per line (keep lines short). */
      titleLines: z.array(text.max(22, "keep each headline line under 22 characters")).min(1).max(3),
      photo,
      /** Up to three short facts under the photo, e.g. how to order, delivery, city. */
      facts: z.array(z.strictObject({ title: text, body: text })).min(1).max(3),
    }),
    statement: z.strictObject({
      tag: text,
      title: text,
      /** Up to two rotated stickers on the headline. */
      stickers: z.array(text.max(20)).max(2).default([]),
    }),
    products: z.strictObject({
      ...section,
      items: z.array(product).min(1).max(8),
      /** WhatsApp message for a product's button. Must contain {product}. */
      orderMessage: text.refine((m) => m.includes("{product}"), 'must contain "{product}"'),
    }),
    launch: z.strictObject({ tag: text, text, product: id.optional() }),
    story: z.strictObject({
      ...section,
      body: z.array(text).min(1),
      photo,
      cards: z.array(photo.extend({ title: text })).min(2).max(4),
    }),
    reviews: z.strictObject({
      ...section,
      /** Customers' own words. First name or initial only. */
      items: z.array(z.strictObject({ quote: text, name: text.max(24) })).min(1).max(6),
    }),
    howTo: z.strictObject({
      ...section,
      steps: z.array(z.strictObject({ title: text, body: text })).min(2).max(4),
      notes: z.array(text).default([]),
    }),
    order: z.strictObject({ title: text, body: text, photo: photo.optional() }),
    footer: z.strictObject({ note: text.optional() }),
  })
  .superRefine((c, ctx) => {
    const ids = new Set<string>();
    for (const [i, p] of c.products.items.entries()) {
      if (ids.has(p.id)) ctx.addIssue({ code: "custom", path: ["products", "items", i, "id"], message: `product id "${p.id}" is used twice` });
      ids.add(p.id);
    }
    if (c.launch.product && !ids.has(c.launch.product)) {
      ctx.addIssue({ code: "custom", path: ["launch", "product"], message: `"${c.launch.product}" is not the id of any product` });
    }
  });

export type TokoContent = z.output<typeof tokoContentSchema>;
export type TokoProduct = TokoContent["products"]["items"][number];
export type TokoPhoto = TokoContent["hero"]["photo"];
