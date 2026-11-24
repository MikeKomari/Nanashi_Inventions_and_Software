// Small pieces shared by the Kafe sections. No business or display text lives here.
import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";
import { asset } from "@/lib/site";
import type { KafePhoto } from "./schema";

export const container = "mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8";

/** Small rounded tag, e.g. "Andalan kami" or "Favorit". */
export function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-kafe-tag px-2.5 py-1 text-xs leading-none font-semibold tracking-[0.04em] text-kafe-on-tag uppercase ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  tag,
  title,
  id,
  className = "",
  children,
}: {
  tag: string;
  title: string;
  id: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`max-w-[38rem] ${className}`} data-reveal>
      <Tag>{tag}</Tag>
      <h2 id={id} className="mt-4 text-[32px] sm:text-[44px]">
        {title}
      </h2>
      {children}
    </div>
  );
}

/** Opens WhatsApp with the business's pre-filled order message. */
export function OrderButton({
  href,
  children,
  size = "lg",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  size?: "lg" | "sm";
  className?: string;
}) {
  const sizing = size === "lg" ? "min-h-12 gap-2.5 px-6 text-[15px]" : "min-h-11 gap-2 px-4 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`kafe-lift inline-flex items-center justify-center rounded-full bg-kafe-accent font-semibold text-kafe-on-accent ${sizing} ${className}`}
    >
      <WhatsAppIcon size={size === "lg" ? 20 : 18} />
      <span>{children}</span>
    </a>
  );
}

/**
 * A content photo filling a box whose shape the template decides (aspect-ratio on the wrapper),
 * so any photo fits without layout shift. `sizes` must describe the box's rendered width.
 */
export function Photo({
  photo,
  sizes,
  className = "",
  preload = false,
}: {
  photo: KafePhoto;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={asset(photo.src)}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
      />
    </div>
  );
}
