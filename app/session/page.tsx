import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import CheckList from "@/components/CheckList";
import SessionTimeline from "@/components/SessionTimeline";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";

export const metadata: Metadata = {
  title: "What a Quantum Healing Session Looks Like",
  description:
    "Stage by stage, plainly written: the interview, the induction, the journey, your questions, and the recording you take home. Including what happens if you don't reach a deep trance.",
  alternates: { canonical: "/session" },
};

export default function SessionPage() {
  return (
    <>
      <Section width="narrow" className="!pb-16">
        <Eyebrow>The session, demystified</Eyebrow>
        <H1 className="mb-6">What a quantum healing session looks like</H1>
        <p className="text-[17.5px] leading-[1.8] text-body-3">
          The three questions everyone brings: <em>Will I be unconscious? Can you make me do something? Will I remember
          it?</em> No, no, and almost certainly yes. This work happens in a state like the moments before sleep — deeply
          relaxed, fully in control, able to speak the whole time. Here is the entire session, with nothing left out.
        </p>
        <p className="mt-5 text-[15px] text-muted">
          This is the <Link href="/programs/beyond-the-mind">Beyond the Mind</Link> session, and the BQH session inside{" "}
          <Link href="/programs/unleash-the-inner-alchemist">Unleash the Inner Alchemist</Link>.
        </p>
      </Section>

      <section className="mx-auto max-w-[760px] px-8 pb-16 max-md:px-[22px]">
        <div className="rounded-[18px] border border-rule-2 bg-linen-warm px-10 py-9 max-md:p-[26px]">
          <h2 className="mb-3.5 font-display text-2xl text-ink">Before you arrive</h2>
          <p className="mb-4 text-[15.5px] leading-[1.75] text-body-3">
            Once you book, you&rsquo;ll receive an intake form. The most important part is your{" "}
            <strong>list of questions</strong> — the things you want to ask your deeper self, about your life,
            relationships, purpose, and body. Bring it written down; we&rsquo;ll use it word for word during the session.
          </p>
          <CheckList
            marker="clay"
            className="!gap-2.5 !text-[14.5px] !text-muted"
            items={[
              "Sleep well the night before; skip caffeine past noon that day if you can",
              "Eat a normal meal beforehand — we break for something light",
              "Clear the block of time. No school pickup, no plans right after. The time is yours",
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[760px] px-8 pb-[72px] max-md:px-[22px]">
        <SessionTimeline />
      </section>

      {/* The honesty section — the second conversion blocker, answered directly. */}
      <Section tone="ink" width="narrow">
        <Eyebrow tone="light">The honest part</Eyebrow>
        <H2 dark className="mb-5 !text-4xl">What if I don&rsquo;t go deep?</H2>
        <p className="mb-[18px] text-base leading-[1.8] text-cream">
          It happens, and you deserve a straight answer about it. A small number of people — usually the ones gripping
          the steering wheel hardest — stay in a lighter state on their first session. If that&rsquo;s you: nothing is
          wrong with you, you&rsquo;re not &ldquo;unhypnotizable,&rdquo; and the time is not wasted. Lighter states still
          produce meaningful material, and the interview and question work stand on their own.
        </p>
        <p className="text-base leading-[1.8] text-cream">
          If we get very little, I&rsquo;ll say so plainly during the debrief, and we&rsquo;ll decide together what
          makes sense — a second attempt at a reduced rate, or a different doorway like coaching. What I won&rsquo;t do
          is dress up a shallow session as a breakthrough. Trust is the whole practice.
        </p>
      </Section>

      <Section width="narrow" className="text-center">
        <H2 className="mb-4">Questions before you decide?</H2>
        <p className="mb-8 text-base leading-[1.75] text-body-3">
          Read the <Link href="/faq">full FAQ</Link>, or just bring them to a free call.
        </p>
        <BookingButton />
      </Section>
    </>
  );
}
