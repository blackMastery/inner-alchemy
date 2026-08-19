/**
 * Journal registry.
 *
 * File-per-post MDX routing gives no automatic index, so the list lives here —
 * consistent with the rest of the site's content-in-TypeScript architecture,
 * and the single source for /journal, the sitemap and internal links.
 *
 * ---------------------------------------------------------------------------
 * NOTE FOR REVIEW: these posts were drafted from the reviewed FAQ answers in
 * site.ts and have NOT yet been read by the practitioner. They publish without
 * a byline for that reason. Once she has reviewed and approved them, add her
 * byline. Nothing here should be attributed to her before then.
 * ---------------------------------------------------------------------------
 */

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, used for sitemap lastModified and the post header. */
  date: string;
  tag: string;
  /** Unreviewed by the practitioner — suppresses the byline. */
  unreviewed: boolean;
};

export const JOURNAL: JournalPost[] = [
  {
    slug: "will-i-lose-control-under-hypnosis",
    title: "Will I lose control under hypnosis?",
    excerpt:
      "The single most common reason people don't book. What the hypnotic state actually is, where the stage-show idea came from, and what you can and cannot be made to do.",
    date: "2026-07-14",
    tag: "Before you book",
    unreviewed: true,
  },
  {
    slug: "what-if-nothing-happens-for-me",
    title: "What if nothing happens for me?",
    excerpt:
      "An honest answer to the fear underneath the booking: that you'll be the one it doesn't work for. What a lighter session actually looks like, and what happens next if you have one.",
    date: "2026-07-28",
    tag: "During the session",
    unreviewed: true,
  },
  {
    slug: "do-i-have-to-believe-in-past-lives",
    title: "Do I have to believe in past lives for this to work?",
    excerpt:
      "No — and skeptics often have the most striking sessions. On holding the material lightly, why belief isn't the mechanism, and what changes whether you read it as memory or metaphor.",
    date: "2026-08-11",
    tag: "Before you book",
    unreviewed: true,
  },
  {
    slug: "how-to-write-your-question-list",
    title: "How to write your question list",
    excerpt:
      "Half the session is built from the list you bring. How to find the questions worth asking, how many to write, and why the exact wording matters more than you'd expect.",
    date: "2026-08-18",
    tag: "Preparing",
    unreviewed: true,
  },
];

export const journalBySlug = (slug: string) => JOURNAL.find((p) => p.slug === slug);
