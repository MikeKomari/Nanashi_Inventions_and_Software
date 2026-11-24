import type { KafeContent } from "../schema";
import { container, OrderButton, Photo } from "../parts";

export function OrderBand({ c, orderHref }: { c: KafeContent; orderHref: string }) {
  const { order } = c;
  return (
    <section aria-labelledby="pesan-title" className={`${container} pb-16 sm:pb-24`}>
      <div data-reveal className="grid overflow-hidden rounded-kafe bg-kafe-band text-kafe-on-band lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <h2 id="pesan-title" className="text-[32px] sm:text-[48px]">
            {order.title}
          </h2>
          <p className="mt-4 max-w-[30rem] text-[17px]">{order.body}</p>
          <OrderButton href={orderHref} className="mt-8 self-start">
            {c.labels.order}
          </OrderButton>
        </div>
        {order.photo && (
          <Photo photo={order.photo} sizes="(min-width: 1180px) 520px, (min-width: 1024px) 45vw, 92vw" className="order-first aspect-[16/10] lg:order-none lg:aspect-auto lg:min-h-[420px]" />
        )}
      </div>
    </section>
  );
}
