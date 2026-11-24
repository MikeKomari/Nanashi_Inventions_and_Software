// 04 Toko UMKM: the whole page for one small-business shop, drawn entirely from its content file.
// Section order: hero → statement + products → new-product strip → story → reviews → how to order → order band → footer.
import "./toko.css";
import { waLink } from "../shared/whatsapp";
import type { Credit } from "../shared/kind";
import type { TokoContent } from "./schema";
import { Hero } from "./sections/Hero";
import { Products } from "./sections/Products";
import { Launch } from "./sections/Launch";
import { Story } from "./sections/Story";
import { Reviews } from "./sections/Reviews";
import { HowTo } from "./sections/HowTo";
import { OrderBand } from "./sections/OrderBand";
import { Footer } from "./sections/Footer";

export function TokoTemplate({ content: c, credit }: { content: TokoContent; credit?: Credit }) {
  const orderHref = waLink(c.business.whatsapp.number, c.business.whatsapp.message);
  return (
    <>
      <a
        href="#isi"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-toko-bg focus:px-3 focus:py-2"
      >
        {c.labels.skipLink}
      </a>
      <div id="top" />
      <main id="isi">
        <Hero c={c} orderHref={orderHref} />
        <Products c={c} />
        <Launch c={c} />
        <Story c={c} />
        <Reviews c={c} />
        <HowTo c={c} />
        <OrderBand c={c} orderHref={orderHref} />
      </main>
      <Footer c={c} orderHref={orderHref} credit={credit} />
    </>
  );
}
