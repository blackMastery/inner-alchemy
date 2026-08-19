import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";

export const metadata: Metadata = {
  title: "QHHT® Sessions — Inner Alchemy Institution",
  description:
    "Quantum Healing Hypnosis Technique: a full-day in-person regression session — life review, regression, and a dialogue with your deeper self.",
};

const INCLUDES = [
  ["01", "A two-hour interview", "Your life story and your written question list, unhurried. This conversation steers everything that follows."],
  ["02", "The regression & dialogue", "Two to three hours in deep relaxation: the scenes that arise, then your questions put directly to your deeper self — including any about the body."],
  ["03", "Recording & follow-up", "The full session audio to keep, a debrief before you leave, and a check-in call about a week later as things settle."],
];

const QUESTIONS = [
  "Why does every relationship end the same way?",
  "What is this grief that arrived before anything happened?",
  "Why did I get sick — and what does my body need from me?",
  "What am I actually here to do?",
  "Why do I feel like I've known this person forever?",
];

export default function QhhtPage() {
  return (
    <>
      <Section className="grid grid-cols-[1.2fr_0.8fr] items-center gap-16 !pb-[72px] max-md:grid-cols-1 max-md:gap-8">
        <div>
          <Eyebrow>Quantum Healing Hypnosis Technique℠</Eyebrow>
          <H1 className="mb-6">One full day. Your deepest questions, answered in your own voice.</H1>
          <p className="mb-8 text-[17px] leading-[1.8] text-body-3">
            QHHT® is the regression method developed by Dolores Cannon over 45 years of practice. It combines a guided
            journey through past-life or other significant scenes with a direct dialogue with your subconscious — the
            part of you that knows why the pattern is there and what it&rsquo;s for.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <BookingButton>Start with a free call</BookingButton>
            <p className="text-[15px] text-muted">
              <strong className="text-ink">$495</strong> · 4–6 hours · in person
            </p>
          </div>
        </div>
        <Image
          src="/images/session-room.png"
          alt="The session room"
          width={560}
          height={420}
          className="h-[420px] w-full rounded-[20px] object-cover max-md:h-[260px]"
        />
      </Section>

      <Section tone="warm">
        <H2 className="mb-12 text-center">What the day includes</H2>
        <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
          {INCLUDES.map(([num, title, body]) => (
            <div key={num} className="rounded-[18px] border border-rule-2 bg-parchment p-[34px] max-md:p-[26px]">
              <p className="mb-3 font-display text-[34px] text-clay">{num}</p>
              <p className="mb-2 font-bold text-ink">{title}</p>
              <p className="text-[14.5px] leading-[1.7] text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section width="narrow">
        <H2 className="mb-6">People bring questions like…</H2>
        <ul className="flex flex-col gap-3.5 font-display text-[22px] italic leading-[1.5] text-body-3">
          {QUESTIONS.map((q) => <li key={q}>&ldquo;{q}&rdquo;</li>)}
        </ul>
        <p className="mt-7 text-[15.5px] leading-[1.75] text-muted">
          You&rsquo;ll bring your own list — usually ten to fifteen questions. The intake form I send after booking
          walks you through writing them. See the full <Link href="/session">session walkthrough</Link>.
        </p>
      </Section>

      <section className="mx-auto max-w-[760px] px-8 pb-[88px] max-md:px-[22px]">
        <div className="rounded-[18px] border border-[#E8D9BF] bg-parchment-2 px-[38px] py-[34px] max-md:p-[26px]">
          <p className="mb-2 font-bold text-ink">Good to know</p>
          <p className="text-[14.5px] leading-[1.75] text-muted">
            QHHT® is practiced in person only, per the method&rsquo;s guidelines — the depth of the state requires being
            in the room together. Sessions are one-on-one; no observers, including partners. This work complements but
            never replaces medical or mental health care. Curious how it compares to an online BQH session? Ask on the
            call — the right fit depends on your questions.
          </p>
        </div>
      </section>

      <Section tone="ink" width="narrow" className="text-center">
        <H2 dark className="mb-4 !text-4xl">Not sure you&rsquo;re ready for the full day?</H2>
        <p className="mb-[30px] text-base leading-[1.75] text-cream">
          Many clients begin with coaching sessions and step into regression work when it feels right. There&rsquo;s no
          rush — the questions will wait for you.
        </p>
        <BookingButton variant="sand">Talk it through — free call</BookingButton>
      </Section>
    </>
  );
}
