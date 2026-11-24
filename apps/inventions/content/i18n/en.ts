// English copy for Nanashi Inventions. Voice (B-06): calm, clear, confident, plain English, short
// sentences, no hype. Say "Nanashi"; no "we". Founded by one person today (B-03), but never framed
// as "a lab of one": the team is meant to grow (founder, 24 Nov 2026).
// Home copy is about Nanashi itself and stays general (founder, 24 Nov 2026): product facts live in
// content/inventions.ts and on each invention's page. No invented numbers (principle 3).
// id.ts (later) mirrors this shape; the founder reviews both.
//
// Rich text: a string, or a list of strings and { text, href } links. Any "Michael Kimeison" in
// rendered copy is linked to michaelkimeison.com automatically (components/ui/RichText.tsx).

export type Rich = string | (string | { text: string; href: string })[];

export const en = {
  locale: "en" as "en" | "id",
  meta: {
    homeTitle: "Nanashi Inventions: an independent product lab",
    homeDescription:
      "Nanashi is an independent product lab founded by Michael Kimeison. Its name comes from nana hoshi, seven stars, and every invention is built by seven principles.",
    inventionsTitle: "Inventions · Nanashi",
    inventionsDescription: "Every product Nanashi has built, live and in the lab, each with its story, a demo and real screenshots.",
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
    lead: "Nanashi designs, builds and runs its own software, starting from real problems and guided by seven principles.",
    cta: "See the inventions",
    email: "Email Nanashi",
  },
  name: {
    label: "The name",
    title: "Nanashi means seven stars.",
    // The two words that become the name. "ho" is the part that falls away.
    nana: { kanji: "七", reading: "nana", meaning: "seven" },
    hoshi: { kanji: "星", reading: "hoshi", meaning: "star" },
    body: "The name comes from the Japanese nana hoshi, 七星: seven stars. Say it quickly and it becomes Nanashi. Seven stars make the Big Dipper, the shape people have steered by for centuries, and each star stands for one principle Nanashi builds by.",
    note: "Not 名無し, “nameless”, which happens to sound the same.",
    logo: "The logo is a gold star breaking out of its orbit. It is the same star that marks each principle below.",
  },
  stars: {
    kanji: "北斗七星",
    reading: "hokuto shichisei",
    title: "Seven stars, seven principles.",
    lead: "Every invention is held to the same seven rules, one for each star of the Big Dipper, from Dubhe to Alkaid.",
    constellationLabel:
      "The Big Dipper drawn with seven gold stars from the Nanashi logo. Each star lights as its principle scrolls past.",
    starNames: ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"],
    principles: [
      {
        title: "Start from a real problem",
        proof: "Every invention begins with a problem people already have, not with a technology looking for a use.",
      },
      {
        title: "Ship small, then improve",
        proof: "The first release does one thing well. Each release after it is small, written down and easy to undo.",
      },
      {
        title: "No invented numbers",
        proof: "No made-up figures, ratings or user counts, anywhere. If a number is shown, it is real.",
      },
      {
        title: "Your data stays yours",
        proof: "Data lives on your device by default. Anything that leaves it is your choice, made in plain sight.",
      },
      {
        title: "Accessible by default",
        proof: "Readable contrast, keyboard access and respect for reduced motion are in the first version, not a later fix.",
      },
      {
        title: "Simple beats clever",
        proof: "The plainest design that solves the problem wins. Every extra part has to earn its place.",
      },
      {
        title: "Built to last: documented and tested",
        proof: "Decisions are written down and behaviour is tested, so each invention can be understood, fixed and kept running.",
      },
    ],
  },
  how: {
    label: "How Nanashi builds",
    // TODO(founder): this section is held back from the home page; the founder will supply the wording.
    title: "How Nanashi builds.",
    lead: "The way of working is the same for each invention.",
    steps: [
      { title: "Find the problem", body: "Start with someone who has the problem today, and write down what would make it go away." },
      { title: "Ship the smallest useful thing", body: "Release the one part that already helps, in the browser, with no account needed where possible." },
      { title: "Improve in the open", body: "Small releases, each written up. Decisions are recorded so the reasons outlive the moment." },
      { title: "Keep it running", body: "Tests, documentation and a plan for when things fail, so an invention stays useful after launch." },
    ],
  },
  inventions: {
    label: "Inventions",
    title: "Things Nanashi has made.",
    lead: "Each one starts from a real problem and ships small. Open one for its story, a demo and real screenshots.",
    live: "In production",
    lab: "In the lab",
    explore: "Explore",
    all: "All inventions",
    traction: "No public usage figures yet.",
    newTab: "(opens in a new tab)",
    // Plain strings only: this object reaches client components, which cannot receive functions.
    countLive: "live",
    countLab: "in the lab",
    pageTitle: "Inventions",
    pageLead: "Everything Nanashi has built so far, and what is in the lab next. Live inventions run in your browser today.",
  },
  invention: {
    back: "All inventions",
    nameLabel: "The name",
    demoLabel: "Demo",
    storyLabel: "The story",
    story: { problem: "The problem", whatItDoes: "What it does", underTheHood: "Under the hood", result: "Result" },
    pointsLabel: "What it does",
    galleryLabel: "Screens",
    galleryTitle: "Real screenshots from the live app.",
    tractionLabel: "Traction",
    engineeringLabel: "Engineering deep dive",
    next: "Next invention",
    videoFallback: "Your browser can't play this video. The screenshots below show the same screens.",
  },
  engineering: {
    label: "Engineering",
    title: "How the inventions are built.",
    lead: "Deep dives into the decisions behind each invention. No posting schedule: an article is written when there is something worth explaining.",
    read: "Read the deep dive",
  },
  founder: {
    label: "Founder",
    text: "Founded by Michael Kimeison.",
    body: "For investors and recruiters: one email reaches the founder directly.",
    email: "Email Nanashi",
    about: "About Nanashi",
  },
  about: {
    metaTitle: "About · Nanashi",
    metaDescription: "The team behind Nanashi, an independent product lab founded by Michael Kimeison, and the seven principles every invention is built by.",
    label: "About",
    title: "The people behind Nanashi.",
    lead: "Nanashi is an independent product lab. It starts small and is built to grow: every invention is held to the same seven principles, whoever builds it.",
    teamLabel: "Team",
    teamTitle: "Who builds Nanashi.",
    members: [
      {
        name: "Michael Kimeison",
        role: "Founder",
        // TODO(founder): bio facts to follow. Photo: a placeholder image is planned (file not yet supplied).
        bio: "",
        initials: "MK",
        photo: null as string | null,
        links: [
          { label: "Website", href: "https://michaelkimeison.com" },
          { label: "GitHub", href: "https://github.com/MikeKomari" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/michkimei" },
        ],
      },
    ],
    bioPending: "Bio coming soon.",
    openRole: {
      tag: "Open role",
      title: "Your seat at Nanashi",
      body: "Roles will be listed here when they open. If Nanashi's principles sound like how you work, say hello anyway.",
      cta: "Email Nanashi",
    },
    openRoles: 2,
    principlesLabel: "Principles",
    principlesTitle: "Seven stars, seven rules.",
    principlesLead: "The same seven principles apply to every invention and everyone who builds one.",
    investorsLabel: "Investors and recruiters",
    investorsTitle: "Questions, answered plainly.",
    faq: [
      {
        q: "What is Nanashi?",
        a: "An independent product lab. It builds and runs its own software products, starting from real problems and shipping them small. The name comes from the Japanese nana hoshi, seven stars, which also gives Nanashi its seven principles.",
      },
      {
        q: "Who is behind it?",
        a: "Nanashi was founded by Michael Kimeison, who leads it today. The team is meant to grow; open roles will be listed on this page.",
      },
      {
        q: "Which inventions are live?",
        a: [
          "Two are in production: ",
          { text: "Chromiq", href: "/inventions/chromiq" },
          ", a design workbench for frontend developers, and ",
          { text: "Lexi", href: "/inventions/lexi" },
          ", a vocabulary workspace for Chinese, Japanese and Korean. Nanashi Studio and Nanashi Home are in the lab.",
        ],
      },
      {
        q: "Is there traction to share?",
        a: "No public usage figures yet. Nanashi doesn't publish estimates; real numbers will appear on each invention's page once they exist.",
      },
      {
        q: "How do I get in touch?",
        a: [
          "Email ",
          { text: "michaelk.projects@gmail.com", href: "mailto:michaelk.projects@gmail.com" },
          ". It goes straight to the founder.",
        ],
      },
    ] as { q: string; a: Rich }[],
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
