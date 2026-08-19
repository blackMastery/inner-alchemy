import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";
import { PROGRAMS, type Program } from "@/content/site";

export const metadata: Metadata = {
  title: "Programs & Pricing — Inner Alchemy Institution",
  description:
    "Eight coaching and quantum healing programs, from a 90-minute Power Reset to the two-day MRI Mindset Intensive.",
};

function ProgramCard({ p }: { p: Program }) {
  const dark = p.featured;
  return (
    <article
      className={`flex flex-col gap-3.5 rounded-[18px] p-[38px] max-md:p-[26px] ${
        dark
          ? "border border-clay-light bg-gradient-to-br from-ink-2 to-ink"
          : "border border-rule bg-parchment"
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className={`font-display text-[28px] max-md:text-[23px] ${dark ? "text-cream-2" : "text-ink"}`}>{p.name}</h3>
        <span className={`whitespace-nowrap font-bold ${dark ? "text-clay-light" : "text-clay-dark"}`}>{p.price}</span>
      </div>
      <p className={`text-[12.5px] uppercase tracking-[0.1em] ${dark ? "text-clay-light" : "text-sage-dark"}`}>{p.duration}</p>
      <p className={`flex-1 text-[15px] leading-[1.7] ${dark ? "text-cream" : "text-body-3"}`}>{p.blurb}</p>
      <p className={`text-sm ${dark ? "text-cream" : "text-muted"}`}>For you if: {p.forYouIf}</p>
    </article>
  );
}

export default function ProgramsPage() {
  const byTier = (tier: Program["tier"]) => PROGRAMS.filter((p) => p.tier === tier);

  return (
    <>
      <Section width="mid" className="text-center !pb-16">
        <Eyebrow>Coaching &amp; healing programs</Eyebrow>
        <H1 className="mb-5">Eight doorways. One destination.</H1>
        <p className="mx-auto max-w-[60ch] text-[17px] leading-[1.8] text-body-3">
          Every program leads to the same place — remembering who you truly are and consciously creating from there.
          They differ in depth, length, and the life area they enter through. Not sure which fits? That&rsquo;s what the
          free call is for.
        </p>
      </Section>

      {[
        { title: "Single sessions — start here", tier: "session" as const },
        { title: "Guided transformations — 4 to 12 weeks", tier: "program" as const },
        { title: "For entrepreneurs", tier: "entrepreneur" as const },
      ].map(({ title, tier }) => (
        <section key={tier} className="mx-auto max-w-[1120px] px-8 pb-14 max-md:px-[22px]">
          <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-clay-dark">{title}</h2>
          <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
            {byTier(tier).map((p) => <ProgramCard key={p.slug} p={p} />)}
          </div>
        </section>
      ))}

      <Section tone="warm" width="narrow" className="text-center">
        <H2 className="mb-4">Not sure which doorway is yours?</H2>
        <p className="mb-[30px] text-base leading-[1.75] text-body-3">
          Tell me what&rsquo;s present in your life right now, and I&rsquo;ll tell you honestly which program fits — or
          whether a single session is the better start. The <Link href="/session">session walkthrough</Link> is a good
          place to start reading.
        </p>
        <BookingButton />
      </Section>
    </>
  );
}
