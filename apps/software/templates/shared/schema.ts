// Building blocks for template content schemas. Server only: photo checks read public/ from disk.
// Content files are parsed while the site is built, so a file that breaks these rules fails `npm run build`.
import { existsSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { contrastRatio, HEX_COLOR, MIN_CONTRAST } from "./color";
import { WHATSAPP_NUMBER } from "./whatsapp";

/** Text that must be filled in (no empty strings, no stray spaces around it). */
export const text = z.string().trim().min(1, "must not be empty");

export const hexColor = z.string().regex(HEX_COLOR, 'must be a hex colour like "#9A4A12"');

/** Rupiah, whole number, above zero. Formatted at render time (formatPrice). */
export const price = z.int("must be a whole number of rupiah, e.g. 28000").positive("must be above zero");

/** 24-hour time "HH:MM". */
export const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'must be a 24-hour time like "07:00"');

export const whatsappNumber = z
  .string()
  .regex(WHATSAPP_NUMBER, "must be an Indonesian WhatsApp number in the form 62… (no +, no leading 0, no spaces)");

/** A path inside public/, e.g. "/demo/kopi-elysia/hero.webp". The file must exist. */
export const publicFile = z
  .string()
  .regex(/^\/[\w./-]+\.(webp|avif|jpe?g|png|svg)$/, 'must be a path inside public/ like "/demo/shop/photo.webp"')
  .refine((p) => !p.includes(".."), "must not contain ..")
  .refine((p) => existsSync(path.join(process.cwd(), "public", p)), {
    error: (issue) => `file not found: public${String(issue.input)}`,
  });

export const photo = z.strictObject({
  src: publicFile,
  /** Describes the photo for people who cannot see it. */
  alt: text,
});

export const opening = z.strictObject({
  /** Shown as written, e.g. "Senin – Jumat". */
  days: text,
  opens: time,
  closes: time,
});

export const httpsUrl = z.url({ protocol: /^https$/, error: "must be a full https:// link" });

/**
 * Checks that each [foreground, background] pair reaches 4.5:1. `pairs` names keys of the colour object,
 * so the error says exactly which pair to fix and what it measured.
 */
export function contrastPairs<T extends Record<string, string>>(pairs: ReadonlyArray<readonly [keyof T & string, keyof T & string]>) {
  return (colors: T, ctx: z.core.$RefinementCtx<T>) => {
    for (const [fg, bg] of pairs) {
      const a = colors[fg];
      const b = colors[bg];
      if (!a || !b || !HEX_COLOR.test(a) || !HEX_COLOR.test(b)) continue;
      const ratio = contrastRatio(a, b);
      if (ratio < MIN_CONTRAST) {
        ctx.addIssue({
          code: "custom",
          path: [fg],
          message: `${fg} ${a} on ${bg} ${b} has contrast ${ratio.toFixed(2)}:1, needs at least ${MIN_CONTRAST}:1`,
        });
      }
    }
  };
}

/** Parses a content file and turns a failure into a build error a person can read. */
export function parseContent<S extends z.ZodType>(schema: S, data: unknown, file: string): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Content file ${file} does not match its template:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
