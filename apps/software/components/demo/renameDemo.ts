// Live renaming of a template demo, for "Coba dengan usahamu". Works on the rendered DOM inside [data-demo],
// so no template needs its own code: it rewrites text nodes, a few attributes, document.title and the inline
// CSS variables that size the name. Originals are kept, so every change starts from them and reset is exact.

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean);
const squash = (s: string) => s.replace(/\s+/g, "");

type Role = { kind: "plain" } | { kind: "word"; i: number } | { kind: "rest" } | { kind: "short" };

const ATTRS = ["aria-label", "alt", "title"] as const;
/** Inline CSS variables templates use to size the name from its length (kafe Hero, profil Hero). */
const SIZE_VARS = ["--longest", "--chars-mobile", "--chars-desktop"] as const;

export class DemoRenamer {
  private readonly orig: string;
  private readonly origWords: string[];
  private readonly origRest: string;
  private readonly origShort: string;
  private readonly origTitle: string;
  private readonly text = new WeakMap<Text, { original: string; written: string; role: Role }>();
  private readonly attrs = new WeakMap<Element, Record<string, string>>();
  private readonly vars = new WeakMap<HTMLElement, Record<string, string>>();
  private current: string;
  private observer: MutationObserver | null = null;

  constructor(
    private readonly root: HTMLElement,
    originalName: string,
  ) {
    this.orig = originalName.trim();
    this.origWords = words(this.orig);
    this.origRest = this.origWords.slice(1).join(" ");
    this.origShort = `${(this.origWords[0] ?? "").toLowerCase()}.`;
    this.origTitle = document.title;
    this.current = this.orig;
  }

  /** Starts re-applying the name to nodes the page adds or React rewrites (menus, sheets). */
  watch() {
    this.observer = new MutationObserver(() => this.apply(this.current));
    this.connect();
  }

  stop() {
    this.observer?.disconnect();
    this.observer = null;
  }

  private connect() {
    this.observer?.observe(this.root, { childList: true, subtree: true, characterData: true });
    // Next.js may write the <title> again after hydration.
    this.observer?.observe(document.head, { childList: true, subtree: true, characterData: true });
  }

  /** Shows `name` everywhere the original name was. An empty name means the original. */
  apply(name: string) {
    const next = name.trim() || this.orig;
    this.current = next;
    // Our own writes must not wake the observer, or it would loop.
    this.observer?.disconnect();
    try {
      this.applyText(next);
      this.applyAttrs(next);
      this.applyVars(next);
      document.title = this.origTitle.split(this.orig).join(next);
    } finally {
      this.connect();
    }
  }

  private applyText(next: string) {
    const nw = words(next);
    const walker = document.createTreeWalker(this.root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
      let entry = this.text.get(n);
      // React (or anything else) replaced what we wrote: that is the new original.
      if (entry && n.data !== entry.written) entry = undefined;
      if (!entry) {
        const role = this.classify(n);
        if (!role) continue;
        entry = { original: n.data, written: n.data, role };
        this.text.set(n, entry);
      }
      const value = next === this.orig ? entry.original : this.render(entry.original, entry.role, nw, next);
      if (n.data !== value) n.data = value;
      entry.written = value;
    }
  }

  /** What part of the name a text node shows, or null when it has nothing to do with the name. */
  private classify(n: Text): Role | null {
    const t = n.data.trim();
    if (!t) return null;
    if (this.origWords.length > 1) {
      const i = this.origWords.indexOf(t);
      const isRest = t === this.origRest;
      // Only when the node sits in an element that spells exactly the name (a wordmark, a split hero name),
      // so a menu heading that happens to say "Kopi" is left alone.
      if ((i >= 0 || isRest) && this.insideName(n)) {
        if (isRest && this.origWords.length > 2) return { kind: "rest" };
        return { kind: "word", i: i >= 0 ? i : this.origWords.length - 1 };
      }
    }
    if (this.orig && n.data.includes(this.orig)) return { kind: "plain" };
    if (/^[a-z]+\.$/.test(t) && t === this.origShort) return { kind: "short" };
    return null;
  }

  private insideName(n: Text): boolean {
    const target = squash(this.orig);
    let el = n.parentElement;
    for (let depth = 0; el && depth < 4 && this.root.contains(el); depth++, el = el.parentElement) {
      if (squash(this.originalText(el)) === target) return true;
    }
    return false;
  }

  /** An element's text as it was before any renaming. */
  private originalText(el: Element): string {
    let s = "";
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
      const e = this.text.get(n);
      s += e && n.data === e.written ? e.original : n.data;
    }
    return s;
  }

  private render(original: string, role: Role, nw: string[], next: string): string {
    const keep = (v: string) => original.replace(original.trim(), v);
    switch (role.kind) {
      case "plain":
        return original.split(this.orig).join(next);
      case "word": {
        const last = this.origWords.length - 1;
        return keep(role.i === last ? nw.slice(last).join(" ") : (nw[role.i] ?? ""));
      }
      case "rest":
        return keep(nw.slice(1).join(" "));
      case "short":
        return keep(`${(nw[0] ?? "").toLowerCase()}.`);
    }
  }

  private applyAttrs(next: string) {
    const sel = ATTRS.map((a) => `[${a}]`).join(",");
    for (const el of this.root.querySelectorAll(sel)) {
      let saved = this.attrs.get(el);
      for (const a of ATTRS) {
        const v = el.getAttribute(a);
        if (v === null) continue;
        if (!saved?.[a]) {
          if (!v.includes(this.orig)) continue;
          saved = { ...saved, [a]: v };
          this.attrs.set(el, saved);
        }
        const value = saved[a]!.split(this.orig).join(next);
        if (v !== value) el.setAttribute(a, value);
      }
    }
  }

  private applyVars(next: string) {
    const nw = words(next);
    const rest = nw.slice(1).join(" ");
    const longest = Math.max(1, ...nw.map((w) => w.length));
    // A one-word-per-line wordmark keeps the original's line count: extra words share the last line.
    const keep = this.origWords.length - 1;
    const lines = keep > 0 ? [...nw.slice(0, keep), nw.slice(keep).join(" ")] : [next];
    const computed: Record<string, number> = {
      "--longest": Math.max(1, ...lines.map((l) => l.length)),
      "--chars-mobile": longest,
      "--chars-desktop": rest ? Math.max(nw[0]!.length, rest.length) : (nw[0]?.length ?? 1),
    };
    const sel = SIZE_VARS.map((v) => `[style*="${v}"]`).join(",");
    for (const el of this.root.querySelectorAll<HTMLElement>(sel)) {
      let saved = this.vars.get(el);
      if (!saved) {
        saved = {};
        for (const v of SIZE_VARS) {
          const val = el.style.getPropertyValue(v);
          if (val) saved[v] = val;
        }
        this.vars.set(el, saved);
      }
      for (const [v, val] of Object.entries(saved)) {
        el.style.setProperty(v, next === this.orig ? val : String(computed[v]));
      }
    }
  }
}
