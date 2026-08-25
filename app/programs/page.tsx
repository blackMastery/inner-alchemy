import type { Metadata } from "next";
import BookingButton from "@/components/BookingButton";
import FlagshipCard from "@/components/FlagshipCard";
import ProgramCard from "@/components/ProgramCard";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";
import { FLAGSHIP_SLUG, TIER_LABELS, TIER_ORDER, programBySlug, programsByTier } from "@/content/programs";

export const metadata: Metadata = {
  title: "Programs & Pricing",
  description:
    "Eight transformational coaching programs, from a 90-minute Power Reset to the 12-week Unleash the Inner Alchemist and a two-day private intensive for entrepreneurs.",
  alternates: { canonical: "/programs" },
};

const TIER_TITLES = {
  program: "Guided transformations — 4 to 12 weeks",
  entrepreneur: "For entrepreneurs",
  session: "Single sessions — start here, or go deep",
} satisfies Record<keyof typeof TIER_LABELS, string>;

export default function ProgramsPage() {
  const flagship = programBySlug(FLAGSHIP_SLUG)!;

  return (
    <>
      <Section width="mid" className="text-center !pb-14">
        <Eyebrow>Transformational coaching programs</Eyebrow>
        <H1 className="mb-5">Eight doorways. One destination.</H1>
        <p className="mx-auto max-w-[60ch] text-[17px] leading-[1.8] text-body-3">
          Every program leads to the same place — remembering who you truly are and consciously creating from there.
          They differ in depth, length, and the life area they enter through. Not sure which fits? That&rsquo;s what the
          free call is for.
        </p>
      </Section>

      <section className="mx-auto max-w-[1120px] px-8 pb-16 max-md:px-[22px]">
        <FlagshipCard p={flagship} />
      </section>

      {TIER_ORDER.map((tier) => {
        const programs = programsByTier(tier).filter((p) => p.slug !== FLAGSHIP_SLUG);
        return (
          <section key={tier} className="mx-auto max-w-[1120px] px-8 pb-14 max-md:px-[22px]">
            <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-clay-dark">{TIER_TITLES[tier]}</h2>
            <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
              {programs.map((p) => <ProgramCard key={p.slug} p={p} dark={p.featured} />)}
            </div>
          </section>
        );
      })}

      <Section tone="warm" width="narrow" className="text-center">
        <H2 className="mb-4">Not sure which doorway is yours?</H2>
        <p className="mb-[30px] text-base leading-[1.75] text-body-3">
          Tell me what&rsquo;s present in your life right now, and I&rsquo;ll tell you honestly which program fits — or
          whether a single session is the better start.
        </p>
        <BookingButton />
      </Section>
    </>
  );
}
