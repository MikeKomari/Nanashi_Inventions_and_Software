import type { Copy } from "@/content/i18n/en";
import { seenIn } from "@/content/inventions";
import { Stage } from "@/components/home/Stage";
import { NameStory } from "@/components/home/NameStory";
import { SevenStars } from "@/components/home/SevenStars";
import { InventionsSection } from "@/components/home/InventionsSection";
import { Engineering } from "@/components/home/Engineering";
import { Founder } from "@/components/home/Founder";

/**
 * Home, brand first (founder, 24 Nov 2026): stage → the name → the seven principles → the
 * inventions → Engineering → founder line. The Software band and footer come from the layout.
 * "How Nanashi builds" is held back until the founder supplies its wording.
 */
export function HomePage({ t }: { t: Copy }) {
  return (
    <>
      <Stage t={t} logo="3d" />
      <NameStory t={t} />
      <SevenStars t={t} seen={seenIn(t.locale)} />
      <InventionsSection t={t} />
      <Engineering t={t} />
      <Founder t={t} />
    </>
  );
}
