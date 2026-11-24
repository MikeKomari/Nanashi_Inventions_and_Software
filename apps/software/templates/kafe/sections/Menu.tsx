import { formatPrice } from "../../shared/format";
import type { KafeContent, KafeMenuItem } from "../schema";
import { container, Photo, SectionHead, Tag } from "../parts";

type WithPhoto = KafeMenuItem & { photo: NonNullable<KafeMenuItem["photo"]> };

/** Items that have a photo, shown as cards above the full list. */
function FeaturedCard({ item, i }: { item: WithPhoto; i: number }) {
  return (
    <li
      data-reveal
      style={{ "--i": i } as React.CSSProperties}
      className="kafe-zoom w-[72%] shrink-0 overflow-hidden rounded-kafe-sm bg-kafe-bg sm:w-[44%] lg:w-auto"
    >
      <div className="relative">
        <Photo photo={item.photo} sizes="(min-width: 1180px) 260px, (min-width: 1024px) 22vw, (min-width: 640px) 44vw, 72vw" className="aspect-[4/5]" />
        {item.tag && <Tag className="absolute top-3 left-3">{item.tag}</Tag>}
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <h4 className="font-kafe-display text-lg leading-snug">{item.name}</h4>
        <p className="shrink-0 font-semibold text-kafe-accent tabular-nums">{formatPrice(item.price)}</p>
      </div>
    </li>
  );
}

function Row({ item }: { item: KafeMenuItem }) {
  return (
    <li className="py-3.5">
      {item.tag && <Tag className="mb-1.5">{item.tag}</Tag>}
      <div className="flex items-baseline gap-3">
        <h4 className="font-kafe-display text-[19px] leading-snug">{item.name}</h4>
        <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-4px] border-b border-dotted border-kafe-text/30" />
        <p className="shrink-0 font-semibold text-kafe-accent tabular-nums">{formatPrice(item.price)}</p>
      </div>
      {item.description && <p className="mt-1 text-[15px] leading-normal text-kafe-muted">{item.description}</p>}
    </li>
  );
}

export function Menu({ c }: { c: KafeContent }) {
  const { menu, labels } = c;
  const featured = menu.categories.flatMap((cat) => cat.items).filter((i): i is WithPhoto => Boolean(i.photo));
  return (
    <section id="menu" aria-labelledby="menu-title" className={`${container} py-8 sm:py-12`}>
      <div className="rounded-kafe bg-kafe-panel px-4 py-10 sm:px-10 sm:py-14 lg:px-14">
        <SectionHead tag={menu.tag} title={menu.title} id="menu-title">
          {menu.intro && <p className="mt-4 text-[17px] text-kafe-muted">{menu.intro}</p>}
        </SectionHead>

        {featured.length > 0 && (
          <div className="mt-10">
            <h3 className="font-kafe-body text-sm font-semibold tracking-[0.06em] text-kafe-muted uppercase">{labels.featured}</h3>
            <ul className="kafe-scroll-x -mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
              {featured.map((item, i) => (
                <FeaturedCard key={item.id} item={item} i={i} />
              ))}
            </ul>
          </div>
        )}

        <nav aria-label={menu.title} className="mt-10 flex flex-wrap gap-2">
          {menu.categories.map((cat) => (
            <a
              key={cat.id}
              href={`#menu-${cat.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-kafe-text/20 bg-kafe-bg px-4 text-[15px] font-medium transition-colors hover:border-kafe-text/50"
            >
              {cat.name}
            </a>
          ))}
        </nav>

        <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-3">
          {menu.categories.map((cat, i) => (
            <div key={cat.id} data-reveal style={{ "--i": i } as React.CSSProperties} className="scroll-mt-6" id={`menu-${cat.id}`}>
              <h3 className="border-b border-kafe-text/20 pb-3 text-[26px]">{cat.name}</h3>
              <ul className="divide-y divide-kafe-text/10">
                {cat.items.map((item) => (
                  <Row key={item.id} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
