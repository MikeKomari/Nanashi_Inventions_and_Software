// Root layout for template demos (/template/<slug>). Separate from app/(site)/layout.tsx on purpose:
// it never loads styles/site.css or the Nanashi fonts, only the template's own CSS and fonts
// (imported by the template module) plus the small scoped Nanashi demo bar.
import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { id as t } from "@/content/site/id";
import { DemoBar } from "@/components/demo/DemoBar";
import { getDemo } from "@/templates/demos";

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function DemoLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();
  return (
    <html lang={demo.lang} className={demo.fontClassName} suppressHydrationWarning>
      <head>
        {/* Marks JS as running so scroll reveals may hide content until it is seen. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body style={demo.bodyStyle}>
        <DemoBar t={t} templateName={demo.entry.waName.id} />
        {children}
      </body>
    </html>
  );
}
