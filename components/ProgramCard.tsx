import Link from "next/link";
import { programHref, type Program } from "@/content/programs";

/**
 * A program as an overview card on its category page: name, duration · price,
 * the opening line, and a link through to /programs/<slug>. The id keeps
 * #slug anchors working on the category page.
 */
export default function ProgramCard({ p }: { p: Program }) {
  return (
    <article id={p.slug} className="scroll-mt-40 max-md:scroll-mt-36">
      <Link
        href={programHref(p.slug)}
        className="flex h-full flex-col gap-3.5 rounded-[18px] border border-rule bg-parchment p-[34px] no-underline transition-colors hover:border-clay-light max-md:p-[26px]"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[26px] leading-tight text-ink max-md:text-[23px]">{p.name}</h3>
          <span className="whitespace-nowrap font-bold text-clay-dark">
            {p.price}
            {p.priceNote && <span className="font-normal text-muted"> {p.priceNote}</span>}
          </span>
        </div>
        <p className="text-[12.5px] uppercase tracking-[0.1em] text-sage-dark">
          {p.duration}
          {p.format === "in-person" && " · In person"}
        </p>
        <p className="flex-1 text-[15px] leading-[1.7] text-body-3">{p.paragraphs[0].replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, "$1")}</p>
        <span className="text-sm font-semibold text-clay-dark">Read more →</span>
      </Link>
    </article>
  );
}
