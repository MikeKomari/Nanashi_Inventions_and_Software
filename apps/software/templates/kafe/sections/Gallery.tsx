import type { KafeContent } from "../schema";
import { container, Photo, SectionHead } from "../parts";

/** Atmosphere photos: a swipeable row on phones, a staggered row on desktop. */
export function Gallery({ c }: { c: KafeContent }) {
  const { gallery } = c;
  return (
    <section aria-labelledby="suasana-title" className="py-16 sm:py-24">
      <div className={container}>
        <SectionHead tag={gallery.tag} title={gallery.title} id="suasana-title" />
      </div>
      <ul
        className={`${container} kafe-scroll-x mt-10 flex gap-3 overflow-x-auto pb-2 sm:gap-5 lg:grid lg:overflow-visible`}
        style={{ gridTemplateColumns: `repeat(${Math.min(gallery.photos.length, 4)}, minmax(0, 1fr))` }}
      >
        {gallery.photos.map((p, i) => (
          <li
            key={p.src}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className={`w-[78%] shrink-0 sm:w-[46%] lg:w-auto ${i % 2 === 1 ? "lg:mt-12" : ""}`}
          >
            <figure>
              <div className="kafe-zoom overflow-hidden rounded-kafe-sm">
                <Photo photo={p} sizes="(min-width: 1180px) 270px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 78vw" className="aspect-[3/4]" />
              </div>
              {p.caption && <figcaption className="mt-3 text-[15px] text-kafe-muted">{p.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
