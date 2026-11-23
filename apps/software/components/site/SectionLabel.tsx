/** Small gold uppercase tag (Pleurat's "THE BUILD" label), sitting on the section's top hairline. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-0 top-0">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        <span className="inline-block -translate-y-1/2 rounded-sm bg-star px-2 py-1 text-[12px] leading-4 font-semibold tracking-[0.06em] text-on-star uppercase">
          {children}
        </span>
      </div>
    </div>
  );
}

/** Small corner brackets on a key section. Decorative. */
export function Corners() {
  const base = "pointer-events-none absolute size-3 border-border-strong";
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${base} top-0 left-0 border-t border-l`} />
      <span className={`${base} top-0 right-0 border-t border-r`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} right-0 bottom-0 border-r border-b`} />
    </span>
  );
}

/** Two-tone headline: first line in text, second in text-muted (Pleurat). */
export function TwoTone({ a, b, as: Tag = "h2", className = "", id }: { a: string; b: string; as?: "h1" | "h2"; className?: string; id?: string }) {
  return (
    <Tag className={className} id={id}>
      <span className="block text-text">{a}</span>
      <span className="block text-text-muted">{b}</span>
    </Tag>
  );
}
