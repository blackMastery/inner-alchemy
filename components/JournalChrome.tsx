import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import { Eyebrow } from "@/components/ui";
import { journalBySlug } from "@/content/journal";
import { SITE } from "@/content/site";

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Title block for a journal post, driven by the registry in content/journal.ts. */
export function PostHeader({ slug }: { slug: string }) {
  const post = journalBySlug(slug);
  if (!post) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${SITE.url}/journal/${post.slug}`,
    // No `author` while the post is unreviewed — it must not be attributed to
    // the practitioner before she has read it.
    publisher: { "@type": "Organization", name: "Inner Alchemy Institution" },
  };

  return (
    <header className="mb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Eyebrow>{post.tag}</Eyebrow>
      <h1 className="mb-5 font-display text-[46px] font-medium leading-[1.15] text-ink text-pretty max-md:text-[32px]">
        {post.title}
      </h1>
      <p className="text-sm text-muted">
        <time dateTime={post.date}>{DATE_FORMAT.format(new Date(post.date))}</time>
        {post.unreviewed && (
          // No byline until the practitioner has read and approved the post.
          <span className="ml-3 border-l border-rule-3 pl-3">Inner Alchemy Institution</span>
        )}
      </p>
    </header>
  );
}

/** Closing CTA shared by every post. */
export function PostFooter() {
  return (
    <footer className="mt-16 border-t border-rule pt-12">
      <h2 className="mb-4 font-display text-[30px] font-medium leading-tight text-ink max-md:text-[25px]">
        Still deciding?
      </h2>
      <p className="mb-8 max-w-[62ch] text-[16.5px] leading-[1.8] text-body-3">
        The discovery call is fifteen minutes, free, and genuinely without obligation — a conversation, not a
        sales call. If you would rather read first, the{" "}
        <Link href="/session">session walkthrough</Link> covers the whole day hour by hour, and the{" "}
        <Link href="/faq">FAQ</Link> answers the thirteen questions people ask most.
      </p>
      <BookingButton />
    </footer>
  );
}
