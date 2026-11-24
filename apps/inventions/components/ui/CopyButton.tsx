"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies `text` to the clipboard and says so for two seconds. */
export function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn-ghost press-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard blocked: the text stays selectable on the page.
        }
      }}
    >
      {copied ? <Check size={16} strokeWidth={2} aria-hidden="true" /> : <Copy size={16} strokeWidth={2} aria-hidden="true" />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
