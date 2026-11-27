"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { CONTACT } from "@/lib/site";
import { waLink } from "@/templates/shared/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsApp";
import type { BriefCopy, Choice } from "@/content/site/brief";

type Props = {
  copy: BriefCopy;
  /** Live templates, plus "not sure" and "custom", as choices. */
  templates: Choice[];
};

const chip =
  "press relative inline-flex min-h-11 cursor-pointer items-center rounded-md border border-border bg-surface px-4 text-[15px] font-medium text-text " +
  "has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-moon-0 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus-ring";

function Group({ legend, hint, children }: { legend: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-border pt-6">
      <legend className="float-left w-full text-lg font-semibold">{legend}</legend>
      {hint && <p className="clear-both pt-1 text-sm text-text-muted">{hint}</p>}
      <div className="clear-both flex flex-wrap gap-2 pt-4">{children}</div>
    </fieldset>
  );
}

function Option({ type, name, choice, checked, onChange }: { type: "radio" | "checkbox"; name: string; choice: Choice; checked: boolean; onChange: () => void }) {
  return (
    <label className={chip}>
      <input type={type} name={name} value={choice.value} checked={checked} onChange={onChange} className="sr-only" />
      {choice.label}
    </label>
  );
}

const noop = () => () => {};
const label = (list: Choice[], value: string) => list.find((c) => c.value === value)?.label ?? "";

/**
 * Four questions that write the first WhatsApp message. Nothing is sent anywhere but WhatsApp:
 * the button is a plain link whose message updates as the visitor answers, so it works even if
 * they skip every question.
 */
export function BriefForm({ copy, templates }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [picked, setPicked] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [when, setWhen] = useState("");

  // /mulai?template=kafe preselects a template (links from a template card or demo) until the visitor picks one.
  const search = useSyncExternalStore(noop, () => window.location.search, () => "");
  const fromUrl = new URLSearchParams(search).get("template") ?? "";
  const template = picked || (templates.some((t) => t.value === fromUrl) ? fromUrl : "");
  const setTemplate = setPicked;

  const message = useMemo(() => {
    const m = copy.message;
    const lines = [m.greeting, ""];
    if (name.trim()) lines.push(`${m.name}: ${name.trim()}`);
    if (type) lines.push(`${m.type}: ${label(copy.types, type)}`);
    if (template) lines.push(`${m.template}: ${label(templates, template)}`);
    if (needs.length) lines.push(`${m.needs}: ${copy.needs.filter((n) => needs.includes(n.value)).map((n) => n.label).join(", ")}`);
    if (when) lines.push(`${m.when}: ${label(copy.when, when)}`);
    return lines.length > 2 ? lines.join("\n") : m.greeting;
  }, [copy, templates, name, type, template, needs, when]);

  const toggle = (v: string) => setNeeds((n) => (n.includes(v) ? n.filter((x) => x !== v) : [...n, v]));

  return (
    <form className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-8">
        <div>
          <label htmlFor="brief-name" className="text-lg font-semibold">
            {copy.nameLabel} <span className="text-sm font-normal text-text-muted">({copy.optional})</span>
          </label>
          <input
            id="brief-name"
            type="text"
            autoComplete="organization"
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={copy.namePlaceholder}
            className="mt-3 block min-h-12 w-full rounded-md border border-border-strong bg-surface px-4 text-[16px] text-text placeholder:text-text-muted/70"
          />
        </div>
        <Group legend={copy.typeLabel}>
          {copy.types.map((c) => (
            <Option key={c.value} type="radio" name="type" choice={c} checked={type === c.value} onChange={() => setType(c.value)} />
          ))}
        </Group>
        <Group legend={copy.templateLabel}>
          {templates.map((c) => (
            <Option key={c.value} type="radio" name="template" choice={c} checked={template === c.value} onChange={() => setTemplate(c.value)} />
          ))}
        </Group>
        <Group legend={copy.needsLabel} hint={copy.needsHint}>
          {copy.needs.map((c) => (
            <Option key={c.value} type="checkbox" name="needs" choice={c} checked={needs.includes(c.value)} onChange={() => toggle(c.value)} />
          ))}
        </Group>
        <Group legend={copy.whenLabel}>
          {copy.when.map((c) => (
            <Option key={c.value} type="radio" name="when" choice={c} checked={when === c.value} onChange={() => setWhen(c.value)} />
          ))}
        </Group>
      </div>

      {/* The message preview follows the visitor down the page on desktop. */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-labelledby="brief-preview">
        <div className="relative border border-border bg-surface p-5 sm:p-6">
          <h2 id="brief-preview" className="font-sans text-xs font-semibold tracking-[0.06em] text-text-muted uppercase">
            {copy.previewLabel}
          </h2>
          <p className="mt-3 rounded-md bg-surface-raised p-4 text-[15px] whitespace-pre-line" aria-live="polite">
            {message}
          </p>
          <a
            href={waLink(CONTACT.whatsapp, message)}
            target="_blank"
            rel="noopener noreferrer"
            data-wa-where="brief"
            className="press wa-btn mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-md bg-success px-5 text-[15px] font-semibold text-moon-0"
          >
            <WhatsAppIcon size={20} className="wa-icon" />
            <span>{copy.send}</span>
          </a>
          <p className="mt-3 text-sm text-text-muted">{copy.sendNote}</p>
        </div>
      </aside>
    </form>
  );
}
