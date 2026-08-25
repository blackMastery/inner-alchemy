import Link from "next/link";
import type { Program } from "@/content/programs";

/** The full-width feature card for the signature programme (home + /programs). */
export default function FlagshipCard({ p }: { p: Program }) {
  const phases = p.structure.kind === "phased" ? p.structure.phases : [];
  return (
    <Link
      href={`/programs/${p.slug}`}
      className="group block rounded-[22px] border border-clay-light bg-gradient-to-br from-ink-2 to-ink p-11 no-underline transition-colors hover:border-clay-pale max-md:p-[26px]"
    >
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-12 max-md:grid-cols-1 max-md:gap-7">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-clay-light">
            Signature program · Programme {p.number}
          </p>
          <h3 className="mb-4 font-display text-[38px] leading-[1.1] text-cream-2 max-md:text-[28px]">{p.name}</h3>
          <p className="mb-7 max-w-[48ch] font-display text-[21px] italic leading-[1.45] text-cream">{p.tagline}</p>
          <p className="text-sm font-semibold text-clay-light">
            {p.price} · {p.duration}
          </p>
        </div>
        {phases.length > 0 && (
          <ol className="flex flex-col gap-3 self-center border-l border-rule/20 pl-7 max-md:border-l-0 max-md:pl-0">
            {phases.map((ph) => (
              <li key={ph.n} className="flex items-baseline gap-4">
                <span className="w-[72px] shrink-0 text-[11px] uppercase tracking-[0.14em] text-clay-light">{ph.weeks}</span>
                <span className="text-[15.5px] text-cream-2">{ph.title}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <p className="mt-8 text-sm font-semibold text-clay-light group-hover:text-cream-2">See the full program →</p>
    </Link>
  );
}
