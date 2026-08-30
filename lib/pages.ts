/* One registry of every page's path, title and description. Page metadata,
   the sitemap, the Markdown mirrors and llms.txt all read from here, so a
   title or description can never drift between surfaces. */

import { CATEGORIES, LINK_TOKEN, categoryOf, programHref, type Program } from "@/content/programs";

/** Bump when site copy changes — feeds <lastmod> in the sitemap. */
export const CONTENT_UPDATED = "2026-08-29";

export type PageMeta = {
  /** Route path, e.g. "/programs". Becomes the canonical, og:url and the Markdown twin's path. */
  path: string;
  title: string;
  description: string;
  /** Use the title verbatim in <title> — for the home page, where the brand leads. */
  absoluteTitle?: boolean;
};

export const STATIC_PAGES = {
  home: {
    path: "/",
    title: "Transformational Life Coach & BQH/QHHT® Practitioner — Inner Alchemy Institution",
    description:
      "Transformational life coaching with Hadassah Headley — clear limiting beliefs, heal subconscious patterns and consciously create your life, online. Coaching programs across life, money, business, relationships and spirit, plus BQH/QHHT® hypnotherapy sessions. Book a free 15-minute call.",
    absoluteTitle: true,
  },
  programs: {
    path: "/programs",
    title: "Programs & Pricing",
    description:
      "Two paths in: coaching programs across life, money, business, relationships and spirit — from a US$150 Power Reset to a two-day private intensive — and BQH/QHHT® hypnotherapy sessions from US$350.",
  },
  coaching: {
    path: CATEGORIES.coaching.href,
    title: CATEGORIES.coaching.label,
    description:
      "Seventeen transformational coaching programs across five areas of mastery — life, money, business, relationships and spirit — with plain pricing, from a US$150 Power Reset session to a two-day private intensive.",
  },
  hypnotherapy: {
    path: CATEGORIES.hypnotherapy.href,
    title: `${CATEGORIES.hypnotherapy.label} — BQH & QHHT®`,
    description:
      "Three quantum healing hypnosis sessions: BQH online from anywhere (US$350), QHHT® in person as Dolores Cannon designed it (US$450), or both combined (US$700). Plain pricing, sessions of 3–8 hours.",
  },
  session: {
    path: "/session",
    title: "What a BQH/QHHT® Quantum Healing Session Looks Like",
    description:
      "A quantum healing hypnosis session, stage by stage: the interview, the induction, the journey, your questions, and the recording you take home — including what happens if you don't reach a deep trance.",
  },
  faq: {
    path: "/faq",
    title: "FAQ — Coaching & Quantum Healing Questions",
    description:
      "Honest answers about transformational coaching programs — format, support between sessions, recordings, payment plans — and BQH/QHHT® quantum healing sessions: control, memory, and what happens if you don't go deep.",
  },
  story: {
    path: "/story",
    title: "Hadassah Headley — My Story",
    description:
      "From Guyana to transformational life coaching: Hadassah Headley's story of survival, single motherhood, and remembering who she truly is — and why she now guides others through the same awakening.",
  },
} as const satisfies Record<string, PageMeta>;

/** Title and description for a program's own page at /programs/<slug>. */
export function programPageMeta(p: Program): PageMeta {
  const category = CATEGORIES[categoryOf(p.slug)];
  const meta = [p.duration, p.priceNote ? `${p.price} ${p.priceNote}` : p.price].join(" · ");
  return {
    path: programHref(p.slug),
    title: `${p.name} — ${category.label}`,
    description: `${p.paragraphs[0].replace(LINK_TOKEN, "$2")} ${meta}.`.slice(0, 160),
  };
}

/** The Markdown twin of a page: "/" → "/index.md", "/faq" → "/faq.md". */
export const mdPathFor = (path: string) => (path === "/" ? "/index.md" : `${path}.md`);

/** The key the /md/[...path] handler matches on: "/" → "index", "/programs/bqh" → "programs/bqh". */
export const pageKey = (path: string) => (path === "/" ? "index" : path.slice(1));
