import type { Metadata } from "next";
import { en as t } from "@/content/i18n/en";
import { alternates } from "@/lib/i18n";
import { InventionsIndex } from "@/components/pages/InventionsIndex";

export const metadata: Metadata = {
  title: t.meta.inventionsTitle,
  description: t.meta.inventionsDescription,
  alternates: alternates("en", "/inventions"),
};

export default function Page() {
  return <InventionsIndex t={t} />;
}
