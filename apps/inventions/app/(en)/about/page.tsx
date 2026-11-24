import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { en as t } from "@/content/i18n/en";
import { abs, CONTACT } from "@/lib/site";
import { NanaHoshi } from "@/components/brand/NanaHoshi";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { RichText } from "@/components/ui/RichText";
import { TeamCard } from "@/components/about/TeamCard";

export const metadata: Metadata = {
  title: t.about.metaTitle,
  description: t.about.metaDescription,
  alternates: { canonical: abs("/about") },
};

/** About (W-13, B-05): a team page built to grow. Founder card, open roles, the principles, and plain answers. */
export default function AboutPage() {
  const a = t.about;
  return (
    <div className="about">
      <Reveal className="wrap about-hero">
        <p className="eyebrow">{a.label}</p>
        <h1 className="section-title">
          <Words text={a.title} />
        </h1>
        <p className="section-lead">{a.lead}</p>
      </Reveal>

      <section className="wrap about-block" aria-labelledby="team-title">
        <Reveal>
          <p className="eyebrow">{a.teamLabel}</p>
          <h2 id="team-title" className="ipage-h2">
            <Words text={a.teamTitle} />
          </h2>
        </Reveal>
        <ul className="team-grid">
          {a.members.map((m) => (
            <li key={m.name}>
              <Reveal amount={0.2}>
                <TeamCard m={m} bioPending={a.bioPending} />
              </Reveal>
            </li>
          ))}
          {Array.from({ length: a.openRoles }, (_, i) => (
            <li key={`open-${i}`}>
              <Reveal amount={0.2}>
                <article className="team-card team-open">
                  <div className="team-photo team-photo-open" aria-hidden="true">
                    <span className="team-plus">+</span>
                  </div>
                  <div className="team-body">
                    <p className="eyebrow">{a.openRole.tag}</p>
                    <h3 className="team-name">{a.openRole.title}</h3>
                    <p className="team-bio">{a.openRole.body}</p>
                    <a href={`mailto:${CONTACT.email}`} className="link-arrow">
                      <Mail size={15} strokeWidth={2} aria-hidden="true" />
                      {a.openRole.cta}
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap about-block" aria-labelledby="principles-title">
        <Reveal>
          <p className="eyebrow">
            <NanaHoshi />
          </p>
          <h2 id="principles-title" className="ipage-h2">
            <Words text={a.principlesTitle} />
          </h2>
          <p className="section-lead">{a.principlesLead}</p>
        </Reveal>
        <ol className="about-principles">
          {t.stars.principles.map((p, i) => (
            <li key={p.title}>
              <Reveal amount={0.3} className="about-principle">
                <span className="about-star" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")} · {t.stars.starNames[i]}
                </span>
                <h3 className="istory-title">{p.title}</h3>
                <p className="istory-text">{p.proof}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap about-block" aria-labelledby="faq-title">
        <Reveal>
          <p className="eyebrow">{a.investorsLabel}</p>
          <h2 id="faq-title" className="ipage-h2">
            <Words text={a.investorsTitle} />
          </h2>
        </Reveal>
        <dl className="about-faq">
          {a.faq.map((f) => (
            <Reveal key={f.q} amount={0.3} className="about-faq-item">
              <dt className="istory-title">{f.q}</dt>
              <dd className="istory-text">
                <RichText value={f.a} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>
    </div>
  );
}
