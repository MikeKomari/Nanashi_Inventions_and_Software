import { formatPrice } from "../../shared/format";
import { waLink } from "../../shared/whatsapp";
import type { TokoContent } from "../schema";
import { container, OrderButton, Photo, Pill, Sticker } from "../parts";

/** The statement headline with stickers, then the product row. Each product's button names it in the message. */
export function Products({ c }: { c: TokoContent }) {
  const message = (name: string) => c.products.orderMessage.replaceAll("{product}", name);
  const stickerPlace = ["right-0 -top-4 sm:right-[8%]", "left-2 -bottom-6 sm:left-[4%]"];
  return (
    <section id="produk" className="scroll-mt-4 bg-toko-soft pt-16 pb-0 sm:pt-24" aria-labelledby="produk-judul">
      <div className={container}>
        <div data-reveal>
          <Pill>{c.statement.tag}</Pill>
        </div>
        <div className="relative mt-6 max-w-[1100px] pb-6" data-reveal>
          <p className="toko-display toko-display-lg text-toko-text">{c.statement.title}</p>
          {c.statement.stickers.map((s, i) => (
            <Sticker key={s} rot={i === 0 ? 10 : -9} className={`absolute ${stickerPlace[i]}`}>
              {s}
            </Sticker>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <Pill>{c.products.tag}</Pill>
            <h2 id="produk-judul" className="toko-display toko-display-md mt-4 text-toko-text">
              {c.products.title}
            </h2>
          </div>
        </div>
      </div>

      <ul className="toko-scroll-x mt-8 flex gap-3 overflow-x-auto px-4 pb-16 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-6 lg:mx-auto lg:max-w-[1240px] lg:grid-cols-4 lg:px-8 sm:pb-24">
        {c.products.items.map((p, i) => (
          <li
            key={p.id}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className="w-[78%] shrink-0 sm:w-auto"
          >
            <article className="toko-zoom flex h-full flex-col overflow-hidden rounded-toko-sm bg-toko-panel">
              <div className="relative">
                <Photo photo={p.photo} sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 78vw" className="aspect-[4/5]" />
                {p.tag && (
                  <span className="absolute top-3 left-3 rounded-full bg-toko-sticker px-3 py-1 text-xs font-bold text-toko-on-sticker">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="text-lg leading-tight font-semibold">{p.name}</h3>
                {p.description && <p className="text-sm text-toko-muted">{p.description}</p>}
                <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                  <div>
                    <p className="text-xl font-bold tabular-nums">{formatPrice(p.price)}</p>
                    <p className="text-xs text-toko-muted">{p.size}</p>
                  </div>
                  <OrderButton href={waLink(c.business.whatsapp.number, message(p.name))} size="sm">
                    {c.labels.orderProduct}
                  </OrderButton>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
