/* The eight programmes, transcribed from the practitioner's own package PDFs
   (her-pdf-content/Coaching Packages/). Body copy is hers, verbatim; only
   headings are normalised and obvious typos fixed. `blurb` and `forYouIf` are
   the short card summaries and predate the PDFs.

   This is a leaf module: it must not import runtime values from ./site, which
   imports PROGRAMS to derive pricing. */

import type { FaqQuestion } from "./site";

export type ProgramTier = "session" | "program" | "entrepreneur";

/** A "you will…" outcome. #2 lists outcomes as bare bullets, so body is optional. */
export type Outcome = { heading: string; body?: string };

/** A block of prose with optional heading, mid-list and trailing paragraphs. */
export type Prose = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  after?: string[];
};

export type ProgramStructure =
  | {
      kind: "single-session";
      title: string;
      intro: string;
      agenda: string[];
      note?: string;
    }
  | {
      kind: "weekly";
      intro?: string;
      weeks: { n: number; title: string; body: string }[];
    }
  | {
      kind: "phased";
      intro?: string;
      phases: {
        n: number;
        title: string;
        weeks: string;
        subtitle?: string;
        paragraphs: string[];
        topics?: string[];
        outcome?: string;
      }[];
    }
  | {
      kind: "days";
      intro: string;
      days: {
        n: number;
        title: string;
        hours: string;
        intro: string;
        bullets: string[];
        outcome?: string;
      }[];
    };

export type Program = {
  slug: string;
  /** "PROGRAMME n" in her PDFs — kept for the eyebrow and to trace copy to source. */
  number: number;
  name: string;
  /** The one-line subtitle under the PDF title. Drives the lede and meta description. */
  tagline: string;
  /** Optional shout-line under the title (#5 only). */
  motto?: string;
  price: string;
  duration: string;
  format: "online" | "in-person";
  /** Short card summary — cards, OG image, JSON-LD. */
  blurb: string;
  forYouIf: string;
  tier: ProgramTier;
  featured?: boolean;
  /** "session": the programme is a BQH session. "included": a BQH session sits inside it. */
  bqh?: "session" | "included";
  /** Prose that opens the PDF, before the audience section (#8). */
  opening?: Prose;
  audience: { intro: string; lead: string; bullets: string[]; closing: string };
  transformation: { intro: string; outcomes: Outcome[]; closing: string };
  structure: ProgramStructure;
  receive: string[];
  receiveNote?: string;
  /** Prose that closes the PDF, after what clients receive (#2). */
  essay?: Prose;
  /** Follow-up block (#8). */
  addendum?: { heading: string; intro: string; bullets: string[]; closing?: string };
  disclaimer?: string;
  /** Per-programme FAQ selection; falls back to PROGRAM_FAQ_BY_TIER. */
  faq?: FaqQuestion[];
};

export const FLAGSHIP_SLUG = "unleash-the-inner-alchemist";

/** Display order: flagship, then guided transformations, entrepreneurs, single sessions. */
export const PROGRAMS: Program[] = [
  {
    slug: "unleash-the-inner-alchemist",
    number: 4,
    name: "Unleash the Inner Alchemist",
    tagline:
      "A deep identity transformation experience for individuals ready to reclaim their power, rewrite their story, and step into the life they were meant to live.",
    price: "$2,500",
    duration: "12 weeks · includes a 3-hour BQH session",
    format: "online",
    blurb:
      "The signature identity transformation: awaken to the patterns shaping your life, release the wounds beneath them — including a full BQH hypnotherapy session at the heart of the program — then rebuild and embody the self you're becoming.",
    forYouIf: "you've outgrown the version of yourself you've been living as.",
    tier: "program",
    featured: true,
    bqh: "included",
    audience: {
      intro: "Unleash the Inner Alchemist is designed for individuals who feel they are standing at a turning point in their lives.",
      lead: "This program is for people who:",
      bullets: [
        "Feel they have outgrown the version of themselves they have been living as",
        "Have experienced emotional wounds or past experiences that shaped their identity",
        "Feel spiritually aware but uncertain about their purpose or direction",
        "Know they are capable of creating a greater life but feel internally blocked",
        "Desire to rebuild their identity from a place of truth, strength, and self-awareness",
        "Want to consciously create a new chapter in their life",
      ],
      closing: "This experience is for those who feel that their old identity no longer fits the person they are becoming.",
    },
    transformation: {
      intro: "By the end of this experience, participants will feel like they have stepped into a new chapter of their life.",
      outcomes: [
        { heading: "Reclaim your identity", body: "Release outdated roles, expectations, and beliefs that no longer represent who you truly are." },
        { heading: "Transform subconscious beliefs", body: "Through the BQH hypnotherapy session, participants access deeper layers of the mind where limiting beliefs and emotional patterns can be uncovered and transformed." },
        { heading: "Heal emotional patterns", body: "Gain clarity on past experiences that have influenced relationships, decisions, and self-worth." },
        { heading: "Reconnect with inner wisdom", body: "Strengthen intuition and develop trust in your internal guidance." },
        { heading: "Gain clarity about life direction", body: "Understand what you truly want and how to move toward it with confidence." },
        { heading: "Step into personal power", body: "Develop stronger self-worth, confidence, and emotional independence." },
      ],
      closing: "This transformation allows participants to move forward feeling empowered, aligned, and deeply connected to their true potential.",
    },
    structure: {
      kind: "phased",
      phases: [
        {
          n: 1,
          title: "Awakening the Alchemist",
          weeks: "Weeks 1–3",
          paragraphs: [
            "This phase focuses on understanding the current identity and recognizing the subconscious patterns shaping your life.",
            "Participants explore how past experiences, relationships, and beliefs formed the identity they currently live from. They begin identifying the internal narratives influencing their decisions, behaviors, and emotional patterns.",
          ],
          outcome: "By the end of this phase, participants gain clarity on the beliefs and patterns that have been shaping their reality.",
        },
        {
          n: 2,
          title: "The Alchemical Transformation",
          weeks: "Weeks 4–6",
          paragraphs: [
            "This phase focuses on emotional healing and subconscious transformation.",
            "Participants begin releasing emotional wounds and limiting beliefs that have influenced their identity. They learn how to consciously revise the internal narratives shaping their life.",
            "During this phase, participants experience a 3-hour BQH hypnotherapy session, allowing them to access deeper levels of the subconscious mind, uncover the roots of limiting patterns, and gain profound insights about themselves.",
          ],
        },
        {
          n: 3,
          title: "Reconstructing the New Self",
          weeks: "Weeks 7–9",
          paragraphs: [
            "This phase focuses on integrating the insights gained and building a new identity aligned with personal truth and power.",
            "Participants process the shifts that occurred during the BQH session and begin embodying a stronger sense of self-worth, confidence, and emotional independence. They also gain clarity about their purpose and begin designing a vision for the next chapter of their life.",
          ],
        },
        {
          n: 4,
          title: "Expansion & Embodiment",
          weeks: "Weeks 10–12",
          paragraphs: [
            "In this final phase, participants learn how to live fully from their new identity.",
            "They develop the ability to make decisions, set boundaries, and navigate relationships from a place of clarity and self-trust.",
          ],
          outcome: "By the end of the program, participants step forward with a clear vision for their future and the confidence to create a life aligned with their true potential.",
        },
      ],
    },
    receive: [
      "12 private coaching sessions",
      "Subconscious identity transformation work",
      "A 3-hour BQH hypnotherapy session",
      "Voice-note support between sessions",
      "Personal Life Vision Blueprint",
    ],
  },
  {
    slug: "when-the-soul-awakens",
    number: 3,
    name: "When the Soul Awakens",
    tagline:
      "A 4-week guided journey for those experiencing spiritual awakening and seeking clarity, grounding, and inner peace.",
    price: "$999",
    duration: "4 weeks · 90 min per week",
    format: "online",
    blurb:
      "A grounded guide through spiritual awakening: understanding what's happening within you, discerning the flood of spiritual information, strengthening your own intuition, and integrating it all into everyday life.",
    forYouIf: "something deep is waking up and you want steady, grounded support — not more confusion.",
    tier: "program",
    opening: {
      paragraphs: [
        "Many people begin their spiritual journey through curiosity but soon become overwhelmed by the endless spiritual information online. When the Soul Awakens is a guided experience designed to help you understand what is happening within you and reconnect with your own inner wisdom.",
      ],
    },
    audience: {
      intro: "When the Soul Awakens is designed for individuals who feel their awareness expanding but need guidance navigating the journey.",
      lead: "This program is for people who:",
      bullets: [
        "Have recently begun exploring spirituality, consciousness, or personal awakening",
        "Feel overwhelmed by the amount of spiritual information online",
        "Notice they are questioning old belief systems and life perspectives",
        "Feel emotionally or energetically sensitive during this stage of growth",
        "Have experienced moments of insight or synchronicity but struggle to understand them",
        "Desire a grounded mentor to help them walk through this process with clarity and stability",
      ],
      closing: "This experience is for those who feel that something deep within them is waking up and want support understanding what that means.",
    },
    transformation: {
      intro: "By the end of this journey, participants will move from confusion and overwhelm into a place of clarity, peace, and inner trust.",
      outcomes: [
        { heading: "Understand what spiritual awakening truly is", body: "Instead of feeling confused about their experiences, participants gain a grounded understanding of what is happening internally." },
        { heading: "Reconnect with their intuition", body: "Participants learn how to listen to their own inner guidance rather than constantly seeking answers from outside sources." },
        { heading: "Feel emotionally balanced and stable", body: "Spiritual awareness becomes a source of peace instead of overwhelm." },
        { heading: "Develop a personal spiritual practice", body: "Simple daily practices are introduced to help maintain connection and clarity." },
        { heading: "Trust their spiritual journey", body: "Participants leave the program feeling confident in their path and no longer dependent on endless external information." },
      ],
      closing: "By the end of the experience, they begin to feel like a flower that has gently opened — grounded, aware, and deeply connected to themselves.",
    },
    structure: {
      kind: "weekly",
      intro: "This program is intentionally designed to help individuals slow down, integrate their experiences, and reconnect with their inner wisdom.",
      weeks: [
        { n: 1, title: "Understanding Spiritual Awakening", body: "Understanding what spiritual awakening truly is and why it can initially feel overwhelming. Participants begin to make sense of their experiences." },
        { n: 2, title: "Navigating Spiritual Information", body: "Learning how to discern spiritual teachings and avoid becoming overwhelmed by conflicting perspectives. Participants begin developing trust in their own internal guidance." },
        { n: 3, title: "Strengthening Intuition", body: "Deepening the connection with inner wisdom and learning how to recognize intuitive guidance." },
        { n: 4, title: "Integration and Blooming", body: "Participants learn how to integrate their spiritual awareness into everyday life while remaining grounded and balanced. This stage focuses on stepping forward with clarity and inner peace." },
      ],
    },
    receive: [
      "4 private coaching sessions — one per week, 75–90 minutes",
      "Mid-week check-in support",
      "Weekly reflection & integration prompts",
      "Grounding & awareness practices",
      "A safe space for spiritual exploration",
      "Voice-note support between sessions",
    ],
  },
  {
    slug: "magnetic-boss-babe",
    number: 1,
    name: "The Magnetic Boss Babe",
    tagline: "Reclaim your feminine power, elevate your identity, and attract the love & life you truly deserve.",
    price: "$1,200",
    duration: "8 weeks · weekly sessions",
    format: "online",
    blurb:
      "For high-achieving women who built success in survival mode and lost touch with their feminine power. Eight weeks to break old relationship patterns, rebuild self-worth and boundaries, and become the woman who naturally attracts the love she deserves.",
    forYouIf: "you're strong and self-sufficient, yet keep attracting emotionally unavailable partners.",
    tier: "program",
    audience: {
      intro: "The Magnetic Boss Babe Experience is designed for high-achieving women who have built success in their careers, businesses, or personal ambitions but feel disconnected from their feminine identity and frustrated in their romantic lives.",
      lead: "This experience is for the woman who:",
      bullets: [
        "Has become strong, independent, and self-sufficient but struggles to attract emotionally mature partners",
        "Feels she has had to operate in “survival mode” or masculine energy for most of her life",
        "Has lost parts of her identity through past relationships or emotional wounds",
        "Finds herself repeating the same relationship patterns despite being intelligent and self-aware",
        "Knows she is meant to live a deeply fulfilling life with love, respect, and emotional partnership",
        "Desires to embody a confident, radiant feminine presence that naturally attracts the right people and opportunities",
      ],
      closing: "This program is for women who are ready to stop shrinking, stop settling, and step fully into their power as a Magnetic Boss Babe.",
    },
    transformation: {
      intro: "By the end of this experience, you will no longer feel confused about your identity or your value in relationships. Instead, you will become the woman who naturally commands respect, love, and admiration.",
      outcomes: [
        { heading: "Reconnect with your feminine power", body: "Learn how to shift from survival mode into a state of magnetism, confidence, and emotional self-trust." },
        { heading: "Release old relationship patterns", body: "Identify subconscious beliefs and behaviors that have been attracting the wrong partners and learn how to replace them with empowering patterns." },
        { heading: "Reclaim your identity", body: "Many women lose themselves in relationships. You will rebuild a strong, grounded identity that does not depend on anyone else's validation." },
        { heading: "Strengthen your boundaries", body: "You will learn how to communicate your needs clearly and confidently while maintaining your feminine energy." },
        { heading: "Develop magnetic presence", body: "When a woman fully embodies her power and authenticity, she becomes naturally attractive to the right people and opportunities." },
        { heading: "Feel deep emotional alignment", body: "Instead of questioning your worth in relationships, you will move through life knowing exactly who you are and what you deserve." },
      ],
      closing: "This transformation goes beyond attracting a partner. It is about becoming the woman who attracts the life she truly deserves.",
    },
    structure: {
      kind: "weekly",
      intro: "An eight-week coaching experience — enough time for real transformation.",
      weeks: [
        { n: 1, title: "Identity Awakening", body: "Understanding how past relationships shaped your current identity and reconnecting with who you truly are." },
        { n: 2, title: "Feminine Energy Activation", body: "Understanding masculine vs feminine energy dynamics and learning how to return to your natural feminine power." },
        { n: 3, title: "Breaking Relationship Patterns", body: "Identifying subconscious beliefs that attract emotionally unavailable partners." },
        { n: 4, title: "Emotional Healing & Self-Worth", body: "Releasing past wounds and rebuilding self-worth." },
        { n: 5, title: "Feminine Magnetism", body: "How confident feminine women naturally attract the right partner." },
        { n: 6, title: "Boundaries & Standards", body: "Learning how to set powerful boundaries without losing softness." },
        { n: 7, title: "Communication & Relationship Dynamics", body: "How to express needs, desires, and expectations in healthy ways." },
        { n: 8, title: "Becoming the Magnetic Woman", body: "Stepping fully into your new identity and creating a vision for the love life you truly desire." },
      ],
    },
    receive: [
      "8 private coaching sessions — one per week, 90 minutes",
      "Personalized identity & relationship assessment",
      "Custom feminine power activation exercises",
      "Subconscious belief reprogramming techniques",
      "Voice-note support between sessions",
      "Journaling & self-reflection prompts",
    ],
  },
  {
    slug: "limitless-manifestor",
    number: 5,
    name: "The Limitless Manifestor",
    tagline:
      "A 10-week manifestation experience designed to help you consciously create the life you desire in love, prosperity, and purpose.",
    motto: "Manifest like the universe works for you.",
    price: "$1,800",
    duration: "10 weeks · step-by-step",
    format: "online",
    blurb:
      "A manifestation experience that goes beneath the surface teachings: clarity on what you truly want in love, prosperity, and purpose — then the identity work, belief alignment, and daily practices to consciously create it.",
    forYouIf: "you've tried every manifestation technique and nothing sticks.",
    tier: "program",
    audience: {
      intro: "The Limitless Manifestor is designed for individuals who feel ready to intentionally create a new reality in their lives.",
      lead: "This program is for people who:",
      bullets: [
        "Feel they are meant for more than the life they are currently experiencing",
        "Desire a loving and emotionally fulfilling relationship",
        "Want to improve their financial situation and create greater prosperity",
        "Have tried multiple manifestation techniques but nothing works",
        "Notice patterns of self-doubt or internal resistance when pursuing their desires",
        "Want to understand how manifestation works beyond surface-level teachings",
      ],
      closing: "This experience is for individuals who understand that changing life begins with changing the self.",
    },
    transformation: {
      intro: "By the end of this experience, participants will begin to see themselves and their desires in a completely different way.",
      outcomes: [
        { heading: "Clarify their desired reality", body: "Gain a clear understanding of what they truly want in love, finances, and life purpose." },
        { heading: "Transform limiting beliefs", body: "Identify subconscious beliefs that have been blocking progress and learn how to shift them." },
        { heading: "Strengthen self-concept", body: "Develop the identity aligned with the life they want to create." },
        { heading: "Align emotionally with their vision", body: "Understand how emotional alignment influences the outcomes they experience." },
        { heading: "Practice conscious manifestation", body: "Learn manifestation techniques that align thought, emotion, and action with desired outcomes." },
        { heading: "Step into their limitless potential", body: "Participants begin moving through life with the understanding that abundance, love, and fulfillment are available to them." },
      ],
      closing: "This transformation allows individuals to feel more empowered, aligned, and capable of consciously shaping their lives.",
    },
    structure: {
      kind: "phased",
      intro: "This program is designed as a step-by-step process that helps participants align their inner world with the reality they want to create.",
      phases: [
        {
          n: 1,
          title: "Awareness & Clarity",
          weeks: "Weeks 1–3",
          paragraphs: [
            "Participants gain clarity about their desires and begin identifying the beliefs and emotional patterns shaping their current reality.",
            "They explore what they truly want in relationships, prosperity, and life purpose.",
          ],
        },
        {
          n: 2,
          title: "Identity & Belief Alignment",
          weeks: "Weeks 4–6",
          paragraphs: [
            "Participants begin transforming the internal narratives that create resistance to their desired reality.",
            "They learn how to strengthen their self-concept and embody the identity aligned with the life they want to create.",
          ],
        },
        {
          n: 3,
          title: "The Manifestation Process",
          weeks: "Weeks 7–8",
          paragraphs: [
            "Participants learn manifestation practices designed to align thoughts, emotions, and actions with their goals.",
            "They begin implementing daily techniques that reinforce their ability to consciously create their experiences.",
          ],
        },
        {
          n: 4,
          title: "Embodiment & Expansion",
          weeks: "Weeks 9–10",
          paragraphs: [
            "In the final phase, participants integrate their new identity and begin living from the mindset and emotional alignment of the life they are creating.",
            "They leave the program with a clear vision and practical tools to continue expanding their reality.",
          ],
        },
      ],
    },
    receive: [
      "Weekly coaching sessions",
      "Guided manifestation techniques",
      "Identity alignment exercises",
      "Weekly reflection prompts",
      "Accountability & integration support",
      "Personal Vision Blueprint for relationships, prosperity, and purpose",
    ],
    disclaimer: "Noticeable change should already be in effect by the end of the program. Results may vary.",
  },
  {
    slug: "limitless-entrepreneur",
    number: 2,
    name: "The Limitless Entrepreneur",
    tagline:
      "A 12-week identity & wealth expansion program for entrepreneurs ready to break through their financial limits.",
    price: "$2,500",
    duration: "12 weeks · six 90-min sessions",
    format: "online",
    blurb:
      "An identity and wealth expansion program for entrepreneurs hitting the same financial ceiling month after month: find what built the ceiling, reprogram the wealth identity underneath it, then scale from abundance instead of fear.",
    forYouIf: "your business earns, but your income refuses to expand past a familiar number.",
    tier: "entrepreneur",
    audience: {
      intro: "The Limitless Entrepreneur is designed for entrepreneurs who are already earning and know the next level is an inside job.",
      lead: "This program is for entrepreneurs who:",
      bullets: [
        "Have a business that is already generating income",
        "Feel like they are hitting the same financial ceiling month after month",
        "Know they are capable of much more but cannot seem to break through",
        "Are doing “all the right things” yet their income refuses to expand",
        "Notice subconscious fear, hesitation, or self-sabotage when bigger opportunities appear",
        "Want to scale their business without burnout or constant hustle",
      ],
      closing: "This program is for entrepreneurs who understand that the next level of their income requires becoming a new version of themselves.",
    },
    transformation: {
      intro: "By the end of this 12-week experience, entrepreneurs will:",
      outcomes: [
        { heading: "Identify and remove subconscious money ceilings" },
        { heading: "Develop the identity of a high-level entrepreneur" },
        { heading: "Rewire limiting beliefs around money, visibility, and leadership" },
        { heading: "Expand their capacity to hold greater levels of success" },
        { heading: "Learn how to make decisions from their next-level identity" },
        { heading: "Create new income standards for their business" },
      ],
      closing: "Most importantly, they will no longer feel stuck. They will begin operating from the mindset and identity of someone who naturally expands their income and influence.",
    },
    structure: {
      kind: "phased",
      phases: [
        {
          n: 1,
          title: "Awareness",
          weeks: "Weeks 1–4",
          subtitle: "Understanding the ceiling",
          paragraphs: ["Entrepreneurs must first understand what created their financial limit."],
          topics: [
            "The psychology of income ceilings",
            "Identifying subconscious money patterns",
            "The hidden fear of expansion",
            "Why success triggers resistance",
          ],
          outcome: "Clients gain clarity on exactly why they have been stuck.",
        },
        {
          n: 2,
          title: "Identity Reprogramming",
          weeks: "Weeks 5–8",
          subtitle: "Becoming the next version of yourself",
          paragraphs: ["This is where transformation happens."],
          topics: [
            "Identity-based success principles",
            "Releasing subconscious money beliefs",
            "Reprogramming wealth identity",
            "Expanding personal capacity for success",
            "The energetics of leadership and influence",
          ],
          outcome: "Clients begin to think, move, and decide like the version of themselves who earns at their next level.",
        },
        {
          n: 3,
          title: "Expansion",
          weeks: "Weeks 9–12",
          subtitle: "Scaling and maintaining from the new identity",
          paragraphs: ["Now entrepreneurs operate differently."],
          topics: [
            "Making decisions from abundance instead of fear",
            "Raising standards in business",
            "Aligning offers with higher income levels",
            "Scaling without burnout",
            "Holding bigger success without self-sabotage",
          ],
          outcome: "Clients develop a clear expansion plan aligned with their new identity.",
        },
      ],
    },
    receive: [
      "6 deep coaching sessions — 90-minute transformation sessions every two weeks",
      "Weekly identity shift exercises — practical exercises designed to reprogram subconscious patterns",
      "Money mindset rewiring techniques",
      "Daily / weekly accountability",
      "Personalized Expansion Blueprint",
    ],
    receiveNote: "By the end of the program, each entrepreneur walks away with a clear path for scaling beyond their previous income ceiling.",
    essay: {
      heading: "Why you must break the ceiling now",
      paragraphs: [
        "Many entrepreneurs unknowingly operate under an internal financial thermostat.",
        "No matter how much they work or how many strategies they try, their income keeps returning to the same level. This happens because the subconscious mind has been conditioned to believe that a certain amount of success is “safe” or “normal.”",
        "When income begins to exceed that level, the mind creates subtle resistance:",
      ],
      bullets: [
        "procrastination",
        "hesitation",
        "fear of visibility",
        "poor decision making",
        "undervaluing services",
        "avoiding bigger opportunities",
      ],
      after: [
        "Without addressing the identity behind these patterns, entrepreneurs remain trapped at the same income level for years.",
        "But once the subconscious ceiling is removed, income expansion begins to feel natural instead of difficult.",
      ],
    },
  },
  {
    slug: "mri-intensive",
    number: 8,
    name: "MRI — Mindset Rehabilitation Intensive",
    tagline:
      "A private 2-day deep identity and strategy intensive for entrepreneurs ready to break through mental limits and expand their business and personal power.",
    price: "$10,000",
    duration: "2 private days · 16 hours · in person",
    format: "in-person",
    blurb:
      "Like a medical MRI scans the body, this private intensive scans the internal patterns shaping your business and leadership. Day one: deep mindset scan and diagnosis. Day two: rehabilitation, strategy, and a vision for your next level.",
    forYouIf: "you need a deep breakthrough, not another round of surface-level coaching.",
    tier: "entrepreneur",
    featured: true,
    opening: {
      paragraphs: [
        "Entrepreneurs often believe that the greatest obstacles to their success are strategy, resources, or opportunity. But the truth is that every business eventually grows to the level of the entrepreneur's identity and mindset.",
        "Hidden beliefs, unconscious fears, and outdated self-concepts quietly shape the decisions entrepreneurs make every day. These internal patterns can limit income, slow business growth, and prevent leaders from stepping fully into their power.",
        "MRI — Mindset Rehabilitation Intensive is designed to uncover and transform those hidden limitations. This is an exclusive two-day private experience where we deeply examine your mindset, decision-making patterns, and identity as a business leader.",
        "Just like a medical MRI scans the body to reveal what cannot be seen from the surface, this intensive scans the internal patterns shaping your business, your leadership, and your future.",
        "Through deep conversations, strategic analysis, and identity transformation work, we identify the mental barriers that are holding you back and replace them with powerful new perspectives that support expansion.",
      ],
    },
    audience: {
      intro: "MRI — Mindset Rehabilitation Intensive is designed for entrepreneurs who know they are capable of far more than they are currently experiencing.",
      lead: "This intensive is ideal for individuals who:",
      bullets: [
        "Feel they have reached a plateau in their business growth",
        "Sense that their mindset may be limiting their next level of success",
        "Want clarity on business direction, strategy, and decision-making",
        "Need a deep breakthrough rather than surface-level coaching",
        "Feel overwhelmed with ideas but unsure how to structure their next move",
        "Are ready to step into a larger vision for their life and business",
      ],
      closing: "This experience is for entrepreneurs who understand that true expansion begins within the mind of the creator.",
    },
    transformation: {
      intro: "Over the course of this intensive, we will identify and transform the thinking patterns that influence how you lead, create, and grow your business.",
      outcomes: [
        { heading: "Identify hidden mental barriers", body: "Discover the beliefs and thought patterns quietly limiting your growth." },
        { heading: "Break through identity ceilings", body: "Shift the self-concept that determines how much success you allow yourself to experience." },
        { heading: "Gain strategic clarity", body: "Analyze your business, goals, and vision to identify areas where mindset and strategy need realignment." },
        { heading: "Strengthen entrepreneurial leadership", body: "Develop a stronger sense of confidence, decision-making ability, and personal authority." },
        { heading: "Create an expansion blueprint", body: "Leave the intensive with a clear plan for the next stage of your personal and business growth." },
      ],
      closing: "This experience is designed to produce rapid clarity, powerful breakthroughs, and a renewed sense of direction.",
    },
    structure: {
      kind: "days",
      intro: "This experience is conducted in person to allow for deep focus, uninterrupted conversation, and powerful transformation.",
      days: [
        {
          n: 1,
          title: "Mindset Scan & Diagnosis",
          hours: "8 hours",
          intro: "We begin by examining the internal and external structures shaping your business and personal growth. During this phase we explore:",
          bullets: [
            "your current business model and goals",
            "the mindset patterns influencing your decisions",
            "fears, doubts, or hidden resistance affecting growth",
            "personal identity structures shaping leadership and success",
          ],
          outcome: "This phase reveals the root causes behind stagnation or limitation.",
        },
        {
          n: 2,
          title: "Mindset Rehabilitation & Expansion",
          hours: "8 hours",
          intro: "Once the patterns are identified, we begin rebuilding a stronger internal framework. During this phase we focus on:",
          bullets: [
            "transforming limiting beliefs and identity patterns",
            "strengthening your entrepreneurial mindset",
            "refining your business direction and expansion strategy",
            "building a powerful vision for your next level",
          ],
          outcome: "By the end of this day, you leave with clarity, confidence, and a strategic roadmap for expansion.",
        },
      ],
    },
    receive: [
      "16 hours of private in-person intensive coaching",
      "Deep mindset and identity analysis",
      "Strategic business brainstorming and clarity",
      "Limiting belief identification and transformation",
      "Personal Expansion Blueprint for business and life",
      "Two follow-up coaching sessions for integration",
    ],
    addendum: {
      heading: "Follow-up integration sessions",
      intro: "To ensure the transformation from the intensive is fully implemented, you will receive two private follow-up coaching sessions, designed to:",
      bullets: [
        "review progress after the intensive",
        "refine strategies and mindset shifts",
        "address new challenges that arise during implementation",
        "reinforce your new identity as a leader and creator",
      ],
      closing: "These sessions ensure the breakthroughs from the weekend are integrated into real-world action and results.",
    },
  },
  {
    slug: "power-reset",
    number: 6,
    name: "The Power Reset Session",
    tagline:
      "A 90-minute breakthrough coaching experience designed to help you regain clarity, momentum, and personal power.",
    price: "$150",
    duration: "90 minutes · online",
    format: "online",
    blurb:
      "A focused breakthrough coaching session for when you're overwhelmed, stuck, or navigating a hard decision. We find the root block, shift the perspective holding it in place, and map clear next steps — with the recording to keep.",
    forYouIf: "you need to get out of the ditch and back into motion — fast.",
    tier: "session",
    audience: {
      intro: "The Power Reset Session is designed for individuals who are actively working on themselves but find themselves temporarily stuck.",
      lead: "This session is for people who:",
      bullets: [
        "Feel overwhelmed or mentally stuck",
        "Have lost momentum in their personal growth journey",
        "Are navigating a challenging situation or decision",
        "Need guidance to shift their mindset or perspective",
        "Feel emotionally drained and need a reset",
        "Simply need a powerful conversation that helps them get back on track",
      ],
      closing: "This experience is designed to help you get out of the ditch and back into motion.",
    },
    transformation: {
      intro: "By the end of this session, you will feel clearer, stronger, and more empowered to move forward.",
      outcomes: [
        { heading: "Reconnect with your personal power", body: "Shift out of the emotional or mental state that has been keeping you stuck." },
        { heading: "Gain immediate clarity", body: "Receive insight and perspective around the challenge you are currently facing." },
        { heading: "Identify limiting patterns", body: "Recognize the mindset or belief that may be holding you back." },
        { heading: "Create a clear path forward", body: "Leave the session with practical next steps and renewed confidence." },
      ],
      closing: "This session is designed to create a powerful shift in a short amount of time.",
    },
    structure: {
      kind: "single-session",
      title: "A 90-minute breakthrough coaching session",
      intro: "This is a focused, high-impact session designed to help you quickly regain clarity and direction. During the session we will:",
      agenda: [
        "Explore the challenge or situation you are facing",
        "Identify the root mindset or emotional block",
        "Shift the perspective that is keeping you stuck",
        "Create a clear path forward with aligned action steps",
      ],
    },
    receive: [
      "One 90-minute private coaching session",
      "Personalized guidance and support",
      "Real-time mindset & perspective shift",
      "Clear action steps to regain momentum",
      "Recording of the session",
    ],
    faq: [
      "How are coaching sessions held?",
      "Are sessions recorded?",
      "Does coaching involve hypnosis?",
      "How do I book, and what's the cancellation policy?",
    ],
  },
  {
    slug: "beyond-the-mind",
    number: 7,
    name: "Beyond the Mind — BQH Quantum Healing Session",
    tagline:
      "A deep subconscious exploration designed to help you access inner wisdom, release limiting patterns, and receive guidance from your higher self.",
    price: "$350",
    duration: "3–4 hours · online",
    format: "online",
    blurb:
      "The deep subconscious session: pre-session conversation, guided hypnotic journey, exploration of the patterns and guidance that arise, and an integration discussion — plus the recording, if you wish.",
    forYouIf: "you feel stuck in repeating patterns and want to understand their deeper cause.",
    tier: "session",
    bqh: "session",
    audience: {
      intro: "Beyond the Mind is designed for individuals who are ready to explore the deeper layers of their subconscious mind.",
      lead: "This session is ideal for people who:",
      bullets: [
        "Feel stuck in repeating life patterns or emotional cycles",
        "Want to understand the deeper causes of challenges in their life",
        "Are experiencing spiritual awakening or heightened awareness",
        "Desire clarity about relationships, purpose, or life direction",
        "Feel ready to release emotional blocks that have been holding them back",
        "Are curious about connecting with their higher self for guidance and healing",
      ],
      closing: "This experience is for individuals who feel called to explore their inner world and uncover the wisdom that already exists within them.",
    },
    transformation: {
      intro: "A BQH session often brings profound insight and emotional release. During this experience you may:",
      outcomes: [
        { heading: "Access subconscious patterns", body: "Discover beliefs or emotional experiences that have been shaping your life." },
        { heading: "Receive higher guidance", body: "Connect with your higher awareness to gain answers and clarity about important areas of your life." },
        { heading: "Release emotional blocks", body: "Allow the subconscious mind to release emotional patterns that no longer serve you." },
        { heading: "Gain clarity and understanding", body: "Receive insight about relationships, purpose, and personal challenges." },
        { heading: "Reconnect with inner wisdom", body: "Leave the session with a deeper sense of self-awareness and understanding." },
      ],
      closing: "Each session is unique and unfolds according to what your subconscious mind is ready to reveal and heal.",
    },
    structure: {
      kind: "single-session",
      title: "One BQH online hypnotherapy session",
      intro: "This is a deep subconscious exploration conducted through a guided hypnotic process. The session includes:",
      agenda: [
        "Pre-session conversation — discussing your intentions and questions",
        "Guided hypnotic journey — entering a relaxed state to access the subconscious mind",
        "Exploration and insight — discovering patterns, memories, or guidance",
        "Integration discussion — reflecting on insights and next steps after the session",
      ],
      note: "Sessions typically last 3–4 hours to allow the process to unfold naturally.",
    },
    receive: [
      "One 3-hour online BQH hypnotherapy session",
      "Personalized pre-session consultation",
      "Subconscious exploration and healing",
      "Integration and reflection guidance",
      "Recording of the session, if desired",
    ],
  },
];

/** Human label for each tier, reused by /programs, /programs/[slug] and the home grid. */
export const TIER_LABELS: Record<ProgramTier, string> = {
  program: "Guided transformation",
  entrepreneur: "For entrepreneurs",
  session: "Single session",
};

/** Tiers in display order. */
export const TIER_ORDER: ProgramTier[] = ["program", "entrepreneur", "session"];

export const programBySlug = (slug: string) => PROGRAMS.find((p) => p.slug === slug);
export const programsByTier = (tier: ProgramTier) => PROGRAMS.filter((p) => p.tier === tier);
