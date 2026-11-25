// Bahasa Indonesia for Nanashi Inventions (B-09, W-10): every page, including Engineering (each
// article has its own .id.mdx body) and the press kit. Written naturally, not word for word; the
// founder reviews it. Audience is investors and recruiters, so the polite "Anda" is used (the
// Nanashi Software site uses "kamu" for business owners).
// Same shape as en.ts (typed as Copy), so a missing or extra key fails the build.

import type { Copy, Rich } from "./en";

export const id: Copy = {
  locale: "id",
  meta: {
    homeTitle: "Nanashi Inventions: lab produk independen",
    homeDescription:
      "Nanashi adalah lab produk independen yang didirikan oleh Michael Kimeison. Namanya berasal dari nana hoshi, tujuh bintang, dan setiap penemuannya dibangun dengan tujuh prinsip.",
    inventionsTitle: "Penemuan · Nanashi",
    inventionsDescription: "Semua produk yang dibuat Nanashi, yang sudah berjalan dan yang masih di lab, masing-masing dengan ceritanya, demo, dan tangkapan layar asli.",
  },
  nav: {
    inventions: "Penemuan",
    engineering: "Engineering",
    about: "Tentang",
    primary: "Utama",
    switchLabel: "EN",
    switchAria: "EN, read in English",
    software: "Butuh website?",
    softwareTarget: "Nanashi Software",
    skip: "Langsung ke isi",
    soundOn: "Nyalakan suara",
    soundOff: "Matikan suara",
    home: "Nanashi, beranda",
  },
  hero: {
    title: "Lab produk independen.",
    lead: "Nanashi merancang, membangun, dan menjalankan perangkat lunaknya sendiri, berangkat dari masalah nyata dan berpegang pada tujuh prinsip.",
    cta: "Lihat penemuannya",
    email: "Email Nanashi",
  },
  name: {
    label: "Nama",
    title: "Nanashi berarti tujuh bintang.",
    nana: { kanji: "七", reading: "nana", meaning: "tujuh" },
    hoshi: { kanji: "星", reading: "hoshi", meaning: "bintang" },
    body: "Namanya berasal dari bahasa Jepang nana hoshi, 七星: tujuh bintang. Diucapkan cepat, jadilah Nanashi. Tujuh bintang membentuk Biduk (Big Dipper), rasi yang sejak berabad-abad dipakai orang sebagai penunjuk arah, dan setiap bintangnya mewakili satu prinsip yang dipegang Nanashi.",
    note: "Bukan 名無し, “tanpa nama”, yang kebetulan bunyinya sama.",
    logo: "Logonya adalah bintang emas yang keluar dari orbitnya. Bintang yang sama menandai setiap prinsip di bawah ini.",
  },
  stars: {
    kanji: "北斗七星",
    reading: "hokuto shichisei",
    title: "Tujuh bintang, tujuh prinsip.",
    lead: "Setiap penemuan memegang tujuh aturan yang sama, satu untuk setiap bintang Biduk, dari Dubhe sampai Alkaid.",
    constellationLabel:
      "Rasi Biduk yang digambar dengan tujuh bintang emas dari logo Nanashi. Setiap bintang menyala saat prinsipnya lewat.",
    seenIn: "Terlihat di",
    openStar: "Tampilkan di mana prinsip ini terlihat",
    starNames: ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"],
    principles: [
      {
        title: "Mulai dari masalah nyata",
        proof: "Setiap penemuan berawal dari masalah yang memang dialami orang, bukan dari teknologi yang mencari kegunaan.",
      },
      {
        title: "Rilis kecil, lalu perbaiki",
        proof: "Rilis pertama mengerjakan satu hal dengan baik. Setiap rilis berikutnya kecil, tercatat, dan mudah dibatalkan.",
      },
      {
        title: "Tanpa angka karangan",
        proof: "Tidak ada angka, rating, atau jumlah pengguna yang dibuat-buat, di mana pun. Kalau ada angka yang ditampilkan, angka itu nyata.",
      },
      {
        title: "Data Anda tetap milik Anda",
        proof: "Data tersimpan di perangkat Anda secara default. Apa pun yang keluar darinya adalah pilihan Anda, dan terlihat jelas.",
      },
      {
        title: "Aksesibel sejak awal",
        proof: "Kontras yang mudah dibaca, akses keyboard, dan menghormati pengaturan kurangi gerakan ada sejak versi pertama, bukan perbaikan belakangan.",
      },
      {
        title: "Sederhana mengalahkan cerdik",
        proof: "Desain paling sederhana yang menyelesaikan masalah yang menang. Setiap bagian tambahan harus punya alasan untuk ada.",
      },
      {
        title: "Dibuat untuk bertahan: terdokumentasi dan teruji",
        proof: "Keputusan dicatat dan perilakunya diuji, sehingga setiap penemuan bisa dipahami, diperbaiki, dan terus berjalan.",
      },
    ],
  },
  how: {
    label: "Cara Nanashi membangun",
    // TODO(founder): this section is held back from the home page; the founder will supply the wording.
    title: "Cara Nanashi membangun.",
    lead: "Cara kerjanya sama untuk setiap penemuan.",
    steps: [
      { title: "Temukan masalahnya", body: "Mulai dari orang yang mengalami masalahnya hari ini." },
      { title: "Rilis yang paling kecil dan berguna", body: "Rilis satu bagian yang sudah membantu." },
      { title: "Perbaiki secara terbuka", body: "Rilis kecil, masing-masing dicatat." },
      { title: "Jaga tetap berjalan", body: "Tes, dokumentasi, dan rencana saat ada yang gagal." },
    ],
  },
  inventions: {
    label: "Penemuan",
    title: "Yang sudah dibuat Nanashi.",
    lead: "Setiap penemuan berawal dari masalah nyata dan dirilis kecil. Buka salah satunya untuk melihat cerita, demo, dan tangkapan layar aslinya.",
    live: "Sudah berjalan",
    lab: "Di lab",
    explore: "Lihat",
    all: "Semua penemuan",
    traction: "Belum ada angka penggunaan publik.",
    newTab: "(terbuka di tab baru)",
    countLive: "berjalan",
    countLab: "di lab",
    pageTitle: "Penemuan",
    pageLead: "Semua yang sudah dibangun Nanashi sejauh ini, dan apa yang sedang di lab. Penemuan yang sudah berjalan bisa langsung dicoba di browser Anda.",
  },
  invention: {
    back: "Semua penemuan",
    stackLabel: "Dibangun dengan",
    nameLabel: "Nama",
    demoLabel: "Demo",
    storyLabel: "Ceritanya",
    story: { problem: "Masalahnya", whatItDoes: "Apa yang dilakukannya", underTheHood: "Di balik layar", result: "Hasilnya" },
    pointsLabel: "Apa yang dilakukannya",
    galleryLabel: "Layar",
    galleryTitle: "Tangkapan layar asli dari aplikasinya.",
    tractionLabel: "Traksi",
    engineeringLabel: "Bahasan engineering (dalam bahasa Inggris)",
    next: "Penemuan berikutnya",
    videoFallback: "Browser Anda tidak bisa memutar video ini. Tangkapan layar di bawah menampilkan layar yang sama.",
  },
  engineering: {
    label: "Engineering",
    title: "Bagaimana penemuannya dibangun.",
    lead: "Bahasan mendalam tentang keputusan di balik setiap penemuan. Tidak ada jadwal terbit: artikel ditulis saat ada hal yang layak dijelaskan.",
    read: "Baca selengkapnya",
    metaTitle: "Engineering · Nanashi",
    contents: "Daftar isi",
    minRead: "menit baca",
    inventionLabel: "Penemuannya",
    dateLocale: "id-ID",
  },
  founder: {
    label: "Pendiri",
    text: "Didirikan oleh Michael Kimeison.",
    body: "Untuk investor dan perekrut: satu email langsung sampai ke pendirinya.",
    email: "Email Nanashi",
    about: "Tentang Nanashi",
  },
  about: {
    metaTitle: "Tentang · Nanashi",
    metaDescription: "Tim di balik Nanashi, lab produk independen yang didirikan oleh Michael Kimeison, dan tujuh prinsip yang dipegang setiap penemuannya.",
    label: "Tentang",
    title: "Orang-orang di balik Nanashi.",
    lead: "Nanashi adalah lab produk independen. Dimulai kecil dan dibangun untuk tumbuh: setiap penemuan memegang tujuh prinsip yang sama, siapa pun yang membangunnya.",
    teamLabel: "Tim",
    teamTitle: "Siapa yang membangun Nanashi.",
    members: [
      {
        name: "Michael Kimeison",
        role: "Pendiri",
        bio: "Rasa ingin tahunya jauh melampaui teknologi: bisnis, psikologi, dan teori permainan sama menariknya dengan kode.",
        facts: [
          { label: "Bicara", value: "5 bahasa: Inggris, Indonesia, Jepang, Mandarin, dan Korea" },
          { label: "Menonton", value: "Anime, K-pop, dan drama Tiongkok" },
          { label: "Mendalami", value: "Bisnis, psikologi, dan teori permainan" },
          { label: "Kelemahan", value: "Akronim. Lihat CHROMIQ dan LEXI." },
        ],
        initials: "MK",
        photo: "/team/founder-placeholder.webp",
        photoAlt: "Potret sementara: ilustrasi sosok berhoodie merah (akan diganti foto asli)",
        links: [
          { label: "Website", href: "https://michaelkimeison.com" },
          { label: "GitHub", href: "https://github.com/MikeKomari" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/michkimei" },
        ],
      },
    ],
    bioPending: "Bio segera hadir.",
    openRole: {
      tag: "Posisi terbuka",
      title: "Kursi Anda di Nanashi",
      body: "Posisi akan dicantumkan di sini saat dibuka. Kalau prinsip-prinsip Nanashi terdengar seperti cara kerja Anda, silakan sapa saja.",
      cta: "Email Nanashi",
    },
    openRoles: 2,
    principlesLabel: "Prinsip",
    principlesTitle: "Tujuh bintang, tujuh aturan.",
    principlesLead: "Tujuh prinsip yang sama berlaku untuk setiap penemuan dan setiap orang yang membangunnya.",
    investorsLabel: "Investor dan perekrut",
    investorsTitle: "Pertanyaan, dijawab apa adanya.",
    faq: [
      {
        q: "Apa itu Nanashi?",
        a: "Lab produk independen. Nanashi membangun dan menjalankan produk perangkat lunaknya sendiri, berangkat dari masalah nyata dan dirilis kecil. Namanya berasal dari bahasa Jepang nana hoshi, tujuh bintang, yang juga memberi Nanashi tujuh prinsipnya.",
      },
      {
        q: "Siapa di baliknya?",
        a: "Nanashi didirikan oleh Michael Kimeison, yang memimpinnya saat ini. Timnya memang dirancang untuk tumbuh; posisi terbuka akan dicantumkan di halaman ini.",
      },
      {
        q: "Penemuan mana yang sudah berjalan?",
        a: [
          "Dua sudah berjalan: ",
          { text: "CHROMIQ", href: "/id/inventions/chromiq" },
          ", ruang kerja desain untuk frontend developer, dan ",
          { text: "LEXI", href: "/id/inventions/lexi" },
          ", ruang kosakata untuk bahasa Mandarin, Jepang, dan Korea. Nanashi Studio dan Nanashi Home masih di lab.",
        ],
      },
      {
        q: "Apakah ada traksi yang bisa dibagikan?",
        a: "Belum ada angka penggunaan publik. Nanashi tidak menerbitkan perkiraan; angka nyata akan muncul di halaman setiap penemuan begitu tersedia.",
      },
      {
        q: "Bagaimana cara menghubungi?",
        a: [
          "Kirim email ke ",
          { text: "michaelk.projects@gmail.com", href: "mailto:michaelk.projects@gmail.com" },
          ". Langsung sampai ke pendirinya.",
        ],
      },
    ] as { q: string; a: Rich }[],
  },
  // The press kit is English only; this block mirrors en.ts so the shape matches.
  press: {
    metaTitle: "Press kit · Nanashi",
    metaDescription: "Logo Nanashi, deskripsi siap pakai, cerita di balik nama, warna brand, dan kontak.",
    label: "Press kit",
    title: "Nanashi, dalam satu tempat.",
    lead: "Logo, deskripsi, dan fakta yang Anda perlukan untuk menulis tentang Nanashi atau memperkenalkannya. Silakan dipakai; aturan logo di bawah menjaganya tetap mudah dikenali.",
    descriptionsLabel: "Deskripsi",
    descriptions: [
      { name: "Satu kalimat", text: "Nanashi adalah lab produk independen." },
      {
        name: "Singkat",
        text: "Nanashi adalah lab produk independen yang didirikan oleh Michael Kimeison. Nanashi merancang, membangun, dan menjalankan perangkat lunaknya sendiri, berangkat dari masalah nyata dan berpegang pada tujuh prinsip.",
      },
      {
        name: "Panjang",
        text: "Nanashi adalah lab produk independen yang didirikan oleh Michael Kimeison. Namanya berasal dari bahasa Jepang nana hoshi, 七星, tujuh bintang, dan setiap bintang mewakili satu prinsip yang dipegang setiap penemuannya, mulai dari berangkat dari masalah nyata sampai menjaga data Anda tetap milik Anda. Dua penemuan sudah berjalan: CHROMIQ, meja kerja desain untuk developer frontend, dan LEXI, ruang kerja kosakata untuk bahasa Mandarin, Jepang, dan Korea. Nanashi Studio dan Nanashi Home masih di lab.",
      },
    ],
    copy: "Salin",
    copied: "Tersalin",
    nameLabel: "Nama",
    nameText: "Nanashi berasal dari nana hoshi (七星), bahasa Jepang untuk “tujuh bintang”. Diucapkan na-na-shi, semua suku kata sama rata. Bukan 名無し, “tanpa nama”, yang bunyinya sama.",
    logosLabel: "Logo",
    logosLead: "File SVG dari design system Nanashi. Pakai versi reversed di latar gelap dan versi warna di latar terang.",
    logos: [
      { file: "nanashi-horizontal-reversed.svg", name: "Horizontal, reversed", tone: "dark" },
      { file: "nanashi-horizontal-color.svg", name: "Horizontal, warna", tone: "light" },
      { file: "nanashi-symbol-reversed.svg", name: "Simbol, reversed", tone: "dark" },
      { file: "nanashi-symbol-color.svg", name: "Simbol, warna", tone: "light" },
      { file: "nanashi-symbol-small-color.svg", name: "Simbol, ukuran kecil", tone: "light" },
    ],
    download: "Unduh SVG",
    rulesLabel: "Aturan logo",
    rules: [
      "Bintangnya selalu emas.",
      "Jangan meregangkan, memutar, mengubah warna, atau menambahkan glow atau bayangan pada logo. Cahaya di sekitarnya boleh.",
      "Sisakan ruang kosong selebar seperempat lebar simbol di setiap sisi.",
      "Ukuran minimum: lebar 120 px untuk logo horizontal, 24 px untuk simbol. Di bawah 24 px, pakai simbol ukuran kecil.",
    ],
    colorsLabel: "Warna brand",
    colors: [
      { token: "brand-indigo", name: "Nanashi Indigo" },
      { token: "star", name: "Star Gold" },
      { token: "accent-violet", name: "Nanashi Violet" },
      { token: "night", name: "Night" },
    ],
    contactLabel: "Kontak",
    contactText: "Untuk wawancara, perkenalan, atau keperluan lain: satu email langsung sampai ke pendirinya.",
  },
  privacy: {
    metaTitle: "Privasi · Nanashi",
    metaDescription: "Apa yang dikumpulkan website Nanashi Inventions tentang Anda: sangat sedikit. Hitungan kunjungan tanpa cookie, tanpa akun, tanpa formulir.",
    label: "Privasi",
    title: "Apa yang diketahui situs ini tentang Anda.",
    lead: "Sangat sedikit, dan memang disengaja. Halaman ini berlaku untuk website Nanashi Inventions; setiap penemuan punya aturannya sendiri.",
    updated: "Terakhir diperbarui 25 November 2026",
    sections: [
      {
        title: "Hitungan kunjungan, tanpa cookie",
        body: "Situs ini memakai Vercel Web Analytics untuk menghitung jumlah halaman yang dilihat dan dua jenis klik: tombol “Coba” di setiap penemuan dan tautan email. Tidak ada cookie dan tidak ada yang disimpan yang bisa mengenali Anda. Pengunjung hanya dibedakan dengan nilai anonim yang dibuang setelah satu hari, sehingga Nanashi hanya melihat jumlah, bukan orangnya.",
      },
      {
        title: "Tanpa akun, tanpa formulir",
        body: "Tidak ada yang perlu didaftarkan dan tidak ada yang perlu diisi. Situs ini tidak pernah meminta nama, alamat email, atau data lain dari Anda.",
      },
      {
        title: "Kalau Anda mengirim email ke Nanashi",
        body: "Pesan dan alamat Anda hanya dipakai untuk membalas. Tidak dibagikan dan tidak dimasukkan ke daftar apa pun. Minta saja, dan akan dihapus.",
      },
      {
        title: "Hosting",
        body: "Situs ini dilayani oleh Vercel. Seperti host web pada umumnya, Vercel menyimpan log teknis jangka pendek (misalnya alamat IP, browser, dan waktu akses) untuk menjaga layanan tetap aman dan berjalan, sesuai kebijakan privasinya sendiri.",
      },
      {
        title: "Font, gambar, dan video",
        body: "Font, tangkapan layar, dan video demo dilayani dari situs ini sendiri. Tidak ada pelacak pihak ketiga, iklan, atau sematan media sosial.",
      },
      {
        title: "Penemuan-penemuannya",
        body: "CHROMIQ, LEXI, dan Nanashi Software adalah website terpisah dengan aturan datanya sendiri. Misalnya, LEXI menyimpan kata-kata Anda di browser kecuali Anda memilih untuk masuk.",
      },
      {
        title: "Pertanyaan",
        body: "Kirim email ke michaelk.projects@gmail.com. Kalau halaman ini berubah, tanggal di atas ikut berubah.",
      },
    ],
  },
  softwareBand: {
    label: "Nanashi Software",
    title: "Butuh website?",
    body: "Nanashi Software membuat website untuk kafe, restoran, dan usaha kecil: mulai dari template siap pakai, atau minta desain khusus.",
    cta: "Kunjungi Nanashi Software",
  },
  footer: {
    tagline: "Lab produk independen.",
    pages: "Halaman",
    contact: "Kontak",
    founded: "Didirikan oleh Michael Kimeison",
    press: "Press kit",
    privacy: "Privasi",
    email: "Email",
    language: "Bahasa",
    english: "English",
    indonesian: "Bahasa Indonesia",
  },
};
