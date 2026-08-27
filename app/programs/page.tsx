import type { Metadata } from "next";
import BookingButton from "@/components/BookingButton";
import FlagshipCard from "@/components/FlagshipCard";
import ProgramCard from "@/components/ProgramCard";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";
import { FLAGSHIP_SLUG, programBySlug, programsByPrice } from "@/content/programs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Coaching Programs & Pricing",
  description:
    "Eight transformational coaching programs with plain pricing — from the $150 Power Reset session and $350 BQH quantum healing session to the 12-week Unleash the Inner Alchemist and a two-day private intensive for entrepreneurs.",
  path: "/programs",
});

export default function ProgramsPage() {
  const flagship = programBySlug(FLAGSHIP_SLUG)!;
  const programs = programsByPrice().filter((p) => p.slug !== FLAGSHIP_SLUG);

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

      <section className="mx-auto max-w-[1120px] px-8 pb-14 max-md:px-[22px]">
        <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-clay-dark">
          All programs — lowest to highest investment
        </h2>
        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          {programs.map((p) => <ProgramCard key={p.slug} p={p} />)}
        </div>
      </section>

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
