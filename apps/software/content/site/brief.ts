// Copy for the short brief (/mulai, /en/start): four questions that fill in the first WhatsApp message.
// Kept apart from id.ts/en.ts so the brief can change without touching the rest of the site copy.
import type { Locale } from "@/lib/i18n";

export type Choice = { value: string; label: string };

export type BriefCopy = {
  meta: { title: string; description: string };
  nav: string;
  titleA: string;
  titleB: string;
  intro: string;
  nameLabel: string;
  namePlaceholder: string;
  optional: string;
  typeLabel: string;
  types: Choice[];
  templateLabel: string;
  templateUnsure: string;
  templateCustom: string;
  needsLabel: string;
  needsHint: string;
  needs: Choice[];
  whenLabel: string;
  when: Choice[];
  previewLabel: string;
  send: string;
  sendNote: string;
  /** The WhatsApp message. Lines with nothing picked are left out. */
  message: {
    greeting: string;
    name: string;
    type: string;
    template: string;
    needs: string;
    when: string;
  };
  /** Link to the brief from the band at the bottom of other pages. */
  bandLink: string;
};

const id: BriefCopy = {
  meta: {
    title: "Mulai Bikin Website: Isi Brief Singkat | Nanashi Software",
    description:
      "Jawab empat pertanyaan singkat tentang usahamu. Jawabanmu langsung jadi pesan WhatsApp, jadi kami bisa membalas dengan perkiraan yang pas.",
  },
  nav: "Mulai",
  titleA: "Empat pertanyaan singkat,",
  titleB: "lalu kirim lewat WhatsApp.",
  intro:
    "Jawabanmu langsung jadi pesan WhatsApp yang rapi. Kami jadi tahu kebutuhanmu dari pesan pertama dan bisa membalas dengan perkiraan yang pas. Tidak ada yang tersimpan di website ini.",
  nameLabel: "Nama usaha atau nama kamu",
  namePlaceholder: "Contoh: Kopi Senja",
  optional: "boleh dikosongkan",
  typeLabel: "1. Usahamu bergerak di bidang apa?",
  types: [
    { value: "fnb", label: "Kafe, restoran, atau warung" },
    { value: "shop", label: "Toko atau produk UMKM" },
    { value: "service", label: "Usaha jasa" },
    { value: "personal", label: "Profil pribadi atau profesional" },
    { value: "company", label: "Perusahaan atau organisasi" },
    { value: "other", label: "Lainnya" },
  ],
  templateLabel: "2. Template mana yang kamu suka?",
  templateUnsure: "Belum tahu, bantu pilihkan",
  templateCustom: "Desain khusus",
  needsLabel: "3. Apa saja yang perlu ada di website-mu?",
  needsHint: "Pilih semua yang cocok.",
  needs: [
    { value: "menu", label: "Menu dan harga" },
    { value: "catalog", label: "Katalog produk" },
    { value: "services", label: "Daftar layanan" },
    { value: "gallery", label: "Galeri foto" },
    { value: "reviews", label: "Ulasan pelanggan" },
    { value: "location", label: "Lokasi dan jam buka" },
    { value: "booking", label: "Pemesanan atau reservasi" },
  ],
  whenLabel: "4. Kapan website-nya perlu jadi?",
  when: [
    { value: "asap", label: "Secepatnya" },
    { value: "month", label: "Dalam sebulan" },
    { value: "browsing", label: "Santai, masih lihat-lihat" },
  ],
  previewLabel: "Pesan yang akan terkirim",
  send: "Kirim lewat WhatsApp",
  sendNote: "WhatsApp akan terbuka dengan pesan ini. Kamu masih bisa mengubahnya sebelum dikirim.",
  message: {
    greeting: "Halo Nanashi Software, saya mau bikin website.",
    name: "Nama usaha",
    type: "Bidang usaha",
    template: "Template",
    needs: "Yang perlu ada",
    when: "Kapan",
  },
  bandLink: "Atau isi brief singkat dulu",
};

const en: BriefCopy = {
  meta: {
    title: "Start Your Website: a Short Brief | Nanashi Software",
    description:
      "Answer four short questions about your business. Your answers become a WhatsApp message, so we can reply with an estimate that fits.",
  },
  nav: "Start",
  titleA: "Four short questions,",
  titleB: "then send it on WhatsApp.",
  intro:
    "Your answers become a tidy WhatsApp message. We understand what you need from the first message and can reply with an estimate that fits. Nothing is stored on this website.",
  nameLabel: "Business name or your name",
  namePlaceholder: "For example: Kopi Senja",
  optional: "optional",
  typeLabel: "1. What kind of business is it?",
  types: [
    { value: "fnb", label: "Café, restaurant or warung" },
    { value: "shop", label: "Shop or small-business products" },
    { value: "service", label: "Service business" },
    { value: "personal", label: "Personal or professional profile" },
    { value: "company", label: "Company or organisation" },
    { value: "other", label: "Something else" },
  ],
  templateLabel: "2. Which template do you like?",
  templateUnsure: "Not sure yet, help me choose",
  templateCustom: "Custom design",
  needsLabel: "3. What should your website include?",
  needsHint: "Pick all that apply.",
  needs: [
    { value: "menu", label: "Menu and prices" },
    { value: "catalog", label: "Product catalogue" },
    { value: "services", label: "List of services" },
    { value: "gallery", label: "Photo gallery" },
    { value: "reviews", label: "Customer reviews" },
    { value: "location", label: "Location and opening hours" },
    { value: "booking", label: "Orders or reservations" },
  ],
  whenLabel: "4. When do you need it?",
  when: [
    { value: "asap", label: "As soon as possible" },
    { value: "month", label: "Within a month" },
    { value: "browsing", label: "No rush, just looking" },
  ],
  previewLabel: "The message you'll send",
  send: "Send on WhatsApp",
  sendNote: "WhatsApp opens with this message. You can still change it before sending.",
  message: {
    greeting: "Hi Nanashi Software, I'd like a website.",
    name: "Business name",
    type: "Business type",
    template: "Template",
    needs: "Needs",
    when: "When",
  },
  bandLink: "Or fill in a short brief first",
};

export const BRIEF: Record<Locale, BriefCopy> = { id, en };
