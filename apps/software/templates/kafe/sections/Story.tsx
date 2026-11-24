import type { KafeContent } from "../schema";
import { container, Photo, SectionHead } from "../parts";

export function Story({ c }: { c: KafeContent }) {
  return (
    <section id="cerita" aria-labelledby="cerita-title" className={`${container} py-12 sm:py-24`}>
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
        <div data-reveal className="kafe-zoom overflow-hidden rounded-kafe">
          <Photo
            photo={c.story.photo}
            sizes="(min-width: 1180px) 500px, (min-width: 1024px) 42vw, 92vw"
            className="aspect-[4/3] lg:aspect-[4/5]"
          />
        </div>
        <div>
          <SectionHead tag={c.story.tag} title={c.story.title} id="cerita-title" />
          <div className="mt-6 space-y-4 text-[17px] text-kafe-muted" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {c.story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
