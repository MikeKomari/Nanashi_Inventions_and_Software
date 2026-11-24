import type { TokoContent } from "../schema";
import { container, OrderButton, Photo } from "../parts";

export function OrderBand({ c, orderHref }: { c: TokoContent; orderHref: string }) {
  return (
    <section className="px-2 py-16 sm:px-3 sm:py-24" aria-labelledby="pesan-judul">
      <div className="overflow-hidden rounded-toko bg-toko-band text-toko-on-band">
        <div className={`${container} grid items-center gap-10 py-12 sm:py-16 md:grid-cols-[1.3fr_1fr]`}>
          <div data-reveal>
            <h2 id="pesan-judul" className="toko-display toko-display-lg">
              {c.order.title}
            </h2>
            <p className="mt-4 max-w-md text-lg">{c.order.body}</p>
            <OrderButton href={orderHref} tone="light" className="mt-8">
              {c.labels.order}
            </OrderButton>
          </div>
          {c.order.photo && (
            <div data-reveal>
              <Photo photo={c.order.photo} sizes="(min-width: 768px) 460px, 94vw" className="aspect-square rotate-3 rounded-toko-sm" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
