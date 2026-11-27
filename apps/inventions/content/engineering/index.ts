// Engineering articles (W-06, W-14). Each entry's body is an MDX file in this folder.
// toc lists the article's h2 headings in order; their ids are slugify(title).
import type { ComponentType } from "react";
import ChromiqUrlInspector from "./chromiq-url-inspector.mdx";
import LexiCopyPaste from "./lexi-copy-paste-enrichment.mdx";
import ChromiqUrlInspectorId from "./chromiq-url-inspector.id.mdx";
import LexiCopyPasteId from "./lexi-copy-paste-enrichment.id.mdx";
import type { Locale } from "@/lib/i18n";

export type Article = {
  slug: string;
  title: string;
  summary: string;
  invention: "chromiq" | "lexi";
  product: string;
  accent: "comet" | "tide";
  topic: string;
  date: string; // ISO
  minutes: number;
  toc: string[];
  Body: ComponentType;
  /** The Indonesian version (/id/engineering/<slug>): same facts, its own MDX body. */
  id: Pick<Article, "title" | "summary" | "topic" | "toc" | "Body">;
};

export const ARTICLES: Article[] = [
  {
    slug: "chromiq-url-inspector",
    title: "How CHROMIQ's URL inspector loads other websites safely",
    summary:
      "CHROMIQ fetches pages you name from its own server. This is how it refuses private addresses, connects only to the address it checked, stops after 8 seconds or 1.5 MB, and turns scripts off before anything is shown.",
    invention: "chromiq",
    product: "CHROMIQ",
    accent: "comet",
    topic: "Security",
    date: "2026-11-24",
    minutes: 8,
    toc: [
      "The feature, and the risk inside it",
      "Rule one: only public addresses",
      "The gap between checking and connecting",
      "Redirects get the same treatment",
      "A budget for time and bytes",
      "Showing the page without running it",
      "What is still open",
    ],
    Body: ChromiqUrlInspector,
    id: {
      title: "Cara inspector URL CHROMIQ memuat website lain dengan aman",
      summary:
        "CHROMIQ mengambil halaman yang Anda sebut dari servernya sendiri. Begini caranya menolak alamat privat, hanya menyambung ke alamat yang sudah diperiksa, berhenti setelah 8 detik atau 1,5 MB, dan mematikan script sebelum apa pun ditampilkan.",
      topic: "Keamanan",
      toc: [
        "Fiturnya, dan risiko di dalamnya",
        "Aturan pertama: hanya alamat publik",
        "Celah antara memeriksa dan menyambung",
        "Redirect diperlakukan sama",
        "Batas waktu dan ukuran",
        "Menampilkan halaman tanpa menjalankannya",
        "Yang masih terbuka",
      ],
      Body: ChromiqUrlInspectorId,
    },
  },
  {
    slug: "lexi-copy-paste-enrichment",
    title: "Why LEXI has no AI connection and uses a copy/paste step instead",
    summary:
      "LEXI never calls a model. It writes a plain-language prompt you can take to any AI tool, then validates the JSON you paste back, field by field, before anything is saved. This is the trade-off, and how the boundary works.",
    invention: "lexi",
    product: "LEXI",
    accent: "tide",
    topic: "Product design",
    date: "2026-11-24",
    minutes: 7,
    toc: [
      "The job: turn a word into an entry",
      "Why not just call a model",
      "The boundary, step by step",
      "A prompt written for people and models",
      "Checking what comes back",
      "What it costs",
    ],
    Body: LexiCopyPaste,
    id: {
      title: "Kenapa LEXI tidak terhubung ke AI dan memakai langkah salin/tempel",
      summary:
        "LEXI tidak pernah memanggil model. LEXI menulis prompt berbahasa biasa yang bisa Anda bawa ke alat AI mana pun, lalu memvalidasi JSON yang Anda tempel kembali, kolom demi kolom, sebelum apa pun disimpan. Inilah kompromi dan cara kerja batasnya.",
      topic: "Desain produk",
      toc: [
        "Tugasnya: mengubah kata menjadi entri",
        "Kenapa tidak langsung memanggil model",
        "Batasnya, langkah demi langkah",
        "Prompt yang ditulis untuk manusia dan model",
        "Memeriksa jawaban yang kembali",
        "Harganya",
      ],
      Body: LexiCopyPasteId,
    },
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/** An article with its reader-facing text in the given language (slug, dates and links unchanged). */
export const localArticle = (a: Article, locale: Locale): Article => (locale === "id" ? { ...a, ...a.id } : a);

/** Articles in the given language, newest first. */
export const articlesFor = (locale: Locale) =>
  [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).map((a) => localArticle(a, locale));
