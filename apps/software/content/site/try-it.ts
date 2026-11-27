// Copy for "Coba dengan usahamu" on the template demos (components/demo/TryIt.tsx).
// Demos are Indonesian, so the demo bar uses `id`; `en` keeps the same shape for later.
import type { Locale } from "@/lib/i18n";

export type TryItCopy = {
  toggle: string;
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  colorLabel: string;
  swatch: (name: string) => string;
  customColor: string;
  /** Preset accent colours, all readable on light backgrounds. */
  presets: { name: string; hex: string }[];
  adjusted: string;
  hint: string;
  copy: string;
  copied: string;
  copyFailed: string;
  order: string;
  reset: string;
  close: string;
  waMessage: (template: string, name: string, hex: string, url: string) => string;
};

const id: TryItCopy = {
  toggle: "Coba dengan usahamu",
  title: "Lihat websitemu sendiri",
  nameLabel: "Nama usaha atau namamu",
  namePlaceholder: "Contoh: Warung Bu Sari",
  colorLabel: "Warna utama",
  swatch: (name) => `Warna ${name}`,
  customColor: "Pilih warna lain",
  presets: [
    { name: "bata", hex: "#B4432A" },
    { name: "hutan", hex: "#2F6B3F" },
    { name: "laut", hex: "#23408E" },
    { name: "anggur", hex: "#7A2E6B" },
    { name: "toska", hex: "#0E6A70" },
    { name: "arang", hex: "#2B2B2B" },
  ],
  adjusted: "Warnanya kami sesuaikan sedikit supaya tetap mudah dibaca.",
  hint: "Perubahan ini hanya di layarmu. Bagikan lewat link supaya orang lain bisa lihat juga.",
  copy: "Salin link",
  copied: "Link disalin",
  copyFailed: "Belum bisa menyalin. Salin dari kolom alamat, ya.",
  order: "Pesan dengan ini",
  reset: "Kembalikan",
  close: "Tutup",
  waMessage: (template, name, hex, url) =>
    `Halo Nanashi, saya mau website template ${template} untuk ${name}, warna utama ${hex}. Contohnya: ${url}`,
};

const en: TryItCopy = {
  toggle: "Try it with your business",
  title: "See your own website",
  nameLabel: "Your business or your name",
  namePlaceholder: "e.g. Sari's Kitchen",
  colorLabel: "Main colour",
  swatch: (name) => `${name} colour`,
  customColor: "Pick another colour",
  presets: [
    { name: "brick", hex: "#B4432A" },
    { name: "forest", hex: "#2F6B3F" },
    { name: "sea", hex: "#23408E" },
    { name: "plum", hex: "#7A2E6B" },
    { name: "teal", hex: "#0E6A70" },
    { name: "charcoal", hex: "#2B2B2B" },
  ],
  adjusted: "We adjusted the colour a little so it stays easy to read.",
  hint: "This only changes your screen. Share the link so others can see it too.",
  copy: "Copy link",
  copied: "Link copied",
  copyFailed: "Could not copy. Copy it from the address bar instead.",
  order: "Order with this",
  reset: "Reset",
  close: "Close",
  waMessage: (template, name, hex, url) =>
    `Hi Nanashi, I'd like a website on the ${template} template for ${name}, main colour ${hex}. Preview: ${url}`,
};

export const TRY_IT: Record<Locale, TryItCopy> = { id, en };
