import type { Metadata } from "next";
import BookingButton from "@/components/BookingButton";
import FaqAccordion from "@/components/FaqAccordion";
import { Section, Eyebrow, H1 } from "@/components/ui";
import { FAQ_GROUPS } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Honest answers about the coaching programs — format, support between sessions, recordings, payment plans — and about quantum healing sessions: control, memory, what happens if you don't go deep.",
  alternates: { canonical: "/faq" },
};

/* Every answer is also SEO surface — emit FAQPage structured data. */
function FaqJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }} />;
}

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <Section width="narrow" className="!pb-14">
        <Eyebrow>Everything people ask</Eyebrow>
        <H1 className="mb-5">Questions &amp; honest answers</H1>
        <p className="text-[16.5px] leading-[1.8] text-body-3">
          If your question isn&rsquo;t here, bring it to a free discovery call — strange questions welcome.
        </p>
      </Section>

      {FAQ_GROUPS.map((group) => (
        <section key={group.group} className="mx-auto max-w-[760px] px-8 pb-10 max-md:px-[22px]">
          <h2 className="mb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-clay-dark">{group.group}</h2>
          <FaqAccordion items={group.items} />
        </section>
      ))}

      <Section width="narrow" className="text-center !pt-0">
        <BookingButton>Ask the rest on a free call</BookingButton>
      </Section>
    </>
  );
}
