import { CONTACT } from "@/lib/site";
import { waLink } from "@/templates/shared/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";

type Props = {
  message: string;
  /** Analytics: where the click came from (hero, a template name, band, custom). Wired in phase 4. */
  where: string;
  children: React.ReactNode;
  size?: "lg" | "sm";
  className?: string;
};

/** Every WhatsApp button on the site. Opens WhatsApp with a pre-filled Indonesian (or English) message. */
export function WhatsAppButton({ message, where, children, size = "lg", className = "" }: Props) {
  const sizing = size === "lg" ? "min-h-12 px-5 text-[15px] gap-2.5" : "min-h-11 px-4 text-sm gap-2";
  return (
    <a
      href={waLink(CONTACT.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      data-wa-where={where}
      className={`press wa-btn inline-flex items-center justify-center rounded-md bg-success font-semibold text-moon-0 ${sizing} ${className}`}
    >
      <WhatsAppIcon size={size === "lg" ? 20 : 18} className="wa-icon" />
      <span>{children}</span>
    </a>
  );
}
