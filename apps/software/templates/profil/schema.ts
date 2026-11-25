// What a person's content file must contain for the 06 Profil Pribadi template. Server only (see shared/schema.ts).
// The hero and contact are always shown. Every other section is optional: list it under "sections" to show it,
// in the order listed. A section that is not listed does not render, and its menu link disappears with it.
import { z } from "zod";
import { contrastPairs, hexColor, httpsUrl, photo, publicFile, text, whatsappNumber } from "../shared/schema";

const colors = z
  .strictObject({
    /** Page background (soft, light). */
    background: hexColor,
    text: hexColor,
    textMuted: hexColor,
    /** Pills, cards and the header bar. Usually white. */
    panel: hexColor,
    /** The last name, small highlights and the contact band. */
    accent: hexColor,
    onAccent: hexColor,
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
    ]),
  );

/** Menu label for a section. Sections without one stay off the menu. */
const menu = text.max(18, "keep menu labels short (18 characters at most)").optional();
const head = { menu, title: text };

const about = z.strictObject({ type: z.literal("about"), ...head, body: z.array(text).min(1).max(4), photo: photo.optional() });

const services = z.strictObject({
  type: z.literal("services"),
  ...head,
  intro: text.optional(),
  /** price is shown as written, e.g. "Mulai Rp 2.500.000" or "Hubungi saya". */
  items: z.array(z.strictObject({ name: text, body: text, price: text.optional() })).min(1).max(9),
});

const numbers = z.strictObject({
  type: z.literal("numbers"),
  menu,
  title: text.optional(),
  items: z.array(z.strictObject({ value: text.max(8, "keep numbers short, e.g. \"12+\""), label: text })).min(2).max(4),
});

const work = z.strictObject({
  type: z.literal("work"),
  ...head,
  /** Label of the "show everything" filter chip. Chips only show when the items use 2 or more tags. */
  allLabel: text,
  items: z.array(z.strictObject({ title: text, tag: text, photo, href: httpsUrl.optional() })).min(1).max(12),
});

const experience = z.strictObject({
  type: z.literal("experience"),
  ...head,
  /** Newest first. years is shown as written, e.g. "2021 – sekarang". */
  items: z.array(z.strictObject({ org: text, role: text, years: text })).min(1).max(10),
});

const ventures = z.strictObject({
  type: z.literal("ventures"),
  ...head,
  items: z
    .array(
      z.strictObject({
        name: text,
        role: text,
        body: text.optional(),
        logo: z.strictObject({ src: publicFile, alt: text }).optional(),
        href: httpsUrl.optional(),
      }),
    )
    .min(1)
    .max(6),
});

const speaking = z.strictObject({
  type: z.literal("speaking"),
  ...head,
  /** Label on upcoming events, e.g. "Akan datang". */
  upcomingLabel: text,
  /** date is shown as written, e.g. "Mar 2027". */
  items: z.array(z.strictObject({ event: text, city: text, date: text, upcoming: z.boolean().default(false) })).min(1).max(10),
});

const press = z.strictObject({
  type: z.literal("press"),
  ...head,
  /** Media names, shown as pills (or logos once the client has them). */
  items: z.array(text).min(1).max(8),
  quote: z.strictObject({ text, source: text }).optional(),
});

const testimonials = z.strictObject({
  type: z.literal("testimonials"),
  ...head,
  items: z
    .array(z.strictObject({ quote: text, name: text.max(32), role: text.optional(), photo: photo.optional() }))
    .min(1)
    .max(8),
});

const gallery = z.strictObject({ type: z.literal("gallery"), ...head, items: z.array(photo).min(4).max(8) });

const section = z.discriminatedUnion("type", [about, services, numbers, work, experience, ventures, speaking, press, testimonials, gallery]);

export const profilContentSchema = z
  .strictObject({
    template: z.literal("profil"),
    lang: z.enum(["id", "en"]),
    person: z.strictObject({
      /** Titles like "dr." or "Ir.": shown as a small label above the name, never split with it. */
      title: text.optional(),
      name: text.max(40),
      /** Monogram or short name for the header, e.g. "kyouka." */
      short: text.max(16),
      role: text,
      /** One or two sentences under the portrait. */
      intro: text.max(160, "keep the intro under 160 characters"),
      /** Transparent cut-out (WebP), shoulders up, at least 1000px tall. width and height are the file's pixels. */
      portrait: z.strictObject({ src: publicFile, alt: text, width: z.int().positive(), height: z.int().positive() }),
      /** The small "available" pill, e.g. "Menerima undangan 2027". */
      available: text.max(40).optional(),
    }),
    colors,
    seo: z.strictObject({ title: text, description: text.max(170, "keep under 170 characters for search results") }),
    labels: z.strictObject({
      skipLink: text,
      menu: text,
      close: text,
      whatsapp: text,
      email: text,
    }),
    /** The main button in the header and the hero. It always opens WhatsApp. */
    cta: z.strictObject({ label: text.max(28), short: text.max(14) }),
    heroLogos: z.strictObject({ label: text, items: z.array(text.max(32)).min(1).max(3) }).optional(),
    sections: z.array(section).max(10).default([]),
    contact: z.strictObject({
      menu,
      title: text,
      body: text,
      whatsapp: z.strictObject({ number: whatsappNumber, message: text }),
      email: z.email().optional(),
      social: z.array(z.strictObject({ label: text, href: httpsUrl })).max(6).default([]),
    }),
  })
  .superRefine((c, ctx) => {
    const seen = new Set<string>();
    for (const [i, s] of c.sections.entries()) {
      if (seen.has(s.type)) ctx.addIssue({ code: "custom", path: ["sections", i, "type"], message: `"${s.type}" is listed twice` });
      seen.add(s.type);
    }
  });

export type ProfilContent = z.output<typeof profilContentSchema>;
export type ProfilSection = ProfilContent["sections"][number];
export type ProfilPhoto = z.output<typeof photo>;
export type SectionOf<T extends ProfilSection["type"]> = Extract<ProfilSection, { type: T }>;
