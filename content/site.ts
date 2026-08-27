/* All site copy lives here so pages stay layout-only.
   The eight programmes themselves live in ./programs (transcribed from the
   practitioner's PDFs); this file holds everything around them. */

import { programsByPrice, FLAGSHIP_SLUG, type ProgramTier } from "./programs";

/* ---------------------------------------------------------------------------
 * Unconfirmed values live here and NOWHERE else.
 * Every `TODO: confirm` below is a placeholder the practitioner must sign off
 * before launch. See the handoff checklist in HANDOFF.md.
 * ------------------------------------------------------------------------- */
export const SITE = {
  /**
   * Absolute origin, used for metadataBase, canonicals, sitemap and OG images.
   * Production and local builds use the real domain so canonicals never point
   * at a *.vercel.app host; Vercel preview deployments use their own URL so
   * share-card images resolve there. NEXT_PUBLIC_SITE_URL overrides everything.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://www.inneralchemyinstitution.com"),

  /** TODO: confirm the inbox is live and monitored. */
  email: "info@inneralchemyinstitution.com",

  /** Every "Book a call" button dials this number. Display form, and the tel: href. */
  phone: "+592 663 1808",
  phoneHref: "tel:+5926631808",

  /** TODO: confirm. */
  location: "Georgetown, Guyana",

  /**
   * Testimonials stay out of the rendered site until written consent is on
   * file. Flip to `true` to restore the homepage testimonial band.
   */
  testimonialsApproved: false,
} as const;

export const PRACTITIONER = {
  name: "Hadassah Headley",
  title: "Life coach · Hypnotherapist",
  credentials: "Transformational life coach · BQH/QHHT® practitioner",
  location: `${SITE.location} — sessions online`,
};

/* ---------------------------------------------------------------------------
 * Home page
 * ------------------------------------------------------------------------- */

/** Hero. Headline and lede are lifted from her short bio. */
/**
 * Hero. `headline` renders one phrase per line in the display face; `subline`
 * is the italic payoff beneath it. The introduction lives in HOME_INTRO below.
 */
export const HOME_HERO = {
  eyebrow: "Transformational life coaching · BQH/QHHT® · online",
  headline: ["Your business.", "Your relationships.", "Your inner world."],
  subline: "Same unhealed pattern, wearing three different masks.",
  body: "Masters of their reality don't fix one area and hope the rest follows. They heal the pattern underneath all of it.",
  cta: "Book Your Free 15-Minute Call →",
};

/** The introduction band directly under the hero. One string per paragraph. */
export const HOME_INTRO = {
  eyebrow: "Welcome",
  paragraphs: [
    "I'm Hadassah Headley — transformational life coach and BQH/QHHT® practitioner.",
    "The best athletes have a coach. The best CEOs have a coach. The best in any field don't get there alone — neither will you.",
    "I don't sell theory. I deliver results through cleared beliefs, healed patterns, and mindset renewal.",
    "This isn't therapy. It isn't motivation. It's identity work — and it works.",
  ],
};

/** The short bio, verbatim from her one-page PDF. */
export const SHORT_BIO = [
  "I empower people to remember who they truly are — the creators of their own reality. As a transformational life coach and BQH/QHHT® practitioner, my work guides individuals to break through limiting beliefs, heal subconscious patterns, and manifest lives filled with love, prosperity, and purpose.",
  "My approach blends deep identity transformation, spiritual awareness, and practical manifestation techniques so clients can step into the life they know they are meant to live. I didn't discover this power through theory. I discovered it through my own personal transformation.",
  "Today, I guide others through the same awakening, helping them reclaim their inner power and consciously create the beautiful life that has always been their birthright.",
];

/** TODO: confirm — the three pillars named in her bio, expanded into a line each. */
export const METHOD = [
  {
    title: "Identity transformation",
    body: "Who you believe you are decides what you allow. We find the identity you've been living from — often built in survival — and rebuild it from truth.",
  },
  {
    title: "Spiritual awareness",
    body: "Reconnecting with the inner wisdom that already knows the way: intuition, grounded daily practice, and trust in your own guidance.",
  },
  {
    title: "Practical manifestation",
    body: "Aligning thought, emotion, and action so the life you want stops being a wish and becomes the way you move through the world.",
  },
];

/* ---------------------------------------------------------------------------
 * FAQ — the reviewed answers. Programme pages pull from here by question.
 * ------------------------------------------------------------------------- */
export const FAQ_GROUPS = [
  {
    group: "Coaching programs",
    items: [
      {
        /* TODO: confirm — formats taken from the programme PDFs. */
        q: "How are coaching sessions held?",
        a: "Privately, one-to-one, online over video. The multi-week programs meet once a week — the Limitless Entrepreneur meets every two weeks for a longer session — and single sessions run 90 minutes for the Power Reset or 3–4 hours for Beyond the Mind. The MRI intensive is the one exception: two full days in person.",
      },
      {
        /* TODO: confirm. */
        q: "Does coaching involve hypnosis?",
        a: "Not unless you choose it. The coaching programs are conversation, exercises, and reflection work. Hypnosis appears in two places: Beyond the Mind, which is a BQH quantum healing session, and Unleash the Inner Alchemist, which includes a 3-hour BQH session in its second phase.",
      },
      {
        /* TODO: confirm — voice-note support is listed on three of the programme PDFs. */
        q: "What support do I get between sessions?",
        a: "Voice-note support between sessions is built into Unleash the Inner Alchemist, the Magnetic Boss Babe, and When the Soul Awakens — which also includes a mid-week check-in. Every program comes with weekly prompts or exercises, so the work continues between calls.",
      },
      {
        /* TODO: confirm. */
        q: "Are sessions recorded?",
        a: "Single sessions are: the Power Reset and Beyond the Mind both include a recording — for BQH, only if you want one. Coaching program calls aren't recorded by default; ask if you'd like them to be.",
      },
      {
        /* TODO: confirm — repeats the pricing footnote. */
        q: "Can I pay in instalments?",
        a: "Yes — payment plans are available on every program. Ask on the discovery call and we'll set one up. A deposit holds your place.",
      },
    ],
  },
  {
    group: "Quantum healing sessions",
    items: [
      {
        q: "Will I be unconscious or lose control?",
        a: "No. The state used is deep relaxation — like the moments just before sleep. You can hear me, answer me, shift position, and stop at any time. Hypnosis cannot make you act against your will; that's stage-show fiction.",
      },
      {
        q: "Will I remember the session?",
        a: "Almost everyone remembers most or all of it — it feels like recalling a vivid daydream. And regardless, you receive the complete audio recording, which is often where the deepest insights land on second listen.",
      },
      {
        q: "Do I have to believe in past lives for this to work?",
        a: "No. Come as skeptical as you like — skeptics often have the most striking sessions. Whether you frame what arises as memory, metaphor, or imagination, the material is meaningful and the insights are yours.",
      },
      {
        q: "What should I ask? How do I prepare my questions?",
        a: "After booking you'll get an intake form that walks you through it. Most people bring 10–15 questions across life purpose, relationships, recurring patterns, and the body. Write them down — we use your exact wording in the session.",
      },
      {
        q: "What if nothing happens for me?",
        a: "A fair question with an honest answer: a small number of people stay in a lighter state on a first session, usually from trying too hard to \"do it right.\" Lighter states still produce real material. If we get very little, I'll tell you plainly and we'll decide together on next steps — including a second attempt at a reduced rate.",
      },
      {
        q: "Why are sessions so long?",
        a: "Because roughly half the session is conversation. The interview is what makes the regression precise, and rushing it produces shallow sessions. Three to six hours sounds like a lot until you've done it — most people say it passes strangely fast.",
      },
      {
        q: "What if something upsetting comes up?",
        a: "Occasionally a scene carries strong emotion — and you remain in control throughout. We can view difficult material from a distance, move past it, or stop entirely; you set the pace. Most people describe even the hard scenes as relieving rather than distressing, because they finally make sense of something.",
      },
      {
        q: "Can my partner sit in?",
        a: "No — sessions are strictly one-on-one. Another presence, however loving, changes what people allow themselves to say. Your partner is welcome to hear everything on the recording, if you choose to share it.",
      },
      {
        q: "How will I feel afterwards?",
        a: "Usually rested, a little dreamy, and hungry. Plan a quiet evening — no big social plans. Insights tend to keep arriving for days or weeks, especially after re-listening to your recording.",
      },
    ],
  },
  {
    group: "Booking & practicalities",
    items: [
      {
        q: "Which programs are in person?",
        a: "Everything is online except the MRI intensive, which is two in-person days, and QHHT®, which the method itself requires in person. Coaching, the Power Reset, and BQH sessions are all held over video.",
      },
      {
        q: "Is this a treatment for my medical or mental health condition?",
        a: "No. This work is complementary and does not diagnose, treat, or cure any condition, and it is not a substitute for care from a doctor or licensed therapist. Keep your providers; bring what you learn here into those relationships if it's useful.",
      },
      {
        q: "How do I book, and what's the cancellation policy?",
        a: "Start with the free discovery call. If we're a fit, we pick a start date and a deposit holds it. Reschedule freely up to 72 hours before; inside that window the deposit covers the held time, since a session blocks a long calendar block.",
      },
      {
        q: "Is what I say confidential?",
        a: "Completely. Your session, your recording, your story — nothing is shared without your written permission. Testimonials on this site are used with explicit consent, first names only.",
      },
    ],
  },
] as const satisfies readonly { group: string; items: readonly { q: string; a: string }[] }[];

/** Every FAQ question, as a string-literal union — so references are type-checked. */
export type FaqQuestion = (typeof FAQ_GROUPS)[number]["items"][number]["q"];
export type FaqItem = { q: FaqQuestion; a: string };

/** Flattened FAQ lookup, so pages can pull a reviewed answer by its question. */
export function faqByQuestion(question: FaqQuestion): FaqItem {
  for (const group of FAQ_GROUPS) {
    const hit = group.items.find((i) => i.q === question);
    if (hit) return hit;
  }
  // Unreachable while FaqQuestion is derived from FAQ_GROUPS.
  throw new Error(`Unknown FAQ question: ${question}`);
}

/**
 * Which FAQ questions to surface on a programme page, by tier. A programme can
 * override this with its own `faq` list.
 */
export const PROGRAM_FAQ_BY_TIER: Record<ProgramTier, FaqQuestion[]> = {
  program: [
    "How are coaching sessions held?",
    "Does coaching involve hypnosis?",
    "What support do I get between sessions?",
    "Can I pay in instalments?",
    "Is what I say confidential?",
  ],
  entrepreneur: [
    "How are coaching sessions held?",
    "Which programs are in person?",
    "Can I pay in instalments?",
    "Is this a treatment for my medical or mental health condition?",
  ],
  session: [
    "Will I be unconscious or lose control?",
    "Will I remember the session?",
    "What if nothing happens for me?",
    "Why are sessions so long?",
  ],
};

/* ---------------------------------------------------------------------------
 * Pricing — derived from PROGRAMS (cheapest first) so a price can never drift between pages.
 * ------------------------------------------------------------------------- */
export const PRICING_ROWS: { label: string; price: string; href?: string; highlight?: boolean }[] = [
  { label: "Discovery call · 15 minutes", price: "Free" },
  ...programsByPrice().map((p) => ({
    label: `${p.name} · ${p.duration}`,
    price: p.price,
    href: `/programs/${p.slug}`,
    highlight: p.slug === FLAGSHIP_SLUG,
  })),
];

/* ---------------------------------------------------------------------------
 * The quantum healing session, hour by hour. Shown on /session and on the
 * Beyond the Mind page. Spans are relative — a BQH session runs 3–4 hours.
 * ------------------------------------------------------------------------- */
export const SESSION_TIMELINE = [
  {
    span: "First hour",
    title: "The interview — most of the first hour is just talking",
    body: "We go through your life story and your question list. This isn't small talk — the interview is where the session is really built. What you share here shapes where the journey goes. Many people say this part alone was worth the day.",
  },
  {
    span: "~30 min",
    title: "The induction — reaching the state",
    body: "You lie down, fully clothed, and I guide you through relaxation and imagery. It feels like a daydream you can steer. You are not asleep, not unconscious, and you can speak, adjust the blanket, or open your eyes at any point. Hypnosis cannot make you do or say anything you don't want to.",
  },
  {
    span: "1–2 hours",
    title: "The journey — the scenes that arise",
    body: "You'll begin describing what you see — for some it's vivid like a film, for others it's a quiet knowing. It may be another lifetime, a memory from this one, or something more symbolic. My job is to ask questions and keep you moving; yours is simply to say what comes without judging it.",
  },
  {
    span: "~45 min",
    title: "Your questions — the heart of the session",
    body: "We speak with the deeper part of you and go through your written list, question by question, including anything you asked about the body. The answers come in your own voice, and they are often startlingly direct.",
  },
  {
    span: "Final stretch",
    title: "Coming back, debrief, and your recording",
    body: "I bring you gently back to full alertness — you'll feel like you've had a long, deep rest. We talk through what came up, and you leave with the complete audio. Listen again within a week: the recording keeps working long after the session ends.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I'd had the same nightmare since I was nine. We found where it started — not in this lifetime — and I haven't had it once in the eight months since.",
    attribution: "Danielle · BQH session",
  },
  {
    quote:
      "I went in skeptical about past lives, honestly. What I got was two hours of my own subconscious explaining my marriage to me. The recording still gives me chills.",
    attribution: "Marcus · BQH session",
  },
  {
    quote:
      "After my mum died I couldn't cry for a year. I started with coaching because a full session felt like too much. By the time I did the regression, I was ready — and it undid the knot.",
    attribution: "Priya · Coaching → BQH",
  },
];

/** Home-page fit check. `yes` is drawn from the programme PDFs' audience lists. */
export const FIT = {
  yes: [
    "A pattern keeps repeating — in relationships, money, or how you see yourself — and you can't trace its origin",
    "You've outgrown the version of yourself you've been living as, and the old identity no longer fits",
    "You feel spiritually aware but uncertain about your purpose or direction",
    "You know you're capable of a greater life and feel internally blocked from creating it",
  ],
  no: [
    "You're in acute crisis or actively suicidal — please reach out to a mental health professional or crisis line first; this work can wait for you",
    "You're seeking a diagnosis or a replacement for medical or psychiatric care — this is complementary, never a substitute",
    "You want someone else to fix it for you. The answers come from you; I hold the space",
    "You'd be attending under pressure from a partner or family member rather than your own pull",
  ],
};

export const STORY_PARAGRAPHS = [
  "I was born and raised in Guyana, South America, in circumstances many would call difficult. Poverty was part of my childhood, and stability was never guaranteed. Life didn't begin for me with privilege or certainty. It began with survival.",
  "As I grew older, the challenges continued — divorce, broken relationships, seasons where I felt completely lost. As a single mother carrying the weight of responsibility, there were days when life felt unbearably heavy. There were moments when I questioned everything: my path, my purpose, whether things would ever change. For a long time, I believed life was simply cruel.",
  "But the very experiences that once broke me became the doorway to something deeper. In my search for healing, I began turning inward. I started questioning the beliefs I carried about myself and about life. Through deep reflection and spiritual discovery, I realized something that changed everything: somewhere along the way, I had forgotten who I truly was.",
];

export const STORY_PULL_QUOTE =
  "I started from ground zero. When I remembered who I truly am, everything changed. Now my mission is to help others remember too.";

export const STORY_PARAGRAPHS_AFTER = [
  "I had been living as if my circumstances defined me — even when they didn't. Within every human being lives an incredible creative power: the ability to shape our lives from the inside out. When I remembered that truth, my life began to change. Slowly, I rebuilt myself — healed old wounds, reshaped my identity, and began consciously creating a future that once felt impossible.",
  "Today, I am a transformational life coach and a BQH/QHHT® practitioner devoted to helping others remember that same truth within themselves. I guide people through identity transformation and subconscious healing so they can break free from the patterns that keep them stuck and begin creating lives filled with love, prosperity, and purpose. Because I know from my own life: where you begin does not determine where you can go.",
];

/** Shown on the Beyond the Mind page — the in-person alternative, without a price. TODO: confirm in-person availability. */
export const QHHT_NOTE = {
  heading: "Prefer it in person? QHHT®",
  body: "Beyond the Mind is a BQH session, held online. I'm also certified in QHHT®, which is practiced in person only, per the method's guidelines — the depth of the state requires being in the room together. Sessions are one-on-one; no observers, including partners. If you'd like the in-person format, ask on the call — the right fit depends on your questions.",
};
