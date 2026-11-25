import type { Metadata } from "next";
import Link from "next/link";
import { en } from "@/content/i18n/en";
import { RootShell } from "@/components/layout/RootShell";
import "@/styles/site.css";

export const metadata: Metadata = {
  title: "Page not found · Nanashi",
  description: "This page isn't among the stars. Halaman ini tidak ditemukan.",
  robots: { index: false, follow: true },
};

// Seven stars of the Big Dipper, plus one dashed outline where an eighth would be: the missing page.
const STARS: [number, number][] = [
  [292, 25], [295, 86], [209, 117], [174, 79], [110, 91], [60, 103], [22, 168],
];

/** One 404 for the whole site (both root layouts). The message is in English and Indonesian. */
export default function GlobalNotFound() {
  return (
    <RootShell t={en}>
      <section className="nf wrap" aria-labelledby="nf-title">
        <svg viewBox="0 0 360 200" className="nf-sky" aria-hidden="true">
          <polyline points={STARS.map(([x, y]) => `${x},${y}`).join(" ")} className="nf-line" />
          <polyline points={`${STARS[3]![0]},${STARS[3]![1]} ${STARS[0]![0]},${STARS[0]![1]}`} className="nf-line" />
          {STARS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={4} className="nf-star" style={{ "--i": i } as React.CSSProperties} />
          ))}
          <circle cx={335} cy={150} r={9} className="nf-missing" />
          <text x={335} y={155} className="nf-q">?</text>
        </svg>
        <p className="eyebrow">404</p>
        <h1 id="nf-title" className="section-title">
          This page isn&apos;t among the stars.
        </h1>
        <p className="section-lead" lang="id">
          Halaman ini tidak ditemukan.
        </p>
        <div className="nf-actions">
          <Link href="/" className="btn-primary">
            Back to Nanashi
          </Link>
          <Link href="/inventions" className="link-arrow">
            See the inventions
          </Link>
          <Link href="/id" className="link-quiet" lang="id">
            Ke beranda
          </Link>
        </div>
      </section>
    </RootShell>
  );
}
