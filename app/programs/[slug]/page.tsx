import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingButton from "@/components/BookingButton";
import CheckList from "@/components/CheckList";
import Curriculum from "@/components/Curriculum";
import FaqAccordion from "@/components/FaqAccordion";
import ProgramCard from "@/components/ProgramCard";
import SessionTimeline from "@/components/SessionTimeline";
import { Section, Eyebrow, H1, H2, Card } from "@/components/ui";
import { PROGRAMS, TIER_LABELS, programBySlug, type Prose } from "@/content/programs";
import { SITE, PROGRAM_FAQ_BY_TIER, QHHT_NOTE, faqByQuestion } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

/**
 * Programme pages render the practitioner's own package copy, section for
 * section, from content/programs.ts. Nothing here is newly written.
 */

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) return {};

  const description = `${program.tagline} ${program.price} · ${program.duration}.`.slice(0, 160);
  return pageMetadata({
    title: `${program.name} — ${TIER_LABELS[program.tier]}`,
    description,
    path: `/programs/${program.slug}`,
  });
}

function ProseBlock({ prose, tone = "linen" }: { prose: Prose; tone?: "linen" | "warm" }) {
  return (
    <Section tone={tone} width="narrow">
      {prose.heading && <H2 className="mb-6">{prose.heading}</H2>}
      <div className="flex flex-col gap-[18px] text-[16.5px] leading-[1.85] text-body-2">
        {prose.paragraphs.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
        {prose.bullets && <CheckList items={prose.bullets} marker="clay" className="!gap-2 !text-[15.5px]" />}
        {prose.after?.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
      </div>
    </Section>
  );
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();

  const siblings = PROGRAMS.filter((p) => p.tier === program.tier && p.slug !== program.slug);
  const faqs = (program.faq ?? PROGRAM_FAQ_BY_TIER[program.tier]).map(faqByQuestion);
  const inPerson = program.format === "in-person";

  const pageUrl = `${SITE.url}/programs/${program.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: program.name,
        description: program.tagline,
        serviceType: TIER_LABELS[program.tier],
        url: pageUrl,
        provider: { "@id": `${SITE.url}/#practice` },
        areaServed: inPerson ? SITE.location : "Worldwide",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: pageUrl,
          servicePhone: { "@type": "ContactPoint", telephone: SITE.phone, contactType: "Bookings" },
        },
        offers: {
          "@type": "Offer",
          url: pageUrl,
          price: program.price.replace(/[^0-9.]/g, ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: { "@id": `${SITE.url}/#practice` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Programs", item: `${SITE.url}/programs` },
          { "@type": "ListItem", position: 3, name: program.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* HERO */}
      <Section width="mid" className="!pb-16">
        <Eyebrow>
          Programme {program.number} · {TIER_LABELS[program.tier]}
        </Eyebrow>
        <H1 className="mb-3">{program.name}</H1>
        {program.motto && (
          <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-clay-dark">{program.motto}</p>
        )}
        <p className="mb-7 max-w-[56ch] font-display text-[27px] italic leading-[1.4] text-body-2 max-md:text-[22px]">
          {program.tagline}
        </p>
        <p className="mb-9 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[17px] text-body-3">
          <span className="font-display text-[30px] text-clay">{program.price}</span>
          <span className="text-muted">·</span>
          <span>{program.duration}</span>
          {!program.duration.includes(inPerson ? "in person" : "online") && (
            <>
              <span className="text-muted">·</span>
              <span>{inPerson ? "in person" : "online"}</span>
            </>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <BookingButton />
          <Link href="/programs" className="text-[15px] font-semibold">
            See all programs
          </Link>
        </div>
      </Section>

      {/* OPENING — the PDF's own preamble, where it has one */}
      {program.opening && <ProseBlock prose={program.opening} tone="warm" />}

      {/* WHO THIS IS FOR */}
      <Section tone={program.opening ? "linen" : "warm"} width="mid">
        <Eyebrow tone="clay">Who this is for</Eyebrow>
        <H2 className="mb-6">Is this the one?</H2>
        <p className="mb-3 max-w-[62ch] text-[17px] leading-[1.8] text-body-3">{program.audience.intro}</p>
        <p className="mb-6 text-[15.5px] font-semibold text-body">{program.audience.lead}</p>
        <CheckList items={program.audience.bullets} className="mb-8 max-w-[68ch]" />
        <p className="max-w-[60ch] font-display text-[25px] italic leading-[1.45] text-clay-dark max-md:text-[21px]">
          {program.audience.closing}
        </p>
      </Section>

      {/* THE TRANSFORMATION */}
      <Section width="wide" outerClassName={program.opening ? "border-t border-rule" : ""}>
        <div className="mb-12 max-w-[62ch]">
          <Eyebrow>The transformation you will experience</Eyebrow>
          <H2 className="mb-5">What changes</H2>
          <p className="text-[17px] leading-[1.8] text-body-3">{program.transformation.intro}</p>
        </div>
        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          {program.transformation.outcomes.map((o) => (
            <Card key={o.heading} className={o.body ? "" : "!py-6"}>
              <p className={`font-display text-[24px] leading-tight text-ink ${o.body ? "mb-3" : ""}`}>{o.heading}</p>
              {o.body && <p className="text-[15px] leading-[1.7] text-body-3">{o.body}</p>}
            </Card>
          ))}
        </div>
        <p className="mt-10 max-w-[62ch] text-[17px] font-semibold leading-[1.7] text-body">
          {program.transformation.closing}
        </p>
      </Section>

      {/* PROGRAM STRUCTURE */}
      <Section tone="warm" width="mid">
        <Eyebrow tone="clay">Program structure</Eyebrow>
        <H2 className="mb-8">How it unfolds</H2>
        <Curriculum structure={program.structure} />

        {program.bqh === "included" && (
          <div className="mt-10 rounded-[18px] border border-sage-light bg-parchment px-9 py-8 max-md:p-[26px]">
            <p className="mb-2 font-bold text-ink">This program includes a 3-hour BQH session</p>
            <p className="text-[14.5px] leading-[1.75] text-muted">
              A full quantum healing hypnotherapy session sits at the heart of Phase 2. It is deep relaxation, not
              sleep — you stay aware and in control the whole time. Read{" "}
              <Link href="/session">what a session actually looks like</Link>, stage by stage.
            </p>
          </div>
        )}
      </Section>

      {program.bqh === "session" && (
        <>
          <Section width="narrow" className="!pb-4">
            <Eyebrow>Stage by stage</Eyebrow>
            <H2 className="mb-4">How the session unfolds</H2>
            <p className="max-w-[60ch] text-base leading-[1.75] text-muted">
              You are never unconscious. It is deep relaxation — like the moments before sleep — and you can speak the
              whole time. The full walkthrough, including what happens if you don&rsquo;t go deep, is on the{" "}
              <Link href="/session">session page</Link>.
            </p>
          </Section>
          <section className="mx-auto max-w-[760px] px-8 pb-16 max-md:px-[22px]">
            <SessionTimeline />
            <div className="mt-10 rounded-[18px] border border-sand bg-parchment-2 px-[38px] py-[34px] max-md:p-[26px]">
              <p className="mb-2 font-bold text-ink">{QHHT_NOTE.heading}</p>
              <p className="text-[14.5px] leading-[1.75] text-muted">{QHHT_NOTE.body}</p>
            </div>
          </section>
        </>
      )}

      {/* WHAT CLIENTS RECEIVE */}
      <Section width="mid" outerClassName={program.bqh === "session" ? "border-t border-rule" : ""}>
        <Eyebrow>What clients receive</Eyebrow>
        <H2 className="mb-8">Included</H2>
        <CheckList items={program.receive} className="max-w-[64ch] !text-[16px]" />
        {program.receiveNote && (
          <p className="mt-8 max-w-[60ch] text-[16px] font-semibold leading-[1.7] text-body">{program.receiveNote}</p>
        )}
        {program.addendum && (
          <div className="mt-10 rounded-[18px] border border-rule-2 bg-linen-warm px-10 py-9 max-md:p-[26px]">
            <h3 className="mb-3 font-display text-2xl text-ink">{program.addendum.heading}</h3>
            <p className="mb-4 text-[15.5px] leading-[1.75] text-body-3">{program.addendum.intro}</p>
            <CheckList items={program.addendum.bullets} marker="clay" className="!gap-2 !text-[14.5px]" />
            {program.addendum.closing && (
              <p className="mt-5 text-[15px] font-semibold leading-[1.7] text-body">{program.addendum.closing}</p>
            )}
          </div>
        )}
        {program.disclaimer && <p className="mt-8 text-sm text-muted">{program.disclaimer}</p>}
      </Section>

      {/* CLOSING ESSAY — the PDF's own afterword, where it has one */}
      {program.essay && <ProseBlock prose={program.essay} tone="warm" />}

      {/* RELEVANT QUESTIONS — reviewed answers, pulled verbatim from the FAQ */}
      <Section
        tone={program.essay ? "linen" : "warm"}
        width="narrow"
        outerClassName={program.essay ? "border-t border-rule" : ""}
      >
        <Eyebrow tone="clay">Before you book</Eyebrow>
        <H2 className="mb-8">Questions people ask about this</H2>
        <FaqAccordion items={faqs} />
        <p className="mt-8 text-sm text-muted">
          Every question is answered on the <Link href="/faq">FAQ page</Link>.
        </p>
      </Section>

      {/* SIBLINGS */}
      {siblings.length > 0 && (
        <Section width="wide">
          <Eyebrow>Also in {TIER_LABELS[program.tier].toLowerCase()}</Eyebrow>
          <H2 className="mb-10">Other ways in</H2>
          <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
            {siblings.map((p) => <ProgramCard key={p.slug} p={p} variant="compact" />)}
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
