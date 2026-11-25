// Shared plumbing for template demo routes (/template/<slug>). Server only.
// Each template has its OWN route folder (app/(demo)/template/<slug>/) that imports only its own
// template module, so a demo page loads only that template's CSS and fonts, never another's.
import type { Metadata } from "next";
import { id as t } from "@/content/site/id";
import { BASE_PATH } from "@/lib/site";
import { DemoBar } from "@/components/demo/DemoBar";
import { TEMPLATES, type TemplateEntry } from "../registry";
import type { LoadedTemplate, TemplateKind } from "./kind";
import { RevealOnScroll } from "./RevealOnScroll";
import { Analytics } from "@vercel/analytics/next";
import { TrackClicks, TrackDemoView } from "@/components/site/TrackClicks";

export type Demo = LoadedTemplate & { entry: TemplateEntry };

/** Parses a demo's content at module scope of its route, so bad content fails `npm run build`. */
export function loadDemo(slug: string, kind: TemplateKind, content: unknown): Demo {
  const entry = TEMPLATES.find((e) => e.slug === slug);
  if (!entry?.demo) throw new Error(`Template "${slug}" has no demo entry in templates/registry.ts`);
  const loaded = kind.load(content, `content/demo/${entry.demo.content}.json`, { label: t.demo.credit, href: BASE_PATH });
  return { ...loaded, entry };
}

/** A favicon drawn from the business's initial and accent colour, so the tab never shows Nanashi's. */
function favicon(name: string, bg: string, fg: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${bg}"/><text x="32" y="44" font-family="Georgia,serif" font-size="36" font-weight="700" text-anchor="middle" fill="${fg}">${name.charAt(0).toUpperCase()}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function demoMetadata(demo: Demo): Metadata {
  return {
    title: `${demo.title} (${t.demo.titleSuffix(demo.entry.waName.id)})`,
    description: demo.description,
    // Demos are made-up businesses: keep them out of search (SD-05). No business JSON-LD either.
    robots: { index: false, follow: false },
    icons: { icon: { url: favicon(demo.name, demo.accent, demo.onAccent), type: "image/svg+xml" } },
  };
}

/** Root layout body for a demo: never loads styles/site.css or the Nanashi fonts. */
export function DemoShell({ demo, children }: { demo: Demo; children: React.ReactNode }) {
  return (
    <html lang={demo.lang} className={demo.fontClassName} suppressHydrationWarning>
      {/* This renders the demo routes' ROOT layout (called from app/(demo)/template/<slug>/layout.tsx), where <head> is correct. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Marks JS as running so scroll reveals may hide content until it is seen. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body style={demo.bodyStyle}>
        <DemoBar t={t} templateName={demo.entry.waName.id} />
        {/* data-demo: WhatsApp clicks in here are the demo business's order buttons (whatsapp_click where=demo_order). */}
        <div data-demo>{children}</div>
        <RevealOnScroll />
        <TrackClicks />
        <TrackDemoView template={demo.entry.slug} />
        <Analytics />
      </body>
    </html>
  );
}
