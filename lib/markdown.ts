/* Markdown mirrors of every page, rendered from the same content modules the
   HTML pages use. Served at /<path>.md (and to `Accept: text/markdown`),
   concatenated into /llms-full.txt, and indexed by /llms.txt. */

import {
  SITE,
  PRACTITIONER,
  HOME_HERO,
  HOME_INTRO,
  SHORT_BIO,
  METHOD,
  FIT,
  PRICING_ROWS,
  TESTIMONIALS,
  FAQ_GROUPS,
  CATEGORY_FAQ,
  faqByQuestion,
  SESSION_TIMELINE,
  SESSION_PREP,
  SESSION_HONESTY,
  STORY_PARAGRAPHS,
  STORY_PULL_QUOTE,
  STORY_PARAGRAPHS_AFTER,
} from "@/content/site";
import {
  CATEGORIES,
  COACHING,
  HYPNOTHERAPY,
  PROGRAM_PAGES,
  LINK_TOKEN,
  categoryOf,
  masteryOf,
  programHref,
  type Program,
  type ProgramCategory,
} from "@/content/programs";
import { STATIC_PAGES, programPageMeta, mdPathFor, type PageMeta } from "./pages";
import { SITE_NAME } from "./seo";

const abs = (path: string) => `${SITE.url}${path}`;
const link = (label: string, path: string) => `[${label}](${abs(path)})`;

/** `[[slug|Label]]` tokens become absolute Markdown links. */
export const richToMd = (text: string) =>
  text.replace(LINK_TOKEN, (_m, slug: string, label: string) => link(label, programHref(slug)));

const head = (meta: PageMeta) => [`# ${meta.title}`, "", `> ${meta.description}`, ""];
const paras = (texts: readonly string[]) => texts.flatMap((t) => [richToMd(t), ""]);
const bullets = (items: readonly string[]) => [...items.map((i) => `- ${i}`), ""];

const priceOf = (p: Program) => `${p.price}${p.priceNote ? ` ${p.priceNote}` : ""}`;
const formatOf = (p: Program) => (p.format === "in-person" ? "in person" : "online");
const summaryOf = (p: Program) => `**${priceOf(p)}** · ${p.duration} · ${formatOf(p)}`;

/** A program as a list item with its price, length, format and link. */
const programItem = (p: Program) => `- ${link(p.name, programHref(p.slug))} — ${priceOf(p)} · ${p.duration} · ${formatOf(p)}`;

/** A program as a titled entry: heading, summary line, opening paragraph. */
const programEntry = (p: Program) => [`### ${link(p.name, programHref(p.slug))}`, "", summaryOf(p), "", richToMd(p.paragraphs[0]), ""];

const faqItems = (items: readonly { q: string; a: string }[]) => items.flatMap((f) => [`### ${f.q}`, "", f.a, ""]);
const categoryFaq = (c: ProgramCategory) => ["## Questions people ask", "", ...faqItems(CATEGORY_FAQ[c].map(faqByQuestion))];

const timeline = () => SESSION_TIMELINE.flatMap((s) => [`### ${s.span} — ${s.title}`, "", s.body, ""]);

const contact = () => [
  "## Book a free 15-minute discovery call",
  "",
  `Call ${SITE.phone} or email ${SITE.email}. Sessions are held online worldwide; in-person programs take place in ${SITE.location}. All prices are in US dollars. Payment plans are available on every program, and a deposit holds your place.`,
  "",
  `More: ${link("Programs & pricing", "/programs")} · ${link("FAQ", "/faq")} · ${link("What a session looks like", "/session")} · ${link("About " + PRACTITIONER.name, "/story")}`,
];

/* ---------------------------------------------------------------------------
 * Pages
 * ------------------------------------------------------------------------- */

function homeMd() {
  return [
    ...head(STATIC_PAGES.home),
    `*${HOME_HERO.eyebrow}*`,
    "",
    `## ${HOME_HERO.headline.join(" ")} ${HOME_HERO.subline}`,
    "",
    HOME_HERO.body,
    "",
    `## ${HOME_INTRO.eyebrow}`,
    "",
    ...paras(HOME_INTRO.paragraphs),
    `## Meet ${PRACTITIONER.name} — ${PRACTITIONER.title}`,
    "",
    ...paras(SHORT_BIO),
    `Read more: ${link("How I came to this work", "/story")}.`,
    "",
    "## How the work works — three things, done together",
    "",
    "Every program blends the same three threads. The difference is depth, length, and which door you walk in through.",
    "",
    ...METHOD.flatMap((m) => [`### ${m.title}`, "", m.body, ""]),
    "## Two paths in",
    "",
    `### ${link(CATEGORIES.coaching.label, CATEGORIES.coaching.href)}`,
    "",
    "Private, one-to-one coaching across five areas of mastery — from a single 90-minute reset to a two-day in-person intensive:",
    "",
    ...bullets(COACHING.map((m) => `${link(m.name, `${CATEGORIES.coaching.href}#${m.id}`)} — ${m.programs.length} programs`)),
    `### ${link(CATEGORIES.hypnotherapy.label, CATEGORIES.hypnotherapy.href)}`,
    "",
    `Some patterns don’t move through conversation alone. A quantum healing session reaches the subconscious directly — deeply relaxed, fully aware, speaking the whole time. ${link("Read the session, stage by stage", "/session")}.`,
    "",
    ...HYPNOTHERAPY.map(programItem),
    "",
    "## Is this work for you?",
    "",
    "This tends to be a fit if…",
    "",
    ...bullets(FIT.yes),
    "It isn’t the right tool if…",
    "",
    ...bullets(FIT.no),
    ...(SITE.testimonialsApproved
      ? ["## What shifted for clients", "", ...TESTIMONIALS.flatMap((t) => [`> "${t.quote}"`, `> — ${t.attribution}`, ""])]
      : []),
    "## Pricing, plainly",
    "",
    "| Program | Price |",
    "| --- | --- |",
    ...PRICING_ROWS.map((r) => `| ${r.href ? link(r.label, r.href) : r.label} | ${r.price} |`),
    "",
    "All prices in US dollars. Payment plans available — just ask on the discovery call. A deposit holds your place.",
    "",
    ...contact(),
  ].join("\n");
}

function programsMd() {
  return [
    ...head(STATIC_PAGES.programs),
    "Every program leads to the same place — remembering who you truly are and consciously creating from there. They differ in depth, length, and the life area they enter through.",
    "",
    `## ${link(CATEGORIES.coaching.label, CATEGORIES.coaching.href)} — five areas of mastery`,
    "",
    ...COACHING.flatMap((m) => [`### ${m.name}`, "", ...m.programs.map(programItem), ""]),
    `## ${link(CATEGORIES.hypnotherapy.label, CATEGORIES.hypnotherapy.href)} — three sessions`,
    "",
    ...HYPNOTHERAPY.map(programItem),
    "",
    ...contact(),
  ].join("\n");
}

function coachingMd() {
  return [
    ...head(STATIC_PAGES.coaching),
    "Seventeen programs across five areas of mastery. Every one is private, one-to-one, and priced plainly.",
    "",
    ...COACHING.flatMap((m) => [`## ${m.name}`, "", ...m.programs.flatMap(programEntry)]),
    ...categoryFaq("coaching"),
    ...contact(),
  ].join("\n");
}

function hypnotherapyMd() {
  return [
    ...head(STATIC_PAGES.hypnotherapy),
    "Three sessions — online and in person. One-to-one, with the complete recording to take home.",
    "",
    ...HYPNOTHERAPY.flatMap(programEntry),
    "## The session, stage by stage",
    "",
    `Spans are relative to a 3–4 hour BQH session; QHHT® runs longer. ${link("Read the full session explainer", "/session")}.`,
    "",
    ...timeline(),
    ...categoryFaq("hypnotherapy"),
    ...contact(),
  ].join("\n");
}

function programMd(p: Program) {
  const categoryKey = categoryOf(p.slug);
  const category = CATEGORIES[categoryKey];
  const mastery = masteryOf(p.slug);
  const siblings = (mastery?.programs ?? HYPNOTHERAPY).filter((s) => s.slug !== p.slug && !s.pageOf);
  return [
    ...head(programPageMeta(p)),
    summaryOf(p),
    "",
    `Part of ${link(category.label, category.href)}${mastery ? ` › ${link(mastery.name, `${category.href}#${mastery.id}`)}` : ""} at ${SITE_NAME}.`,
    "",
    ...paras(p.paragraphs),
    ...(p.idealFor ? [`**Ideal for:** ${p.idealFor}`, ""] : []),
    ...(p.structure
      ? [`## ${p.structure.heading}`, "", ...p.structure.steps.map((s, i) => `${i + 1}. **${s.title}** — ${s.body}`), ""]
      : []),
    ...(p.forYouIf ? ["## This is for you if", "", ...bullets(p.forYouIf)] : []),
    ...(categoryKey === "hypnotherapy" ? ["## The session, stage by stage", "", ...timeline()] : []),
    ...(siblings.length ? [`## Also in ${mastery?.name ?? category.label}`, "", ...siblings.map(programItem), ""] : []),
    ...categoryFaq(categoryKey),
    ...contact(),
  ].join("\n");
}

function sessionMd() {
  return [
    ...head(STATIC_PAGES.session),
    "The three questions everyone brings: *Will I be unconscious? Can you make me do something? Will I remember it?* No, no, and almost certainly yes. This work happens in a state like the moments before sleep — deeply relaxed, fully in control, able to speak the whole time. Here is the entire session, with nothing left out.",
    "",
    `This is the ${link("BQH session", "/programs/bqh")}, and the BQH sessions inside ${link("Unleash the Inner Alchemist", "/programs/unleash-the-inner-alchemist")}.`,
    "",
    `## ${SESSION_PREP.heading}`,
    "",
    SESSION_PREP.body,
    "",
    ...bullets(SESSION_PREP.items),
    "## The session, stage by stage",
    "",
    ...timeline(),
    `## ${SESSION_HONESTY.heading}`,
    "",
    ...paras(SESSION_HONESTY.paragraphs),
    ...categoryFaq("hypnotherapy"),
    ...contact(),
  ].join("\n");
}

function faqMd() {
  return [
    ...head(STATIC_PAGES.faq),
    "If your question isn’t here, bring it to a free discovery call — strange questions welcome.",
    "",
    ...FAQ_GROUPS.flatMap((g) => [`## ${g.group}`, "", ...faqItems(g.items)]),
    ...contact(),
  ].join("\n");
}

function storyMd() {
  return [
    ...head(STATIC_PAGES.story),
    `**${PRACTITIONER.name}** — ${PRACTITIONER.credentials}. ${PRACTITIONER.location}.`,
    "",
    "## How I came to this work",
    "",
    ...paras(STORY_PARAGRAPHS),
    `> ${STORY_PULL_QUOTE}`,
    "",
    ...paras(STORY_PARAGRAPHS_AFTER),
    ...contact(),
  ].join("\n");
}

/* ---------------------------------------------------------------------------
 * Registry
 * ------------------------------------------------------------------------- */

export type MdPage = PageMeta & { render: () => string };

export const MARKDOWN_PAGES: MdPage[] = [
  { ...STATIC_PAGES.home, render: homeMd },
  { ...STATIC_PAGES.programs, render: programsMd },
  { ...STATIC_PAGES.coaching, render: coachingMd },
  { ...STATIC_PAGES.hypnotherapy, render: hypnotherapyMd },
  { ...STATIC_PAGES.session, render: sessionMd },
  { ...STATIC_PAGES.faq, render: faqMd },
  { ...STATIC_PAGES.story, render: storyMd },
  ...PROGRAM_PAGES.map((p) => ({ ...programPageMeta(p), render: () => programMd(p) })),
];

/** llms.txt — a curated index, per https://llmstxt.org. */
export function renderLlmsTxt() {
  const entry = (m: PageMeta, note?: string) => `- [${m.title}](${abs(mdPathFor(m.path))}): ${note ?? m.description}`;
  const programLine = (p: Program, prefix?: string) =>
    entry(programPageMeta(p), `${prefix ? `${prefix} · ` : ""}${priceOf(p)} · ${p.duration} · ${formatOf(p)}. ${richToMd(p.paragraphs[0])}`);
  return [
    `# ${SITE_NAME}`,
    "",
    `> Transformational life coaching and BQH/QHHT® quantum healing hypnotherapy with ${PRACTITIONER.name}. Private, one-to-one sessions online worldwide; in-person programs in ${SITE.location}. All prices in US dollars. Book a free 15-minute discovery call: ${SITE.phone} · ${SITE.email}.`,
    "",
    `Every page on the site has a Markdown version: append \`.md\` to its URL, or request it with \`Accept: text/markdown\`. The complete site text in one file is at ${abs("/llms-full.txt")}.`,
    "",
    "## About",
    "",
    entry(STATIC_PAGES.home),
    entry(STATIC_PAGES.story),
    entry(STATIC_PAGES.programs),
    "",
    "## Coaching programs",
    "",
    entry(STATIC_PAGES.coaching),
    ...COACHING.flatMap((m) => m.programs.filter((p) => !p.pageOf).map((p) => programLine(p, m.name))),
    "",
    "## Hypnotherapy sessions",
    "",
    entry(STATIC_PAGES.hypnotherapy),
    ...HYPNOTHERAPY.map((p) => programLine(p)),
    "",
    "## Before you book",
    "",
    entry(STATIC_PAGES.session),
    entry(STATIC_PAGES.faq),
    "",
    "## Contact",
    "",
    `- Phone: ${SITE.phone}`,
    `- Email: ${SITE.email}`,
    `- Location: ${SITE.location} — sessions online worldwide`,
    `- Sitemap: ${abs("/sitemap.xml")}`,
    "",
  ].join("\n");
}

/** llms-full.txt — every page's Markdown, in site order. */
export const renderLlmsFull = () => MARKDOWN_PAGES.map((p) => p.render()).join("\n\n---\n\n");
