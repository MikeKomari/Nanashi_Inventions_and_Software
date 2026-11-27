// English copy for the Nanashi Software site. Mirrors id.ts exactly (same shape, checked by SiteCopy).
// Voice: "you" and "we", warm and plain, no jargon. Template demos stay Indonesian (they are Indonesian businesses).
import type { FaqItem, SiteCopy } from "./id";

export const en: SiteCopy = {
  locale: "en",
  meta: {
    homeTitle: "Websites for Cafés and Small Businesses in Indonesia | Nanashi Software",
    homeDescription:
      "Nanashi Software makes websites for cafés, warungs and small businesses. Pick a template, send your business details on WhatsApp, and your website is ready to share with customers.",
    templatesTitle: "Website Templates for Cafés, Warungs and Small Businesses | Nanashi Software",
    templatesDescription:
      "Five website templates for cafés, restaurants, bakeries, small shops and service businesses. Try the demos, then order on WhatsApp.",
    aboutTitle: "About Nanashi Software",
    aboutDescription:
      "Nanashi Software makes websites for cafés, warungs and small businesses in Indonesia. Part of Nanashi, founded by Michael Kimeison.",
  },
  nav: {
    home: "Home",
    templates: "Templates",
    about: "About",
    switchLabel: "ID",
    switchAria: "Baca halaman ini dalam Bahasa Indonesia",
    skip: "Skip to content",
    primary: "Main",
    homeAria: "Nanashi Software, home",
  },
  hero: {
    titleA: "Websites for cafés, warungs and small businesses,",
    titleB: "so customers find you easily.",
    lead: "Pick a template that fits, send your business details on WhatsApp, and we handle the rest. No tech skills needed.",
    cta: "Chat on WhatsApp",
    ctaMessage: "Hi Nanashi Software, I'd like to ask about a website for my business.",
    secondary: "See the templates",
    illustration: "Line drawing of a street with five shops: a café, a warung, a bakery, a small shop and a barbershop.",
  },
  why: {
    label: "Why a website",
    titleA: "Instagram for daily stories.",
    titleB: "A website for what must always be right.",
    intro:
      "Your menu, prices, opening hours and location in one tidy address. Customers don't have to scroll through old posts to find them.",
    points: [
      {
        title: "Found on Google",
        body: "People looking for a café or warung nearby can find your business, even if they don't follow your account yet.",
      },
      {
        title: "The menu is always current",
        body: "Menu and prices live on one page, so customers see what's valid today, not a menu photo from last year.",
      },
      {
        title: "Looks more trustworthy",
        body: "A website with its own address makes your business look serious, especially to new customers.",
      },
    ],
  },
  templates: {
    label: "Templates",
    titleA: "Pick a look",
    titleB: "that suits your business.",
    intro: "Each template has its own design. Try the demo first, then order on WhatsApp when it feels right.",
    live: "Demo ready",
    soon: "Coming soon",
    viewDemo: "View demo",
    order: "Order on WhatsApp",
    ask: "Ask about this template",
    previewPending: "Preview coming",
    previewAlt: (name: string) => `The ${name} template's demo page`,
    customTitle: "Nothing quite right?",
    customBody: "We can also make a website with a custom design for your business.",
    customLink: "See custom design",
    orderMessage: (name: string) => `Hi Nanashi Software, I'm interested in the ${name} template.`,
    askMessage: (name: string) =>
      `Hi Nanashi Software, I'm interested in the ${name} template. Please let me know when it's ready.`,
  },
  templatePage: {
    titleA: "Five templates,",
    titleB: "one for each kind of business.",
    intro:
      "Open a demo and try it the way your customers will. The ones marked “Coming soon” are being made; ask on WhatsApp if you'd like one early.",
  },
  about: {
    label: "About",
    titleA: "We make websites",
    titleB: "for small businesses in Indonesia.",
    intro:
      "Nanashi Software helps cafés, warungs and small businesses get a tidy website: menu, prices, opening hours and location at one address, plus a WhatsApp order button.",
    valuesLabel: "How we work",
    valuesTitleA: "Simple for you,",
    valuesTitleB: "tidy behind the scenes.",
    values: [
      {
        title: "Plain language",
        body: "We explain everything without technical terms. When one can't be avoided, we explain what it means.",
      },
      {
        title: "Quick to open on a phone",
        body: "Our templates are designed for phone screens first and kept light, so they open quickly even on a weak signal.",
      },
      {
        title: "Everything on WhatsApp",
        body: "Ask, order, send your business details, request changes: all on WhatsApp. No new account or app needed.",
      },
    ],
    peopleLabel: "Behind Nanashi Software",
    partOfTitle: "Part of Nanashi.",
    partOfBody:
      "Nanashi Software is part of Nanashi, an independent product lab that also makes digital products such as CHROMIQ and LEXI. What we learn building those goes into every website.",
    partOfLink: "See Nanashi Inventions",
    founderRole: "Founder",
    founderBody: "Founded Nanashi and leads Nanashi Software.",
    founderLink: "Meet Michael",
  },
  steps: {
    label: "How it works",
    titleA: "Three steps,",
    titleB: "nothing technical.",
    items: [
      { title: "Pick a template", body: "Look at the demos and pick the one that suits your business best." },
      {
        title: "Send your details",
        body: "On WhatsApp: business name, logo, photos, menu and prices, opening hours and address.",
      },
      {
        title: "Your website goes live",
        body: "We set everything up. Your website is online (anyone can open it) and ready to share with customers.",
      },
    ],
  },
  custom: {
    label: "Custom design",
    titleA: "Have your own idea?",
    titleB: "We can build it from scratch.",
    body: "If no template fits, tell us about your business and what you want. We'll make a website with a design made for you.",
    cta: "Tell us what you need",
    ctaMessage: "Hi Nanashi Software, I'd like a website with a custom design for my business.",
  },
  faq: {
    label: "Questions",
    titleA: "What people ask",
    titleB: "before starting.",
    items: [
      {
        q: "How much does it cost?",
        a: "We're preparing a price list. For now, ask us on WhatsApp and we'll explain the cost for your business.",
        todo: "Pricing is parked (BP-04). Founder to confirm the answer.",
      },
      {
        q: "How long until my website is ready?",
        a: "It depends on the template and how complete your business details are. Ask on WhatsApp and we'll give an estimate once we see what you need.",
        todo: "No turnaround time decided. Founder to confirm.",
      },
      {
        q: "What do I need to prepare?",
        a: "Your business name, logo (if you have one), a few photos, menu and prices, opening hours, address and a WhatsApp number for orders.",
      },
      {
        q: "I'm not good with technology. Can I still do this?",
        a: "Yes. You just send your business details on WhatsApp. We take care of the technical side.",
      },
      {
        q: "Are the domain and hosting included?",
        a: "The domain (your website's address) and hosting (where the website is stored) are being finalised together with the price list. Ask on WhatsApp for the current terms.",
        todo: "Hosting and domain terms are parked (BP-04). Founder to confirm.",
      },
      {
        q: "Can I change the menu or prices later?",
        a: "Yes. Send the changes on WhatsApp and we'll update them for you.",
        todo: "How clients update content is parked (BP-05). Founder to confirm.",
      },
      {
        q: "Can customers order through the website?",
        a: "Yes, through the WhatsApp button. Orders arrive in your WhatsApp with the message already filled in. Online payment isn't available yet.",
      },
    ] satisfies FaqItem[] as FaqItem[],
  },
  band: {
    titleA: "It starts with one message.",
    titleB: "We help until your website is live.",
    cta: "Chat on WhatsApp",
    ctaMessage: "Hi Nanashi Software, I'd like to start making a website for my business.",
    emailLead: "Prefer email?",
  },
  demo: {
    bar: (name: string) => `This is a demo of the ${name} template`,
    cta: "Order this template",
    home: "Nanashi Software",
    credit: "Made by Nanashi Software",
    titleSuffix: (name: string) => `${name} template demo`,
  },
  footer: {
    tagline: "Websites for cafés, warungs and small businesses in Indonesia.",
    partOf: "Part of Nanashi, founded by",
    pages: "Pages",
    contact: "Contact",
    inventions: "Nanashi Inventions",
    builtBy: "Built by the team behind",
    builtByAnd: "and",
  },
};
