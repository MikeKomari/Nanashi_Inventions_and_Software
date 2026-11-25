"use client";

import { useState } from "react";
import Image from "next/image";

type Shot = { src: string; alt: string };

/** The card's picture. With a before image, two buttons (aria-pressed) switch between Sebelum and Sesudah. */
export function BeforeAfter({ after, before, labels }: { after: Shot; before?: Shot; labels: { group: string; before: string; after: string } }) {
  const [showBefore, setShowBefore] = useState(false);
  const shot = before && showBefore ? before : after;
  const btn = "press min-h-11 rounded-sm px-4 text-sm font-semibold";
  return (
    <div>
      <div className="overflow-hidden rounded-sm border border-border bg-surface-raised">
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          width={1600}
          height={1200}
          sizes="(min-width: 1200px) 560px, (min-width: 768px) 46vw, 92vw"
          unoptimized={shot.src.endsWith(".svg")}
          className="block aspect-[4/3] h-auto w-full object-cover"
        />
      </div>
      {before && (
        <div role="group" aria-label={labels.group} className="mt-3 inline-flex gap-1 rounded-md border border-border bg-surface p-1">
          {([false, true] as const).map((b) => {
            const on = showBefore === b;
            return (
              <button
                key={String(b)}
                type="button"
                aria-pressed={on}
                onClick={() => setShowBefore(b)}
                className={`${btn} ${on ? "bg-text text-surface" : "text-text-muted hover:text-text"}`}
              >
                {b ? labels.before : labels.after}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
