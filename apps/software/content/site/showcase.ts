/*
 * Karya / Work: the client showcase page (/karya and /en/work).
 *
 * HOW TO ADD A REAL CLIENT
 * 1. Ask the client first. Get their OK (a WhatsApp message is enough) to show their website,
 *    their business name and photos, and, separately, their quote with their name and role.
 *    No permission, no entry. Never invent a quote, a name or a number.
 * 2. Pick a short slug (lowercase, dashes), e.g. "kopi-senja". Put the images in
 *    public/showcase/<slug>/:
 *      - sesudah.webp (required): the finished website, 1600 x 1200 (4:3), under about 300 KB.
 *      - sebelum.webp (optional): their old website or Instagram, same size. Adds a Sebelum/Sesudah toggle.
 *    A screenshot of the live site at 1600 x 1200 works well (WebP, PNG or JPG are all fine).
 * 3. Add an entry to PROJECTS below with `placeholder: false`. Text fields take either one string
 *    (used in both languages) or { id: "...", en: "..." }.
 * 4. Run `npm run build`. A wrong field (bad slug, unknown template, http instead of https,
 *    an image outside public/showcase/<slug>/, a story over 2 sentences) stops the build with a message.
 *
 * As soon as one entry has `placeholder: false`, the page goes live by itself: the draft banner and
 * the "Contoh" placeholders disappear, the footer link "Karya" / "Work" appears, and the page is
 * indexed and listed in the sitemap. Until then it stays a hidden draft. You can delete the two
 * placeholder entries once real ones exist (they are hidden anyway).
 */
import { z } from "zod";
import { TEMPLATES } from "@/templates/registry";
import type { Locale } from "@/lib/i18n";

/** One string for both languages, or one per language. */
const text = z.union([z.string().min(1), z.object({ id: z.string().min(1), en: z.string().min(1) })]);
export type Text = z.infer<typeof text>;
export const pick = (v: Text, locale: Locale) => (typeof v === "string" ? v : v[locale]);

const templateSlugs = TEMPLATES.map((t) => t.slug);
const sentences = (s: string) => s.split(/[.!?](\s|$)/).filter((p) => p && p.trim()).length;
const maxTwoSentences = (v: Text) => (typeof v === "string" ? [v] : [v.id, v.en]).every((s) => sentences(s) <= 2);

const project = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug: lowercase letters, digits and dashes"),
    client: text,
    businessType: text,
    city: z.string().min(1).optional(),
    /** A slug from templates/registry.ts, when the site was built from a template. */
    template: z
      .string()
      .refine((s) => templateSlugs.includes(s), { message: `template must be one of: ${templateSlugs.join(", ")}` })
      .optional(),
    url: z.url({ protocol: /^https$/, message: "url must start with https://" }).optional(),
    /** Paths inside public/, e.g. "/showcase/kopi-senja/sesudah.webp". */
    beforeImage: z.string().optional(),
    afterImage: z.string(),
    /** Problem, then what we built. Two sentences at most. */
    story: text.refine(maxTwoSentences, { message: "story: two sentences at most" }),
    result: text.optional(),
    /** Only with the client's written permission. */
    quote: z.object({ text, name: z.string().min(1), role: text }).optional(),
    /** true = a stand-in entry, never shown once a real client exists. */
    placeholder: z.boolean(),
  })
  .superRefine((p, ctx) => {
    const dir = `/showcase/${p.slug}/`;
    const ok = (s: string) => s.startsWith(dir) && /\.(webp|png|jpe?g|avif|svg)$/i.test(s);
    if (!ok(p.afterImage)) ctx.addIssue({ code: "custom", path: ["afterImage"], message: `must be an image in public${dir}` });
    if (p.beforeImage && !ok(p.beforeImage)) ctx.addIssue({ code: "custom", path: ["beforeImage"], message: `must be an image in public${dir}` });
  });

export type ShowcaseProject = z.infer<typeof project>;

const PROJECTS_INPUT: z.input<typeof project>[] = [
  // Placeholders: they show the layout only. Not real clients.
  {
    slug: "contoh-1",
    client: { id: "[Nama klien]", en: "[Client name]" },
    businessType: { id: "[Jenis usaha]", en: "[Business type]" },
    city: "[Kota]",
    beforeImage: "/showcase/contoh-1/sebelum.svg",
    afterImage: "/showcase/contoh-1/sesudah.svg",
    story: { id: "[Ceritakan masalah klien dan apa yang dibuat]", en: "[Describe the client's problem and what was built]" },
    result: { id: "[Hasil singkat, jika ada]", en: "[A short result, if any]" },
    quote: {
      text: { id: "[Kutipan klien, hanya dengan izin]", en: "[Client quote, only with permission]" },
      name: "[Nama]",
      role: { id: "[Peran, nama usaha]", en: "[Role, business name]" },
    },
    placeholder: true,
  },
  {
    slug: "contoh-2",
    client: { id: "[Nama klien]", en: "[Client name]" },
    businessType: { id: "[Jenis usaha]", en: "[Business type]" },
    afterImage: "/showcase/contoh-2/sesudah.svg",
    story: { id: "[Ceritakan masalah klien dan apa yang dibuat]", en: "[Describe the client's problem and what was built]" },
    placeholder: true,
  },
];

// Parsed at module scope: a bad entry fails `npm run build`.
export const PROJECTS: ShowcaseProject[] = z
  .array(project)
  .superRefine((list, ctx) => {
    const seen = new Set<string>();
    list.forEach((p, i) => {
      if (seen.has(p.slug)) ctx.addIssue({ code: "custom", path: [i, "slug"], message: `duplicate slug "${p.slug}"` });
      seen.add(p.slug);
    });
  })
  .parse(PROJECTS_INPUT);

/** Live once at least one real client exists. */
export const SHOWCASE_READY = PROJECTS.some((p) => !p.placeholder);

/** What the page shows: real clients only once ready, the placeholders until then. */
export const VISIBLE_PROJECTS = SHOWCASE_READY ? PROJECTS.filter((p) => !p.placeholder) : PROJECTS;

type ShowcaseCopy = {
  nav: string;
  title: string;
  description: string;
  titleA: string;
  titleB: string;
  intro: string;
  draft: string;
  label: string;
  sample: string;
  before: string;
  after: string;
  toggleLabel: (client: string) => string;
  imageAlt: (client: string, which: string) => string;
  template: string;
  visit: string;
  ctaTitleA: string;
  ctaTitleB: string;
  cta: string;
  ctaMessage: string;
};

const id: ShowcaseCopy = {
  nav: "Karya",
  title: "Karya: Website yang Sudah Kami Buat | Nanashi Software",
  description: "Website kafe, warung, dan usaha kecil yang dibuat Nanashi Software, lengkap dengan cerita singkat di baliknya.",
  titleA: "Website yang sudah kami buat,",
  titleB: "untuk usaha seperti punya kamu.",
  intro: "Setiap website di sini dibuat bersama pemilik usahanya. Lihat sebelum dan sesudahnya, lalu buka website aslinya.",
  draft: "Draf: contoh di bawah hanya pengganti. Tambahkan klien asli di content/site/showcase.ts.",
  label: "Karya",
  sample: "Contoh",
  before: "Sebelum",
  after: "Sesudah",
  toggleLabel: (c) => `Tampilan ${c}`,
  imageAlt: (c, w) => `Website ${c}, ${w.toLowerCase()}`,
  template: "Template",
  visit: "Lihat website",
  ctaTitleA: "Mau website seperti ini?",
  ctaTitleB: "Ceritakan usahamu lewat WhatsApp.",
  cta: "Chat lewat WhatsApp",
  ctaMessage: "Halo Nanashi Software, saya lihat halaman karya dan mau website seperti itu.",
};

const en: ShowcaseCopy = {
  nav: "Work",
  title: "Our Work: Websites We Have Built | Nanashi Software",
  description: "Websites for cafés, warungs and small businesses made by Nanashi Software, each with the short story behind it.",
  titleA: "Websites we have built,",
  titleB: "for businesses like yours.",
  intro: "Every website here was made together with the business owner. See the before and after, then open the real site.",
  draft: "Draft: the entries below are stand-ins. Add real clients in content/site/showcase.ts.",
  label: "Work",
  sample: "Sample",
  before: "Before",
  after: "After",
  toggleLabel: (c) => `View of ${c}`,
  imageAlt: (c, w) => `${c} website, ${w.toLowerCase()}`,
  template: "Template",
  visit: "Visit website",
  ctaTitleA: "Want a website like these?",
  ctaTitleB: "Tell us about your business on WhatsApp.",
  cta: "Chat on WhatsApp",
  ctaMessage: "Hi Nanashi Software, I saw your work page and I'd like a website like that.",
};

export const SHOWCASE: Record<Locale, ShowcaseCopy> = { id, en };
