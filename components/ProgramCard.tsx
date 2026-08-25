import Link from "next/link";
import type { Program } from "@/content/programs";

/**
 * A programme as a link card.
 *   full    — /programs index: name, price, duration, blurb, "for you if".
 *   compact — home grid and sibling rows: name, duration, "for you if", price.
 */
export default function ProgramCard({
  p,
  variant = "full",
  dark = false,
}: {
  p: Program;
  variant?: "full" | "compact";
  dark?: boolean;
}) {
  const shell = dark
    ? "border border-clay-light bg-gradient-to-br from-ink-2 to-ink hover:border-clay-pale"
    : "border border-rule bg-parchment hover:border-clay-light";
  const name = dark ? "text-cream-2" : "text-ink";
  const meta = dark ? "text-clay-light" : "text-sage-dark";
  const body = dark ? "text-cream" : "text-body-3";
  const price = dark ? "text-clay-light" : "text-clay-dark";

  if (variant === "compact") {
    return (
      <Link
        href={`/programs/${p.slug}`}
        className={`flex h-full flex-col gap-3 rounded-[18px] p-8 no-underline transition-colors max-md:p-[26px] ${shell}`}
      >
        <h3 className={`font-display text-[24px] leading-tight ${name}`}>{p.name}</h3>
        <p className={`text-[12.5px] uppercase tracking-[0.1em] ${meta}`}>{p.duration}</p>
        <p className={`flex-1 text-sm leading-[1.7] ${body}`}>
          For you if {p.forYouIf}
        </p>
        <span className={`font-bold ${price}`}>{p.price}</span>
      </Link>
    );
  }

  return (
    // `id` keeps the slug usable as an anchor target, so older #deep-links still land.
    <article id={p.slug} className="scroll-mt-28">
      <Link
        href={`/programs/${p.slug}`}
        className={`flex h-full flex-col gap-3.5 rounded-[18px] p-[38px] no-underline transition-colors max-md:p-[26px] ${shell}`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={`font-display text-[28px] max-md:text-[23px] ${name}`}>{p.name}</h3>
          <span className={`whitespace-nowrap font-bold ${price}`}>{p.price}</span>
        </div>
        <p className={`text-[12.5px] uppercase tracking-[0.1em] ${meta}`}>{p.duration}</p>
        <p className={`flex-1 text-[15px] leading-[1.7] ${body}`}>{p.blurb}</p>
        <p className={`text-sm ${dark ? "text-cream" : "text-muted"}`}>For you if {p.forYouIf}</p>
        <span className={`text-sm font-semibold ${price}`}>Read more →</span>
      </Link>
    </article>
  );
}
