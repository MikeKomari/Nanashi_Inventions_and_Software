import Image from "next/image";
import { asset } from "@/lib/site";
import type { ProfilContent } from "../schema";
import { container, Pill, WaButton } from "../parts";
import { Header, type MenuLink } from "./Header";

/** First word left, the rest right. A single name stays whole and is centred. */
export function splitName(name: string): { first: string; rest: string | null } {
  const words = name.trim().split(/\s+/);
  return words.length === 1 ? { first: words[0]!, rest: null } : { first: words[0]!, rest: words.slice(1).join(" ") };
}

/**
 * B2: the name split around a cut-out portrait that stands straight on the background, in front of the name,
 * with no frame behind it. Desktop: one line, the head between the halves. Phones: the halves on two lines,
 * the portrait below overlapping the last line, then the intro in a white card.
 */
export function Hero({ c, links, waHref }: { c: ProfilContent; links: MenuLink[]; waHref: string }) {
  const { first, rest } = splitName(c.person.name);
  const longest = Math.max(first.length, ...(rest ? rest.split(" ").map((w) => w.length) : [0]));
  const chars = {
    "--chars-mobile": longest,
    "--chars-desktop": rest ? Math.max(first.length, rest.length) : first.length,
  } as React.CSSProperties;
  const p = c.person.portrait;

  return (
    <section id="top" aria-labelledby="nama" className="relative overflow-hidden">
      <div className={`${container} pt-3 sm:pt-5`}>
        <Header c={c} links={links} waHref={waHref} />
      </div>

      <div className={`${container} relative md:h-[clamp(620px,calc(100svh-84px),860px)]`}>
        {/* The name: behind the portrait (z-0). */}
        <div className="relative z-0 pt-8 md:absolute md:inset-x-0 md:top-[15%] md:px-10 md:pt-0">
          {c.person.title && <p className="mb-2 text-sm tracking-[0.12em] uppercase text-profil-muted md:text-center">{c.person.title}</p>}
          <h1 id="nama" className="profil-name" style={chars} data-single={rest ? undefined : ""}>
            {rest ? (
              <span className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                <span className="profil-in-left block">{first}</span>{" "}
                <span className="profil-in-right block self-end text-right text-profil-accent md:self-auto">{rest}</span>
              </span>
            ) : (
              <span className="profil-in-left block text-center text-profil-accent">{first}</span>
            )}
          </h1>
        </div>

        {/* The portrait: in front of the name. Positioning and the rise sit on separate boxes (both use transform). */}
        <div
          className={`relative z-10 mx-auto -mt-[clamp(1rem,7vw,2.5rem)] w-[min(86vw,440px)] md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:w-auto md:-translate-x-1/2 ${
            rest ? "md:h-[88%]" : "md:h-[72%]"
          }`}
        >
          <div className="profil-rise h-full">
            <Image
              src={asset(p.src)}
              alt={p.alt}
              width={p.width}
              height={p.height}
              priority
              sizes="(min-width: 768px) 640px, 86vw"
              className="block h-auto w-full md:h-full md:w-auto"
            />
          </div>
        </div>

        {/* Bottom left: available pill, intro, one button. A white card on phones. */}
        <div
          data-hero-end
          className="relative z-20 -mt-6 flex flex-col gap-4 rounded-profil bg-profil-panel p-5 md:absolute md:bottom-12 md:left-10 md:mt-0 md:w-[min(30%,320px)] md:bg-transparent md:p-0"
        >
          {c.person.available && (
            <Pill className="self-start md:shadow-[0_4px_16px_-10px_rgba(0,0,0,0.3)]">
              <span className="size-2 rounded-full bg-profil-accent" aria-hidden="true" />
              {c.person.available}
            </Pill>
          )}
          <p className="text-sm tracking-[0.1em] uppercase text-profil-muted">{c.person.role}</p>
          <p className="text-xl leading-snug md:text-[22px]">{c.person.intro}</p>
          <WaButton href={waHref} className="self-start">
            {c.cta.label}
          </WaButton>
        </div>

        {/* Bottom right: up to three logo pills ("Pernah tampil di"). */}
        {c.heroLogos && (
          <div className="relative z-20 mt-8 flex flex-col gap-3 md:absolute md:right-10 md:bottom-12 md:mt-0 md:max-w-[min(30%,320px)] md:items-end">
            <p className="text-sm tracking-[0.1em] uppercase">{c.heroLogos.label}</p>
            <ul className="flex flex-wrap gap-2 md:justify-end">
              {c.heroLogos.items.map((l) => (
                <li key={l}>
                  <Pill>{l}</Pill>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
