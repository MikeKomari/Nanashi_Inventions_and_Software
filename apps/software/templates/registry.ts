// The templates, in the order they appear on the site (01–06).
// A template goes live by setting status "live" and pointing demo at a content file in content/demo/.
// Each live demo has its own route folder app/(demo)/template/<slug>/ (see templates/shared/demo.tsx).

export type Locale = "id" | "en";

export type TemplateEntry = {
  number: string;
  slug: string;
  status: "live" | "soon";
  /** Lucide icon name shown on the soft placeholder. */
  icon: "Coffee" | "UtensilsCrossed" | "Croissant" | "Store" | "Scissors" | "UserRound";
  /** Name used in the WhatsApp message, e.g. "Kafe". */
  waName: Record<Locale, string>;
  title: Record<Locale, string>;
  blurb: Record<Locale, string>;
  demo?: {
    /** File name in content/demo/ without ".json", e.g. "kopi-elysia". */
    content: string;
    /** Screenshot in public/ for the template card (made by `npm run screens`). */
    screenshot?: string;
  };
};

export const TEMPLATES: TemplateEntry[] = [
  {
    number: "01",
    slug: "kafe",
    status: "live",
    icon: "Coffee",
    waName: { id: "Kafe", en: "Café" },
    title: { id: "Kafe & coffee shop", en: "Café & coffee shop" },
    blurb: {
      id: "Menu dan harga, foto suasana, ulasan, lokasi, dan tombol pesan lewat WhatsApp.",
      en: "Menu and prices, atmosphere photos, reviews, location and a WhatsApp order button.",
    },
    demo: { content: "kopi-elysia", screenshot: "/screens/kafe.webp" },
  },
  {
    number: "02",
    slug: "warung",
    status: "soon",
    icon: "UtensilsCrossed",
    waName: { id: "Restoran & Warung", en: "Restaurant & Warung" },
    title: { id: "Restoran & warung", en: "Restaurant & warung" },
    blurb: { id: "Untuk rumah makan dan warung.", en: "For restaurants and warungs." },
  },
  {
    number: "03",
    slug: "bakery",
    status: "soon",
    icon: "Croissant",
    waName: { id: "Bakery & Katering", en: "Bakery & Catering" },
    title: { id: "Bakery, dessert & katering", en: "Bakery, dessert & catering" },
    blurb: { id: "Untuk toko roti, dessert, dan katering.", en: "For bakeries, dessert shops and caterers." },
  },
  {
    number: "04",
    slug: "toko",
    status: "live",
    icon: "Store",
    waName: { id: "Toko UMKM", en: "UMKM Shop" },
    title: { id: "Toko UMKM", en: "Small business shop" },
    blurb: {
      id: "Etalase produk dengan harga, cerita usaha, ulasan, cara pesan, dan tombol pesan per produk lewat WhatsApp.",
      en: "A product showcase with prices, your story, reviews, how to order and a WhatsApp button per product.",
    },
    demo: { content: "kriuk-kiana", screenshot: "/screens/toko.webp" },
  },
  {
    number: "05",
    slug: "jasa",
    status: "soon",
    icon: "Scissors",
    waName: { id: "Jasa", en: "Services" },
    title: { id: "Jasa: laundry, barbershop, salon", en: "Services: laundry, barbershop, salon" },
    blurb: { id: "Untuk usaha jasa dengan daftar layanan dan harga.", en: "For service businesses with a price list." },
  },
  {
    number: "06",
    slug: "profil",
    status: "live",
    icon: "UserRound",
    waName: { id: "Profil Pribadi", en: "Personal Profile" },
    title: { id: "Profil pribadi & portofolio", en: "Personal profile & portfolio" },
    blurb: {
      id: "Wajah kamu sebagai pembuka, lalu bagian yang kamu pilih: layanan, pengalaman, panggung, liputan, atau karya.",
      en: "Your face up front, then only the sections you need: services, experience, speaking, press or work.",
    },
    demo: { content: "kyouka-bella", screenshot: "/screens/profil.webp" },
  },
];
