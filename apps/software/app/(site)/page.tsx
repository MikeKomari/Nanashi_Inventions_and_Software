import type { Metadata } from "next";
import { id as t } from "@/content/site/id";
import { alternates } from "@/lib/i18n";
import { HomePage } from "@/components/site/pages/HomePage";

export const metadata: Metadata = {
  title: t.meta.homeTitle,
  description: t.meta.homeDescription,
  alternates: alternates("home", t.locale),
};

export default function Beranda() {
  return <HomePage t={t} />;
}
