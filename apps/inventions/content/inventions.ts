// Every Nanashi invention in one place. The home grid, /inventions and each /inventions/<slug> page
// read from here, so adding an invention means adding one entry (and its screenshots/video).
// Facts come from each product's own README and docs. No invented numbers (principle 3).
// Order = display order. Live inventions get a page; "lab" ones get a card only (W-03).

import type { ScreenName } from "@/content/screens.generated";

export type Accent = "comet" | "tide" | "nova" | "orbit";

export type InventionPoint = {
  title: string;
  body: string;
  /** Short facts set in mono under the body. */
  facts: string[];
  screen: ScreenName;
  frame?: "desktop" | "phone";
};

type Base = {
  slug: string;
  name: string;
  accent: Accent;
  /** Who it is for, e.g. "For frontend developers". */
  audience: string;
  oneLiner: string;
  /**
   * Where the name comes from. `letters` spells it out letter by letter when the name is built that
   * way: [letter, word], where the letter is highlighted at its first occurrence in the word
   * (so ["X", "eXpression"] highlights the x inside the word).
   */
  meaning: { teaser: string; body: string; letters?: [string, string][] };
};

export type LiveInvention = Base & {
  status: "live";
  url: string;
  tryLabel: string;
  cover: ScreenName;
  phone: ScreenName;
  video: { src: string; poster: string; caption: string };
  /** The story, in the same order as the social posts (W-05). */
  story: { problem: string; whatItDoes: string; underTheHood: string; result: string };
  points: InventionPoint[];
  gallery: { screen: ScreenName; frame?: "desktop" | "phone" }[];
  /** Slug of its Engineering deep dive. */
  engineering?: { slug: string; title: string };
};

export type LabInvention = Base & { status: "lab" };

export type Invention = LiveInvention | LabInvention;

export const INVENTIONS: Invention[] = [
  {
    slug: "chromiq",
    name: "Chromiq",
    status: "live",
    accent: "comet",
    audience: "For frontend developers",
    oneLiner:
      "A design workbench in the browser: tune colours, type and spacing live, check contrast, and export the code your stack already uses.",
    meaning: {
      teaser: "Seven letters, seven parts of the workbench.",
      body: "A coined name built on chroma, Greek for colour, so a search for it finds the product and nothing else. Each of its seven letters names one part of the workbench.",
      letters: [
        ["C", "Contrast"],
        ["H", "Harmony"],
        ["R", "Radius"],
        ["O", "Output"],
        ["M", "Motion"],
        ["I", "Inspect"],
        ["Q", "Quality"],
      ],
    },
    url: "https://prism-gamma-three.vercel.app/",
    tryLabel: "Try Chromiq",
    cover: "chromiq-workspace-desktop",
    phone: "chromiq-workspace-mobile",
    video: {
      src: "/videos/chromiq.mp4",
      poster: "/videos/chromiq-poster.webp",
      caption: "Recorded from the live app: four starter systems restyle an editorial page, a SaaS landing, a dashboard and a shop, then the export panel.",
    },
    story: {
      problem:
        "A design system usually starts as a picture: swatches and type samples in a design file. Whether those colours pass contrast, or how the type holds up on a real page, only shows once someone writes the code.",
      whatItDoes:
        "Chromiq puts the token system and live pages side by side. Change a colour role, the type pairing, spacing or radius, and six preview surfaces move together. Paste a public site to try new tokens on a real layout.",
      underTheHood:
        "One token model drives every surface. Contrast is graded against WCAG as you edit. The URL inspector runs on Chromiq's own server and refuses private addresses, stops after 8 seconds or 1.5 MB, and turns scripts off.",
      result:
        "In production and free to use in the browser, with no account needed. You leave with CSS, a Tailwind v4 theme, shadcn/ui variables, design tokens or a written DESIGN.md.",
    },
    points: [
      {
        title: "Start from a real site.",
        body: "Paste a public address. Chromiq fetches it on its own server, strips the scripts and loads the copy through its proxy, so you can try new type, colour, accent and radius on a real layout and copy the override CSS. The original site is never touched.",
        facts: ["Server-validated URL inspector", "SSRF-safe", "8 s timeout", "1.5 MB cap"],
        screen: "chromiq-restyle-desktop",
      },
      {
        title: "Tune the system, not the pixels.",
        body: "One token model drives every surface: colour roles with light and dark pairs, a type pairing and scale, spacing, radius, border, shadow and motion. Change a token and six live preview surfaces move together.",
        facts: ["6 preview surfaces", "Compare mode", "Undo, snapshots, version history"],
        screen: "chromiq-workspace-desktop",
      },
      {
        title: "Know it passes before you ship it.",
        body: "Every colour pair is graded against WCAG while you edit. Failures are named, not hidden, and a one-click fix moves the smallest value that passes. Colour-vision simulation is one switch away.",
        facts: ["WCAG grade per pair", "One-click fix", "5 vision simulations"],
        screen: "chromiq-contrast-desktop",
      },
      {
        title: "Leave with code, not a screenshot.",
        body: "Export CSS custom properties, a Tailwind v4 theme, shadcn/ui variables, W3C design tokens, a portable project file or a written DESIGN.md. Failing pairs are flagged before anything downloads.",
        facts: ["CSS", "Tailwind v4", "shadcn/ui", "DTCG tokens", "DESIGN.md"],
        screen: "chromiq-export-desktop",
      },
    ],
    gallery: [
      { screen: "chromiq-landing-desktop" },
      { screen: "chromiq-workspace-desktop" },
      { screen: "chromiq-contrast-desktop" },
      { screen: "chromiq-export-desktop" },
      { screen: "chromiq-landing-mobile", frame: "phone" },
      { screen: "chromiq-workspace-mobile", frame: "phone" },
    ],
    engineering: { slug: "chromiq-url-inspector", title: "How Chromiq's URL inspector loads other websites safely" },
  },
  {
    slug: "lexi",
    name: "Lexi",
    status: "live",
    accent: "tide",
    audience: "For language learners",
    oneLiner:
      "A vocabulary workspace for Chinese, Japanese and Korean that keeps your data on your device unless you choose to sign in.",
    meaning: {
      teaser: "Language Exploration and eXpression Index.",
      // Founder, 24 Nov 2026. The X comes from eXpression.
      body: "LEXI stands for Language Exploration and eXpression Index. The X comes from expression.",
      letters: [
        ["L", "Language"],
        ["E", "Exploration"],
        ["X", "eXpression"],
        ["I", "Index"],
      ],
    },
    url: "https://lexi-beta-nine.vercel.app/inbox",
    tryLabel: "Try Lexi",
    cover: "lexi-vocabulary-desktop",
    phone: "lexi-vocabulary-mobile",
    video: {
      src: "/videos/lexi.mp4",
      poster: "/videos/lexi-poster.webp",
      caption: "Recorded from the live app: six Chinese words captured, the enrichment prompt copied, an answer pasted back, checked and applied, and the vocabulary it builds.",
    },
    story: {
      problem:
        "Learners of Chinese, Japanese and Korean collect words everywhere: a sign, a show, a chat. They end up in notes and spreadsheets, and the same idea in three languages lives in three places.",
      whatItDoes:
        "Lexi captures words first and sorts them later. Each concept holds its Chinese, Japanese and Korean entries with readings, meanings, notes and examples, and concepts link to each other.",
      underTheHood:
        "Live data sits in IndexedDB in your browser. There is no model API: Lexi writes a prompt you can take to any AI tool, then checks the JSON you paste back, field by field, before anything is saved.",
      result:
        "In production and usable without an account. Signed out, nothing leaves your device; an optional account adds sync between devices and stops when you log out.",
    },
    points: [
      {
        title: "Capture first, sort it out later.",
        body: "Paste one word or a whole list, one per line. Captures land in an inbox you can edit, tag, filter, archive and select in batches. Duplicates are skipped, so nothing is saved twice.",
        facts: ["Stored in IndexedDB", "In your browser"],
        screen: "lexi-inbox-desktop",
      },
      {
        title: "Enrichment without an AI connection.",
        body: "Lexi writes a plain-language prompt for the batch. Take it to any AI tool you like, then paste the JSON answer back. Lexi checks every field before anything is written, shows a preview, and applies it in one step.",
        facts: ["No model API", "No API keys", "Field-level validation"],
        screen: "lexi-enrich-desktop",
      },
      {
        title: "Three languages, one concept.",
        body: "Each concept holds its Chinese, Japanese and Korean entries with readings, meanings, notes and example sentences. Filter by language, tag or text, and link concepts as synonyms, antonyms or easily confused pairs.",
        facts: ["Pinyin with tone marks", "Kana", "Revised Romanisation"],
        screen: "lexi-vocabulary-desktop",
      },
      {
        title: "Your words stay on your device.",
        body: "Signed out, nothing leaves the browser. An account is optional: sign in only if you want the same words on another device. Sync runs through that account and stops when you log out.",
        facts: ["Local-first", "Accounts optional", "Works on phones"],
        screen: "lexi-inbox-mobile",
        frame: "phone",
      },
    ],
    gallery: [
      { screen: "lexi-inbox-desktop" },
      { screen: "lexi-enrich-desktop" },
      { screen: "lexi-vocabulary-desktop" },
      { screen: "lexi-inbox-mobile", frame: "phone" },
      { screen: "lexi-enrich-mobile", frame: "phone" },
      { screen: "lexi-vocabulary-mobile", frame: "phone" },
    ],
    engineering: { slug: "lexi-copy-paste-enrichment", title: "Why Lexi has no AI connection and uses a copy/paste step instead" },
  },
  {
    slug: "studio",
    name: "Nanashi Studio",
    status: "lab",
    accent: "nova",
    audience: "For Shopee sellers",
    oneLiner: "AI product photos and listing text for Shopee sellers.",
    meaning: { teaser: "A photo studio for every small shop.", body: "Named for what it replaces: a product photo studio." },
  },
  {
    slug: "home",
    name: "Nanashi Home",
    status: "lab",
    accent: "orbit",
    audience: "For homeowners",
    oneLiner: "House and room redesigns with a rough cost estimate.",
    meaning: { teaser: "Your home, redesigned.", body: "Named for the place it works on: your home." },
  },
];

export const liveInventions = () => INVENTIONS.filter((i): i is LiveInvention => i.status === "live");
export const getInvention = (slug: string) => liveInventions().find((i) => i.slug === slug);
/** Position among all inventions, 1-based, as shown on cards ("01"). */
export const inventionNumber = (slug: string) => String(INVENTIONS.findIndex((i) => i.slug === slug) + 1).padStart(2, "0");
