"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Copy } from "@/content/i18n/en";
import { EXAMPLES, SAVED_AT, type InspectResult } from "@/content/chromiq-demo";

type Labels = Copy["invention"]["liveDemo"];
type State =
  | { kind: "idle" }
  | { kind: "loading"; url: string }
  | { kind: "done"; result: InspectResult; source: "live" | "saved" }
  | { kind: "error"; message: string };

const TIMEOUT_MS = 15_000;

/** "example.com" → "https://example.com"; null when it can't be a public web address. */
function normalise(raw: string): string | null {
  const text = raw.trim();
  if (!text) return null;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(text) ? text : `https://${text}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** The fields the demo shows, read defensively: the answer comes from another service. */
function readResult(body: unknown): InspectResult | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const strings = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
  const suggestion = (b.suggestion ?? {}) as { tokens?: Record<string, unknown> };
  const tokens: InspectResult["tokens"] = {};
  for (const key of ["paper", "ink", "muted", "line", "accent", "displayFont", "bodyFont", "monoFont"] as const) {
    const v = suggestion.tokens?.[key];
    if (typeof v === "string") tokens[key] = v;
  }
  if (typeof suggestion.tokens?.radius === "number") tokens.radius = suggestion.tokens.radius;
  if (typeof b.url !== "string") return null;
  return {
    url: b.url,
    title: typeof b.title === "string" ? b.title : "",
    headings: strings(b.headings).slice(0, 3),
    colors: strings(b.colors).filter((hex) => /^#[0-9a-f]{6}$/i.test(hex)).slice(0, 12),
    tokens,
    clientRendered: b.clientRendered === true,
  };
}

/**
 * CHROMIQ's URL inspector, live on its invention page. The browser calls CHROMIQ's /api/inspect
 * directly, so every visitor meets CHROMIQ's own SSRF rules and per-visitor rate limit. If CHROMIQ
 * can't answer (down, busy, or not allowing this origin), an example falls back to its saved result.
 */
export function InspectorDemo({ labels: l, endpoint, appUrl, locale, newTab }: { labels: Labels; endpoint: string; appUrl: string; locale: "en" | "id"; newTab: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [value, setValue] = useState("");
  const run = useRef(0);

  async function inspect(raw: string, saved?: InspectResult) {
    const url = normalise(raw);
    if (!url) return setState({ kind: "error", message: l.errors.invalid });
    const id = ++run.current;
    setState({ kind: "loading", url });
    const fallback = (message: string) => {
      if (id !== run.current) return;
      setState(saved ? { kind: "done", result: saved, source: "saved" } : { kind: "error", message });
    };
    try {
      const response = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      const body = await response.json().catch(() => null);
      if (id !== run.current) return;
      if (response.ok) {
        const result = readResult(body);
        return result ? setState({ kind: "done", result, source: "live" }) : fallback(l.errors.unreachable);
      }
      const wait = Number(response.headers.get("retry-after")) || 5;
      if (response.status === 400) return fallback(/public/i.test(String((body as { error?: string })?.error)) ? l.errors.blocked : l.errors.invalid);
      if (response.status === 415) return fallback(l.errors.notHtml);
      if (response.status === 429 || response.status === 503) return fallback(l.errors.busy.replace("{seconds}", String(wait)));
      return fallback(l.errors.unreachable);
    } catch {
      // Network failure, timeout, or the browser refused the answer (CORS).
      fallback(l.errors.unreachable);
    }
  }

  const savedDate = new Date(SAVED_AT).toLocaleDateString(locale === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  const busy = state.kind === "loading";

  return (
    <div className="idemo-live">
      <form
        className="idemo-form"
        onSubmit={(e) => {
          e.preventDefault();
          void inspect(value);
        }}
      >
        <label htmlFor="inspect-url" className="idemo-label">
          {l.inputLabel}
        </label>
        <div className="idemo-row">
          <input
            id="inspect-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            placeholder={l.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="idemo-input"
          />
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? l.loading : l.submit}
          </button>
        </div>
      </form>
      <div className="idemo-examples">
        <span className="idemo-label">{l.examples}</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            className="idemo-chip"
            disabled={busy}
            onClick={() => {
              setValue(ex.result.url);
              void inspect(ex.result.url, ex.result);
            }}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div className="idemo-out" aria-live="polite" aria-busy={busy}>
        {state.kind === "loading" && <p className="idemo-note">{l.loading}</p>}
        {state.kind === "error" && (
          <p className="idemo-note idemo-error" role="alert">
            {state.message}
          </p>
        )}
        {state.kind === "done" && <Result result={state.result} labels={l} note={state.source === "live" ? l.live : l.saved.replace("{date}", savedDate)} />}
      </div>

      <a href={appUrl} target="_blank" rel="noopener" className="link-arrow idemo-open">
        {l.open}
        <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">{newTab}</span>
      </a>
    </div>
  );
}

function Result({ result: r, labels: l, note }: { result: InspectResult; labels: Labels; note: string }) {
  const tokens = Object.entries(r.tokens).filter(([, v]) => v !== undefined);
  return (
    <div className="idemo-result">
      <p className="idemo-note">{note}</p>
      <p className="idemo-title">{r.title || new URL(r.url).host}</p>
      <p className="idemo-host">{new URL(r.url).host}</p>
      {r.colors.length > 0 && (
        <>
          <p className="eyebrow idemo-h">{l.colors}</p>
          <ul className="idemo-swatches">
            {r.colors.map((hex) => (
              <li key={hex}>
                <span className="idemo-swatch" style={{ background: hex }} aria-hidden="true" />
                <code className="art-code">{hex}</code>
              </li>
            ))}
          </ul>
        </>
      )}
      {tokens.length > 0 && (
        <>
          <p className="eyebrow idemo-h">{l.tokens}</p>
          <dl className="idemo-tokens">
            {tokens.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>
                  {typeof v === "string" && v.startsWith("#") && <span className="idemo-dot" style={{ background: v }} aria-hidden="true" />}
                  {k === "radius" ? `${v}px` : v}
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}
      {r.headings.length > 0 && (
        <>
          <p className="eyebrow idemo-h">{l.headings}</p>
          <ul className="idemo-headings">
            {r.headings.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </>
      )}
      {r.clientRendered && <p className="idemo-note">{l.clientRendered}</p>}
    </div>
  );
}
