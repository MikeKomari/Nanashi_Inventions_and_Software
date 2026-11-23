// English UI copy for Nanashi Inventions. Voice (B-06): calm, clear, confident, plain English, no hype.
// id.ts (phase 3) mirrors this shape; the founder reviews both.

export const en = {
  locale: "en" as "en" | "id",
  meta: {
    homeTitle: "Nanashi: an independent product lab",
    homeDescription:
      "Nanashi is an independent product lab founded by Michael Kimeison. It builds its own software, starting from real problems: Chromiq for frontend developers and Lexi for vocabulary.",
  },
  nav: {
    inventions: "Inventions",
    engineering: "Engineering",
    about: "About",
    primary: "Main",
    switchLabel: "ID",
    switchAria: "Baca dalam Bahasa Indonesia",
    software: "Need a website?",
    softwareTarget: "Nanashi Software",
    skip: "Skip to content",
    home: "Nanashi, home",
  },
  hero: {
    title: "An independent product lab.",
    lead: "Nanashi builds its own software products, starting from real problems and shipping them small.",
    cta: "See the inventions",
    email: "Email us",
  },
};

export type Copy = typeof en;
