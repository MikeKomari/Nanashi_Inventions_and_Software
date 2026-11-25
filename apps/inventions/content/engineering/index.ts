// Engineering articles (W-06, W-14). Each entry's body is an MDX file in this folder.
// toc lists the article's h2 headings in order; their ids are slugify(title).
import type { ComponentType } from "react";
import ChromiqUrlInspector from "./chromiq-url-inspector.mdx";
import LexiCopyPaste from "./lexi-copy-paste-enrichment.mdx";

export type Article = {
  slug: string;
  title: string;
  summary: string;
  invention: "chromiq" | "lexi";
  product: string;
  accent: "comet" | "tide";
  topic: string;
  date: string; // ISO
  minutes: number;
  toc: string[];
  Body: ComponentType;
};

export const ARTICLES: Article[] = [
  {
    slug: "chromiq-url-inspector",
    title: "How CHROMIQ's URL inspector loads other websites safely",
    summary:
      "CHROMIQ fetches pages you name from its own server. This is how it refuses private addresses, connects only to the address it checked, stops after 8 seconds or 1.5 MB, and turns scripts off before anything is shown.",
    invention: "chromiq",
    product: "CHROMIQ",
    accent: "comet",
    topic: "Security",
    date: "2026-11-24",
    minutes: 8,
    toc: [
      "The feature, and the risk inside it",
      "Rule one: only public addresses",
      "The gap between checking and connecting",
      "Redirects get the same treatment",
      "A budget for time and bytes",
      "Showing the page without running it",
      "What is still open",
    ],
    Body: ChromiqUrlInspector,
  },
  {
    slug: "lexi-copy-paste-enrichment",
    title: "Why LEXI has no AI connection and uses a copy/paste step instead",
    summary:
      "LEXI never calls a model. It writes a plain-language prompt you can take to any AI tool, then validates the JSON you paste back, field by field, before anything is saved. This is the trade-off, and how the boundary works.",
    invention: "lexi",
    product: "LEXI",
    accent: "tide",
    topic: "Product design",
    date: "2026-11-24",
    minutes: 7,
    toc: [
      "The job: turn a word into an entry",
      "Why not just call a model",
      "The boundary, step by step",
      "A prompt written for people and models",
      "Checking what comes back",
      "What it costs",
    ],
    Body: LexiCopyPaste,
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
