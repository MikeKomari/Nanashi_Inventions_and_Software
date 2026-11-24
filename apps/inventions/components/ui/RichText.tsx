import { Fragment } from "react";
import type { Rich } from "@/content/i18n/en";
import { FOUNDER } from "@/lib/site";

/** Founder rule: every "Michael Kimeison" on the site links to michaelkimeison.com. */
export function FounderLinked({ text }: { text: string }) {
  const parts = text.split(FOUNDER.name);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a href={FOUNDER.url} className="text-link">
          {FOUNDER.name}
        </a>
      )}
    </Fragment>
  ));
}

/** Renders copy from content/i18n: plain strings, or strings mixed with links. */
export function RichText({ value }: { value: Rich }) {
  if (typeof value === "string") return <FounderLinked text={value} />;
  return value.map((part, i) =>
    typeof part === "string" ? (
      <FounderLinked key={i} text={part} />
    ) : (
      <a key={i} href={part.href} className="text-link">
        {part.text}
      </a>
    ),
  );
}
