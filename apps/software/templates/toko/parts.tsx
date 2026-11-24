// Small pieces shared by the Toko sections. No business or display text lives here.
import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";
import { asset } from "@/lib/site";
import type { TokoPhoto } from "./schema";

export const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8";

/** Outlined pill tag, e.g. "Produk kami". */
export function Pill({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase ${
        onDark ? "border-toko-hero-text text-toko-hero-text" : "border-toko-text text-toko-text"
      }`}
    >
      {children}
    </span>
  );
}

/** A rotated sticker label. `rot` in degrees. */
export function Sticker({ children, rot = -8, className = "" }: { children: React.ReactNode; rot?: number; className?: string }) {
  return (
    <span
      className={`toko-sticker inline-flex items-center rounded-full bg-toko-sticker px-4 py-2 text-sm font-bold whitespace-nowrap text-toko-on-sticker shadow-[0_6px_0_rgba(0,0,0,0.18)] ${className}`}
      style={{ "--rot": `${rot}deg` } as React.CSSProperties}
    >
      {children}
    </span>
  );
}

/** Opens WhatsApp with a pre-filled message. */
export function OrderButton({
  href,
  children,
  size = "lg",
  tone = "accent",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  size?: "lg" | "sm";
  tone?: "accent" | "light";
  className?: string;
}) {
  const sizing = size === "lg" ? "min-h-12 gap-2.5 px-6 text-[15px]" : "min-h-11 gap-2 px-4 text-sm";
  const colours = tone === "accent" ? "bg-toko-accent text-toko-on-accent" : "bg-toko-on-band text-toko-band";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`toko-lift inline-flex items-center justify-center rounded-full font-semibold ${colours} ${sizing} ${className}`}
    >
      <WhatsAppIcon size={size === "lg" ? 20 : 18} />
      <span>{children}</span>
    </a>
  );
}

/** A content photo filling a box whose shape the template decides, so any photo fits without layout shift. */
export function Photo({
  photo,
  sizes,
  className = "",
  lcp = false,
}: {
  photo: TokoPhoto;
  sizes: string;
  className?: string;
  lcp?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={asset(photo.src)}
        alt={photo.alt}
        fill
        sizes={sizes}
        loading={lcp ? "eager" : "lazy"}
        fetchPriority={lcp ? "high" : "auto"}
        className="object-cover"
      />
    </div>
  );
}
