// Indonesian text for each invention (W-10). Written naturally, not word for word; founder to review.
// Only what readers see changes; facts, numbers, screens and links come from content/inventions.ts.
// Acronym letters (CHROMIQ, LEXI) stay English: they spell the names.

type PointText = { title: string; body: string; facts?: string[] };

export type InventionText = {
  audience: string;
  oneLiner: string;
  meaning: { teaser: string; body: string };
  tryLabel?: string;
  videoCaption?: string;
  story?: { problem: string; whatItDoes: string; underTheHood: string; result: string };
  points?: PointText[];
  shows?: string[];
  /** Same order as the English changelog; the date comes from there. */
  changelog?: { title: string; body: string }[];
};

export const INVENTIONS_ID: Record<string, InventionText> = {
  chromiq: {
    audience: "Untuk frontend developer",
    oneLiner:
      "Ruang kerja desain di browser: atur warna, tipografi, dan spasi secara langsung, cek kontras, lalu ekspor kode yang sudah dipakai stack kamu.",
    meaning: {
      teaser: "Tujuh huruf, tujuh bagian ruang kerja.",
      body: "Nama buatan yang berakar dari chroma, bahasa Yunani untuk warna, supaya pencarian namanya langsung menemukan produk ini. Setiap dari tujuh hurufnya mewakili satu bagian ruang kerja.",
    },
    tryLabel: "Coba CHROMIQ",
    videoCaption:
      "Direkam dari aplikasi aslinya: empat sistem awal mengubah tampilan halaman editorial, landing page SaaS, dashboard, dan toko, lalu panel ekspor.",
    story: {
      problem:
        "Design system biasanya dimulai sebagai gambar: contoh warna dan huruf di file desain. Apakah warnanya lolos uji kontras, atau bagaimana tipografinya di halaman sungguhan, baru ketahuan saat kodenya ditulis.",
      whatItDoes:
        "CHROMIQ menaruh sistem token dan halaman langsung berdampingan. Ubah peran warna, pasangan huruf, spasi, atau radius, dan enam tampilan pratinjau ikut berubah bersama. Tempel alamat situs publik untuk mencoba token baru di tata letak sungguhan.",
      underTheHood:
        "Satu model token menggerakkan semua tampilan. Kontras dinilai terhadap WCAG selagi kamu mengedit. Pemeriksa URL berjalan di server CHROMIQ sendiri: menolak alamat privat, berhenti setelah 8 detik atau 1,5 MB, dan mematikan script.",
      result:
        "Sudah berjalan dan bisa dipakai di browser tanpa perlu akun. Hasilnya bisa dibawa pulang sebagai CSS, tema Tailwind v4, variabel shadcn/ui, design token, atau DESIGN.md tertulis.",
    },
    points: [
      {
        title: "Mulai dari situs sungguhan.",
        body: "Tempel alamat publik. CHROMIQ mengambilnya lewat servernya sendiri, membuang script, dan memuat salinannya lewat proxy, jadi kamu bisa mencoba huruf, warna, aksen, dan radius baru di tata letak asli lalu menyalin CSS-nya. Situs aslinya tidak pernah disentuh.",
        facts: ["Pemeriksa URL tervalidasi server", "Aman dari SSRF", "Batas 8 detik", "Batas 1,5 MB"],
      },
      {
        title: "Atur sistemnya, bukan pikselnya.",
        body: "Satu model token menggerakkan semuanya: peran warna dengan pasangan terang dan gelap, pasangan dan skala huruf, spasi, radius, border, bayangan, dan gerak. Ubah satu token, enam tampilan pratinjau ikut bergerak.",
        facts: ["6 tampilan pratinjau", "Mode bandingkan", "Undo, snapshot, riwayat versi"],
      },
      {
        title: "Pastikan lolos sebelum dirilis.",
        body: "Setiap pasangan warna dinilai terhadap WCAG selagi kamu mengedit. Yang gagal disebutkan, bukan disembunyikan, dan perbaikan sekali klik menggeser nilai sekecil mungkin sampai lolos. Simulasi buta warna tinggal satu tombol.",
        facts: ["Nilai WCAG per pasangan", "Perbaikan sekali klik", "5 simulasi penglihatan"],
      },
      {
        title: "Pulang membawa kode, bukan tangkapan layar.",
        body: "Ekspor ke CSS custom properties, tema Tailwind v4, variabel shadcn/ui, W3C design token, file proyek portabel, atau DESIGN.md tertulis. Pasangan yang gagal ditandai sebelum apa pun diunduh.",
      },
    ],
    shows: [
      "Dirilis dalam rilis-rilis kecil, masing-masing ditulis di changelog publiknya.",
      "Proyek tersimpan di browser kamu; akun bersifat opsional dan hanya menambah sinkronisasi.",
      "Menilai setiap pasangan warna terhadap WCAG dan punya mode baca kontras tinggi.",
      "Menyimpan catatan keputusan arsitektur, runbook, panduan mode kegagalan, dan postmortem.",
    ],
    changelog: [
      {
        title: "Ubah tampilan situs sungguhan.",
        body: "Tempel alamat publik, dan CHROMIQ memuat salinannya tanpa script lewat servernya sendiri. Alamat privat ditolak, dan setiap pengambilan berhenti setelah 8 detik atau 1,5 MB.",
      },
      {
        title: "Cek kontras selagi Anda mengedit.",
        body: "Setiap pasangan warna dinilai terhadap WCAG, lengkap dengan perbaikan sekali klik dan lima simulasi buta warna.",
      },
      {
        title: "Lebih banyak pilihan ekspor.",
        body: "Ekspor ke CSS, tema Tailwind v4, variabel shadcn/ui, W3C design token, atau DESIGN.md tertulis. Pasangan yang gagal ditandai sebelum apa pun diunduh.",
      },
      {
        title: "Akun opsional.",
        body: "Proyek tetap tersimpan di browser Anda. Akun bersifat opsional dan hanya menambah sinkronisasi.",
      },
    ],
  },
  lexi: {
    audience: "Untuk pelajar bahasa",
    oneLiner:
      "Ruang kosakata untuk bahasa Mandarin, Jepang, dan Korea yang menyimpan datamu di perangkatmu sendiri, kecuali kamu memilih untuk masuk.",
    meaning: {
      teaser: "Language Exploration and eXpression Index.",
      body: "LEXI adalah singkatan dari Language Exploration and eXpression Index. Huruf X-nya berasal dari kata expression.",
    },
    tryLabel: "Coba LEXI",
    videoCaption:
      "Direkam dari aplikasi aslinya: enam kata Mandarin dicatat, prompt enrichment disalin, jawabannya ditempel kembali, dicek, diterapkan, lalu kosakata yang terbentuk.",
    story: {
      problem:
        "Pelajar bahasa Mandarin, Jepang, dan Korea mengumpulkan kata dari mana saja: papan nama, tontonan, obrolan. Kata-kata itu berakhir di catatan dan spreadsheet, dan satu makna dalam tiga bahasa tersebar di tiga tempat.",
      whatItDoes:
        "LEXI mencatat kata dulu, merapikannya nanti. Setiap konsep menyimpan entri Mandarin, Jepang, dan Korea lengkap dengan cara baca, arti, catatan, dan contoh, dan konsep-konsep itu saling terhubung.",
      underTheHood:
        "Data tersimpan di IndexedDB di browser kamu. Tidak ada API model: LEXI menulis prompt yang bisa kamu bawa ke tool AI mana pun, lalu memeriksa JSON yang kamu tempel kembali, kolom demi kolom, sebelum apa pun disimpan.",
      result:
        "Sudah berjalan dan bisa dipakai tanpa akun. Selama tidak masuk, tidak ada yang keluar dari perangkatmu; akun opsional menambah sinkronisasi antar perangkat dan berhenti saat kamu keluar.",
    },
    points: [
      {
        title: "Catat dulu, rapikan nanti.",
        body: "Tempel satu kata atau satu daftar, satu per baris. Semua masuk ke inbox yang bisa kamu edit, beri tag, saring, arsipkan, dan pilih sekaligus. Kata yang sama dilewati, jadi tidak ada yang tersimpan dua kali.",
        facts: ["Tersimpan di IndexedDB", "Di browser kamu"],
      },
      {
        title: "Enrichment tanpa koneksi AI.",
        body: "LEXI menulis prompt berbahasa biasa untuk satu kumpulan kata. Bawa ke tool AI pilihanmu, lalu tempel jawaban JSON-nya kembali. LEXI memeriksa setiap kolom sebelum menulis apa pun, menampilkan pratinjau, dan menerapkannya dalam satu langkah.",
        facts: ["Tanpa API model", "Tanpa API key", "Validasi per kolom"],
      },
      {
        title: "Tiga bahasa, satu konsep.",
        body: "Setiap konsep menyimpan entri Mandarin, Jepang, dan Korea dengan cara baca, arti, catatan, dan contoh kalimat. Saring berdasarkan bahasa, tag, atau teks, dan hubungkan konsep sebagai sinonim, antonim, atau pasangan yang sering tertukar.",
        facts: ["Pinyin dengan tanda nada", "Kana", "Romanisasi Korea"],
      },
      {
        title: "Kata-katamu tetap di perangkatmu.",
        body: "Selama tidak masuk, tidak ada yang keluar dari browser. Akun bersifat opsional: masuk hanya kalau kamu ingin kata yang sama di perangkat lain. Sinkronisasi berjalan lewat akun itu dan berhenti saat kamu keluar.",
        facts: ["Local-first", "Akun opsional", "Bisa di ponsel"],
      },
    ],
    shows: [
      "README-nya menandai dengan jelas layar mana yang sudah nyata dan mana yang masih memakai angka contoh.",
      "Kata tersimpan di IndexedDB di perangkatmu; tidak ada yang keluar sampai kamu memilih untuk masuk.",
      "Tanpa API model: satu langkah salin dan tempel mengerjakan hal yang sama, tanpa ada yang terkirim diam-diam.",
      "Domain, penyimpanan, dan layarnya diuji dengan unit test, dan keputusannya dicatat di spesifikasinya.",
    ],
    changelog: [
      {
        title: "Akun opsional dengan sinkronisasi.",
        body: "Masuk untuk memakai kata yang sama di perangkat lain. Selama tidak masuk, tidak ada yang keluar dari browser Anda, dan API AI tetap tidak dipakai (D-031).",
      },
      {
        title: "Kata terkait saat enrichment.",
        body: "Prompt-nya menyertakan hingga 300 kata Mandarin yang sudah Anda punya dan meminta dua sampai lima hubungan untuk setiap kata (D-020).",
      },
      {
        title: "Prompt enrichment berbahasa biasa.",
        body: "LEXI menulis prompt dalam bentuk kalimat, bukan JSON, lalu memeriksa jawaban yang Anda tempel kembali kolom demi kolom sebelum apa pun disimpan (D-016).",
      },
      {
        title: "Catat satu daftar sekaligus.",
        body: "Tempel satu kata per baris ke inbox. Kata yang sama dilewati, jadi tidak ada yang tersimpan dua kali.",
      },
    ],
  },
  studio: {
    audience: "Untuk penjual Shopee",
    oneLiner: "Foto produk dan teks listing berbasis AI untuk penjual Shopee.",
    meaning: { teaser: "Studio foto untuk setiap toko kecil.", body: "Dinamai dari apa yang digantikannya: studio foto produk." },
  },
  home: {
    audience: "Untuk pemilik rumah",
    oneLiner: "Desain ulang rumah dan ruangan, lengkap dengan perkiraan biaya kasar.",
    meaning: { teaser: "Rumahmu, didesain ulang.", body: "Dinamai dari tempat yang ditanganinya: rumahmu." },
  },
};
