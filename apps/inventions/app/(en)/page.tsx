import type { Metadata } from "next";
import { en as t } from "@/content/i18n/en";
import { alternates } from "@/lib/i18n";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: t.meta.homeTitle,
  description: t.meta.homeDescription,
  alternates: alternates("en", "/"),
};

export default function Page() {
  return <HomePage t={t} />;
}
