/* All site copy lives here so pages stay layout-only.
   Prices and durations come from the practitioner's own programme PDFs. */

/* ---------------------------------------------------------------------------
 * Unconfirmed values live here and NOWHERE else.
 * Every `TODO: confirm` below is a placeholder the practitioner must sign off
 * before launch. See the handoff checklist in the project README.
 * ------------------------------------------------------------------------- */
export const SITE = {
  /** Absolute origin, used for metadataBase, canonicals, sitemap and OG images. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  /** TODO: confirm — placeholder, not a deliverable address. */
  email: "hello@inneralchemy.example",

  /** TODO: confirm — and whether in-person QHHT® is actually offered here. */
  location: "Georgetown, Guyana",

  /** TODO: confirm — placeholder price, appears in PRICING_ROWS and on /qhht. */
  qhhtPrice: "$495",

  /**
   * Testimonials stay out of the rendered site until written consent is on
   * file. Flip to `true` to restore the homepage testimonial band.
   */
  testimonialsApproved: false,
} as const;

export const PRACTITIONER = {
  name: "Hadassah Headley",
  credentials: "Transformational life coach · BQH/QHHT® practitioner",
  location: `${SITE.location} — sessions online`,
};

export type Program = {
  slug: string;
  name: string;
  price: string;
  duration: string;
  blurb: string;
  forYouIf: string;
  tier: "session" | "program" | "entrepreneur";
  featured?: boolean;
};

export const PROGRAMS: Program[] = [
  {
    slug: "power-reset",
    name: "The Power Reset Session",
    price: "$150",
    duration: "90 minutes · online",
    blurb:
      "A focused breakthrough coaching session for when you're overwhelmed, stuck, or navigating a hard decision. We find the root block, shift the perspective holding it in place, and map clear next steps — with the recording to keep.",
    forYouIf: "you need to get out of the ditch and back into motion — fast.",
    tier: "session",
  },
  {
    slug: "beyond-the-mind",
    name: "Beyond the Mind — BQH Quantum Healing",
    price: "$350",
    duration: "3–4 hours · online",
    blurb:
      "The deep subconscious session: pre-session conversation, guided hypnotic journey, exploration of the patterns and guidance that arise, and an integration discussion — plus the recording, if you wish.",
    forYouIf: "you feel stuck in repeating patterns and want to understand their deeper cause.",
    tier: "session",
    featured: true,
  },
  {
    slug: "when-the-soul-awakens",
    name: "When the Soul Awakens",
    price: "$999",
    duration: "4 weeks · 90 min per week",
    blurb:
      "A grounded guide through spiritual awakening: understanding what's happening within you, discerning the flood of spiritual information, strengthening your own intuition, and integrating it all into everyday life.",
    forYouIf: "something deep is waking up and you want steady, grounded support — not more confusion.",
    tier: "program",
  },
  {
    slug: "magnetic-boss-babe",
    name: "The Magnetic Boss Babe",
    price: "$1,200",
    duration: "8 weeks · weekly sessions",
    blurb:
      "For high-achieving women who built success in survival mode and lost touch with their feminine power. Eight weeks to break old relationship patterns, rebuild self-worth and boundaries, and become the woman who naturally attracts the love she deserves.",
    forYouIf: "you're strong and self-sufficient, yet keep attracting emotionally unavailable partners.",
    tier: "program",
  },
  {
    slug: "limitless-manifestor",
    name: "The Limitless Manifestor",
    price: "$1,800",
    duration: "10 weeks · step-by-step",
    blurb:
      "A manifestation experience that goes beneath the surface teachings: clarity on what you truly want in love, prosperity, and purpose — then the identity work, belief alignment, and daily practices to consciously create it.",
    forYouIf: "you've tried every manifestation technique and nothing sticks.",
    tier: "program",
  },
  {
    slug: "unleash-the-inner-alchemist",
    name: "Unleash the Inner Alchemist",
    price: "$2,500",
    duration: "12 weeks · includes a 3-hour BQH session",
    blurb:
      "The signature identity transformation: awaken to the patterns shaping your life, release the wounds beneath them — including a full BQH hypnotherapy session at the heart of the program — then rebuild and embody the self you're becoming.",
    forYouIf: "you've outgrown the version of yourself you've been living as.",
    tier: "program",
  },
  {
    slug: "limitless-entrepreneur",
    name: "The Limitless Entrepreneur",
    price: "$2,500",
    duration: "12 weeks · six 90-min sessions",
    blurb:
      "An identity and wealth expansion program for entrepreneurs hitting the same financial ceiling month after month: find what built the ceiling, reprogram the wealth identity underneath it, then scale from abundance instead of fear.",
    forYouIf: "your business earns, but your income refuses to expand past a familiar number.",
    tier: "entrepreneur",
  },
  {
    slug: "mri-intensive",
    name: "MRI — Mindset Rehabilitation Intensive",
    price: "$10,000",
    duration: "2 private days · 16 hours · in person",
    blurb:
      "Like a medical MRI scans the body, this private intensive scans the internal patterns shaping your business and leadership. Day one: deep mindset scan and diagnosis. Day two: rehabilitation, strategy, and a vision for your next level.",
    forYouIf: "you need a deep breakthrough, not another round of surface-level coaching.",
    tier: "entrepreneur",
    featured: true,
  },
];

/** Human label for each tier, reused by /programs and /programs/[slug]. */
export const TIER_LABELS: Record<Program["tier"], string> = {
  session: "Single session",
  program: "Guided transformation",
  entrepreneur: "For entrepreneurs",
};

/**
 * Programs whose arc includes a full hypnosis session, and which therefore
 * show the hour-by-hour walkthrough on their detail page.
 */
export const PROGRAMS_WITH_SESSION_DAY = ["beyond-the-mind", "unleash-the-inner-alchemist"];

/**
 * Which existing FAQ questions to surface on a program page, by tier.
 * Referenced verbatim by question text — no answer is rewritten anywhere.
 */
export const PROGRAM_FAQ_BY_TIER: Record<Program["tier"], string[]> = {
  session: [
    "Will I be unconscious or lose control?",
    "Will I remember the session?",
    "What if nothing happens for me?",
    "Why are sessions so long?",
  ],
  program: [
    "What should I ask? How do I prepare my questions?",
    "Can I do this online over video?",
    "How do I book, and what's the cancellation policy?",
    "Is what I say confidential?",
  ],
  entrepreneur: [
    "Can I do this online over video?",
    "How do I book, and what's the cancellation policy?",
    "Is what I say confidential?",
    "Is this a treatment for my medical or mental health condition?",
  ],
};

/** Flattened FAQ lookup, so pages can pull a reviewed answer by its question. */
export function faqByQuestion(question: string) {
  for (const group of FAQ_GROUPS) {
    const hit = group.items.find((i) => i.q === question);
    if (hit) return hit;
  }
  return undefined;
}

export const PRICING_ROWS: { label: string; price: string; highlight?: boolean }[] = [
  { label: "Discovery call · 15 minutes", price: "Free" },
  { label: "The Power Reset Session · 90 minutes", price: "$150" },
  { label: "Beyond the Mind · BQH quantum healing session · 3–4 hours, includes recording", price: "$350", highlight: true },
  { label: "QHHT® full session · in person, 4–6 hours, includes recording", price: SITE.qhhtPrice },
  { label: "When the Soul Awakens · 4-week guided journey", price: "$999" },
  { label: "The Magnetic Boss Babe · 8-week coaching experience", price: "$1,200" },
  { label: "The Limitless Manifestor · 10-week experience", price: "$1,800" },
  { label: "The Limitless Entrepreneur / Unleash the Inner Alchemist · 12 weeks", price: "$2,500" },
  { label: "MRI — Mindset Rehabilitation Intensive · 2 private days", price: "$10,000" },
];

export const SESSION_TIMELINE = [
  {
    time: "10:00",
    span: "Hours 1–2",
    title: "The interview — most of the morning is just talking",
    body: "We sit with tea and go through your life story and your question list. This isn't small talk — the interview is where the session is really built. What you share here shapes where the regression goes. Many people say this part alone was worth the day.",
  },
  {
    time: "12:15",
    span: "~30 min",
    title: "The induction — reaching the state",
    body: "You lie down, fully clothed, and I guide you through relaxation and imagery. It feels like a daydream you can steer. You are not asleep, not unconscious, and you can speak, adjust the blanket, or open your eyes at any point. Hypnosis cannot make you do or say anything you don't want to.",
  },
  {
    time: "12:45",
    span: "1–2 hours",
    title: "The regression — the scenes that arise",
    body: "You'll begin describing what you see — for some it's vivid like a film, for others it's a quiet knowing. It may be another lifetime, a memory from this one, or something more symbolic. My job is to ask questions and keep you moving; yours is simply to say what comes without judging it.",
  },
  {
    time: "14:15",
    span: "~1 hour",
    title: "Your questions — the heart of the day",
    body: "We speak with the deeper part of you and go through your written list, question by question, including anything you asked about the body. The answers come in your own voice, and they are often startlingly direct.",
  },
  {
    time: "15:30",
    span: "Final hour",
    title: "Coming back, debrief, and your recording",
    body: "I bring you gently back to full alertness — you'll feel like you've had a long, deep rest. We talk through what came up, and you leave with the complete audio. Listen again within a week: the recording keeps working long after the session ends.",
  },
];

export const FAQ_GROUPS = [
  {
    group: "Before you book",
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
        q: "Can I do this online over video?",
        a: "BQH quantum healing sessions, coaching, and programs are all held online. QHHT® is practiced in person only — that's a guideline of the method itself, and I follow it.",
      },
    ],
  },
  {
    group: "During the session",
    items: [
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
    ],
  },
  {
    group: "Afterwards & practicalities",
    items: [
      {
        q: "How will I feel afterwards?",
        a: "Usually rested, a little dreamy, and hungry. Plan a quiet evening — no big social plans. Insights tend to keep arriving for days or weeks, especially after re-listening to your recording.",
      },
      {
        q: "Is this a treatment for my medical or mental health condition?",
        a: "No. This work is complementary and does not diagnose, treat, or cure any condition, and it is not a substitute for care from a doctor or licensed therapist. Keep your providers; bring what you learn here into those relationships if it's useful.",
      },
      {
        q: "How do I book, and what's the cancellation policy?",
        a: "Start with the free discovery call. If we're a fit, we pick a session day and a deposit holds it. Reschedule freely up to 72 hours before; inside that window the deposit covers the held time, since a session blocks a long calendar block.",
      },
      {
        q: "Is what I say confidential?",
        a: "Completely. Your session, your recording, your story — nothing is shared without your written permission. Testimonials on this site are used with explicit consent, first names only.",
      },
    ],
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

export const FIT = {
  yes: [
    "You're carrying grief, burnout, or a health question that talk alone hasn't reached",
    "A pattern keeps repeating — in relationships, money, body — and you can't trace its origin",
    "You're curious and open, even if you're skeptical. Skeptics do beautifully in this work",
    "You can set aside the time and come rested, sober, and unhurried",
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
