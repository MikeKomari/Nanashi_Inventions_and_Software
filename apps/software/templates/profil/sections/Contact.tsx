import type { Credit } from "../../shared/kind";
import type { ProfilContent } from "../schema";
import { container, WaButton } from "../parts";

/** Fixed: a full-width accent band with WhatsApp, email and social pills, then the footer with the credit. */
export function Contact({ c, waHref, credit }: { c: ProfilContent; waHref: string; credit?: Credit }) {
  const k = c.contact;
  const pill = "profil-lift inline-flex min-h-11 items-center rounded-full border border-profil-on-accent/60 px-5 text-sm";
  return (
    <>
      <section id="kontak" aria-labelledby="kontak-judul" className="px-2 pt-8 pb-4 sm:px-3">
        <div className="rounded-profil bg-profil-accent text-profil-on-accent">
          <div className={`${container} py-16 text-center sm:py-24`} data-reveal>
            <h2 id="kontak-judul" className="profil-title mx-auto max-w-3xl">
              {k.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg">{k.body}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <WaButton href={waHref} tone="light">
                {c.labels.whatsapp}
              </WaButton>
              {k.email && (
                <a href={`mailto:${k.email}`} className={pill}>
                  {c.labels.email}: {k.email}
                </a>
              )}
            </div>
            {k.social.length > 0 && (
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {k.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={pill}>
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <footer className={`${container} flex flex-wrap justify-between gap-3 py-6 text-sm text-profil-muted`}>
        <span>
          © {new Date().getFullYear()} {c.person.name}
        </span>
        {credit && (
          <a href={credit.href} className="underline underline-offset-4">
            {credit.label}
          </a>
        )}
      </footer>
    </>
  );
}
