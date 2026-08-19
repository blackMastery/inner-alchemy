import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Required at the project root for @next/mdx with the App Router — MDX will
 * not compile without it.
 *
 * Maps markdown elements onto the site's type scale so journal posts inherit
 * the design rather than falling back to browser defaults.
 */
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mb-6 font-display text-[52px] font-medium leading-[1.15] text-ink text-pretty max-md:text-[34px]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-14 font-display text-[30px] font-medium leading-tight text-ink max-md:text-[25px]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-10 text-lg font-bold text-ink">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-6 max-w-[62ch] text-[16.5px] leading-[1.8] text-body-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 flex max-w-[62ch] flex-col gap-3 text-[16.5px] leading-[1.75] text-body-3">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 flex max-w-[62ch] list-decimal flex-col gap-3 pl-5 text-[16.5px] leading-[1.75] text-body-3">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-10 border-l-2 border-clay-light py-1.5 pl-7 font-display text-[27px] italic leading-[1.45] text-body-2 max-md:text-[22px]">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-semibold text-body">{children}</strong>,
  hr: () => <hr className="my-12 border-rule" />,
  a: ({ href, children }) => {
    const target = typeof href === "string" ? href : "#";
    return target.startsWith("/") ? (
      <Link href={target}>{children}</Link>
    ) : (
      <a href={target} rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
