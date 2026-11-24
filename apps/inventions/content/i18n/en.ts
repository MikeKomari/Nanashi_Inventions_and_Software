// English copy for Nanashi Inventions. Voice (B-06): calm, clear, confident, plain English, short
// sentences, no hype. One founder (B-03): say "Nanashi" or describe what the products do; no "we".
// Every fact below comes from the products' own READMEs and docs (chromiq/README.md, docs/,
// lexi/README.md, TSD.md). No invented numbers (principle 3).
// id.ts (later) mirrors this shape; the founder reviews both.
//
// Rich text: a string, or a list of strings and { text, href } links. Any "Michael Kimeison" in
// rendered copy is linked to michaelkimeison.com automatically (components/ui/RichText.tsx).

import type { ScreenName } from "@/content/screens.generated";

export type Rich = string | (string | { text: string; href: string })[];

export type ProductPoint = {
  title: string;
  body: string;
  /** Short facts set in mono under the body. */
  facts: string[];
  screen: ScreenName;
  /** "phone" frames a mobile screenshot narrower. */
  frame?: "desktop" | "phone";
};

export type ProductCopy = {
  id: "chromiq" | "lexi";
  name: string;
  audience: string;
  oneLiner: string;
  status: string;
  tryLabel: string;
  readMore: string;
  hero: { desktop: ScreenName; phone: ScreenName };
  points: ProductPoint[];
};

const CHROMIQ_URL = "https://prism-gamma-three.vercel.app/";
const LEXI_INBOX_URL = "https://lexi-beta-nine.vercel.app/inbox";

export const en = {
  locale: "en" as "en" | "id",
  meta: {
    homeTitle: "Nanashi: an independent product lab",
    homeDescription:
      "Nanashi is an independent product lab founded by Michael Kimeison. Two products are in production: Chromiq, a design workbench for frontend developers, and Lexi, a local-first vocabulary workspace for Chinese, Japanese and Korean.",
  },
  nav: {
    inventions: "Inventions",
    engineering: "Engineering",
    about: "About",
    primary: "Main",
    switchLabel: "ID",
    switchAria: "ID, baca dalam Bahasa Indonesia",
    software: "Need a website?",
    softwareTarget: "Nanashi Software",
    skip: "Skip to content",
    home: "Nanashi, home",
  },
  hero: {
    title: "An independent product lab.",
    lead: "Nanashi builds its own software, starting from real problems. Two products are in production today.",
    cta: "See the inventions",
    email: "Email Nanashi",
    showcaseLabel: "Live now",
    showcaseJump: "see its chapter",
  },
  statement: {
    label: "What Nanashi is",
    text: "Nanashi is an independent product lab. It starts from a real problem, ships something small, then makes it better. Chromiq helps frontend developers build a design system that holds up in code. Lexi keeps Chinese, Japanese and Korean vocabulary on your own device. No invented numbers, and your data stays yours.",
    // Words that wash to a product accent instead of the text colour.
    highlights: { Chromiq: "var(--color-accent-comet)", Lexi: "var(--color-accent-tide)" } as Record<string, string>,
  },
  inventions: {
    label: "Inventions",
    title: "Two products in production.",
    lead: "Both run in the browser with no account needed. Each is documented, tested and still improving.",
    traction: "No public usage figures yet.",
    newTab: "(opens in a new tab)",
    pointsLabel: "What it does",
  },
  products: [
    {
      id: "chromiq",
      name: "Chromiq",
      audience: "For frontend developers",
      oneLiner:
        "A design workbench in the browser: tune colours, type and spacing live, check contrast, and export the code your stack already uses.",
      status: "In production",
      tryLabel: "Try Chromiq",
      readMore: "Read more",
      hero: { desktop: "chromiq-workspace-desktop", phone: "chromiq-workspace-mobile" },
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
    },
    {
      id: "lexi",
      name: "Lexi",
      audience: "For language learners",
      oneLiner:
        "A vocabulary workspace for Chinese, Japanese and Korean that keeps your data on your device unless you choose to sign in.",
      status: "In production",
      tryLabel: "Try Lexi",
      readMore: "Read more",
      hero: { desktop: "lexi-vocabulary-desktop", phone: "lexi-vocabulary-mobile" },
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
    },
  ] satisfies ProductCopy[],
  links: { chromiq: CHROMIQ_URL, lexi: LEXI_INBOX_URL },
  comingSoon: {
    label: "Coming soon",
    title: "Next in the lab.",
    items: [
      { id: "studio", name: "Nanashi Studio", line: "AI product photos and listing text for Shopee sellers.", accent: "nova" },
      { id: "home", name: "Nanashi Home", line: "House and room redesigns with a rough cost estimate.", accent: "orbit" },
    ],
    badge: "Coming soon",
  },
  stars: {
    kanji: "北斗七星",
    reading: "hokuto shichisei",
    title: "Seven stars, seven principles.",
    lead: "Nanashi comes from nana hoshi, seven stars. Together they form the Big Dipper, and each one stands for a rule Nanashi builds by, in the traditional order from Dubhe to Alkaid.",
    constellationLabel:
      "The Big Dipper drawn with seven gold stars from the Nanashi logo. Each star lights as its principle scrolls past.",
    starNames: ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"],
    principles: [
      {
        title: "Start from a real problem",
        proof: "Chromiq answers a question frontend developers face daily: will these colours, type and spacing hold up in code? Lexi answers a learner's: where do three languages of vocabulary live together?",
      },
      {
        title: "Ship small, then improve",
        proof: "Chromiq ships in small releases and writes each one up in its public changelog. Lexi's README lists what works today and, just as plainly, what is not built yet.",
      },
      {
        title: "No invented numbers",
        proof: "Lexi's dashboard still shows placeholder figures, so “Try Lexi” opens the Inbox instead. This site shows no usage figures until there are real ones.",
      },
      {
        title: "Your data stays yours",
        proof: "Chromiq saves your work in your browser and Lexi keeps your words in IndexedDB on your device. In both, an account is optional and only adds sync.",
      },
      {
        title: "Accessible by default",
        proof: "Chromiq grades every colour pair against WCAG and offers a high-contrast reading mode. This site keeps text at 4.5:1 or better and turns its motion off when your device asks.",
      },
      {
        title: "Simple beats clever",
        proof: "Lexi has no model API. A copy and paste step does the same job with no keys to leak, no running cost, and nothing sent without you seeing it.",
      },
      {
        title: "Built to last: documented and tested",
        proof: "Lexi's domain, storage and screens are covered by unit tests. Chromiq keeps architecture decision records, a runbook, a failure-modes guide and postmortems.",
      },
    ],
  },
  engineering: {
    label: "Engineering",
    title: "How the products are built.",
    lead: "Deep dives into the decisions behind each product. No posting schedule: an article is written when there is something worth explaining.",
    read: "Read the deep dive",
    articles: [
      {
        slug: "chromiq-url-inspector",
        product: "Chromiq",
        accent: "comet",
        topic: "Security",
        title: "How Chromiq's URL inspector loads other websites safely",
        summary:
          "Chromiq fetches pages you name from its own server. The article walks through how it refuses private addresses, connects only to the address it checked, stops after 8 seconds or 1.5 MB, and turns scripts off before anything is shown.",
      },
      {
        slug: "lexi-copy-paste-enrichment",
        product: "Lexi",
        accent: "tide",
        topic: "Product design",
        title: "Why Lexi has no AI connection and uses a copy/paste step instead",
        summary:
          "Lexi never calls a model. It writes a plain-language prompt you can take to any AI tool, then validates the JSON you paste back, field by field, before anything is saved. The article explains the trade-off.",
      },
    ],
  },
  close: {
    title: "Try one. Then say hello.",
    body: "Both products run in the browser with no account needed. Questions, ideas or an introduction: one email reaches the founder directly.",
    email: "Email Nanashi",
  },
  faq: {
    title: "Questions from investors and recruiters",
    items: [
      {
        q: "What is Nanashi?",
        a: "An independent product lab. It builds and runs its own software products, starting from real problems and shipping them small. The name comes from the Japanese nana hoshi, seven stars, which also gives Nanashi its seven principles.",
      },
      {
        q: "Who is behind it?",
        a: "One person: Nanashi was founded by Michael Kimeison, who designs, builds and runs every product. There is no team behind the name, and the site doesn't pretend otherwise.",
      },
      {
        q: "Which products are live?",
        a: [
          "Two, both in production: ",
          { text: "Chromiq", href: CHROMIQ_URL },
          ", a design workbench for frontend developers, and ",
          { text: "Lexi", href: LEXI_INBOX_URL },
          ", a vocabulary workspace for Chinese, Japanese and Korean. Nanashi Studio and Nanashi Home are next.",
        ],
      },
      {
        q: "Do the products use AI?",
        a: "Chromiq doesn't: its contrast grades, palettes and exports are plain colour maths and code generation. Lexi has no AI connection either. It writes a prompt you can paste into any AI tool you choose, then validates the answer you paste back. Nanashi Studio, when it ships, will use AI to make product photos and listing text.",
      },
      {
        q: "How is user data handled?",
        a: "Local first. Chromiq saves projects in your browser's storage and Lexi keeps your words in IndexedDB on your device. Accounts are optional in both and only add sync between devices. In Lexi, nothing leaves the browser until you sign in, and logging out stops sync.",
      },
      {
        q: "Is there traction to share?",
        a: "No public usage figures yet. Nanashi doesn't publish estimates; real numbers will appear on each product's page once they exist.",
      },
      {
        q: "What is the stack?",
        a: "TypeScript, React and Next.js across the products, with Tailwind CSS and the Motion library on the front end. Lexi validates data with zod and stores it in IndexedDB; optional accounts in both products use self-hosted Postgres. Chromiq's inspector and proxy run as server routes with SSRF protection and rate limits.",
      },
      {
        q: "What's next?",
        a: "Two new products: Nanashi Studio, AI product photos and listing text for Shopee sellers, and Nanashi Home, house and room redesigns with a rough cost estimate.",
        // TODO(founder): add Lexi's and Chromiq's next milestones once confirmed (Lexi's README and
        // its deployed app disagree on review and backup status, so neither is named here).
      },
      {
        q: "How do I get in touch?",
        a: [
          "Email ",
          { text: "michaelk.projects@gmail.com", href: "mailto:michaelk.projects@gmail.com" },
          ". It goes straight to the founder. For a closer look at the work, see ",
          { text: "GitHub", href: "https://github.com/MikeKomari" },
          " or ",
          { text: "LinkedIn", href: "https://www.linkedin.com/in/michkimei" },
          ".",
        ],
      },
    ],
  },
  softwareBand: {
    label: "Nanashi Software",
    title: "Need a website?",
    body: "Nanashi Software builds websites for cafés, restaurants and small businesses: start from a ready-made template, or ask for a custom build.",
    cta: "Visit Nanashi Software",
  },
  footer: {
    tagline: "An independent product lab.",
    pages: "Pages",
    contact: "Contact",
    founded: "Founded by Michael Kimeison",
    email: "Email",
    language: "Language",
    english: "English",
    indonesian: "Bahasa Indonesia",
  },
};

export type Copy = typeof en;
