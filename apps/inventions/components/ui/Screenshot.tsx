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
  eager = false,
  className = "",
  decorative = false,
  style,
}: {
  name: ScreenName;
  frame?: "desktop" | "phone";
  sizes: string;
  /** Above the fold: load now with high priority instead of lazily. */
  eager?: boolean;
  className?: string;
  /** Inside a link that already names it: empty alt so the link's name stays its visible text. */
  decorative?: boolean;
  style?: React.CSSProperties;
}) {
  const s = SCREENS[name];
  return (
    <figure className={`shot shot-${frame} ${className}`} style={style}>
      <div className="shot-frame">
        <Image
          src={s.src}
          alt={decorative ? "" : s.alt}
          width={s.width}
          height={s.height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className="shot-img"
        />
      </div>
    </figure>
  );
}
