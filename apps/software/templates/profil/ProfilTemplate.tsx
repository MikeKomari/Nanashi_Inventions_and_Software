// 06 Profil Pribadi: one page about one person, drawn entirely from their content file.
// Order: hero (fixed) → the optional sections, in the order the file lists them → contact (fixed) → footer.
import "./profil.css";
import { waLink } from "../shared/whatsapp";
import type { Credit } from "../shared/kind";
import type { ProfilContent } from "./schema";
import { Hero } from "./sections/Hero";
import { Section } from "./sections/Library";
import { Contact } from "./sections/Contact";
import { StickyCta } from "./StickyCta";

/** Up to four menu links: the listed sections that have a menu label, then Contact if it has one. */
function menuLinks(c: ProfilContent) {
  const links = c.sections.filter((s) => s.menu).map((s) => ({ href: `#${s.type}`, label: s.menu! }));
  if (c.contact.menu) links.push({ href: "#kontak", label: c.contact.menu });
  return links.slice(0, 4);
}

export function ProfilTemplate({ content: c, credit }: { content: ProfilContent; credit?: Credit }) {
  const waHref = waLink(c.contact.whatsapp.number, c.contact.whatsapp.message);
  return (
    <>
      <a
        href="#isi"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-profil-panel focus:px-4 focus:py-2"
      >
        {c.labels.skipLink}
      </a>
      <Hero c={c} links={menuLinks(c)} waHref={waHref} />
      <main id="isi">
        {c.sections.map((s) => (
          <Section key={s.type} s={s} />
        ))}
      </main>
      <Contact c={c} waHref={waHref} credit={credit} />
      <StickyCta href={waHref} label={c.cta.label} />
    </>
  );
}
