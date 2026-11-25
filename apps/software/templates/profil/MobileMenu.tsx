"use client";

import { useEffect, useState } from "react";

type Link = { href: string; label: string };

/** Phones only: a menu button that opens a full-screen sheet of the section links. Closes on a link or Escape. */
export function MobileMenu({ links, label, close, name }: { links: Link[]; label: string; close: string; name: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="profil-menu"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center rounded-full px-4 text-sm"
      >
        {label}
      </button>
      {open && (
        <div id="profil-menu" role="dialog" aria-modal="true" aria-label={name} className="fixed inset-0 z-50 flex flex-col bg-profil-bg p-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              autoFocus
              className="inline-flex min-h-11 items-center rounded-full bg-profil-panel px-5 text-sm"
            >
              {close}
            </button>
          </div>
          <nav aria-label={name} className="mt-10 flex flex-col gap-2 px-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="profil-title min-h-11 py-1">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
