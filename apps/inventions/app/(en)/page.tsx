import type { Metadata } from "next";
import { en as t } from "@/content/i18n/en";
import { abs } from "@/lib/site";
import { Stage } from "@/components/home/Stage";

export const metadata: Metadata = {
  title: t.meta.homeTitle,
  description: t.meta.homeDescription,
  alternates: { canonical: abs("/") },
};

// Home prototype (phase 2). Next: the seven stars, the invention rows, Engineering, the Software band, footer.
export default function Home() {
  return <Stage t={t} />;
}
