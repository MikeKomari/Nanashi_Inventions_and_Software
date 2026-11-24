// Display formats shared by every template. Indonesian conventions.

const idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

/** 28000 → "Rp 28.000" (Intl puts a no-break space after "Rp", so the price never wraps). */
export const formatPrice = (rupiah: number) => idr.format(rupiah);

/** "07:00" → "07.00" (Indonesian writes times with a dot). */
export const formatTime = (hhmm: string) => hhmm.replace(":", ".");

/** 6282283058878 → "0822-8305-8878": the local form people recognise. */
export function formatWhatsAppDisplay(number: string): string {
  const local = `0${number.slice(2)}`;
  return local.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");
}
