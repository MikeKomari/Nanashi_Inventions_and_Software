// The contract every template implements so the demo route can show it.
import type { CSSProperties, ReactNode } from "react";

export type Credit = { label: string; href: string };

/** A parsed content file, ready to render. */
export type LoadedTemplate = {
  lang: string;
  title: string;
  description: string;
  name: string;
  /** Used for the generated favicon. */
  accent: string;
  onAccent: string;
  /** next/font variables for the template's own fonts. */
  fontClassName: string;
  /** The client's colours as CSS variables, set on <body>. */
  bodyStyle: CSSProperties;
  page: ReactNode;
  /** What the demo bar's "Coba dengan usahamu" panel may change. */
  tryIt: TryItConfig;
};

/** The accent colour a visitor can pick, and the colours it must stay readable on (4.5:1). */
export type TryItConfig = {
  /** CSS variable on <body> holding the accent, e.g. "--kafe-accent". */
  accentVar: string;
  /** CSS variable for text on the accent, e.g. "--kafe-on-accent". */
  onAccentVar: string;
  /** #RRGGBB colours the accent is used on as text (the schema's ["accent", x] contrast pairs). */
  contrastAgainst: string[];
};

export type TemplateKind = {
  /** Validates the content (throws a readable error at build time) and prepares the page. */
  load(data: unknown, file: string, credit?: Credit): LoadedTemplate;
};
