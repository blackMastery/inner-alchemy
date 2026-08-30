/* The programs, in two families: Coaching Programs (five areas of mastery) and
   Hypnotherapy Programs (three sessions). Copy is the practitioner's own; only
   mechanics (typos, casing, dashes) were corrected in transcription.

   This is a LEAF module — ./site imports from it at module scope to derive the
   home pricing table, so nothing here may import a runtime value from ./site. */

export type ProgramCategory = "coaching" | "hypnotherapy";

export type MasteryId =
  | "life-mastery"
  | "money-mastery"
  | "business-mastery"
  | "relationship-mastery"
  | "spiritual-mastery";

export type Program = {
  /** Anchor id on its category page. Unique across BOTH categories. */
  slug: string;
  name: string;
  /** e.g. "90 minutes", "12 weeks", "2-day immersive", "3–4 hrs" */
  duration: string;
  /** Display string in US dollars, e.g. "US$150". priceValue() strips it for structured data. */
  price: string;
  /** e.g. "per couple" — shown after the price in the UI only. */
  priceNote?: string;
  format: "online" | "in-person";
  /** Body copy. May contain [[slug|Label]] tokens, rendered as in-page links by <RichText>. */
  paragraphs: string[];
  /** A single "Ideal for:" line (Power Reset). */
  idealFor?: string;
  /** "This is for you if" bullets. */
  forYouIf?: string[];
  /** A titled, ordered breakdown (MRI). */
  structure?: { heading: string; steps: { title: string; body: string }[] };
  /**
   * This entry has no page of its own — it is another program listed under a
   * second heading (the Spiritual Mastery BQH card), and links to that page.
   */
  pageOf?: string;
  /** Surfaces in the home-page pricing table. */
  featured?: boolean;
};

export type Mastery = { id: MasteryId; name: string; programs: Program[] };

export const CATEGORIES: Record<ProgramCategory, { label: string; href: string }> = {
  coaching: { label: "Coaching Programs", href: "/programs/coaching" },
  hypnotherapy: { label: "Hypnotherapy Programs", href: "/programs/hypnotherapy" },
};

/* ---------------------------------------------------------------------------
 * Coaching Programs
 * ------------------------------------------------------------------------- */
export const COACHING: Mastery[] = [
  {
    id: "life-mastery",
    name: "Life Mastery",
    programs: [
      {
        slug: "power-reset",
        name: "Power Reset Session",
        duration: "90 minutes",
        price: "US$150",
        format: "online",
        featured: true,
        paragraphs: [
          "Stuck, spinning, or stalled? This is your fast-track back to clarity.",
          "In one focused session, we’ll cut through the noise, pinpoint exactly what’s holding you back, and walk away with a clear next step — no weeks-long process, no fluff. Perfect for when you need a breakthrough now, not eventually.",
        ],
        idealFor:
          "The person who has one big decision, one tangled problem, or one moment of overwhelm they need to move through today.",
      },
      {
        slug: "unleash-the-inner-alchemist",
        name: "Unleash the Inner Alchemist — Intensive",
        duration: "12 weeks",
        price: "US$2,500",
        format: "online",
        featured: true,
        paragraphs: [
          "Our flagship identity-transformation program — for the person who’s sick and tired of circling the same patterns and is ready to become someone new.",
          "This isn’t another coaching package. It’s a full reconstruction: we go beneath the surface with deep subconscious work, two [[bqh|BQH (Beyond Quantum Healing)]] sessions to clear what’s been running the show underneath your awareness, and 12 weeks of weekly one-on-one coaching to rebuild your identity from the inside out.",
          "By the end, you won’t just think differently — you’ll be different.",
        ],
        forYouIf: [
          "You keep hitting the same wall in relationships, career, or self-worth — no matter how much “work” you’ve done",
          "You’re ready to stop managing symptoms and finally address the root",
          "You have a burning desire to transform, and you’re willing to go deep to get there",
        ],
      },
      {
        slug: "mri-intensive",
        name: "MRI: Mindset Rehabilitation Intensive",
        duration: "2-day immersive",
        price: "US$10,000",
        format: "in-person",
        featured: true,
        paragraphs: [
          "Some blocks aren’t strategic. They’re subconscious — and they don’t reveal themselves in a 60-minute call. They show up in how you move through your actual life.",
          "MRI is for the individual or business owner who is capable, driven, and successful on paper, but keeps hitting the same invisible ceiling. To find it, I don’t just talk to you about your patterns — I walk through your world with you.",
        ],
        structure: {
          heading: "The structure",
          steps: [
            {
              title: "Pre-Intensive Session (1 hour)",
              body: "We map the pattern before we ever meet in person: where it shows up, what it’s costing you, what’s underneath it.",
            },
            {
              title: "The Intensive (2 full days, in person, 16 hours total)",
              body: "I’m with you the entire time — breakfast, lunch, meetings, decisions, the in-between moments most people never let anyone see. This is where the real pattern lives: not in what you say about yourself, but in how you actually navigate your world. We catch it live, in real time, and shift it on the spot.",
            },
            {
              title: "Integration Sessions (2 × 1 hour, post-intensive)",
              body: "These lock the shift that was created into how you think, decide, lead, and live going forward.",
            },
          ],
        },
        forYouIf: [
          "You’ve already done “the work” — therapy, books, courses — and still hit the same wall at the same moment, every time",
          "You know the block is subconscious, not logical or strategic",
          "You want someone to see the pattern as it actually happens, not just hear you describe it after the fact",
          "You can’t afford to wait months — this needs to move now",
        ],
      },
    ],
  },
  {
    id: "money-mastery",
    name: "Money Mastery",
    programs: [
      {
        slug: "the-fear-factor",
        name: "The Fear Factor",
        duration: "6 weeks",
        // TODO: confirm — the source read "$1,40"; assumed $1,400.
        price: "US$1,400",
        format: "online",
        paragraphs: [
          "Every purchase feels like a countdown. Every bill triggers panic — even when the money’s there.",
          "For the person whose bank balance says they’re fine, but whose nervous system never got the memo. Six weeks to replace financial fear with actual ease around spending, saving, and managing what you already have.",
        ],
        forYouIf: [
          "You check your balance obsessively, even when you know it’s healthy",
          "Spending — even on things you can afford — comes with guilt or dread",
          "You’ve done the budgeting, the spreadsheets, the “logic” — and your body still reacts like money is a threat",
          "You’re ready to feel calm around money, not just look fine on paper",
        ],
      },
      {
        slug: "the-leaky-bucket",
        name: "The Leaky Bucket",
        duration: "6 weeks",
        price: "US$1,500",
        format: "online",
        paragraphs: [
          "Money comes in — a raise, a windfall, a good month — and somehow it’s gone before it has the chance to build into anything.",
          "This isn’t a budgeting problem. It’s a subconscious ceiling that won’t let you keep more than you’re used to having. Six weeks to find that ceiling and break it.",
        ],
        forYouIf: [
          "Every income increase seems to come with an equal and opposite expense",
          "You’ve tried tighter budgets and better systems, and the pattern still repeats",
          "You suspect the leak isn’t in your spreadsheet — it’s in your subconscious",
          "You’re ready to actually keep what you earn, not just earn more of it",
        ],
      },
      {
        slug: "limitless-manifestor",
        name: "The Limitless Manifestor",
        duration: "10 weeks",
        price: "US$1,800",
        format: "online",
        paragraphs: [
          "The capstone of the money work — where belief, emotion, and action finally align to consciously create wealth, instead of chasing it.",
          "This is your deepest money-manifestation container: not managing fear ([[the-fear-factor|Fear Factor]]) or plugging leaks ([[the-leaky-bucket|Leaky Bucket]]), but actively building the internal capacity to receive, hold, and expand wealth on purpose.",
        ],
        forYouIf: [
          "You’ve done the healing work and you’re ready to build, not just repair",
          "You are ready to manifest money effortlessly",
          "You want wealth creation to feel aligned, not forced or anxious",
          "You’re ready to consciously call in the next level — and know you can hold it once it arrives",
        ],
      },
    ],
  },
  {
    id: "business-mastery",
    name: "Business Mastery",
    programs: [
      {
        slug: "the-pivot",
        name: "The Pivot",
        duration: "8 weeks",
        price: "US$1,600",
        format: "online",
        paragraphs: [
          "You’ve had the idea for years. The plan is sketched out somewhere. You bought the domain name — and never touched it again.",
          "What’s actually stopping you isn’t the strategy. It’s the fear of leaving what’s safe for what’s yours. Eight weeks to move from “someday” to launch.",
        ],
        forYouIf: [
          "You already know what you want to build — you’re just not building it",
          "“Someday” has quietly become your favorite word",
          "The idea has outlasted every excuse you’ve made for not starting",
          "You’re done watching the domain or business registration expire and renewing it “just in case”",
        ],
      },
      {
        slug: "limitless-entrepreneur",
        name: "The Limitless Entrepreneur",
        duration: "12 weeks",
        price: "US$2,500",
        format: "online",
        paragraphs: [
          "Revenue that won’t budge past the same number, no matter what you try next.",
          "That’s not a strategy problem. It’s a ceiling — built out of what you unconsciously believe you’re allowed to have. This work breaks the ceiling, so your growth is only ever capped by your own effort, never by an invisible limit you didn’t choose.",
        ],
        forYouIf: [
          "You’ve hit the same revenue number more than once, despite trying new tactics",
          "More hustle, more offers, more funnels haven’t moved the needle",
          "You suspect the cap isn’t external — it’s internal",
          "You’re ready to grow into a version of yourself that can actually hold more",
        ],
      },
      {
        slug: "the-business-alchemist",
        name: "The Business Alchemist",
        duration: "8 weeks",
        price: "US$1,800",
        format: "online",
        paragraphs: [
          "For the owner who’s good at what they do — and still can’t fill the calendar. Or the one who’s outgrown how their business is built, and knows something structural has to change.",
          "Whether it’s the clients you’re attracting or the container you built the business inside of, this rebuilds what’s not working — from the ground up.",
        ],
        forYouIf: [
          "Your skill isn’t the problem, but your calendar tells a different story",
          "You’ve outgrown your original business model and it shows",
          "You know something structural needs to shift, but can’t quite name what",
          "You’re ready to rebuild the container, not just patch the cracks",
        ],
      },
    ],
  },
  {
    id: "relationship-mastery",
    name: "Relationship Mastery",
    programs: [
      {
        slug: "the-free-woman",
        name: "The Free Woman",
        duration: "8 weeks",
        price: "US$1,400",
        format: "online",
        paragraphs: [
          "For the woman who’s forgotten what it feels like to make a choice without checking with someone else first.",
          "This is the work of breaking free — not just from a controlling relationship, but from the pattern underneath it that let it take root in the first place. Because leaving isn’t the hard part. Not recreating it is.",
        ],
        forYouIf: [
          "You want to leave the relationship but just don’t know how",
          "You second-guess your own decisions until someone else approves them",
          "You’re already out, or ready to be — and terrified of doing this again with someone new",
          "You know the relationship isn’t the whole story — there’s a pattern that came before it",
          "You’re ready to make choices that are actually yours",
        ],
      },
      {
        slug: "magnetic-boss-babe",
        name: "The Magnetic Boss Babe",
        duration: "8 weeks",
        price: "US$1,200",
        format: "online",
        paragraphs: [
          "For the woman who’s powerful everywhere except her love life. Successful, capable, respected — and quietly wondering what’s wrong with her when it comes to this one area.",
          "Nothing is wrong with you. You’ve just never been coached on love the way you’ve been coached on everything else you’re great at.",
        ],
        forYouIf: [
          "You run your career, your finances, your life — and dating still leaves you baffled",
          "You keep attracting the same disappointing pattern, no matter how “together” you are everywhere else",
          "You keep attracting unavailable men who feed off of your stability and success",
          "You’re ready to bring the same mastery to love that you bring to everything else",
        ],
      },
      {
        slug: "before-i-do",
        name: "Before I Do",
        duration: "6 weeks",
        price: "US$1,800",
        priceNote: "per couple",
        format: "online",
        paragraphs: [
          "The conversations about money, family, conflict, and expectations need to be had now, while you’re calm enough to actually hear each other — instead of five years and one blow-up in.",
          "Premarital work that doesn’t just check a box — it builds the foundation you’ll actually stand on.",
        ],
        forYouIf: [
          "You’re engaged or planning to be, and want more than a checklist before the wedding",
          "You’d rather have the hard conversations now than discover the gaps later",
          "One or both of you came from a broken home and refuse to repeat the pattern",
          "You know love isn’t the question — alignment is",
        ],
      },
      {
        slug: "trouble-in-paradise",
        name: "Trouble in Paradise",
        duration: "8 weeks",
        price: "US$2,000",
        priceNote: "per couple",
        format: "online",
        paragraphs: [
          "For couples who still love each other, but aren’t sure they like each other right now. Drifted into roommate mode. Fighting about the same three things, on repeat, like a rerun neither of you can turn off.",
          "Eight weeks to find your way back to each other — not by ignoring what’s broken, but by finally getting underneath it.",
        ],
        forYouIf: [
          "The love is real, but the connection feels buried under logistics and resentment",
          "You keep having the same fight in different clothes",
          "You’ve drifted, but you haven’t given up",
          "You want your relationship back — not a new one, this one",
        ],
      },
    ],
  },
  {
    id: "spiritual-mastery",
    name: "Spiritual Mastery",
    programs: [
      {
        slug: "bqh-quantum-healing",
        name: "BQH Quantum Healing",
        duration: "3–4 hrs",
        price: "US$350",
        format: "online",
        paragraphs: [
          "A single deep BQH session — standalone. The accessible way into this track before committing to a longer journey.",
          "One session, no ongoing commitment, direct access to the modality everything else in this track is built on.",
        ],
        forYouIf: [
          "You want to experience BQH once before deciding on a multi-week program",
          "You have specific questions for your higher self, a block, or a decision you want clarity on",
          "You’re curious about deeper work but not ready to commit to weeks of it",
          "You want a single, focused session and not an open-ended process",
        ],
        pageOf: "bqh",
      },
      {
        slug: "awaken-the-intuition",
        name: "Awaken the Intuition",
        duration: "5 weeks",
        price: "US$750",
        format: "online",
        paragraphs: [
          "Teaches you to trust and use your own intuition instead of outsourcing every decision to someone else. A skill-building track — practical, repeatable, yours to keep.",
        ],
        forYouIf: [
          "You ask three people for their opinion before trusting your own",
          "You can feel a “yes” or “no” in your body but override it with logic every time",
          "You want a repeatable practice for tuning into your intuition, not a one-time insight",
          "You’re preparing for, or already in, [[when-the-soul-awakens|When the Soul Awakens]] and want the skill in place first",
        ],
      },
      {
        slug: "when-the-soul-awakens",
        name: "When the Soul Awakens",
        duration: "4 weeks",
        price: "US$999",
        format: "online",
        paragraphs: [
          "Spiritual awakening rarely arrives neatly. It shows up as disorientation, restlessness, and a growing sense that your old life doesn’t fit anymore — with no map for what comes next. This gives you that map, so the confusion becomes a doorway instead of a crisis.",
        ],
        forYouIf: [
          "Your old goals, relationships, or routines suddenly feel hollow, and you don’t know why",
          "You’re experiencing restlessness or disorientation you can’t explain with normal life changes",
          "You need language and structure for what’s happening, not just reassurance that it’s “normal”",
          "You need support with information overload",
        ],
      },
      {
        slug: "know-thy-self",
        name: "Know Thy Self",
        duration: "8 weeks",
        price: "US$1,300",
        format: "online",
        paragraphs: [
          "Most people can list what they do, who they’re related to, and what they’re supposed to want — and still couldn’t tell you who they actually are underneath all of it. This is the journey back to the self that existed before every role you’ve had to play.",
        ],
        forYouIf: [
          "You could describe your job, your relationships, your obligations — but not “you,” separate from them",
          "You’ve built a life that looks right on paper and still feel like a stranger in it",
          "You want to identify which of your beliefs, preferences, and goals are actually yours vs. inherited or performed",
          "You’re ready to rebuild your sense of self from the ground up, not just add another achievement to it",
        ],
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * Hypnotherapy Programs
 * ------------------------------------------------------------------------- */
export const HYPNOTHERAPY: Program[] = [
  {
    slug: "bqh",
    name: "BQH — Beyond Quantum Healing",
    duration: "3–4 hrs",
    price: "US$350",
    format: "online",
    featured: true,
    paragraphs: [
      "The most flexible option: your intake, the regression, and space for me to bring in whatever else the session calls for — tailored in real time to what actually comes up. Available from anywhere in the world.",
    ],
    forYouIf: [
      "You have a question that logic hasn’t answered, and you want to hear from a deeper part of yourself",
      "You’ve been carrying something unresolved and sense it’s time to finally meet it directly",
      "You want the session to follow you — wherever the truth actually is, not a fixed roadmap",
      "You’re seeking a felt sense of clarity, not just an intellectual answer",
    ],
  },
  {
    slug: "qhht",
    name: "QHHT® — Quantum Healing Hypnosis Technique",
    duration: "4–6 hrs",
    price: "US$450",
    format: "in-person",
    paragraphs: [
      "The original protocol followed exactly as designed — no blending with other techniques, no outside interpretation. Just you, your own Higher Self, and the process Dolores Cannon built. In person only, by the method’s own design.",
    ],
    forYouIf: [
      "You want to sit face-to-face with your own Higher Self and ask the questions you’ve never had answered",
      "You’re drawn to something ancient and unaltered — a process exactly as it was built, not adapted",
      "You want healing that reaches your body, not just your mind — the kind that’s easier to access in person",
      "You’re ready to receive whatever comes through, without steering it yourself",
    ],
  },
  {
    slug: "bqh-qhht-combined",
    name: "BQH & QHHT Combined",
    duration: "6–8 hrs (or two sessions)",
    price: "US$700",
    format: "in-person",
    paragraphs: [
      "For the client who wants both: the depth and structure of the original protocol, plus the flexibility to bring in whatever else the session needs. The most complete version of this work available.",
    ],
    forYouIf: [
      "You have more than one thing weighing on you, and want to go all the way to the bottom of it",
      "You want both the certainty of a proven process and the freedom to follow what comes up beyond it",
      "You’re ready to spend real time in this work, not rush toward a single insight",
      "You want the fullest possible experience this modality can offer, in one immersive container",
    ],
  },
];

/* ---------------------------------------------------------------------------
 * Selectors
 * ------------------------------------------------------------------------- */

/** Every program, coaching first (in mastery order), then hypnotherapy. */
export const ALL_PROGRAMS: Program[] = [...COACHING.flatMap((m) => m.programs), ...HYPNOTHERAPY];

/** The programs that get a page at /programs/<slug> (aliases resolve to their target). */
export const PROGRAM_PAGES: Program[] = ALL_PROGRAMS.filter((p) => !p.pageOf);

export const programBySlug = (slug: string) => ALL_PROGRAMS.find((p) => p.slug === slug);

export const categoryOf = (slug: string): ProgramCategory =>
  HYPNOTHERAPY.some((p) => p.slug === slug) ? "hypnotherapy" : "coaching";

/** The mastery a coaching program sits under; undefined for hypnotherapy. */
export const masteryOf = (slug: string) => COACHING.find((m) => m.programs.some((p) => p.slug === slug));

/** The program's own page, e.g. "/programs/the-pivot". Aliases point at their target's page. */
export const programHref = (slug: string) => `/programs/${programBySlug(slug)?.pageOf ?? slug}`;

/** Numeric price, for structured data and the site-wide price range. */
export const priceValue = (p: Program) => Number(p.price.replace(/[^0-9.]/g, ""));

/** The home-page pricing anchors, cheapest first. */
export const featuredByPrice = () =>
  ALL_PROGRAMS.filter((p) => p.featured).sort((a, b) => priceValue(a) - priceValue(b));

// Slugs double as DOM ids and redirect targets; a duplicate would silently
// break both. Checked once at module load.
const slugs = ALL_PROGRAMS.map((p) => p.slug);
const dup = slugs.find((s, i) => slugs.indexOf(s) !== i);
if (dup) throw new Error(`Duplicate program slug: ${dup}`);
