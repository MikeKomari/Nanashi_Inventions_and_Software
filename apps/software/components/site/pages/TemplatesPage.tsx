import type { SiteCopy } from "@/content/site/id";
import { abs } from "@/lib/site";
import { href } from "@/lib/i18n";
import { breadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { TemplateGrid } from "../TemplateGrid";
import { Band, Custom, Steps } from "../home/Sections";
import { PageIntro } from "./PageIntro";

/** All templates, then how ordering works and the custom-design option (the grid's last tile links to it). */
export function TemplatesPage({ t }: { t: SiteCopy }) {
  return (
    <>
      <PageIntro a={t.templatePage.titleA} b={t.templatePage.titleB} intro={t.templatePage.intro} />
      <section className="pb-16 sm:pb-24" aria-label={t.nav.templates}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
          <TemplateGrid t={t} />
        </div>
      </section>
      <Steps t={t} />
      <Custom t={t} />
      <Band t={t} />
      <JsonLd
        data={breadcrumbs([
          { name: t.nav.home, url: abs(href("home", t.locale)) },
          { name: t.nav.templates, url: abs(href("templates", t.locale)) },
        ])}
      />
    </>
  );
}
