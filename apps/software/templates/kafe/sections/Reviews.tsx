import type { KafeContent } from "../schema";
import { container, SectionHead } from "../parts";

export function Reviews({ c }: { c: KafeContent }) {
  const { reviews } = c;
  return (
    <section aria-labelledby="ulasan-title" className="pb-16 sm:pb-24">
      <div className={container}>
        <SectionHead tag={reviews.tag} title={reviews.title} id="ulasan-title" />
      </div>
      <ul className={`${container} kafe-scroll-x mt-10 flex scroll-px-4 gap-3 overflow-x-auto pb-2 sm:scroll-px-6 sm:gap-5 lg:grid lg:grid-cols-3 lg:overflow-visible`}>
        {reviews.items.map((r, i) => (
          <li key={r.quote} data-reveal style={{ "--i": i } as React.CSSProperties} className="w-[85%] shrink-0 sm:w-[60%] lg:w-auto">
            <figure className="flex h-full flex-col rounded-kafe-sm bg-kafe-panel p-6 sm:p-8">
              <span aria-hidden="true" className="font-kafe-display text-[64px] leading-[0.6] text-kafe-accent">
                &ldquo;
              </span>
              <blockquote className="mt-4 text-[17px] leading-relaxed">
                <p>{r.quote}</p>
              </blockquote>
              <figcaption className="mt-auto pt-6 font-semibold">{r.name}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
