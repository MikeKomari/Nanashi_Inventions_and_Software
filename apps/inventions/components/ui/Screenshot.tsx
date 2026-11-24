import Image from "next/image";
import { SCREENS, type ScreenName } from "@/content/screens.generated";

/**
 * A real screenshot (W-15) in a quiet window frame with a glow in the product's accent (--accent on
 * an ancestor). Explicit width and height from content/screens.generated.ts, so nothing shifts.
 * "phone" frames a mobile capture with a rounder, narrower frame.
 */
export function Screenshot({
  name,
  frame = "desktop",
  sizes,
  priority = false,
  className = "",
  decorative = false,
}: {
  name: ScreenName;
  frame?: "desktop" | "phone";
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Inside a link that already names it: empty alt so the link's name stays its visible text. */
  decorative?: boolean;
}) {
  const s = SCREENS[name];
  return (
    <figure className={`shot shot-${frame} ${className}`}>
      <div className="shot-frame">
        <Image
          src={s.src}
          alt={decorative ? "" : s.alt}
          width={s.width}
          height={s.height}
          sizes={sizes}
          priority={priority}
          className="shot-img"
        />
      </div>
    </figure>
  );
}
