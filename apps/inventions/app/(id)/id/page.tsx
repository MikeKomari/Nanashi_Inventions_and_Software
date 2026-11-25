import type { Metadata } from "next";
import { id as t } from "@/content/i18n/id";
import { alternates } from "@/lib/i18n";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: t.meta.homeTitle,
  description: t.meta.homeDescription,
  alternates: alternates("id", "/"),
};

export default function Page() {
  return <HomePage t={t} />;
}
