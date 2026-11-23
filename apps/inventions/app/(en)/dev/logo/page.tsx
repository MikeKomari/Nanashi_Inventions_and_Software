import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";

// Review page for the animated logo (phase 2, first deliverable). Not indexed, not in the sitemap.
export const metadata: Metadata = {
  title: "Animated logo (review)",
  robots: { index: false, follow: false },
};

export default function DevLogo() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-12 px-4 py-16 sm:px-8">
      <header>
        <p className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">Review · /dev/logo</p>
        <h1 className="mt-2 text-3xl">Animated Comet Orbit</h1>
        <p className="mt-2 max-w-prose text-text-muted">
          Left: the animated logo, a 7 second loop. Right: the static file it must settle on,
          nanashi-symbol-reversed.svg. With reduced motion turned on, the left one shows the static frame.
        </p>
      </header>
      <div className="grid gap-10 sm:grid-cols-2">
        <figure className="flex flex-col items-center gap-4">
          <AnimatedLogo className="size-64 sm:size-80" />
          <figcaption className="font-mono text-xs text-text-muted">&lt;AnimatedLogo /&gt;</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-4">
          <Image src="/brand/nanashi-symbol-reversed.svg" alt="Static Nanashi symbol" width={320} height={320} unoptimized priority className="size-64 sm:size-80" />
          <figcaption className="font-mono text-xs text-text-muted">nanashi-symbol-reversed.svg</figcaption>
        </figure>
      </div>
    </main>
  );
}
