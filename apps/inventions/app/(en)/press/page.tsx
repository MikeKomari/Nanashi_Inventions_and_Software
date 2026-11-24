import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { en as t } from "@/content/i18n/en";
import { abs, CONTACT } from "@/lib/site";
import { COLOR } from "@/styles/tokens";
import { Reveal, Words } from "@/components/scroll/Reveal";
import { FounderLinked } from "@/components/ui/RichText";
import { CopyButton } from "@/components/ui/CopyButton";

export const metadata: Metadata = {
  title: t.press.metaTitle,
  description: t.press.metaDescription,
  alternates: { canonical: abs("/press") },
};

/** Press kit: everything needed to write about Nanashi or introduce it. */
export default function PressPage() {
  const p = t.press;
  return (
    <div className="press">
      <Reveal className="wrap">
        <p className="eyebrow">{p.label}</p>
        <h1 className="section-title">
          <Words text={p.title} />
        </h1>
        <p className="section-lead">{p.lead}</p>
      </Reveal>

      <section className="wrap about-block" aria-labelledby="desc-title">
        <p className="eyebrow" id="desc-title">
          {p.descriptionsLabel}
        </p>
        <ul className="press-descs">
          {p.descriptions.map((d) => (
            <li key={d.name}>
              <Reveal className="press-desc" amount={0.3}>
                <div className="press-desc-head">
                  <h2 className="istory-title">{d.name}</h2>
                  <CopyButton text={d.text} label={p.copy} done={p.copied} />
                </div>
                <p className="press-desc-text">
                  <FounderLinked text={d.text} />
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="press-desc press-name" amount={0.3}>
          <h2 className="istory-title">{p.nameLabel}</h2>
          <p className="press-desc-text">{p.nameText}</p>
        </Reveal>
      </section>

      <section className="wrap about-block" aria-labelledby="logos-title">
        <Reveal>
          <p className="eyebrow">{p.logosLabel}</p>
          <h2 id="logos-title" className="ipage-h2">
            <Words text={p.logosLead} />
          </h2>
        </Reveal>
        <ul className="press-logos">
          {p.logos.map((l) => (
            <li key={l.file} className={`press-logo press-logo-${l.tone}`}>
              <div className="press-logo-preview">
                <Image src={`/brand/${l.file}`} alt={`Nanashi logo: ${l.name.toLowerCase()}`} width={240} height={80} unoptimized className="press-logo-img" />
              </div>
              <div className="press-logo-foot">
                <span>{l.name}</span>
                <a href={`/brand/${l.file}`} download className="link-arrow">
                  <Download size={15} strokeWidth={2} aria-hidden="true" />
                  {p.download}
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div className="press-rules">
          <p className="eyebrow">{p.rulesLabel}</p>
          <ul>
            {p.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap about-block" aria-labelledby="colors-title">
        <p className="eyebrow" id="colors-title">
          {p.colorsLabel}
        </p>
        <ul className="press-colors">
          {p.colors.map((c) => {
            const hex = COLOR[c.token as keyof typeof COLOR];
            return (
              <li key={c.token}>
                <span className="press-swatch" style={{ background: hex }} aria-hidden="true" />
                <span className="press-color-name">{c.name}</span>
                <code className="art-code">{hex}</code>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wrap about-block" aria-labelledby="contact-title">
        <p className="eyebrow" id="contact-title">
          {p.contactLabel}
        </p>
        <p className="press-contact">
          <FounderLinked text={t.footer.founded} />. {p.contactText}
        </p>
        <a href={`mailto:${CONTACT.email}`} className="btn-primary press-mail">
          {CONTACT.email}
        </a>
      </section>
    </div>
  );
}
