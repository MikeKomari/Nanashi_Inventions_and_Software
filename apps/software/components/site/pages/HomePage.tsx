import type { SiteCopy } from "@/content/site/id";
import { abs } from "@/lib/site";
import { href } from "@/lib/i18n";
import { faqPage, service } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Band, Custom, Faq, Hero, Steps, Templates, WhyWebsite } from "../home/Sections";

export function HomePage({ t }: { t: SiteCopy }) {
  return (
    <>
      <Hero t={t} />
      <WhyWebsite t={t} />
      <Templates t={t} />
      <Steps t={t} />
      <Custom t={t} />
      <Faq t={t} />
      <Band t={t} />
      <JsonLd data={[service(t, abs(href("home", t.locale))), faqPage(t)]} />
    </>
  );
}
