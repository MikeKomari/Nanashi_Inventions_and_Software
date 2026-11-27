// Copy for the automation (otomasi) service page: scripts and small tools that take over repetitive
// computer work for small businesses and professionals. Same voice as id.ts: "kamu", warm, no jargon.
import type { Locale } from "@/lib/i18n";

export type AutomationIcon = "orders" | "report" | "stock" | "files" | "connect" | "script";

type AutomationCopy = {
  meta: { title: string; description: string };
  /** Footer link and breadcrumb name. */
  nav: string;
  /** Share image tag. */
  ogEyebrow: string;
  serviceType: string;
  titleA: string;
  titleB: string;
  intro: string;
  examples: {
    label: string;
    titleA: string;
    titleB: string;
    intro: string;
    beforeLabel: string;
    afterLabel: string;
    items: { icon: AutomationIcon; title: string; before: string; after: string }[];
  };
  steps: { label: string; titleA: string; titleB: string; items: { title: string; body: string }[] };
  notes: { label: string; titleA: string; titleB: string; items: { title: string; body: string }[] };
  cta: { label: string; titleA: string; titleB: string; body: string; button: string; message: string };
};

const id: AutomationCopy = {
  meta: {
    title: "Jasa Otomasi dan Script untuk UMKM dan Kantor | Nanashi Software",
    description:
      "Pekerjaan komputer yang diulang tiap hari, seperti rekap pesanan, laporan penjualan, atau mengubah banyak file, bisa dikerjakan otomatis. Ceritakan pekerjaannya lewat WhatsApp.",
  },
  nav: "Otomasi",
  ogEyebrow: "Otomasi",
  serviceType: "Otomasi dan pembuatan script",
  titleA: "Pekerjaan berulang?",
  titleB: "Biar komputer yang mengerjakan.",
  intro:
    "Selain website, kami juga membuat otomasi (alat kecil yang menjalankan pekerjaan komputer secara otomatis) untuk usaha kecil dan pekerja kantoran. Pekerjaan yang biasanya makan waktu tiap hari bisa jalan sendiri, jadi kamu bisa fokus ke hal yang lebih penting.",
  examples: {
    label: "Contoh",
    titleA: "Contoh yang bisa kami bantu.",
    titleB: "Mungkin ada yang mirip pekerjaanmu.",
    intro: "Ini contoh pekerjaan yang sering kami temui. Kalau pekerjaanmu berbeda, tetap ceritakan saja. Banyak hal lain yang juga bisa dibuat.",
    beforeLabel: "Sebelum",
    afterLabel: "Sesudah",
    items: [
      {
        icon: "orders",
        title: "Rekap pesanan ke spreadsheet",
        before: "Pesanan dari Google Form disalin satu per satu ke Excel setiap malam.",
        after: "Setiap pesanan baru langsung masuk ke spreadsheet (tabel seperti Excel), rapi dan tanpa salah ketik.",
      },
      {
        icon: "report",
        title: "Laporan penjualan yang jadi sendiri",
        before: "Tiap Senin pagi menghitung ulang penjualan minggu lalu dari beberapa file.",
        after: "Ringkasan harian atau mingguan dibuat otomatis dan dikirim ke email-mu.",
      },
      {
        icon: "stock",
        title: "Pengingat stok menipis",
        before: "Baru sadar bahan habis waktu pelanggan sudah memesan.",
        after: "Begitu stok di catatanmu turun di bawah batas, kamu langsung dapat pengingat lewat email.",
      },
      {
        icon: "files",
        title: "Mengubah banyak file sekaligus",
        before: "Mengganti nama ratusan foto, mengubah formatnya, atau menggabung PDF satu per satu.",
        after: "Sekali jalan, semua file selesai dalam hitungan menit.",
      },
      {
        icon: "connect",
        title: "Menghubungkan aplikasi yang kamu pakai",
        before: "Data dari form dipindah manual ke spreadsheet, lalu kamu kabari tim satu per satu.",
        after: "Form, spreadsheet, dan notifikasi (pemberitahuan) tersambung, jadi semuanya berjalan berurutan dengan sendirinya.",
      },
      {
        icon: "script",
        title: "Script khusus untuk tugas kantor",
        before: "Langkah yang sama di komputer diulang setiap hari, dan gampang terlewat kalau sedang sibuk.",
        after: "Satu script (program kecil) yang menjalankan semua langkah itu dengan sekali klik.",
      },
    ],
  },
  steps: {
    label: "Cara kerja",
    titleA: "Tiga langkah.",
    titleB: "Kamu cukup bercerita.",
    items: [
      {
        title: "Ceritakan pekerjaannya",
        body: "Jelaskan apa yang biasa kamu kerjakan dan bagian mana yang paling makan waktu. Boleh kirim contoh file atau screenshot lewat WhatsApp.",
      },
      {
        title: "Kami buat dan uji dengan datamu",
        body: "Kami membuat otomasinya, lalu mengujinya dengan contoh data milikmu sampai hasilnya sesuai.",
      },
      {
        title: "Kamu pakai, kami bantu",
        body: "Kami ajari cara memakainya sampai kamu nyaman. Kalau nanti ada yang berubah, kami bantu menyesuaikan.",
      },
    ],
  },
  notes: {
    label: "Perlu kamu tahu",
    titleA: "Yang perlu kamu tahu.",
    titleB: "Terus terang dari awal.",
    items: [
      {
        title: "Datamu tetap milikmu",
        body: "Kami hanya minta akses yang benar-benar perlu untuk pekerjaan itu, dan tidak memakai datamu untuk hal lain.",
      },
      {
        title: "Tidak semua hal cocok diotomasi",
        body: "Kalau pekerjaanmu lebih cepat dikerjakan manual, atau hasilnya tidak sepadan, kami akan bilang terus terang.",
      },
      {
        title: "Soal harga",
        body: "Harga per proyek, tergantung kebutuhan. Tanya lewat WhatsApp.",
      },
    ],
  },
  cta: {
    label: "Mulai",
    titleA: "Punya pekerjaan yang ingin dibuat otomatis?",
    titleB: "Ceritakan saja dulu.",
    body: "Tidak perlu tahu istilah teknisnya. Ceritakan pekerjaannya dengan bahasamu sendiri, nanti kami bantu cari caranya.",
    button: "Tanya lewat WhatsApp",
    message: "Halo Nanashi Software, saya mau tanya soal otomasi untuk pekerjaan saya.",
  },
};

const en: AutomationCopy = {
  meta: {
    title: "Automation and Scripts for Small Businesses and Offices | Nanashi Software",
    description:
      "Computer work you repeat every day, like collecting orders, sales reports, or changing lots of files, can run on its own. Tell us about the work on WhatsApp.",
  },
  nav: "Automation",
  ogEyebrow: "Automation",
  serviceType: "Automation and custom scripts",
  titleA: "Doing the same work again and again?",
  titleB: "Let the computer do it.",
  intro:
    "Besides websites, we also build automations (small tools that do computer work for you, automatically) for small businesses and office workers. The tasks that eat up time every day can run by themselves, so you can focus on what matters more.",
  examples: {
    label: "Examples",
    titleA: "Things we can help with.",
    titleB: "One of these may sound like your work.",
    intro: "These are jobs we come across often. If yours is different, tell us anyway. Plenty of other things can be built too.",
    beforeLabel: "Before",
    afterLabel: "After",
    items: [
      {
        icon: "orders",
        title: "Orders collected in a spreadsheet",
        before: "Orders from a Google Form are copied into Excel one by one every night.",
        after: "Each new order goes straight into a spreadsheet, neat and without typos.",
      },
      {
        icon: "report",
        title: "Sales reports that make themselves",
        before: "Every Monday morning you add up last week's sales from several files.",
        after: "A daily or weekly summary is put together for you and sent to your email.",
      },
      {
        icon: "stock",
        title: "Low stock reminders",
        before: "You only notice an ingredient has run out when a customer has already ordered.",
        after: "As soon as stock in your records drops below a limit, you get a reminder by email.",
      },
      {
        icon: "files",
        title: "Changing lots of files at once",
        before: "Renaming hundreds of photos, changing their format, or merging PDFs one at a time.",
        after: "One run, and every file is done in minutes.",
      },
      {
        icon: "connect",
        title: "Connecting the apps you use",
        before: "Form answers are moved into a spreadsheet by hand, then you tell your team one by one.",
        after: "Form, spreadsheet and notifications are linked, so each step follows the last on its own.",
      },
      {
        icon: "script",
        title: "A custom script for office tasks",
        before: "The same steps on the computer every day, easy to miss on a busy day.",
        after: "One script (a small program) that runs all those steps in a single click.",
      },
    ],
  },
  steps: {
    label: "How it works",
    titleA: "Three steps.",
    titleB: "You just tell us about it.",
    items: [
      {
        title: "Tell us about the work",
        body: "Explain what you usually do and which part takes the most time. You can send sample files or screenshots on WhatsApp.",
      },
      {
        title: "We build it and test it with your data",
        body: "We build the automation, then test it with your own sample data until the result is right.",
      },
      {
        title: "You use it, we help",
        body: "We show you how to use it until you are comfortable. If something changes later, we help you adjust it.",
      },
    ],
  },
  notes: {
    label: "Good to know",
    titleA: "Good to know.",
    titleB: "Honest from the start.",
    items: [
      {
        title: "Your data stays yours",
        body: "We only ask for the access the job really needs, and we do not use your data for anything else.",
      },
      {
        title: "Not everything is worth automating",
        body: "If your task is quicker to do by hand, or the result is not worth it, we will tell you plainly.",
      },
      {
        title: "About price",
        body: "Priced per project, depending on what you need. Ask us on WhatsApp.",
      },
    ],
  },
  cta: {
    label: "Start",
    titleA: "Have work you would like to automate?",
    titleB: "Just tell us about it first.",
    body: "No need to know the technical words. Describe the work in your own words, and we will help find a way.",
    button: "Ask on WhatsApp",
    message: "Hi Nanashi Software, I would like to ask about automation for my work.",
  },
};

export const AUTOMATION: Record<Locale, AutomationCopy> = { id, en };
