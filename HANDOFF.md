# Inner Alchemy — pre-launch checklist

Everything below is a placeholder, an unreviewed draft, or a decision that needs
a person. Nothing here blocks the site from running; all of it blocks launch.

## 1. Unconfirmed values

All five live in the `SITE` object at the top of [`content/site.ts`](content/site.ts).
Edit them there and they update everywhere.

| Value | Current | Needs |
|---|---|---|
| `SITE.email` | `info@inneralchemyinstitution.com` | Set. Confirm the inbox is live and monitored before launch. |
| `SITE.phone` | `+592 663 1808` | Every "Book a call" button dials this. Confirm it's the number she wants public. |
| `SITE.bookingFormUrl` | Google Form `1FAIpQLSc-d06…` | Every "Book a program" button opens this. Confirm responses land in an inbox she checks. |
| `SITE.location` | `Georgetown, Guyana` | Confirmation. Shown in the footer and as `areaServed` for the in-person MRI intensive. |
| `SITE.url` | `https://www.inneralchemyinstitution.com` | Set. Make sure the bare domain (no `www`) redirects to `www` at the DNS/host level so there is one canonical origin. `NEXT_PUBLIC_SITE_URL` overrides if it ever changes. |
| `SITE.testimonialsApproved` | `false` | See below. |

## 1b. Copy derived from her PDFs — needs her sign-off

The eight programme pages ([`content/programs.ts`](content/programs.ts)) are
her package PDFs transcribed verbatim; only headings and obvious typos were
normalised. Things to confirm with her:

- **Power Reset vs "Power Reclaim".** The Power Reset PDF calls itself "The
  Power Reclaim Session" once in the body. The site uses "Power Reset" throughout.
- **Voice-note support** is listed on three PDFs (Inner Alchemist, Boss Babe,
  Soul Awakens). The new FAQ answer says so; confirm it isn't offered on the others too.
- **Recordings.** Only the two single sessions list a recording. The FAQ says
  programme calls aren't recorded by default — confirm.
- **New FAQ answers** under "Coaching programs" in `content/site.ts` are
  written from the PDFs, not by her. Each is marked `TODO: confirm`.
- **`METHOD`, `HOME_HERO`, `HOME_INTRO`** in `content/site.ts` are drawn
  from her bio, not verbatim. Marked `TODO: confirm`.
- **QHHT®.** The standalone `/qhht` page (and its placeholder `$495` price)
  is gone; `/qhht` now redirects to `/programs/beyond-the-mind`, which carries a
  short "prefer it in person?" note (`QHHT_NOTE`). If she does offer QHHT® as a
  priced product, it needs its own PDF and a programme entry.
- **"Why are sessions so long?"** still says three to six hours; the Beyond the
  Mind PDF says 3–4. The session timeline no longer shows clock times.

## 2. Testimonials — published

Three client testimonials (Natasha Clement, Diane Amsterdam, Ms Annette) are
rendered on the home page and in its Markdown mirror, gated by
`SITE.testimonialsApproved` in `content/site.ts`. Confirm written consent from
each named client is on file — unconsented client testimonials for a
health-adjacent practice are a real liability, not a formality. Flip the flag
to `false` to pull them from the site.

## 3. Copy conflict between the two handoff artifacts

The HTML prototype and `src/content/site.ts` disagree. The site follows
`site.ts`, which the handoff README names as canonical. Worth resolving:

| | Prototype | `site.ts` (used) |
|---|---|---|
| Session length | "Sessions run **4–6 hours** — plan a full day" | "Sessions run **3–6 hours** — plan a long, unhurried block" |
| Hero eyebrow | "Quantum Healing Hypnosis Technique · Georgetown, Guyana" | "BQH · QHHT® · Transformational coaching — online" |
| Fit-check item | "You can set aside **a full day**" | "You can set aside **the time**" |

Note `PRICING_ROWS` separately describes the QHHT® session as "4–6 hours", so
the 3–6 figure and the 4–6 figure currently coexist on the site.

## 4. Accessibility — two items need a design decision

Six failing colour pairings were fixed at the usage layer without changing any
token value. Two could not be:

- **Primary CTA.** `linen` text on the `clay` fill is **3.98:1**; the `sage`
  button is **3.20:1**. WCAG AA needs 4.5:1. Fixing means darkening the CTA
  colour the handoff calls final. `clay-dark` would give 5.64:1.
- **Type scale.** The handoff states "never below 14px", then specifies 12px
  eyebrows and a 9.5px header tagline. The tagline is now 11px; eyebrows remain
  12px, which still fails the handoff's own rule.

Separately: the React header tagline read "Institution · Life Coaching &
Hypnotherapy Services", which wraps and breaks the desktop nav at a readable
size. It now matches the prototype's shorter "Life Coaching & Hypnotherapy
Services", and is hidden between 1024–1280px where it would collide with the nav.


## 5. Still missing

- **Photography.** Her four portraits are in place: `portrait-white-suit.jpg`
  (home audio hello; the hero still uses `hero-portrait.png`), `portrait-dark.jpg` (home "Meet Hadassah" band), `portrait-casual.jpg`
  (`/story`), and `portrait-sunglasses.jpg` (unused, in reserve). All four are tall
  ~1:2 crops, so every slot is portrait with `object-top`. `hero-portrait.png` and
  the `IMG_39xx.PNG` files in `public/images/` are no longer referenced and can be
  deleted. No image placeholders remain.
- **Practitioner audio.** The homepage "two-minute hello" block plays
  `public/audio/hello.m4a` (~1:51) over her white-suit portrait via
  [`components/AudioHello.tsx`](components/AudioHello.tsx). Swap the file or
  the image there. A video could replace it later in the same slot.
- **Booking.** The main call to action is "Book a program", which opens the
  Google Form at `SITE.bookingFormUrl` in a new tab (program pages, the programs
  index, category pages, story, session, 404, the footer, the FAQ, and the
  Markdown mirrors). The "Book a free 15-minute call" button was removed from
  those pages; the header, home hero, footer and FAQ buttons still dial
  `SITE.phone` as `tel:` links. The earlier modal form
  ([`components/BookingModal.tsx`](components/BookingModal.tsx),
  [`components/BookingContext.tsx`](components/BookingContext.tsx)) and its
  `POST /api/booking` route are still in the repo but unmounted. To bring the
  form back, re-wrap the layout in `BookingProvider`, mount `BookingModal`, and
  wire `deliver()` in [`app/api/booking/route.ts`](app/api/booking/route.ts)
  to Resend/Postmark or a scheduler.
- **Logo source files.** `public/logos/image-{black,white}.jpg` (1024px) are
  the masters; `emblem-on-{light,dark}.png`, `logo-512.png`, the favicon set
  (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `public/icons/*`)
  and the manifest icons are derived from them. Regenerate the derivatives if the
  masters change; a vector original would still be worth asking for.
- **Pre-session intake form.** Not built. The FAQ promises clients an intake
  form after booking, so this is a stated commitment.

## 6. SEO — in place, and what still needs a person

Done in code: per-page titles, descriptions, canonicals and share cards
(`lib/seo.ts`), OG images for every route, an Apple touch icon, `robots.txt`
and `sitemap.xml`, and structured data — `WebSite`, `Person`,
`ProfessionalService` (site-wide), `Service` + `Offer` + `BreadcrumbList`
(program pages) and `FAQPage` (FAQ).

Still needs a human:

- **One canonical origin** — the site is `https://www.inneralchemyinstitution.com`.
  Redirect the bare domain and any `*.vercel.app` alias to it (301) so Google
  sees one origin.
- **Google Search Console** — verify the domain and submit `/sitemap.xml`.
  Add the token to `metadata.verification` in `app/layout.tsx` if using the
  meta-tag method.
- **Google Business Profile** — the `ProfessionalService` schema is ready to
  match it; the address is city-level only.
- **Social profiles** — add them as `sameAs` on the `Person` and
  `ProfessionalService` nodes in `app/layout.tsx` once known.
- Validate at <https://search.google.com/test/rich-results> after deploy.

## 7. Legal

- The footer scope/disclaimer paragraph (`components/SiteFooter.tsx`) has not
  been reviewed by a lawyer or her certifying body. The visible bracketed reminder
  was removed from the page so AI agents and search snippets stop quoting it;
  the review itself is still outstanding.
- QHHT® and Quantum Healing Hypnosis Technique℠ have brand usage rules tied to
  certification level. Check the official guidelines before any lockup using the
  marks or Dolores Cannon's name.
