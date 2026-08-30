import Link from "next/link";
import type { ReactNode } from "react";
import { LINK_TOKEN, programHref } from "@/content/programs";

/**
 * `[[slug|Label]]` tokens in program copy become links to that program's
 * page; everything else is plain text.
 */

export function renderRich(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_TOKEN)) {
    const [whole, slug, label] = m;
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link key={`${slug}-${m.index}`} href={programHref(slug)} className="font-semibold">
        {label}
      </Link>,
    );
    last = m.index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** A paragraph of program copy. */
export default function RichText({ text, className = "" }: { text: string; className?: string }) {
  return <p className={className}>{renderRich(text)}</p>;
}
