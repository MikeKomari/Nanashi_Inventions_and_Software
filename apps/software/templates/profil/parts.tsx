// Small pieces shared by the Profil sections. No personal or display text lives here.
import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";
import { asset } from "@/lib/site";
import type { ProfilPhoto } from "./schema";

export const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10";

/** White pill: chips, tags, logo names. */
export function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex min-h-9 items-center gap-2 rounded-full bg-profil-panel px-4 py-1.5 text-sm text-profil-text ${className}`}>
      {children}
    </span>
  );
}

/** Opens WhatsApp. "dark" (text-coloured) is the main button; "light" sits on the accent band. */
export function WaButton({
  href,
  children,
  tone = "dark",
  size = "lg",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light" | "panel";
  size?: "lg" | "sm";
  className?: string;
}) {
  const colours =
    tone === "dark"
      ? "bg-profil-text text-profil-bg"
      : tone === "light"
        ? "bg-profil-on-accent text-profil-accent"
        : "bg-profil-panel text-profil-text";
  const sizing = size === "lg" ? "min-h-12 gap-2.5 px-6 text-[15px]" : "min-h-11 gap-2 px-5 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`profil-lift inline-flex items-center justify-center rounded-full whitespace-nowrap ${colours} ${sizing} ${className}`}
    >
      <WhatsAppIcon size={size === "lg" ? 20 : 18} />
      <span>{children}</span>
    </a>
  );
}

/** Section title in ExtraBold. Plain words: no numbers, no slashes. */
export function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="profil-title" data-reveal>
      {children}
    </h2>
  );
}

/** A content photo filling a box whose shape the template decides, so any photo fits without layout shift. */
export function Photo({ photo, sizes, className = "" }: { photo: ProfilPhoto; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={asset(photo.src)} alt={photo.alt} fill sizes={sizes} loading="lazy" className="object-cover" />
    </div>
  );
}
