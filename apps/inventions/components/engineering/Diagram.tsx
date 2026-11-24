/**
 * A left-to-right flow of steps for Engineering articles. Each step can be marked "stop" (a check
 * that can refuse the request) or "ok" (the happy path). Wraps to a column on phones.
 */
export function Flow({ steps, label }: { steps: { title: string; body?: string; kind?: "stop" | "ok" }[]; label: string }) {
  return (
    <figure className="art-flow" aria-label={label}>
      <ol>
        {steps.map((s, i) => (
          <li key={s.title} className={`art-flow-step${s.kind ? ` art-flow-${s.kind}` : ""}`}>
            <span className="art-flow-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <strong>{s.title}</strong>
            {s.body && <span>{s.body}</span>}
          </li>
        ))}
      </ol>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

/** A side note in the reading column. */
export function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="art-note">
      <p className="art-note-title">{title}</p>
      <div>{children}</div>
    </aside>
  );
}
