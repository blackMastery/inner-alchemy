import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import BookingButton from "@/components/BookingButton";
import { Section, Eyebrow, H1 } from "@/components/ui";
import { SITE, PRACTITIONER, STORY_PARAGRAPHS, STORY_PULL_QUOTE, STORY_PARAGRAPHS_AFTER } from "@/content/site";
import { breadcrumbs, jsonLdHtml } from "@/lib/jsonld";
import { STATIC_PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

const page = STATIC_PAGES.story;

export const metadata: Metadata = pageMetadata(page);

export default function StoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}${page.path}`,
        url: `${SITE.url}${page.path}`,
        name: page.title,
        description: page.description,
        mainEntity: { "@id": `${SITE.url}/#practitioner` },
      },
      breadcrumbs([{ name: "My Story", path: page.path }]),
    ],
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
    <Section className="grid grid-cols-[0.8fr_1.2fr] items-start gap-[72px] !pb-[72px] max-md:grid-cols-1 max-md:gap-8">
      <div className="sticky top-[120px] max-lg:static">
        <ImageSlot
          src="/images/portrait-casual.jpg"
          alt={PRACTITIONER.name}
          label="Portrait for the origin story — warm, informal, not a studio headshot"
          width={440}
          height={620}
          priority
          className="h-[620px] w-full rounded-[20px] object-cover object-top max-md:h-[420px]"
        />
        <p className="mt-3.5 text-center text-[13px] italic text-muted">{PRACTITIONER.credentials}</p>
      </div>

      <div>
        <Eyebrow>About {PRACTITIONER.name}</Eyebrow>
        <H1 className="mb-8 !text-[50px] max-md:!text-[34px]">How I came to this work</H1>

        <div className="flex flex-col gap-[22px] text-[16.5px] leading-[1.85] text-body-2">
          {STORY_PARAGRAPHS.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}

          <blockquote className="border-l-2 border-clay-light py-1.5 pl-7 font-display text-[27px] italic leading-[1.45] text-clay max-md:text-[22px]">
            {STORY_PULL_QUOTE}
          </blockquote>

          {STORY_PARAGRAPHS_AFTER.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>

        <BookingButton className="mt-9" />
      </div>
    </Section>
    </>
  );
}
