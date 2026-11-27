"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { waLink } from "@/templates/shared/whatsapp";
import { HEX_COLOR, readableAccent } from "@/templates/shared/color";
import type { TryItConfig } from "@/templates/shared/kind";
import { TRY_IT } from "@/content/site/try-it";
import type { Locale } from "@/lib/i18n";
import { DemoRenamer } from "./renameDemo";
import styles from "./DemoBar.module.css";

const MAX_NAME = 40;
const URL_DELAY = 400;

type Props = {
  /** Demos are Indonesian. Copy is looked up here: functions cannot cross to a client component. */
  locale: Locale;
  templateName: string;
  /** The demo business's own name and accent, as the content file has them. */
  name: string;
  accent: string;
  config: TryItConfig;
  /** The bar's normal row (home, label, order link). The toggle joins it. */
  children: React.ReactNode;
};

/** Reads ?nama=…&warna=RRGGBB from the address bar. */
function readParams(): { name: string; color: string | null } {
  const p = new URLSearchParams(window.location.search);
  const name = (p.get("nama") ?? "").trim().slice(0, MAX_NAME);
  const raw = p.get("warna") ?? "";
  const hex = `#${raw.replace(/^#/, "")}`;
  return { name, color: HEX_COLOR.test(hex) ? hex.toUpperCase() : null };
}

function shareUrl(name: string, color: string | null): string {
  const url = new URL(window.location.href);
  url.hash = "";
  if (name) url.searchParams.set("nama", name);
  else url.searchParams.delete("nama");
  if (color) url.searchParams.set("warna", color.slice(1));
  else url.searchParams.delete("warna");
  return url.toString();
}

/** "Coba dengan usahamu": the visitor's own name and colour on the demo, live, with a link to share. */
export function TryIt({ locale, templateName, name: originalName, accent: originalAccent, config, children }: Props) {
  const copy = TRY_IT[locale];
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  /** The colour the visitor picked (null = the demo's own). */
  const [color, setColor] = useState<string | null>(null);
  const [status, setStatus] = useState<"" | "copied" | "failed">("");
  const [ready, setReady] = useState(false);
  const renamer = useRef<DemoRenamer | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const originalVars = useRef<{ accent: string; onAccent: string } | null>(null);
  const panelId = useId();
  const noteId = useId();

  const trimmed = name.trim();
  const safe = useMemo(() => (color ? readableAccent(color, config.contrastAgainst) : null), [color, config.contrastAgainst]);

  // After hydration: set up the renamer and pick up a shared link.
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-demo]");
    if (root) {
      renamer.current = new DemoRenamer(root, originalName);
      renamer.current.watch();
    }
    const b = document.body.style;
    originalVars.current = { accent: b.getPropertyValue(config.accentVar), onAccent: b.getPropertyValue(config.onAccentVar) };
    const fromUrl = readParams();
    // Reading the address bar can only happen after hydration, so these are one-off syncs, not a cascade.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (fromUrl.name) setName(fromUrl.name);
    if (fromUrl.color) setColor(fromUrl.color);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    return () => renamer.current?.stop();
  }, [originalName, config.accentVar, config.onAccentVar]);

  // The name, live.
  useEffect(() => {
    if (ready) renamer.current?.apply(trimmed);
  }, [trimmed, ready]);

  // The colour, live, on <body> where the template reads its variables.
  useEffect(() => {
    if (!ready || !originalVars.current) return;
    const b = document.body.style;
    b.setProperty(config.accentVar, safe ? safe.accent : originalVars.current.accent);
    b.setProperty(config.onAccentVar, safe ? safe.onAccent : originalVars.current.onAccent);
  }, [safe, ready, config.accentVar, config.onAccentVar]);

  // The address bar follows, a moment after typing stops.
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      window.history.replaceState(window.history.state, "", shareUrl(trimmed, color));
    }, URL_DELAY);
    return () => window.clearTimeout(t);
  }, [trimmed, color, ready]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!status) return;
    const t = window.setTimeout(() => setStatus(""), 2500);
    return () => window.clearTimeout(t);
  }, [status]);

  const link = open ? shareUrl(trimmed, color) : "";
  const shownColor = safe?.accent ?? originalAccent.toUpperCase();
  const waHref = open
    ? waLink(CONTACT.whatsapp, copy.waMessage(templateName, trimmed || originalName, shownColor, link))
    : undefined;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl(trimmed, color));
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  function reset() {
    setName("");
    setColor(null);
    inputRef.current?.focus();
  }

  const pickerValue = (color ?? originalAccent).toLowerCase();

  return (
    <>
      <div className={styles.inner}>
        {children}
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => (open ? close() : setOpen(true))}
        >
          {copy.toggle}
        </button>
      </div>
      <div id={panelId} className={styles.panel} hidden={!open} role="region" aria-label={copy.title}>
        {open && (
          <div className={styles.panelInner}>
            <div className={styles.panelHead}>
              <p className={styles.title}>{copy.title}</p>
              <div className={styles.headActions}>
                <button type="button" className={styles.ghost} onClick={reset}>
                  {copy.reset}
                </button>
                <button type="button" className={styles.close} onClick={close} aria-label={copy.close}>
                  <X size={20} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className={styles.fields}>
              <label className={styles.field}>
                <span className={styles.label}>{copy.nameLabel}</span>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.input}
                  value={name}
                  maxLength={MAX_NAME}
                  placeholder={copy.namePlaceholder}
                  autoComplete="organization"
                  enterKeyHint="done"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <fieldset className={styles.field} aria-describedby={safe?.adjusted ? noteId : undefined}>
                <legend className={styles.label}>{copy.colorLabel}</legend>
                <div className={styles.swatches}>
                  {copy.presets.map((p) => (
                    <button
                      key={p.hex}
                      type="button"
                      className={styles.swatch}
                      style={{ background: p.hex }}
                      aria-label={copy.swatch(p.name)}
                      aria-pressed={color === p.hex}
                      onClick={() => setColor(p.hex)}
                    />
                  ))}
                  <label className={styles.custom} title={copy.customColor}>
                    <span className={styles.srOnly}>{copy.customColor}</span>
                    <input type="color" value={pickerValue} onChange={(e) => setColor(e.target.value.toUpperCase())} />
                  </label>
                </div>
              </fieldset>
            </div>

            {safe?.adjusted && (
              <p id={noteId} className={styles.note}>
                {copy.adjusted}
              </p>
            )}

            <div className={styles.actions}>
              <a href={waHref} target="_blank" rel="noopener noreferrer" data-wa-where="try_it" className={styles.primary}>
                {copy.order}
              </a>
              <button type="button" className={styles.secondary} onClick={copyLink}>
                {copy.copy}
              </button>
              <span className={styles.status} role="status">
                {status === "copied" ? copy.copied : status === "failed" ? copy.copyFailed : ""}
              </span>
            </div>
            <p className={styles.hint}>{copy.hint}</p>
          </div>
        )}
      </div>
    </>
  );
}
