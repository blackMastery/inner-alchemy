import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import FaqAccordion from "@/components/FaqAccordion";
import ProgramCard from "@/components/ProgramCard";
import SessionTimeline from "@/components/SessionTimeline";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";
import { CATEGORIES, HYPNOTHERAPY } from "@/content/programs";
import { SITE, CATEGORY_FAQ, faqByQuestion } from "@/content/site";
import { offerFor, programBreadcrumbs, jsonLdHtml } from "@/lib/jsonld";
import { STATIC_PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

const { label, href } = CATEGORIES.hypnotherapy;

export const metadata: Metadata = pageMetadata(STATIC_PAGES.hypnotherapy);

export default function HypnotherapyPage() {
  const pageUrl = `${SITE.url}${href}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: label,
        serviceType: "Quantum healing hypnosis (BQH / QHHT®)",
        url: pageUrl,
        provider: { "@id": `${SITE.url}/#practice` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: label,
          itemListElement: HYPNOTHERAPY.map(offerFor),
        },
      },
      programBreadcrumbs([{ name: label, path: href }]),
    ],
  };
  const faqs = CATEGORY_FAQ.hypnotherapy.map(faqByQuestion);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />

      <Section width="mid" className="text-center !pb-12">
        <Eyebrow>{label}</Eyebrow>
        <H1 className="mb-5">Hypnotherapy Programs</H1>
        <p className="mx-auto max-w-[52ch] text-[17px] leading-[1.8] text-body-3">
          Three sessions — online and in person. One-to-one, with the complete recording to take home.
        </p>
      </Section>

      <section className="mx-auto max-w-[1120px] px-8 pb-20 max-md:px-[22px]">
        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          {HYPNOTHERAPY.map((p) => (
            <ProgramCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <Section tone="warm" width="narrow" className="!py-16">
        <Eyebrow tone="clay">The session, stage by stage</Eyebrow>
        <H2 className="mb-3">What the hours actually hold</H2>
        <p className="mb-6 text-[15.5px] leading-[1.75] text-muted">
          Spans are relative to a 3–4 hour BQH session; QHHT® runs longer.{" "}
          <Link href="/session">Read the full session explainer</Link>, including what happens if you don&rsquo;t go deep.
        </p>
        <SessionTimeline />
      </Section>

      <section className="mx-auto max-w-[760px] px-8 py-20 max-md:px-[22px] max-md:py-14">
        <Eyebrow tone="clay">Before you book</Eyebrow>
        <H2 className="mb-6">Questions people ask</H2>
        <FaqAccordion items={faqs} />
      </section>

      <Section tone="ink" width="narrow" className="text-center">
        <H2 dark className="mb-4">Bring your questions with you.</H2>
        <p className="mb-[30px] text-base leading-[1.75] text-cream">
          Which format fits depends on what you&rsquo;re carrying and whether you can be here in person. Fifteen minutes
          is enough to tell.
        </p>
        <BookingButton kind="program" variant="sand" />
      </Section>
    </>
  );
}
