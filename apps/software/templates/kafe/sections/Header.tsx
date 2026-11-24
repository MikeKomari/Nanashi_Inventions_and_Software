import Image from "next/image";
import { asset } from "@/lib/site";
import type { KafeContent } from "../schema";
import { container, OrderButton } from "../parts";

export function Header({ c, orderHref }: { c: KafeContent; orderHref: string }) {
  const { business, labels } = c;
  const link = "inline-flex min-h-11 items-center text-kafe-muted transition-colors hover:text-kafe-text";
  return (
    <header className={`${container} flex items-center justify-between gap-4 py-3`}>
      <a href="#top" className="inline-flex min-h-11 items-center font-kafe-display text-[22px] font-semibold tracking-[-0.01em]">
        {business.logo ? (
          <Image
            src={asset(business.logo.src)}
            alt={business.logo.alt}
            width={business.logo.width}
            height={business.logo.height}
            className="h-9 w-auto"
          />
        ) : (
          business.name
        )}
      </a>
      <nav aria-label={business.name} className="hidden items-center gap-7 text-[15px] md:flex">
        <a href="#cerita" className={link}>{labels.nav.story}</a>
        <a href="#menu" className={link}>{labels.nav.menu}</a>
        <a href="#lokasi" className={link}>{labels.nav.location}</a>
      </nav>
      <OrderButton href={orderHref} size="sm">
        {labels.orderShort}
      </OrderButton>
    </header>
  );
}
