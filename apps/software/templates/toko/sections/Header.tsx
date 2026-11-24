import type { TokoContent } from "../schema";
import { OrderButton } from "../parts";

/** Floating rounded bar inside the hero panel: brand, three links, WhatsApp order. */
export function Header({ c, orderHref }: { c: TokoContent; orderHref: string }) {
  const link = "inline-flex min-h-11 items-center px-1 text-sm font-medium text-toko-text hover:underline underline-offset-4";
  return (
    <header className="relative z-20 mx-auto flex max-w-[1180px] items-center justify-between gap-3 rounded-full bg-toko-bg py-1.5 pr-1.5 pl-5">
      <a href="#top" className="toko-display min-h-11 content-center text-2xl text-toko-text">
        {c.business.name}
      </a>
      <nav aria-label={c.business.name} className="hidden items-center gap-6 md:flex">
        <a href="#produk" className={link}>{c.labels.nav.products}</a>
        <a href="#cerita" className={link}>{c.labels.nav.story}</a>
        <a href="#cara-pesan" className={link}>{c.labels.nav.howTo}</a>
      </nav>
      <OrderButton href={orderHref} size="sm">
        {c.labels.orderShort}
      </OrderButton>
    </header>
  );
}
