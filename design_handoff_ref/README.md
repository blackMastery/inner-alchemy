# Handoff: Inner Alchemy Institution website

For **Hadassah Headley** — transformational life coach and BQH/QHHT® practitioner.
Target app: the attached `inner-alchemy` Next.js project (Next 16.3.1, React 19.2, Tailwind CSS v4, TypeScript, App Router).

---

## Overview

A six-page marketing site whose single job is **demystification**. Prospects are not comparing this
practitioner to other practitioners — they are deciding whether to try hypnotherapy at all. Two questions
block the booking, and the whole information architecture answers them:

1. *What literally happens in a session?* → the `/session` walkthrough, hour by hour.
2. *What if nothing happens for me?* → the "What if I don't go deep?" section on `/session` and in the FAQ.

Every page funnels to one conversion action: **a free 15-minute discovery call**, opened by a modal from
any `<BookingButton>`.

## About the design files

`Inner Alchemy Website.dc.html` in this bundle is a **design reference created in HTML** — a working
prototype of the intended look and behavior, not production code to lift. The task is to recreate it in
the target Next.js app using that codebase's conventions.

To make that concrete, this bundle **also ships a ready-to-paste Next.js implementation** under `src/`,
written against the target app's actual stack. It is a strong starting point, not gospel — the app's
`AGENTS.md` warns that this Next version has breaking changes from training data, so verify route and
API conventions against `node_modules/next/dist/docs/` before committing.

## Fidelity

**High fidelity.** Colors, type, spacing, and copy are final-quality. Recreate pixel-accurately; the exact
values are tokenized in `src/app/globals.css`. Copy is real and reviewed — do not paraphrase it. The only
deliberate placeholders are noted under **Open items**.

---

## Installation into the target app

1. Copy `src/app/globals.css`, `src/app/layout.tsx`, the five route folders, `src/components/`, and
   `src/content/` into the app. If the app keeps routes at `app/` (no `src/` dir), drop the `src/`
   segment and adjust the `@/*` path alias in `tsconfig.json` accordingly.
2. Fonts: `Cormorant_Garamond` + `Karla` via `next/font/google`, replacing Geist in `layout.tsx`.
3. Remove the dark-mode `prefers-color-scheme` block from the scaffold's `globals.css` — this site is
   light-only by design; a dark inversion would break the intended nervous-system feel.
4. Drop images into `public/images/` (see **Assets**).
5. `npm run dev` and compare against the HTML prototype side by side.

## Routes

| Route | Purpose | Notes |
|---|---|---|
| `/` | Conversion flow | hero → assurance bar → practitioner video → session teaser → fit check → testimonials → program ladder → pricing → closing CTA |
| `/programs` | All 8 offers | grouped: single sessions, 4–12 week transformations, entrepreneur tier |
| `/session` | **The conversion engine.** Hour-by-hour walkthrough | includes the "what if I don't go deep" honesty section |
| `/qhht` | Service page for in-person QHHT® | distinct search intent from the online BQH session |
| `/faq` | 13 questions in 3 groups | emits `FAQPage` JSON-LD; each answer is SEO surface |
| `/story` | Practitioner origin story | converts unusually well in this field |

Nav order is defined once in `src/components/SiteHeader.tsx` (`NAV`).

## Design tokens

All defined in `@theme` in `src/app/globals.css`; use the Tailwind utilities they generate
(`bg-linen`, `text-clay`, `border-rule`), never raw hex in components.

**Surfaces** — linen `#FAF6EF` (page), linen-warm `#F4EEE2` (alternating band), parchment `#FFFDF8`
(card), parchment-2 `#FBF3E7` (callout), highlight `#FAF4E9` (featured pricing row), ink `#2E2A24`
(dark sections), ink-2 `#3A342C`.

**Text** — body `#35302A`, body-2 `#4A443C`, body-3 `#5C5347`, muted `#6E6558`, muted-2 `#8C8172`;
on dark: cream `#C9BFAE`, cream-2 `#F4EEE2`, muted-dark `#9A8F80`, legal `#7D7365`.

**Accents** — clay `#A96B4F` (primary CTA), clay-dark `#8A5540` (hover), clay-light `#C7A98F` (accent on
dark), clay-pale `#D8B9A5`, sand `#E8D9BF`; sage `#7F8F76` (secondary), sage-dark `#64735C`,
sage-light `#B9C2B0`. Deliberately **no purple, no galaxy, no mandala** — the skeptical-but-curious
visitor reads that as unserious.

**Rules** — `#E7DECF` (default hairline), `#E0D5C2`, `#DCCDB9`, `#EFE7D8` (inside cards).

**Type** — display: Cormorant Garamond 400/500/600 + italic (all headings, pull quotes, timeline hours,
testimonial bodies). Sans: Karla 400/500/600/700 (everything else).
Scale: h1 58px hero / 52px inner pages (34px mobile) · h2 40px (27px) · h3 25–28px · lead 17–18px ·
body 15–16.5px · small 14–14.5px · caption 13px · eyebrow 12px uppercase, `tracking-[0.2em]`.
Line height is generous everywhere — 1.7–1.85 for body copy. Never below 14px.

**Spacing** — sections `py-24` desktop / `py-16` mobile; page gutters `px-8` / `px-[22px]`;
container widths 1120 / 880 / 760px. Cards `p-8`–`p-10`, `rounded-[18px]`. Buttons `rounded-full`,
`px-[30px] py-4` (sm: `px-[22px] py-[11px]`). Modal `rounded-[22px]`, `box-sizing: border-box` —
this was a real bug in the prototype; keep it.

**Motion** — minimal by design. Colour transitions on hover only. No scroll animation, no parallax:
the page should feel like the nervous-system state being sold.

## Components

- `BookingContext.tsx` — provider + `useBooking()`; single source of modal state.
- `BookingButton.tsx` — 4 variants (`primary` clay, `sage`, `sand` for dark bg, `outline`), 2 sizes.
- `BookingModal.tsx` — name / email / optional "what's drawing you to this work"; success state replaces
  the form in place. **Currently local state only — wire to a real handler.**
- `SiteHeader.tsx` — sticky, `backdrop-blur`, active-link underline; hamburger below **1024px**
  (not 768 — the six-item nav runs out of room before the layout does).
- `SiteFooter.tsx` — three columns + the legal/scope paragraph.
- `ui.tsx` — `Section` (tone: linen/warm/ink, width: wide/mid/narrow), `Eyebrow`, `H1`, `H2`, `Card`.

## Content

All copy lives in `src/content/site.ts` (programs, pricing rows, session timeline, FAQ groups,
testimonials, fit-check lists, story paragraphs). Pages are layout-only. This is intentional: it lets her
edit copy without touching JSX, and it is the natural seam if a CMS (Sanity / Contentful / MDX) is added
later.

Programs and prices come from her own programme PDFs: Power Reset `$150` · Beyond the Mind (BQH)
`$350` · When the Soul Awakens `$999` · Magnetic Boss Babe `$1,200` · Limitless Manifestor `$1,800` ·
Limitless Entrepreneur `$2,500` · Unleash the Inner Alchemist `$2,500` · MRI Intensive `$10,000`.

## Responsive behavior

Single breakpoint family, mobile handled with Tailwind `max-md:` / `max-lg:`:
- **< 1024px** — hamburger nav replaces the desktop nav.
- **< 880px (`max-md`)** — every multi-column grid collapses to one column; h1 → 34px, h2 → 27px;
  card padding → 26px; gutters → 22px; images shrink (hero 300×360, video 16:9, story 320px tall);
  the story portrait stops being sticky; pricing rows wrap so long labels don't collide with prices.
- Touch targets stay ≥ 44px (mobile nav rows are `py-3.5` + text; buttons `py-[15px]`).

## Interactions

- Booking modal: opens from any `BookingButton`, closes on overlay click or ×, resets to the form on close.
- FAQ: native `<details>/<summary>`; the `+` rotates 45° via `group-open`. Native disclosure keeps
  answers in the DOM for crawlers.
- Nav: active route gets clay text + a clay-light underline.
- Mobile menu closes on navigation.

## Still to build (not in this bundle)

1. **Booking backend** — long-block calendar (Cal.com or Acuity; a 4–6h QHHT event type plus 90-minute and
   15-minute types). The modal should either embed the scheduler or hand off to it after the enquiry.
2. **Pre-session intake form** — essential for this modality: she needs the client's written question list
   in advance. Gate it behind booking confirmation; email a copy to both parties.
3. **Blog / podcast architecture** — paid ads are restricted for this category (Meta and Google limit
   health and "personal hardship" claims), so the site must live on SEO and referral. Recommend MDX under
   `/journal/[slug]` seeded from real client questions.
4. **Analytics + `sitemap.ts` / `robots.ts`**, and `opengraph-image.tsx` per route.

## Open items for the practitioner

- **Real photography** — the four image slots are placeholders (see Assets). A real, warm portrait
  outperforms any stock cosmic imagery here.
- **Practitioner video** — the highest-leverage asset on the site. People book hypnosis on whether the
  practitioner's voice and manner feel safe; text cannot do that. Two minutes is enough.
- **QHHT® in-person price** — `$495` in `PRICING_ROWS` and on `/qhht` is a placeholder; confirm.
- **Location and studio address** — footer currently says Georgetown, Guyana; confirm whether in-person
  QHHT® is offered there.
- **Legal review** — the scope/disclaimer paragraph in the footer must be reviewed by a lawyer or her
  certifying body. "Healing" as a verb creates liability, and hypnotherapy practice rules vary by
  jurisdiction. The site states throughout that this is not a substitute for medical or mental health care;
  keep that language.
- **Trademark usage** — QHHT® and Quantum Healing Hypnosis Technique℠ have certification levels and brand
  usage rules. Check the official guidelines before designing any lockup using the name or Dolores Cannon's.

## Assets

Place in `public/images/`. All four are currently placeholders in the prototype:

| File | Used on | Size |
|---|---|---|
| `hero-portrait.png` | `/` hero | 380×480, arch crop (`rounded-[190px]`) |
| `welcome-video-poster.png` | `/` video | 16:9, 720px wide |
| `session-room.png` | `/qhht` hero | ~560×420 |
| `story-portrait.png` | `/story` | ~440×460 |

## Files in this bundle

```
Inner Alchemy Website.dc.html   the HTML design reference (open in a browser)
src/app/globals.css             design tokens (@theme) — start here
src/app/layout.tsx              fonts, providers, header/footer/modal shell
src/app/{page,programs,session,qhht,faq,story}/…  the six routes
src/components/                 header, footer, booking modal + context + button, ui primitives
src/content/site.ts             all copy and pricing data
```
