import type { Metadata } from "next";
import Link from "next/link";
import { id as t } from "@/content/site/id";
import { SiteShell } from "@/components/site/SiteShell";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { TwoTone } from "@/components/site/SectionLabel";
import "@/styles/site.css";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan · Nanashi Software",
  robots: { index: false, follow: true },
};

/** One 404 for the whole app, in Indonesian with an English line. */
export default function GlobalNotFound() {
  return (
    <SiteShell t={t}>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <p className="text-sm font-semibold tracking-[0.06em] text-text-muted uppercase tabular-nums">404</p>
          <TwoTone as="h1" a="Halaman ini tidak ditemukan." b="Mungkin alamatnya sudah berubah." className="mt-3 text-[34px] leading-[1.1] sm:text-[52px]" />
          <p className="mt-4 text-text-muted" lang="en">This page doesn&apos;t exist.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/" className="inline-flex min-h-11 items-center font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:text-primary-hover">
              Kembali ke beranda
            </Link>
            <Link href="/template" className="inline-flex min-h-11 items-center font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:text-primary-hover">
              Lihat template
            </Link>
            <Link href="/en" lang="en" className="inline-flex min-h-11 items-center text-text-muted underline underline-offset-4 hover:text-text">
              English
            </Link>
          </div>
          <WhatsAppButton where="not_found" message={t.hero.ctaMessage} className="mt-8">
            {t.hero.cta}
          </WhatsAppButton>
        </div>
      </section>
    </SiteShell>
  );
}
