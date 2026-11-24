import type { TokoContent } from "../schema";
import { container, Pill } from "../parts";

export function Reviews({ c }: { c: TokoContent }) {
  return (
    <section className="pb-16 sm:pb-24" aria-labelledby="ulasan-judul">
      <div className={container}>
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-12" data-reveal>
          <div>
            <Pill>{c.reviews.tag}</Pill>
          </div>
          <h2 id="ulasan-judul" className="toko-display toko-display-lg text-toko-text">
            {c.reviews.title}
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {c.reviews.items.map((r, i) => (
            <li key={r.name + i} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <figure className="toko-lift flex h-full flex-col justify-between gap-6 rounded-toko-sm border-2 border-toko-text bg-toko-panel p-6">
                <blockquote className="text-lg leading-snug font-medium">“{r.quote}”</blockquote>
                <figcaption className="toko-display text-xl text-toko-text">{r.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
