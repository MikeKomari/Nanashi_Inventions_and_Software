// Copy for the Harga / Pricing page (/harga, /en/pricing).
// Prices, turnaround and hosting/domain terms are not decided yet (BP-04, BP-05).
// Every "[ISI]" ("fill in") shows on the page with a dashed outline so nothing unfinished goes unnoticed.
// When everything is filled in, set PRICING_PAGE.ready to true: the draft banner goes away, the page becomes
// indexable, joins the sitemap, and gets linked from the header and footer.
import type { Locale } from "@/lib/i18n";

export const PRICING_PAGE = {
  // TODO(founder): set ready to true once every [ISI] below is filled in (both languages).
  ready: false as boolean,
};

export type PricingPackage = {
  slug: "template" | "template_plus" | "custom";
  name: string;
  /** One line: who this package suits. */
  forWho: string;
  price: string;
  priceNote: string;
  turnaround: string;
  /** Small tag on the card, only where it is true by nature. */
  tag?: string;
  included: string[];
  cta: string;
  ctaMessage: string;
};

export type PricingCopy = {
  meta: { title: string; description: string };
  navLabel: string;
  draftBanner: string;
  titleA: string;
  titleB: string;
  intro: string;
  packagesLabel: string;
  packagesTitleA: string;
  packagesTitleB: string;
  priceLabel: string;
  turnaroundLabel: string;
  includedLabel: string;
  packages: PricingPackage[];
  alwaysLabel: string;
  alwaysTitle: string;
  always: string[];
  extrasLabel: string;
  extrasTitleA: string;
  extrasTitleB: string;
  extrasIntro: string;
  extrasCols: { item: string; price: string };
  extras: { name: string; explain: string; price: string }[];
  faqLabel: string;
  faqTitleA: string;
  faqTitleB: string;
  faq: { q: string; a: string }[];
};

const id: PricingCopy = {
  meta: {
    title: "Harga Website untuk Kafe dan UMKM | Nanashi Software",
    description:
      "Tiga paket website: template siap pakai, template dengan penyesuaian, atau desain khusus. Lihat apa saja yang termasuk, lalu pesan lewat WhatsApp.",
  },
  navLabel: "Harga",
  draftBanner: "Draf: harga belum final. Isi content/site/pricing.ts lalu ubah ready ke true.",
  titleA: "Harga yang jelas,",
  titleB: "sebelum kamu mulai.",
  intro:
    "Pilih paket yang paling pas dengan usahamu. Semua paket sudah termasuk tombol pesan WhatsApp dan tampilan yang nyaman dibuka di HP.",
  packagesLabel: "Paket",
  packagesTitleA: "Tiga cara",
  packagesTitleB: "untuk punya website.",
  priceLabel: "Harga",
  turnaroundLabel: "Waktu pengerjaan",
  includedLabel: "Termasuk",
  packages: [
    {
      slug: "template",
      name: "Template",
      forWho: "Untuk usaha yang ingin cepat online dengan tampilan yang sudah jadi.",
      price: "Rp [ISI]", // TODO(founder): price of the Template package
      priceNote: "sekali bayar", // TODO(founder): confirm one-off payment (or change)
      turnaround: "[ISI] hari kerja", // TODO(founder): turnaround after all details are received
      tag: "Paling cepat",
      included: [
        "Satu template pilihanmu dari halaman Template",
        "Diisi dengan nama, logo, foto, menu, dan harga usahamu",
        "Tombol pesan lewat WhatsApp dengan pesan yang sudah terisi",
        "Jam buka, alamat, dan peta lokasi",
        "Nyaman dibuka di HP, rapi juga di laptop",
        "Siap ditemukan di Google (judul, deskripsi, dan info usaha)",
      ],
      cta: "Pesan paket Template",
      ctaMessage: "Halo Nanashi Software, saya tertarik dengan paket Template. Boleh dijelaskan langkahnya?",
    },
    {
      slug: "template_plus",
      name: "Template + penyesuaian",
      forWho: "Untuk usaha yang suka salah satu template, tapi ingin beberapa bagian dibuat berbeda.",
      price: "Rp [ISI]", // TODO(founder): price of the Template + penyesuaian package (or "mulai dari Rp …")
      priceNote: "sekali bayar", // TODO(founder): confirm one-off payment (or change)
      turnaround: "[ISI] hari kerja", // TODO(founder): turnaround
      included: [
        "Semua yang ada di paket Template",
        "Warna disesuaikan dengan logo atau merek usahamu",
        "Bagian yang diubah, ditambah, atau dihapus sesuai kebutuhan",
        "Halaman tambahan, misalnya katalog atau info acara", // TODO(founder): how many extra pages are included?
      ],
      cta: "Pesan paket ini",
      ctaMessage: "Halo Nanashi Software, saya tertarik dengan paket Template + penyesuaian. Boleh saya ceritakan yang ingin diubah?",
    },
    {
      slug: "custom",
      name: "Desain khusus",
      forWho: "Untuk usaha yang punya bayangan sendiri dan ingin website yang dibuat dari awal.",
      price: "Mulai dari Rp [ISI]", // TODO(founder): starting price of Desain khusus
      priceNote: "tergantung kebutuhan",
      turnaround: "[ISI] hari kerja", // TODO(founder): typical turnaround range
      included: [
        "Desain baru yang dibuat khusus untuk usahamu",
        "Kami diskusikan dulu isi dan tampilannya bersamamu",
        "Tombol pesan WhatsApp, nyaman di HP, dan siap ditemukan di Google",
        "Jumlah halaman sesuai kebutuhan",
      ],
      cta: "Ceritakan kebutuhanmu",
      ctaMessage: "Halo Nanashi Software, saya tertarik dengan paket Desain khusus. Boleh saya ceritakan usaha dan keinginan saya?",
    },
  ],
  alwaysLabel: "Selalu termasuk",
  alwaysTitle: "Di paket mana pun, kamu selalu dapat:",
  always: [
    "Tombol pesan WhatsApp",
    "Tampilan yang nyaman di HP",
    "Dasar-dasar agar ditemukan di Google",
    "Kami yang mengurus semua urusan teknis",
  ],
  extrasLabel: "Biaya lain",
  extrasTitleA: "Biaya rutin",
  extrasTitleB: "yang perlu kamu tahu.",
  extrasIntro: "Supaya tidak ada kejutan, ini biaya yang berjalan setelah website-mu tayang.",
  extrasCols: { item: "Yang dibayar", price: "Biaya" },
  extras: [
    {
      name: "Domain",
      explain: "Alamat website-mu, misalnya namausaha.com.",
      price: "Rp [ISI] per tahun", // TODO(founder): domain cost, and whether the first year is included
    },
    {
      name: "Hosting",
      explain: "Tempat website-mu disimpan supaya bisa dibuka kapan saja.",
      price: "Rp [ISI] per [ISI: bulan/tahun]", // TODO(founder): hosting cost and billing period
    },
    {
      name: "Perubahan isi",
      explain: "Mengubah menu, harga, foto, atau jam buka setelah website tayang.",
      price: "[ISI]", // TODO(founder): free up to N times? per change? monthly plan? (BP-05)
    },
  ],
  faqLabel: "Pertanyaan",
  faqTitleA: "Soal pembayaran",
  faqTitleB: "dan revisi.",
  faq: [
    {
      q: "Bagaimana cara bayarnya?",
      a: "[ISI] Misalnya: DP sekian persen di awal, sisanya setelah website tayang. Transfer bank atau QRIS.", // TODO(founder): payment terms
    },
    {
      q: "Berapa kali aku bisa minta revisi?",
      a: "[ISI] Misalnya: dua kali revisi gratis sebelum website tayang.", // TODO(founder): revisions included
    },
    {
      q: "Kalau aku kurang puas, bagaimana?",
      a: "[ISI] Jelaskan apa yang terjadi kalau hasilnya belum sesuai harapan.", // TODO(founder): what if the client is not happy (refund? extra revision?)
    },
  ],
};

const en: PricingCopy = {
  meta: {
    title: "Website Pricing for Cafés and Small Businesses | Nanashi Software",
    description:
      "Three website packages: a ready template, a template with changes, or a custom design. See what is included, then order on WhatsApp.",
  },
  navLabel: "Pricing",
  draftBanner: "Draft: prices are not final. Fill in content/site/pricing.ts, then set ready to true.",
  titleA: "Clear prices,",
  titleB: "before you start.",
  intro:
    "Pick the package that suits your business. Every package comes with a WhatsApp order button and a site that is easy to use on a phone.",
  packagesLabel: "Packages",
  packagesTitleA: "Three ways",
  packagesTitleB: "to get your website.",
  priceLabel: "Price",
  turnaroundLabel: "Turnaround",
  includedLabel: "Included",
  packages: [
    {
      slug: "template",
      name: "Template",
      forWho: "For businesses that want to go online quickly with a finished design.",
      price: "Rp [ISI]", // TODO(founder): price of the Template package
      priceNote: "one-off payment", // TODO(founder): confirm one-off payment (or change)
      turnaround: "[ISI] working days", // TODO(founder): turnaround after all details are received
      tag: "Fastest",
      included: [
        "One template of your choice from the Templates page",
        "Filled in with your business name, logo, photos, menu and prices",
        "A WhatsApp order button with the message already written",
        "Opening hours, address and a location map",
        "Easy to use on a phone, tidy on a laptop too",
        "Ready for Google (title, description and business details)",
      ],
      cta: "Order the Template package",
      ctaMessage: "Hello Nanashi Software, I am interested in the Template package. Could you explain the steps?",
    },
    {
      slug: "template_plus",
      name: "Template + changes",
      forWho: "For businesses that like one of the templates but want some parts done differently.",
      price: "Rp [ISI]", // TODO(founder): price of the Template + changes package
      priceNote: "one-off payment", // TODO(founder): confirm one-off payment (or change)
      turnaround: "[ISI] working days", // TODO(founder): turnaround
      included: [
        "Everything in the Template package",
        "Colours matched to your logo or brand",
        "Sections changed, added or removed as you need",
        "Extra pages, for example a catalogue or event info", // TODO(founder): how many extra pages are included?
      ],
      cta: "Order this package",
      ctaMessage: "Hello Nanashi Software, I am interested in the Template + changes package. Can I tell you what I would like changed?",
    },
    {
      slug: "custom",
      name: "Custom design",
      forWho: "For businesses with their own idea who want a website built from scratch.",
      price: "From Rp [ISI]", // TODO(founder): starting price of Custom design
      priceNote: "depends on your needs",
      turnaround: "[ISI] working days", // TODO(founder): typical turnaround range
      included: [
        "A new design made just for your business",
        "We plan the content and look together with you first",
        "WhatsApp order button, easy on phones and ready for Google",
        "As many pages as you need",
      ],
      cta: "Tell us what you need",
      ctaMessage: "Hello Nanashi Software, I am interested in the Custom design package. Can I tell you about my business and what I have in mind?",
    },
  ],
  alwaysLabel: "Always included",
  alwaysTitle: "Whichever package you pick, you always get:",
  always: [
    "A WhatsApp order button",
    "A site that is easy to use on a phone",
    "The basics for being found on Google",
    "We handle everything technical",
  ],
  extrasLabel: "Other costs",
  extrasTitleA: "Ongoing costs",
  extrasTitleB: "you should know about.",
  extrasIntro: "So there are no surprises, these are the costs that continue after your website goes live.",
  extrasCols: { item: "What you pay for", price: "Cost" },
  extras: [
    {
      name: "Domain",
      explain: "Your website's address, for example yourbusiness.com.",
      price: "Rp [ISI] per year", // TODO(founder): domain cost, and whether the first year is included
    },
    {
      name: "Hosting",
      explain: "Where your website is kept so it can be opened any time.",
      price: "Rp [ISI] per [ISI: month/year]", // TODO(founder): hosting cost and billing period
    },
    {
      name: "Content updates",
      explain: "Changing your menu, prices, photos or opening hours after the site is live.",
      price: "[ISI]", // TODO(founder): free up to N times? per change? monthly plan? (BP-05)
    },
  ],
  faqLabel: "Questions",
  faqTitleA: "About payment",
  faqTitleB: "and revisions.",
  faq: [
    {
      q: "How do I pay?",
      a: "[ISI] For example: a deposit up front and the rest once the site is live. Bank transfer or QRIS.", // TODO(founder): payment terms
    },
    {
      q: "How many revisions can I ask for?",
      a: "[ISI] For example: two free revisions before the site goes live.", // TODO(founder): revisions included
    },
    {
      q: "What if I am not happy with it?",
      a: "[ISI] Explain what happens if the result is not what the client hoped for.", // TODO(founder): what if the client is not happy
    },
  ],
};

export const PRICING: Record<Locale, PricingCopy> = { id, en };
