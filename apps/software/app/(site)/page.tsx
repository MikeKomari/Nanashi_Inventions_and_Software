import type { Metadata } from "next";
import { id as t } from "@/content/site/id";
import { abs } from "@/lib/site";
import { Band, Custom, Faq, Hero, Steps, Templates, WhyWebsite } from "@/components/site/home/Sections";

export const metadata: Metadata = {
  title: t.meta.homeTitle,
  description: t.meta.homeDescription,
  alternates: { canonical: abs("/") },
};

export default function Beranda() {
  return (
    <>
      <Hero t={t} />
      <WhyWebsite t={t} />
      <Templates t={t} />
      <Steps t={t} />
      <Custom t={t} />
      <Faq t={t} />
      <Band t={t} />
    </>
  );
}
