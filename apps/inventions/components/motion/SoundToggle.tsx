"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { SOUND_EVENT, setSoundEnabled, soundEnabled, sfx } from "@/lib/sound";

/** Speaker button in the header. Off by default; the choice is remembered on this device. */
export function SoundToggle({
  onLabel,
  offLabel,
}: {
  onLabel: string;
  offLabel: string;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(soundEnabled());
    sync();
    window.addEventListener(SOUND_EVENT, sync);
    return () => window.removeEventListener(SOUND_EVENT, sync);
  }, []);
  const toggle = () => {
    setSoundEnabled(!on);
    if (!on) sfx.page(); // A quiet confirmation that sound now works.
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? offLabel : onLabel}
      title={on ? offLabel : onLabel}
      className="inline-flex size-11 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text"
    >
      {on ? (
        <Volume2 size={18} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <VolumeX size={18} strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
