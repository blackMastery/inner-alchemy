/* All site copy lives here so pages stay layout-only.
   The programs themselves live in ./programs (the practitioner's own copy);
   this file holds everything around them. */

import { featuredByPrice, programHref, type ProgramCategory } from "./programs";

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

  /** Every "Book a program" button opens this Google Form in a new tab. */
  bookingFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSc-d06OmhxUR6R6WBwNf3bg2s0_r15Fl38_ljGZZ9BiBRt7Nw/viewform",

  /** TODO: confirm. */
  location: "Georgetown, Guyana",

  /**
   * Gates the homepage testimonial band (and its Markdown mirror). Flip to
   * `false` to pull testimonials from the rendered site again.
   */
  testimonialsApproved: true,
} as const;

export const PRACTITIONER = {
  name: "Hadassah Headley",
  title: "Life coach · Hypnotherapist",
  credentials: "Transformational life coach · BQH/QHHT® practitioner",
  location: `${SITE.location} — sessions online`,
};

/**
 * Her public profiles, in the order they appear on her Linktree
 * (https://linktr.ee/Inner.A.Institution). Rendered as the icon row in the
 * footer, listed in the Markdown mirrors, and emitted as `sameAs` in the
 * structured data. `id` selects the icon in components/SocialLinks.tsx.
 */
export const SOCIAL = [
  { id: "instagram", label: "Instagram", handle: "@inneralchemyinstitution", url: "https://www.instagram.com/inneralchemyinstitution" },
  { id: "tiktok", label: "TikTok", handle: "@inneralchemy.gy", url: "https://www.tiktok.com/@inneralchemy.gy" },
  { id: "youtube", label: "YouTube", handle: "Inner Alchemy Institution", url: "https://www.youtube.com/channel/UC2d8S9CFvMeg-V7V1uLwN3g" },
  { id: "linkedin", label: "LinkedIn", handle: "Hadassah Headley", url: "https://www.linkedin.com/in/hadassah-a-o-headley-2a355119b" },
  { id: "whatsapp", label: "WhatsApp", handle: "+592 663 1808", url: "https://api.whatsapp.com/send?phone=5926631808" },
  { id: "facebook", label: "Facebook", handle: "Inner Alchemy Institution", url: "https://www.facebook.com/share/1FATAhC6yz/" },
] as const;

export type SocialId = (typeof SOCIAL)[number]["id"];

/** The Linktree itself — one link that gathers everything above. */
export const LINKTREE_URL = "https://linktr.ee/Inner.A.Institution";

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
    "Most coaching helps you think differently. I help you become different.",
    "I find the belief, pattern, or block that's been quietly running your life — and clear it. Not manage it. Not talk around it. Clear it.",
    "This isn't therapy. It isn't motivation. It's identity work — and it works.",
  ],
};

/** The short bio, verbatim from her one-page PDF. */
export const SHORT_BIO = [
  "I empower people to remember who they truly are — the creators of their own reality. As a transformational life coach and BQH/QHHT® practitioner, my work guides individuals to break through limiting beliefs, heal subconscious patterns, and manifest lives filled with love, prosperity, and purpose.",
  "My approach blends deep identity transformation, spiritual awareness, and practical manifestation techniques so clients can step into the life they know they are meant to live. I didn't discover this power through theory. I discovered it through my own personal transformation.",
  "Today, I guide others through the same awakening, helping them reclaim their inner power and consciously create the beautiful life that has always been their birthright.",
];

/** The three threads every program blends — the "How the work works" cards on the home page. */
export const METHOD = [
  {
    title: "The identity you didn’t choose",
    body: "Somewhere along the way, you built a version of yourself that could survive — and you’ve been living from it ever since, even now that survival isn’t the goal anymore. We find that version, and we build the one that’s actually true.",
  },
  {
    title: "The knowing you stopped trusting",
    body: "You had an inner compass before anyone told you to ignore it. Somewhere it got quiet — overridden by other people’s opinions, other people’s fear. We bring it back online, so you stop outsourcing your own life.",
  },
  {
    title: "The gap between what you want and what you do",
    body: "You know what you want. You can even picture it. But somehow your days don’t move you toward it — because thought, feeling, and action aren’t pulling in the same direction yet. We close that gap, so wanting it stops being the hard part.",
  },
];

/* ---------------------------------------------------------------------------
 * FAQ — the reviewed answers. The program pages pull from here by question.
 * ------------------------------------------------------------------------- */
export const FAQ_GROUPS = [
  {
    group: "Coaching programs",
    items: [
      {
        /* TODO: confirm — formats taken from the program descriptions. */
        q: "How are coaching sessions held?",
        a: "Privately, one-to-one, online over video. The multi-week programs meet once a week; the Power Reset is a single 90-minute session, and a BQH session runs 3–4 hours. The MRI intensive is the one exception: two full days in person.",
      },
      {
        /* TODO: confirm. */
        q: "Does coaching involve hypnosis?",
        a: "Not unless you choose it. The coaching programs are conversation, exercises, and reflection work. Hypnosis appears in the Hypnotherapy Programs — BQH, QHHT®, and the two combined — and inside Unleash the Inner Alchemist, which includes two BQH sessions.",
      },
      {
        /* TODO: confirm — voice-note support was listed on three of the original program PDFs. */
        q: "What support do I get between sessions?",
        a: "Voice-note support between sessions is built into Unleash the Inner Alchemist, the Magnetic Boss Babe, and When the Soul Awakens — which also includes a mid-week check-in. Every program comes with weekly prompts or exercises, so the work continues between calls.",
      },
      {
        /* TODO: confirm. */
        q: "Are sessions recorded?",
        a: "Single sessions are: the Power Reset and the BQH session both include a recording — for BQH, only if you want one. Coaching program calls aren't recorded by default; ask if you'd like them to be.",
      },
      {
        /* TODO: confirm — repeats the pricing footnote. */
        q: "Can I pay in instalments?",
        a: "Yes — payment plans are available on every program. Ask on the discovery call and we'll set one up. A deposit holds your place.",
      },
    ],
  },
  {
    group: "Hypnotherapy sessions",
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
        a: "Everything is online except the MRI intensive, which is two in-person days, and QHHT® — on its own or combined with BQH — which the method itself requires in person. Coaching, the Power Reset, and standalone BQH sessions are all held over video.",
      },
      {
        q: "Is this a treatment for my medical or mental health condition?",
        a: "No. This work is complementary and does not diagnose, treat, or cure any condition, and it is not a substitute for care from a doctor or licensed therapist. Keep your providers; bring what you learn here into those relationships if it's useful.",
      },
      {
        q: "How do I book, and what's the cancellation policy?",
        a: "Start with the free discovery call — or, if you already know which program you want, fill in the booking form and I'll confirm by email. Either way, we pick a start date and a deposit holds it. Reschedule freely up to 72 hours before; inside that window the deposit covers the held time, since a session blocks a long calendar block.",
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

/** Which FAQ questions to surface at the foot of each program category page. */
export const CATEGORY_FAQ: Record<ProgramCategory, FaqQuestion[]> = {
  coaching: [
    "How are coaching sessions held?",
    "Does coaching involve hypnosis?",
    "What support do I get between sessions?",
    "Are sessions recorded?",
    "Can I pay in instalments?",
    "Which programs are in person?",
    "Is what I say confidential?",
  ],
  hypnotherapy: [
    "Will I be unconscious or lose control?",
    "Will I remember the session?",
    "Do I have to believe in past lives for this to work?",
    "What should I ask? How do I prepare my questions?",
    "What if nothing happens for me?",
    "Why are sessions so long?",
    "What if something upsetting comes up?",
    "Can my partner sit in?",
    "How will I feel afterwards?",
    "Which programs are in person?",
  ],
};

/* ---------------------------------------------------------------------------
 * Pricing — the home-page anchors, derived from the featured programs (cheapest
 * first) so a price can never drift between pages. Full pricing lives on the
 * two category pages.
 * ------------------------------------------------------------------------- */
export const PRICING_ROWS: { label: string; price: string; href?: string; highlight?: boolean }[] = [
  { label: "Discovery call · 15 minutes", price: "Free" },
  ...featuredByPrice().map((p) => ({
    label: `${p.name} · ${p.duration}`,
    price: p.priceNote ? `${p.price} ${p.priceNote}` : p.price,
    href: programHref(p.slug),
    highlight: p.slug === "unleash-the-inner-alchemist",
  })),
];

/* ---------------------------------------------------------------------------
 * The quantum healing session, hour by hour. Shown on /session and on the
 * hypnotherapy page. Spans are relative — a BQH session runs 3–4 hours.
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

/** The preparation box on /session. */
export const SESSION_PREP = {
  heading: "Before you arrive",
  body: "Once you book, you'll receive an intake form. The most important part is your list of questions — the things you want to ask your deeper self, about your life, relationships, purpose, and body. Bring it written down; we'll use it word for word during the session.",
  items: [
    "Sleep well the night before; skip caffeine past noon that day if you can",
    "Eat a normal meal beforehand — we break for something light",
    "Clear the block of time. No school pickup, no plans right after. The time is yours",
  ],
};

/** The honest answer to "what if I don't go deep?" — on /session and in its Markdown mirror. */
export const SESSION_HONESTY = {
  heading: "What if I don’t go deep?",
  paragraphs: [
    "It happens, and you deserve a straight answer about it. A small number of people — usually the ones gripping the steering wheel hardest — stay in a lighter state on their first session. If that’s you: nothing is wrong with you, you’re not “unhypnotizable,” and the time is not wasted. Lighter states still produce meaningful material, and the interview and question work stand on their own.",
    "If we get very little, I’ll say so plainly during the debrief, and we’ll decide together what makes sense — a second attempt at a reduced rate, or a different doorway like coaching. What I won’t do is dress up a shallow session as a breakthrough. Trust is the whole practice.",
  ],
};

/* Client quotes verbatim; only spelling and punctuation were normalised. */
export const TESTIMONIALS = [
  {
    quote:
      "Working with Ms. Hadassah has been truly transformational. I appreciated the ways in which she is extremely dedicated to her craft. I needed support navigating a difficult relationship but from our very first session I knew I was at the right place and that I was going to get the help I needed.",
    attribution: "Natasha Clement",
  },
  {
    quote:
      "I must say, I was very sceptical and it took me a while to get started with the manifestation program. Coming from a Christian background, I was afraid that it would conflict with my values. However, I soon realized that everything that was used to guide me can be found in the Bible. Nothing contradictory — only enhanced and explained well. Today, the 10-week coaching I received is what released me from my financial blocks. My business is finally generating the revenues it deserves.",
    attribution: "Diane Amsterdam",
  },
  {
    quote:
      "Book the session. You will get more than what you bargained for. I’m familiar with Dolores Cannon and her work so I was pleasantly surprised to know that there was a practitioner in Guyana that does this type of hypnotherapy. She was very patient and supportive throughout the entire session which allowed me to relax my mind to gain the most life-changing experience I’ve ever had.",
    attribution: "Ms Annette",
  },
];

/** Home-page fit check. `yes` is drawn from the original program PDFs' audience lists. */
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
