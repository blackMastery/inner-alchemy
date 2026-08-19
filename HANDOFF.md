# Inner Alchemy — pre-launch checklist

Everything below is a placeholder, an unreviewed draft, or a decision that needs
a person. Nothing here blocks the site from running; all of it blocks launch.

## 1. Unconfirmed values

All five live in the `SITE` object at the top of [`content/site.ts`](content/site.ts).
Edit them there and they update everywhere.

| Value | Current | Needs |
|---|---|---|
| `SITE.email` | `hello@inneralchemy.example` | A real, monitored address. This one does not exist. |
| `SITE.qhhtPrice` | `$495` | Confirmation. Flagged as a placeholder in the design handoff. Appears in `PRICING_ROWS` and on `/qhht`. |
| `SITE.location` | `Georgetown, Guyana` | Confirmation — and whether in-person QHHT® is actually offered there, since `/qhht` sells an in-person session. |
| `SITE.url` | `NEXT_PUBLIC_SITE_URL`, falling back to localhost | The production domain, set as an env var in Vercel. Until then canonicals, the sitemap and OG image URLs point at localhost. |
| `SITE.testimonialsApproved` | `false` | See below. |

## 2. Testimonials — currently not published

The three testimonials in `content/site.ts` are **not rendered anywhere**. The
homepage band is conditionally removed and the section rhythm closes over it.

Set `SITE.testimonialsApproved = true` to restore it — but only once written
consent from each client is on file. Unconsented client testimonials for a
health-adjacent practice are a real liability, not a formality.

## 3. Journal posts — unreviewed drafts, currently live

Four posts under `app/journal/` were drafted from the reviewed FAQ answers in
`content/site.ts`. They are **live and indexed**, and they publish **without a
byline** because Hadassah has not read them.

- `will-i-lose-control-under-hypnosis`
- `what-if-nothing-happens-for-me`
- `do-i-have-to-believe-in-past-lives`
- `how-to-write-your-question-list`

Each file opens with a comment marking it as an unreviewed draft. After review,
remove those comments and set `unreviewed: false` in
[`content/journal.ts`](content/journal.ts) to attach her byline.

They make no medical claims and repeat the site's existing "complementary, not a
substitute" framing — but they are written in her voice about her practice, and
they are publicly indexed today.

## 4. Copy conflict between the two handoff artifacts

The HTML prototype and `src/content/site.ts` disagree. The site follows
`site.ts`, which the handoff README names as canonical. Worth resolving:

| | Prototype | `site.ts` (used) |
|---|---|---|
| Session length | "Sessions run **4–6 hours** — plan a full day" | "Sessions run **3–6 hours** — plan a long, unhurried block" |
| Hero eyebrow | "Quantum Healing Hypnosis Technique · Georgetown, Guyana" | "BQH · QHHT® · Transformational coaching — online" |
| Fit-check item | "You can set aside **a full day**" | "You can set aside **the time**" |

Note `PRICING_ROWS` separately describes the QHHT® session as "4–6 hours", so
the 3–6 figure and the 4–6 figure currently coexist on the site.

## 5. Accessibility — two items need a design decision

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


## 6. Still missing

- **Photography.** Three of four image slots are placeholders rendered by
  `components/ImageSlot.tsx` at the correct dimensions: the video poster
  (1280×720), the QHHT session room (560×420), and the story portrait (440×460).
  Pass a `src` prop to swap in a real photo. The hero portrait is real.
- **Practitioner video.** The homepage reserves a 16:9 block for it. The handoff
  calls this the highest-leverage asset on the site.
- **Booking backend.** `POST /api/booking` validates and logs; it does not
  deliver anywhere. Replace the `deliver()` function in
  [`app/api/booking/route.ts`](app/api/booking/route.ts) with Resend/Postmark, or
  hand off to a scheduler. The client, validation and response shape are done.
- **Pre-session intake form.** Not built. The FAQ and a journal post both promise
  clients an intake form after booking, so this is a stated commitment.

## 7. Legal

- The footer scope/disclaimer paragraph still carries its own bracketed note that
  it must be reviewed by a lawyer or her certifying body. That note is visible on
  the live site and must be removed before launch.
- QHHT® and Quantum Healing Hypnosis Technique℠ have brand usage rules tied to
  certification level. Check the official guidelines before any lockup using the
  marks or Dolores Cannon's name.
