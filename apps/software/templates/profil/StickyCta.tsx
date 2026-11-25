"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";

/** Phones only: a WhatsApp button fixed to the bottom once the hero's own button has scrolled away. */
export function StickyCta({ href, label }: { href: string; label: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const end = document.querySelector("[data-hero-end]");
    if (!end || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setShown(!e!.isIntersecting && e!.boundingClientRect.top < 0));
    io.observe(end);
    return () => io.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-4 md:hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-shown={shown}
        aria-hidden={!shown}
        tabIndex={shown ? 0 : -1}
        className="profil-sticky pointer-events-auto inline-flex min-h-12 w-full max-w-sm items-center justify-center gap-2.5 rounded-full bg-profil-text px-6 text-[15px] text-profil-bg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]"
      >
        <WhatsAppIcon size={20} />
        <span>{label}</span>
      </a>
    </div>
  );
}
