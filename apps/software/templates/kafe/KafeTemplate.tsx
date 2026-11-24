// 01 Kafe: the whole page for one café, drawn entirely from its content file.
// Section order: hero → story → menu → atmosphere → reviews → location → order band → footer.
import "./kafe.css";
import { waLink } from "../shared/whatsapp";
import type { KafeContent } from "./schema";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Story } from "./sections/Story";
import { Menu } from "./sections/Menu";
import { Gallery } from "./sections/Gallery";
import { Reviews } from "./sections/Reviews";
import { Location } from "./sections/Location";
import { OrderBand } from "./sections/OrderBand";
import { Footer } from "./sections/Footer";
import type { Credit } from "../shared/kind";

export function KafeTemplate({ content: c, credit }: { content: KafeContent; credit?: Credit }) {
  const orderHref = waLink(c.business.whatsapp.number, c.business.whatsapp.message);
  // The schema guarantees signatureItem names a real menu item.
  const signature = c.menu.categories.flatMap((cat) => cat.items).find((i) => i.id === c.hero.signatureItem)!;
  return (
    <>
      <a
        href="#isi"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-kafe-bg focus:px-3 focus:py-2"
      >
        {c.labels.skipLink}
      </a>
      <div id="top">
        <Header c={c} orderHref={orderHref} />
      </div>
      <main id="isi">
        <Hero c={c} signature={signature} orderHref={orderHref} />
        <Story c={c} />
        <Menu c={c} />
        <Gallery c={c} />
        <Reviews c={c} />
        <Location c={c} />
        <OrderBand c={c} orderHref={orderHref} />
      </main>
      <Footer c={c} orderHref={orderHref} credit={credit} />
    </>
  );
}
