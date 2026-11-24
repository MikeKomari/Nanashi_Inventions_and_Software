// All Indonesian copy for the Nanashi Software site. Voice: "kamu", warm, polite, no jargon.
// Any unavoidable technical word is explained in brackets. English (en.ts) mirrors this shape.

export type FaqItem = { q: string; a: string; /** Answer waits on a parked business decision. */ todo?: string };

export const id = {
  locale: "id" as "id" | "en",
  meta: {
    homeTitle: "Jasa Pembuatan Website untuk Kafe dan UMKM | Nanashi Software",
    homeDescription:
      "Nanashi Software membuat website untuk kafe, warung, dan UMKM. Pilih template, kirim info usahamu lewat WhatsApp, dan website-mu siap dibagikan ke pelanggan.",
  },
  nav: {
    home: "Beranda",
    templates: "Template",
    about: "Tentang",
    switchLabel: "EN",
    switchAria: "Read this page in English",
    skip: "Langsung ke isi",
  },
  hero: {
    titleA: "Website untuk kafe, warung, dan UMKM,",
    titleB: "biar pelanggan gampang menemukanmu.",
    lead: "Pilih template yang cocok, kirim info usahamu lewat WhatsApp, dan kami yang mengurus sisanya. Kamu tidak perlu paham teknologi.",
    cta: "Chat lewat WhatsApp",
    ctaMessage: "Halo Nanashi Software, saya mau tanya soal website untuk usaha saya.",
    secondary: "Lihat template",
    illustration: "Ilustrasi garis sebuah jalan dengan lima toko: kafe, warung, toko roti, toko kecil, dan barbershop.",
  },
  why: {
    label: "Kenapa website",
    titleA: "Instagram untuk cerita harian.",
    titleB: "Website untuk hal yang harus selalu benar.",
    intro:
      "Menu, harga, jam buka, dan lokasi usahamu ada di satu alamat yang rapi. Pelanggan tidak perlu menggulir postingan lama untuk mencarinya.",
    points: [
      {
        title: "Ditemukan di Google",
        body: "Orang yang mencari kafe atau warung di sekitarnya bisa menemukan usahamu, walaupun belum mengikuti akunmu.",
      },
      {
        title: "Menu selalu yang terbaru",
        body: "Menu dan harga ada di satu halaman, jadi pelanggan melihat versi yang berlaku, bukan foto menu dari tahun lalu.",
      },
      {
        title: "Terlihat lebih terpercaya",
        body: "Website dengan alamat sendiri membuat usahamu terlihat serius, terutama di mata pelanggan baru.",
      },
    ],
  },
  templates: {
    label: "Template",
    titleA: "Pilih tampilan",
    titleB: "yang cocok dengan usahamu.",
    intro: "Setiap template punya desainnya sendiri. Lihat demonya dulu, lalu pesan lewat WhatsApp kalau sudah cocok.",
    live: "Demo tersedia",
    soon: "Segera hadir",
    viewDemo: "Lihat demo",
    order: "Pesan via WhatsApp",
    ask: "Tanya template ini",
    previewPending: "Pratinjau menyusul",
    previewAlt: (name: string) => `Tampilan halaman demo template ${name}`,
    customTitle: "Belum ada yang pas?",
    customBody: "Kami juga bisa membuat website dengan desain khusus untuk usahamu.",
    customLink: "Lihat desain khusus",
    orderMessage: (name: string) => `Halo Nanashi Software, saya tertarik dengan template ${name}.`,
    askMessage: (name: string) =>
      `Halo Nanashi Software, saya tertarik dengan template ${name}. Tolong kabari saya kalau sudah siap, ya.`,
  },
  steps: {
    label: "Cara kerja",
    titleA: "Tiga langkah,",
    titleB: "tanpa urusan teknis.",
    items: [
      { title: "Pilih template", body: "Lihat demonya dan pilih yang paling cocok dengan usahamu." },
      {
        title: "Kirim info usahamu",
        body: "Lewat WhatsApp: nama usaha, logo, foto, menu dan harga, jam buka, serta alamat.",
      },
      {
        title: "Website-mu tayang",
        body: "Kami pasang semuanya. Website-mu online (bisa dibuka siapa saja) dan siap dibagikan ke pelanggan.",
      },
    ],
  },
  custom: {
    label: "Desain khusus",
    titleA: "Punya bayangan sendiri?",
    titleB: "Kami bisa membuatnya dari awal.",
    body: "Kalau belum ada template yang pas, ceritakan usaha dan keinginanmu. Kami buatkan website dengan desain khusus untuk usahamu.",
    cta: "Ceritakan kebutuhanmu",
    ctaMessage: "Halo Nanashi Software, saya mau website dengan desain khusus untuk usaha saya.",
  },
  faq: {
    label: "Pertanyaan",
    titleA: "Yang sering ditanyakan",
    titleB: "sebelum mulai.",
    items: [
      {
        q: "Berapa biayanya?",
        a: "Daftar harga sedang kami siapkan. Untuk sekarang, tanyakan langsung lewat WhatsApp dan kami jelaskan biayanya untuk usahamu.",
        todo: "Pricing is parked (BP-04). Founder to confirm the answer.",
      },
      {
        q: "Berapa lama sampai website-ku jadi?",
        a: "Tergantung template dan kelengkapan info usahamu. Tanyakan lewat WhatsApp, dan kami beri perkiraan setelah melihat kebutuhanmu.",
        todo: "No turnaround time decided. Founder to confirm.",
      },
      {
        q: "Apa saja yang perlu aku siapkan?",
        a: "Nama usaha, logo (kalau ada), beberapa foto, menu dan harga, jam buka, alamat, dan nomor WhatsApp untuk pesanan.",
      },
      {
        q: "Aku tidak paham teknologi. Apa tetap bisa?",
        a: "Bisa. Kamu cukup mengirim info usahamu lewat WhatsApp. Urusan teknisnya kami yang kerjakan.",
      },
      {
        q: "Apakah sudah termasuk domain dan hosting?",
        a: "Domain (alamat website kamu) dan hosting (tempat website disimpan) sedang kami rapikan bersama daftar harga. Tanyakan lewat WhatsApp untuk kondisi saat ini.",
        todo: "Hosting and domain terms are parked (BP-04). Founder to confirm.",
      },
      {
        q: "Bisakah menu atau harga diubah nanti?",
        a: "Bisa. Kirim perubahannya lewat WhatsApp dan kami perbarui untukmu.",
        todo: "How clients update content is parked (BP-05). Founder to confirm.",
      },
      {
        q: "Pelanggan bisa pesan lewat website?",
        a: "Bisa, lewat tombol WhatsApp. Pesanan masuk ke WhatsApp-mu dengan pesan yang sudah terisi. Pembayaran online belum tersedia.",
      },
    ] satisfies FaqItem[] as FaqItem[],
  },
  band: {
    titleA: "Mulai dari satu pesan.",
    titleB: "Kami bantu sampai website-mu tayang.",
    cta: "Chat lewat WhatsApp",
    ctaMessage: "Halo Nanashi Software, saya mau mulai bikin website untuk usaha saya.",
    emailLead: "Lebih suka email?",
  },
  demo: {
    /** Slim Nanashi bar on top of every template demo. */
    bar: (name: string) => `Ini demo template ${name}`,
    cta: "Pesan template ini",
    home: "Nanashi Software",
    /** Small credit in the template's footer. */
    credit: "Dibuat oleh Nanashi Software",
    titleSuffix: (name: string) => `Demo template ${name}`,
  },
  footer: {
    tagline: "Website untuk kafe, warung, dan UMKM di Indonesia.",
    partOf: "Bagian dari Nanashi, didirikan oleh",
    pages: "Halaman",
    contact: "Kontak",
    inventions: "Nanashi Inventions",
  },
};

export type SiteCopy = typeof id;
