// The optional sections. Each renders only when the content file lists it; the list order is the page order.
import Image from "next/image";
import { asset } from "@/lib/site";
import type { ProfilSection, SectionOf } from "../schema";
import { container, Photo, Pill, SectionTitle } from "../parts";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;
const block = "py-16 sm:py-24";

function About({ s }: { s: SectionOf<"about"> }) {
  return (
    <div className={`${container} grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center`}>
      <div>
        <SectionTitle id="about-judul">{s.title}</SectionTitle>
        <div className="mt-6 flex flex-col gap-4 text-lg" data-reveal>
          {s.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
      {s.photo && (
        <div data-reveal>
          <Photo photo={s.photo} sizes="(min-width: 768px) 480px, 92vw" className="aspect-[4/5] rounded-profil" />
        </div>
      )}
    </div>
  );
}

function Services({ s }: { s: SectionOf<"services"> }) {
  return (
    <div className={container}>
      <SectionTitle id="services-judul">{s.title}</SectionTitle>
      {s.intro && <p className="mt-4 max-w-2xl text-lg text-profil-muted" data-reveal>{s.intro}</p>}
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {s.items.map((it, i) => (
          <li key={it.name} data-reveal style={stagger(i)} className="profil-lift flex flex-col gap-3 rounded-profil bg-profil-panel p-6">
            <h3 className="text-xl font-extrabold tracking-tight">{it.name}</h3>
            <p className="text-profil-muted">{it.body}</p>
            {it.price && <p className="mt-auto pt-2 text-[15px] text-profil-accent">{it.price}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Full class names so Tailwind finds them. */
const COLS: Record<number, string> = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" };

function Numbers({ s }: { s: SectionOf<"numbers"> }) {
  return (
    <div className={container}>
      {s.title && <SectionTitle id="numbers-judul">{s.title}</SectionTitle>}
      <dl className={`grid grid-cols-2 gap-x-6 gap-y-10 ${COLS[s.items.length] ?? "md:grid-cols-4"} ${s.title ? "mt-10" : ""}`}>
        {s.items.map((n, i) => (
          <div key={n.label} data-reveal style={stagger(i)} className="border-t-2 border-profil-text pt-4">
            <dt className="sr-only">{n.label}</dt>
            <dd className="profil-title">{n.value}</dd>
            <dd className="mt-1 text-profil-muted">{n.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Filter chips without script: radio inputs, and a generated rule per tag that hides the other cards. */
function Work({ s }: { s: SectionOf<"work"> }) {
  const tags = [...new Set(s.items.map((w) => w.tag))];
  const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x";
  const chips = tags.length >= 2;
  const rules = tags
    .map((t, i) => `.profil-work:has(#work-${i}:checked) [data-tag]:not([data-tag="${slug(t)}"]){display:none}`)
    .join("");
  const chip =
    "inline-flex min-h-11 cursor-pointer items-center rounded-full bg-profil-panel px-5 text-sm has-[:checked]:bg-profil-text has-[:checked]:text-profil-bg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-profil-accent";
  return (
    <div className={`${container} profil-work`}>
      {chips && <style>{rules}</style>}
      <SectionTitle id="work-judul">{s.title}</SectionTitle>
      {chips && (
        <fieldset className="mt-6 flex flex-wrap gap-2" data-reveal>
          <legend className="sr-only">{s.title}</legend>
          <label className={chip}>
            <input type="radio" name="work-filter" defaultChecked className="sr-only" />
            {s.allLabel}
          </label>
          {tags.map((t, i) => (
            <label key={t} className={chip}>
              <input type="radio" name="work-filter" id={`work-${i}`} className="sr-only" />
              {t}
            </label>
          ))}
        </fieldset>
      )}
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {s.items.map((w, i) => {
          const inner = (
            <>
              <Photo photo={w.photo} sizes="(min-width: 768px) 580px, 92vw" className="aspect-[16/10] rounded-profil" />
              <div className="mt-4 flex items-center justify-between gap-4">
                <h3 className="text-xl font-extrabold tracking-tight">{w.title}</h3>
                <Pill>{w.tag}</Pill>
              </div>
            </>
          );
          return (
            <li key={w.title} data-tag={slug(w.tag)} data-reveal style={stagger(i % 2)}>
              {w.href ? (
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="profil-lift block">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Experience({ s }: { s: SectionOf<"experience"> }) {
  return (
    <div className={container}>
      <SectionTitle id="experience-judul">{s.title}</SectionTitle>
      <ol className="mt-10 rounded-profil bg-profil-panel px-6 sm:px-8" data-reveal>
        {s.items.map((e) => (
          <li key={e.org + e.years} className="flex flex-col gap-1 border-b border-profil-muted/25 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-extrabold tracking-tight">{e.org}</p>
              <p className="text-profil-muted">{e.role}</p>
            </div>
            <p className="text-profil-muted tabular-nums">{e.years}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Ventures({ s }: { s: SectionOf<"ventures"> }) {
  return (
    <div className={container}>
      <SectionTitle id="ventures-judul">{s.title}</SectionTitle>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {s.items.map((v, i) => {
          const inner = (
            <div className="flex h-full flex-col gap-3 rounded-profil bg-profil-panel p-6">
              <div className="flex items-center gap-3">
                {v.logo && (
                  <Image src={asset(v.logo.src)} alt={v.logo.alt} width={40} height={40} className="size-10 rounded-full object-contain" />
                )}
                <h3 className="text-xl font-extrabold tracking-tight">{v.name}</h3>
              </div>
              <p className="text-profil-accent">{v.role}</p>
              {v.body && <p className="text-profil-muted">{v.body}</p>}
            </div>
          );
          return (
            <li key={v.name} data-reveal style={stagger(i)}>
              {v.href ? (
                <a href={v.href} target="_blank" rel="noopener noreferrer" className="profil-lift block h-full">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Speaking({ s }: { s: SectionOf<"speaking"> }) {
  return (
    <div className={container}>
      <SectionTitle id="speaking-judul">{s.title}</SectionTitle>
      <ul className="mt-10 border-t-2 border-profil-text">
        {s.items.map((e, i) => (
          <li
            key={e.event + e.date}
            data-reveal
            style={stagger(i)}
            className="grid gap-1 border-b border-profil-muted/30 py-5 sm:grid-cols-[1fr_auto_8rem] sm:items-center sm:gap-6"
          >
            <p className="text-lg font-extrabold tracking-tight">
              {e.event}
              {e.upcoming && (
                <span className="ml-3 inline-flex rounded-full bg-profil-accent px-3 py-0.5 align-middle text-xs font-medium tracking-wide text-profil-on-accent">
                  {s.upcomingLabel}
                </span>
              )}
            </p>
            <p className="text-profil-muted">{e.city}</p>
            <p className="text-profil-muted tabular-nums sm:text-right">{e.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Press({ s }: { s: SectionOf<"press"> }) {
  return (
    <div className={container}>
      <SectionTitle id="press-judul">{s.title}</SectionTitle>
      <ul className="mt-8 flex flex-wrap gap-3" data-reveal>
        {s.items.map((m) => (
          <li key={m}>
            <Pill className="min-h-12 px-6 text-base">{m}</Pill>
          </li>
        ))}
      </ul>
      {s.quote && (
        <figure className="mt-10 max-w-3xl" data-reveal>
          <blockquote className="text-2xl leading-snug sm:text-3xl">“{s.quote.text}”</blockquote>
          <figcaption className="mt-3 text-profil-muted">{s.quote.source}</figcaption>
        </figure>
      )}
    </div>
  );
}

/** Cards in a row that swipes on phones and sits as a grid on desktop. */
function Testimonials({ s }: { s: SectionOf<"testimonials"> }) {
  return (
    <div className={container}>
      <SectionTitle id="testimonials-judul">{s.title}</SectionTitle>
      <ul className="profil-scroll-x -mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {s.items.map((t, i) => (
          <li key={t.name + i} data-reveal style={stagger(i)} className="w-[85%] shrink-0 md:w-auto">
            <figure className="flex h-full flex-col justify-between gap-6 rounded-profil bg-profil-panel p-6">
              <blockquote className="text-lg leading-snug">“{t.quote}”</blockquote>
              <figcaption className="flex items-center gap-3">
                {t.photo && <Photo photo={t.photo} sizes="44px" className="size-11 shrink-0 rounded-full" />}
                <span>
                  <span className="block font-extrabold tracking-tight">{t.name}</span>
                  {t.role && <span className="block text-sm text-profil-muted">{t.role}</span>}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Gallery({ s }: { s: SectionOf<"gallery"> }) {
  // Simple masonry: alternate tall and square tiles in CSS columns.
  return (
    <div className={container}>
      <SectionTitle id="gallery-judul">{s.title}</SectionTitle>
      <ul className="mt-10 columns-2 gap-4 md:columns-3">
        {s.items.map((p, i) => (
          <li key={p.src} data-reveal style={stagger(i % 3)} className="mb-4 break-inside-avoid">
            <Photo photo={p} sizes="(min-width: 768px) 380px, 46vw" className={`${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"} rounded-profil`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const RENDER = {
  about: About,
  services: Services,
  numbers: Numbers,
  work: Work,
  experience: Experience,
  ventures: Ventures,
  speaking: Speaking,
  press: Press,
  testimonials: Testimonials,
  gallery: Gallery,
} as const;

/** One optional section, anchored by its type (#services, #speaking, …) for the menu. */
export function Section({ s }: { s: ProfilSection }) {
  const Render = RENDER[s.type] as (p: { s: ProfilSection }) => React.ReactNode;
  return (
    <section id={s.type} aria-labelledby={s.title ? `${s.type}-judul` : undefined} className={block}>
      <Render s={s} />
    </section>
  );
}
