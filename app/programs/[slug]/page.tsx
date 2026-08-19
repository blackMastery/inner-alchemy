import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingButton from "@/components/BookingButton";
import { Section, Eyebrow, H1, H2, Card } from "@/components/ui";
import {
  SITE,
  PROGRAMS,
  TIER_LABELS,
  PROGRAMS_WITH_SESSION_DAY,
  PROGRAM_FAQ_BY_TIER,
  SESSION_TIMELINE,
  FIT,
  faqByQuestion,
} from "@/content/site";

/**
 * Program detail pages are composed entirely from copy that already exists in
 * content/site.ts. Nothing here is paraphrased or newly written — the handoff
 * states the copy is final and reviewed.
 */

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) return {};

  return {
    title: program.name,
    description: `${program.price} · ${program.duration}. ${program.blurb}`.slice(0, 200),
    alternates: { canonical: `/programs/${program.slug}` },
  };
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) notFound();

  const siblings = PROGRAMS.filter((p) => p.tier === program.tier && p.slug !== program.slug);
  const showTimeline = PROGRAMS_WITH_SESSION_DAY.includes(program.slug);
  const faqs = PROGRAM_FAQ_BY_TIER[program.tier]
    .map(faqByQuestion)
    .filter((item) => item !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: program.name,
    description: program.blurb,
    serviceType: TIER_LABELS[program.tier],
    url: `${SITE.url}/programs/${program.slug}`,
    provider: { "@type": "Person", name: "Hadassah Headley" },
    offers: {
      "@type": "Offer",
      price: program.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* HERO */}
      <Section width="mid" className="!pb-16">
        <Eyebrow>{TIER_LABELS[program.tier]}</Eyebrow>
        <H1 className="mb-5">{program.name}</H1>
        <p className="mb-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[17px] text-body-3">
          <span className="font-display text-[30px] text-clay">{program.price}</span>
          <span className="text-muted">·</span>
          <span>{program.duration}</span>
        </p>
        <p className="mb-8 max-w-[62ch] text-[17px] leading-[1.8] text-body-3">{program.blurb}</p>
        <div className="flex flex-wrap items-center gap-6">
          <BookingButton />
          <Link href="/programs" className="text-[15px] font-semibold">
            See all programs
          </Link>
        </div>
      </Section>

      {/* FIT — the practitioner's own words, unchanged */}
      <Section tone="warm" width="mid">
        <Eyebrow tone="clay">Is this the one?</Eyebrow>
        <H2 className="mb-6">This is for you if…</H2>
        <p className="mb-10 max-w-[60ch] font-display text-[27px] italic leading-[1.45] text-body-2 max-md:text-[22px]">
          {program.forYouIf.charAt(0).toUpperCase() + program.forYouIf.slice(1)}
        </p>
        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
          <Card>
            <p className="mb-[22px] font-display text-[26px] text-sage-dark">
              This work tends to fit if…
            </p>
            <ul className="flex flex-col gap-4 text-[15px] leading-[1.65] text-body-3">
              {FIT.yes.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="text-sage">✦</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="mb-[22px] font-display text-[26px] text-clay">It isn&rsquo;t the right tool if…</p>
            <ul className="flex flex-col gap-4 text-[15px] leading-[1.65] text-body-3">
              {FIT.no.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="text-[#C09A82]">—</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* THE SESSION DAY — only where the program actually includes one */}
      {showTimeline && (
        <>
          <Section width="narrow" className="!pb-10">
            <Eyebrow>What the session day looks like</Eyebrow>
            <H2 className="mb-4">Hour by hour</H2>
            <p className="max-w-[60ch] text-base leading-[1.75] text-muted">
              This program includes a full hypnosis session. Here is how that day runs, start to finish.
            </p>
          </Section>
          <section className="mx-auto max-w-[760px] px-8 pb-[72px] max-md:px-[22px]">
            {SESSION_TIMELINE.map((step, i) => (
              <div
                key={step.time}
                className={`grid grid-cols-[120px_1fr] gap-7 py-8 max-md:grid-cols-1 max-md:gap-2 ${
                  i < SESSION_TIMELINE.length - 1 ? "border-b border-rule" : ""
                }`}
              >
                <div>
                  <p className="font-display text-[30px] text-clay max-md:text-[25px]">{step.time}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">{step.span}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="text-[15.5px] leading-[1.75] text-body-3">{step.body}</p>
                </div>
              </div>
            ))}
            <p className="text-sm text-muted">
              The full walkthrough, including what happens if you don&rsquo;t go deep, is on the{" "}
              <Link href="/session">session page</Link>.
            </p>
          </section>
        </>
      )}

      {/* RELEVANT QUESTIONS — reviewed answers, pulled verbatim from the FAQ */}
      {faqs.length > 0 && (
        <Section tone={showTimeline ? "warm" : "linen"} width="narrow" outerClassName={showTimeline ? "" : "border-t border-rule"}>
          <Eyebrow tone="clay">Before you book</Eyebrow>
          <H2 className="mb-8">Questions people ask about this</H2>
          {faqs.map((item) => (
            <details key={item.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer justify-between gap-4 py-[22px] text-[17px] font-semibold text-ink">
                {item.q}
                <span
                  aria-hidden="true"
                  className="font-normal text-clay-dark transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mb-6 max-w-[62ch] text-[15.5px] leading-[1.8] text-body-3">{item.a}</p>
            </details>
          ))}
          <p className="mt-8 text-sm text-muted">
            All thirteen questions are answered on the <Link href="/faq">FAQ page</Link>.
          </p>
        </Section>
      )}

      {/* SIBLINGS */}
      {siblings.length > 0 && (
        <Section width="wide">
          <Eyebrow>Also in {TIER_LABELS[program.tier].toLowerCase()}</Eyebrow>
          <H2 className="mb-10">Other ways in</H2>
          <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
            {siblings.map((p) => (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                className="flex flex-col gap-3 rounded-[18px] border border-rule bg-parchment p-8 no-underline hover:border-clay-light max-md:p-[26px]"
              >
                <h3 className="font-display text-[24px] text-ink">{p.name}</h3>
                <p className="text-[12.5px] uppercase tracking-[0.1em] text-sage-dark">{p.duration}</p>
                <p className="flex-1 text-sm leading-[1.7] text-body-3">{p.forYouIf}</p>
                <span className="font-bold text-clay-dark">{p.price}</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* CLOSE */}
      <Section tone="ink" width="narrow" className="text-center">
        <H2 dark className="mb-4">Start with a conversation</H2>
        <p className="mb-[30px] text-base leading-[1.8] text-cream">
          Fifteen minutes, free, no obligation. Tell me what&rsquo;s present in your life and I&rsquo;ll tell you
          honestly whether {program.name} is the right doorway — or whether something else is.
        </p>
        <BookingButton variant="sand" />
      </Section>
    </>
  );
}
