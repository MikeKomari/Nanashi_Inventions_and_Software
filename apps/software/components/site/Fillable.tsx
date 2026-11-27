/** Marks text the founder still has to fill in. Any string containing "[ISI]" (or "[ISI: ...]")
 *  gets a dashed gold outline, so a placeholder can never pass as a real price. */
export const needsFill = (s: string) => /\[ISI[^\]]*\]/.test(s);

export function Fillable({ children, className = "" }: { children: string; className?: string }) {
  if (!needsFill(children)) return <span className={className}>{children}</span>;
  return (
    <span data-fill className={`rounded-sm border border-dashed border-star-text bg-star/15 px-1 [box-decoration-break:clone] ${className}`}>
      {children}
    </span>
  );
}
