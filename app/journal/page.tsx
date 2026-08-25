import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import { Section, Eyebrow, H1, H2 } from "@/components/ui";
import { JOURNAL } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Straight answers to the questions people ask before booking a hypnosis session: control, whether it works for everyone, belief, and how to prepare.",
  alternates: { canonical: "/journal" },
};

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function JournalPage() {
  const posts = [...JOURNAL].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Section width="mid" className="!pb-14">
        <Eyebrow>Journal</Eyebrow>
        <H1 className="mb-5">The questions people ask first.</H1>
        <p className="max-w-[60ch] text-[17px] leading-[1.8] text-body-3">
          Longer answers to the things that come up before anyone books — written out properly, because a
          paragraph on an FAQ page rarely settles them. If your question isn&rsquo;t here, the{" "}
          <Link href="/faq">FAQ</Link> has thirteen more, and the discovery call has room for all of them.
        </p>
      </Section>

      <section className="mx-auto max-w-[880px] px-8 pb-24 max-md:px-[22px] max-md:pb-16">
        {posts.map((post) => (
          <article key={post.slug} className="border-t border-rule py-10 first:border-t-0 first:pt-0">
            <p className="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted">
              <span className="text-sage-dark">{post.tag}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{DATE_FORMAT.format(new Date(post.date))}</time>
            </p>
            <h2 className="mb-3 font-display text-[30px] font-medium leading-tight max-md:text-[25px]">
              <Link href={`/journal/${post.slug}`} className="text-ink no-underline hover:text-clay-dark">
                {post.title}
              </Link>
            </h2>
            <p className="mb-4 max-w-[64ch] text-[16px] leading-[1.75] text-body-3">{post.excerpt}</p>
            <Link href={`/journal/${post.slug}`} className="text-sm font-semibold">
              Read it →
            </Link>
          </article>
        ))}
      </section>

      <Section tone="warm" width="narrow" className="text-center">
        <H2 className="mb-4">Still have a question?</H2>
        <p className="mb-[30px] text-base leading-[1.75] text-body-3">
          Bring it to the discovery call — fifteen minutes, free, no obligation. Or read the{" "}
          <Link href="/session">stage-by-stage walkthrough</Link> of a quantum healing session first.
        </p>
        <BookingButton />
      </Section>
    </>
  );
}
