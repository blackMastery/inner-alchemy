import type { Metadata } from "next";
import BookingButton from "@/components/BookingButton";
import FaqAccordion from "@/components/FaqAccordion";
import JumpNav from "@/components/JumpNav";
import MasterySection from "@/components/MasterySection";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";
import { CATEGORIES, COACHING } from "@/content/programs";
import { SITE, CATEGORY_FAQ, faqByQuestion } from "@/content/site";
import { offerFor, programBreadcrumbs, jsonLdHtml } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

const { label, href } = CATEGORIES.coaching;

export const metadata: Metadata = pageMetadata({
  title: label,
  description:
    "Seventeen transformational coaching programs across five areas of mastery — life, money, business, relationships and spirit — with plain pricing, from a US$150 Power Reset session to a two-day private intensive.",
  path: href,
});

const JUMP_ITEMS = COACHING.map((m) => ({ id: m.id, label: m.name }));

export default function CoachingPage() {
  const pageUrl = `${SITE.url}${href}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: label,
        serviceType: "Transformational life coaching",
        url: pageUrl,
        provider: { "@id": `${SITE.url}/#practice` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: label,
          itemListElement: COACHING.map((m) => ({
            "@type": "OfferCatalog",
            name: m.name,
            itemListElement: m.programs.filter((p) => !p.pageOf).map(offerFor),
          })),
        },
      },
      programBreadcrumbs([{ name: label, path: href }]),
    ],
  };
  const faqs = CATEGORY_FAQ.coaching.map(faqByQuestion);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />

      <Section width="mid" className="text-center !pb-12">
        <Eyebrow>{label}</Eyebrow>
        <H1 className="mb-5">Coaching Programs</H1>
        <p className="mx-auto max-w-[52ch] text-[17px] leading-[1.8] text-body-3">
          Seventeen programs across five areas of mastery. Every one is private, one-to-one, and priced plainly.
        </p>
      </Section>

      <JumpNav items={JUMP_ITEMS} />

      {COACHING.map((m, i) => (
        <MasterySection key={m.id} mastery={m} tone={i % 2 === 0 ? "linen" : "warm"} />
      ))}

      <section className="mx-auto max-w-[760px] px-8 py-20 max-md:px-[22px] max-md:py-14">
        <Eyebrow tone="clay">Before you book</Eyebrow>
        <H2 className="mb-6">Questions people ask</H2>
        <FaqAccordion items={faqs} />
      </section>

      <Section tone="ink" width="narrow" className="text-center">
        <H2 dark className="mb-4">Not sure which doorway is yours?</H2>
        <p className="mb-[30px] text-base leading-[1.75] text-cream">
          Tell me what&rsquo;s present in your life right now, and I&rsquo;ll tell you honestly which program fits — or
          whether a single session is the better start.
        </p>
        <BookingButton variant="sand" />
      </Section>
    </>
  );
}
