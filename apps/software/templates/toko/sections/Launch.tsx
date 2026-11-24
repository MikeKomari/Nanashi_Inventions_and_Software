import { waLink } from "../../shared/whatsapp";
import type { TokoContent } from "../schema";
import { container, OrderButton } from "../parts";

/** A slim "new product" strip: a sideways ticker of the announcement and an order button. */
export function Launch({ c }: { c: TokoContent }) {
  const product = c.launch.product ? c.products.items.find((p) => p.id === c.launch.product) : undefined;
  const href = product
    ? waLink(c.business.whatsapp.number, c.products.orderMessage.replaceAll("{product}", product.name))
    : waLink(c.business.whatsapp.number, c.business.whatsapp.message);
  const item = (
    <span className="flex shrink-0 items-center gap-6 pr-6">
      <span className="rounded-full bg-toko-sticker px-3 py-1 text-xs font-bold tracking-[0.14em] text-toko-on-sticker uppercase">
        {c.launch.tag}
      </span>
      <span className="toko-display text-2xl text-toko-text sm:text-3xl">{c.launch.text}</span>
    </span>
  );
  return (
    <section className="border-y-2 border-toko-text bg-toko-bg" aria-label={c.launch.tag}>
      <div className={`${container} flex items-center gap-4 py-4`}>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="toko-ticker flex w-max">
            {item}
            <span aria-hidden="true" className="flex">
              {item}
              {item}
              {item}
            </span>
          </div>
        </div>
        <OrderButton href={href} size="sm" className="shrink-0">
          {c.labels.orderProduct}
        </OrderButton>
      </div>
    </section>
  );
}
