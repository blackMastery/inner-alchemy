import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingButton from "@/components/BookingButton";
import FaqAccordion from "@/components/FaqAccordion";
import ProgramCard from "@/components/ProgramCard";
import ProgramEntry from "@/components/ProgramEntry";
import SessionTimeline from "@/components/SessionTimeline";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";
import {
  CATEGORIES,
  HYPNOTHERAPY,
  PROGRAM_PAGES,
  categoryOf,
  masteryOf,
  programBySlug,
  programHref,
} from "@/content/programs";
import { SITE, CATEGORY_FAQ, faqByQuestion } from "@/content/site";
import { offerFor, programBreadcrumbs, jsonLdHtml } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return PROGRAM_PAGES.map((p) => ({ slug: p.slug }));
}

/** Aliases (pageOf) have no page; only PROGRAM_PAGES resolve. */
function pageProgram(slug: string) {
  const p = programBySlug(slug);
  return p && !p.pageOf ? p : undefined;
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const program = pageProgram(slug);
  if (!program) return {};
  const category = CATEGORIES[categoryOf(slug)];
  const meta = [program.duration, program.priceNote ? `${program.price} ${program.priceNote}` : program.price].join(" · ");
  return pageMetadata({
    title: `${program.name} — ${category.label}`,
    description: `${program.paragraphs[0].replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, "$1")} ${meta}.`.slice(0, 160),
    path: programHref(slug),
  });
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = pageProgram(slug);
  if (!program) notFound();

  const categoryKey = categoryOf(slug);
  const category = CATEGORIES[categoryKey];
  const mastery = masteryOf(slug);
  const group = mastery
    ? { name: mastery.name, href: `${category.href}#${mastery.id}` }
    : { name: category.label, href: category.href };
  const siblings = (mastery?.programs ?? HYPNOTHERAPY).filter((p) => p.slug !== slug && !p.pageOf);
  const faqs = CATEGORY_FAQ[categoryKey].map(faqByQuestion);
  const isSession = categoryKey === "hypnotherapy";

  const path = programHref(slug);
  const pageUrl = `${SITE.url}${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: program.name,
        serviceType: isSession ? "Quantum healing hypnosis (BQH / QHHT®)" : "Transformational life coaching",
        url: pageUrl,
        provider: { "@id": `${SITE.url}/#practice` },
        areaServed: program.format === "in-person" ? SITE.location : "Worldwide",
        offers: offerFor(program),
      },
      programBreadcrumbs([
        { name: category.label, path: category.href },
        ...(mastery ? [{ name: mastery.name, path: `${category.href}#${mastery.id}` }] : []),
        { name: program.name, path },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />

      <Section width="mid" className="!pb-10">
        <Eyebrow>
          <Link href={category.href} className="text-inherit">{category.label}</Link>
          {mastery && (
            <>
              {" · "}
              <Link href={group.href} className="text-inherit">{mastery.name}</Link>
            </>
          )}
        </Eyebrow>
        <H1 className="mb-5">{program.name}</H1>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[17px] text-body-3">
          <span className="font-display text-[30px] text-clay">
            {program.price}
            {program.priceNote && <span className="text-[17px] text-muted"> {program.priceNote}</span>}
          </span>
          <span className="text-muted">·</span>
          <span>{program.duration}</span>
          <span className="text-muted">·</span>
          <span>{program.format === "in-person" ? "in person" : "online"}</span>
        </p>
      </Section>

      <section className="mx-auto max-w-[880px] px-8 pb-20 max-md:px-[22px]">
        <ProgramEntry p={program} />
      </section>

      {isSession && (
        <Section tone="warm" width="narrow" className="!py-16">
          <Eyebrow tone="clay">The session, stage by stage</Eyebrow>
          <H2 className="mb-3">What the hours actually hold</H2>
          <p className="mb-6 text-[15.5px] leading-[1.75] text-muted">
            Spans are relative to a 3–4 hour BQH session; QHHT® runs longer.{" "}
            <Link href="/session">Read the full session explainer</Link>.
          </p>
          <SessionTimeline />
        </Section>
      )}

      {siblings.length > 0 && (
        <section className="mx-auto max-w-[1120px] px-8 pb-20 max-md:px-[22px]">
          <h2 className="mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-clay-dark">
            Also in {group.name}
          </h2>
          <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
            {siblings.map((p) => (
              <ProgramCard key={p.slug} p={p} />
            ))}
          </div>
          <p className="mt-6 text-[15px] font-semibold">
            <Link href={category.href}>All {category.label.toLowerCase()} →</Link>
          </p>
        </section>
      )}

      <section className="mx-auto max-w-[760px] px-8 pb-20 max-md:px-[22px]">
        <Eyebrow tone="clay">Before you book</Eyebrow>
        <H2 className="mb-6">Questions people ask</H2>
        <FaqAccordion items={faqs} />
      </section>

      <Section tone="ink" width="narrow" className="text-center">
        <H2 dark className="mb-4">Start with fifteen minutes.</H2>
        <p className="mb-[30px] text-base leading-[1.75] text-cream">
          Tell me what&rsquo;s present right now and I&rsquo;ll say honestly whether {program.name} is the right
          doorway — or point you to a better one.
        </p>
        <BookingButton variant="sand" />
      </Section>
    </>
  );
}
