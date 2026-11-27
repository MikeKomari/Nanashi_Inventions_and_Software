import type { SiteCopy } from "@/content/site/id";
import { BRIEF } from "@/content/site/brief";
import { TEMPLATES } from "@/templates/registry";
import { abs } from "@/lib/site";
import { href } from "@/lib/i18n";
import { breadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { BriefForm } from "../brief/BriefForm";
import { PageIntro } from "./PageIntro";

/** Four questions that turn into the first WhatsApp message (/mulai, /en/start). */
export function BriefPage({ t }: { t: SiteCopy }) {
  const copy = BRIEF[t.locale];
  const templates = [
    ...TEMPLATES.filter((e) => e.status === "live").map((e) => ({ value: e.slug, label: e.title[t.locale] })),
    { value: "unsure", label: copy.templateUnsure },
    { value: "custom", label: copy.templateCustom },
  ];
  return (
    <>
      <PageIntro a={copy.titleA} b={copy.titleB} intro={copy.intro} />
      <section className="pb-16 sm:pb-24" aria-label={copy.nav}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <BriefForm copy={copy} templates={templates} />
        </div>
      </section>
      <JsonLd
        data={breadcrumbs([
          { name: t.nav.home, url: abs(href("home", t.locale)) },
          { name: copy.nav, url: abs(href("brief", t.locale)) },
        ])}
      />
    </>
  );
}
