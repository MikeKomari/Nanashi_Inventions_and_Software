// The only place WhatsApp links are built, on the site and in every template.

/** Indonesian numbers are stored as 62… (no "+", no leading 0). */
export const WHATSAPP_NUMBER = /^62\d{8,13}$/;

export function waLink(number: string, message: string): string {
  if (!WHATSAPP_NUMBER.test(number)) throw new Error(`Invalid WhatsApp number: ${number}`);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
