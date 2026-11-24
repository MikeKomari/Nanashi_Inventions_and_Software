import type { MDXComponents } from "mdx/types";
import { slugify, textOf } from "@/lib/slug";
import { Flow, Note } from "@/components/engineering/Diagram";

// How MDX elements render in Engineering articles (calm reading layout, D-16).
// h2 and h3 get ids from their text, so the table of contents can link to them.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => {
      const id = slugify(textOf(children));
      return (
        <h2 id={id} className="art-h2">
          <a href={`#${id}`} className="art-anchor">
            {children}
          </a>
        </h2>
      );
    },
    h3: ({ children }) => <h3 className="art-h3">{children}</h3>,
    a: ({ href, children }) => (
      <a href={href} className="text-link" rel={href?.startsWith("http") ? "noopener" : undefined}>
        {children}
      </a>
    ),
    pre: ({ children }) => <pre className="art-pre">{children}</pre>,
    code: ({ children }) => <code className="art-code">{children}</code>,
    Flow,
    Note,
    ...components,
  };
}
