import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import CheckList from "@/components/CheckList";
import SessionTimeline from "@/components/SessionTimeline";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";
import { SITE, SESSION_TIMELINE, SESSION_PREP, SESSION_HONESTY } from "@/content/site";
import { breadcrumbs, jsonLdHtml } from "@/lib/jsonld";
import { STATIC_PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

const page = STATIC_PAGES.session;

export const metadata: Metadata = pageMetadata(page);

export default function SessionPage() {
  /* The page is a step-by-step explainer — the strongest citation candidate on
     the site — so it carries HowTo structured data built from the same timeline. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${SITE.url}${page.path}#howto`,
        name: page.title,
        description: page.description,
        totalTime: "PT4H",
        step: SESSION_TIMELINE.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.body,
        })),
      },
      breadcrumbs([{ name: "What a session looks like", path: page.path }]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />

      <Section width="narrow" className="!pb-16">
        <Eyebrow>The session, demystified</Eyebrow>
        <H1 className="mb-6">What a quantum healing session looks like</H1>
        <p className="text-[17.5px] leading-[1.8] text-body-3">
          The three questions everyone brings: <em>Will I be unconscious? Can you make me do something? Will I remember
          it?</em> No, no, and almost certainly yes. This work happens in a state like the moments before sleep — deeply
          relaxed, fully in control, able to speak the whole time. Here is the entire session, with nothing left out.
        </p>
        <p className="mt-5 text-[15px] text-muted">
          This is the <Link href="/programs/bqh">BQH session</Link>, and the BQH sessions inside{" "}
          <Link href="/programs/unleash-the-inner-alchemist">Unleash the Inner Alchemist</Link>.
        </p>
      </Section>

      <section className="mx-auto max-w-[760px] px-8 pb-16 max-md:px-[22px]">
        <div className="rounded-[18px] border border-rule-2 bg-linen-warm px-10 py-9 max-md:p-[26px]">
          <h2 className="mb-3.5 font-display text-2xl text-ink">{SESSION_PREP.heading}</h2>
          <p className="mb-4 text-[15.5px] leading-[1.75] text-body-3">{SESSION_PREP.body}</p>
          <CheckList marker="clay" className="!gap-2.5 !text-[14.5px] !text-muted" items={SESSION_PREP.items} />
        </div>
      </section>

      <section className="mx-auto max-w-[760px] px-8 pb-[72px] max-md:px-[22px]">
        <Eyebrow tone="clay">Stage by stage</Eyebrow>
        <H2 className="mb-2 !text-4xl">The session, stage by stage</H2>
        <SessionTimeline />
      </section>

      {/* The honesty section — the second conversion blocker, answered directly. */}
      <Section tone="ink" width="narrow">
        <Eyebrow tone="light">The honest part</Eyebrow>
        <H2 dark className="mb-5 !text-4xl">{SESSION_HONESTY.heading}</H2>
        <div className="flex flex-col gap-[18px] text-base leading-[1.8] text-cream">
          {SESSION_HONESTY.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
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
