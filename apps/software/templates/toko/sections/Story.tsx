import type { TokoContent } from "../schema";
import { container, Photo, Pill } from "../parts";

/** A big panel in the hero colour holding the shop's story card and a row of small photo cards. */
export function Story({ c }: { c: TokoContent }) {
  return (
    <section id="cerita" className="scroll-mt-4 px-2 py-16 sm:px-3 sm:py-24" aria-labelledby="cerita-judul">
      <div className="rounded-toko bg-toko-hero py-10 sm:py-16">
        <div className={container}>
          <div className="grid overflow-hidden rounded-toko-sm bg-toko-panel md:grid-cols-2" data-reveal>
            <Photo photo={c.story.photo} sizes="(min-width: 768px) 590px, 94vw" className="aspect-[4/3] md:aspect-auto md:min-h-[460px]" />
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
              <div>
                <Pill>{c.story.tag}</Pill>
              </div>
              <h2 id="cerita-judul" className="toko-display toko-display-md text-toko-text">
                {c.story.title}
              </h2>
              {c.story.body.map((p) => (
                <p key={p} className="text-toko-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {c.story.cards.map((card, i) => (
              <li key={card.src} data-reveal style={{ "--i": i } as React.CSSProperties} className="toko-zoom overflow-hidden rounded-toko-sm bg-toko-panel">
                <Photo photo={card} sizes="(min-width: 1024px) 290px, 46vw" className="aspect-square" />
                <p className="p-3 text-sm leading-snug font-medium sm:p-4">{card.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
