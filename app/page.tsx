import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import BookingButton from "@/components/BookingButton";
import { Section, Eyebrow, H2, Card } from "@/components/ui";
import { SITE, PRACTITIONER, PROGRAMS, PRICING_ROWS, TESTIMONIALS, FIT } from "@/content/site";
import { JOURNAL } from "@/content/journal";

const ASSURANCES = [
  ["Sessions run 3–6 hours", "plan a long, unhurried block"],
  ["You're never unconscious", "it's deep relaxation, not sleep"],
  ["Everything is recorded", "the audio is yours to keep"],
  ["Free discovery call first", "always"],
];

export default function HomePage() {
  const ladder = [
    PROGRAMS.find((p) => p.slug === "power-reset")!,
    PROGRAMS.find((p) => p.slug === "beyond-the-mind")!,
    PROGRAMS.find((p) => p.slug === "unleash-the-inner-alchemist")!,
    PROGRAMS.find((p) => p.slug === "mri-intensive")!,
  ];

  // Testimonials stay out of the DOM entirely until written consent is on file.
  // With the band hidden, the fit-check and ladder sections are both linen and
  // would butt together with no separation — so the ladder picks up a hairline.
  const showTestimonials = SITE.testimonialsApproved && TESTIMONIALS.length > 0;

  return (
    <>
      {/* HERO */}
      <Section className="grid grid-cols-[1.15fr_0.85fr] items-center gap-[72px] !pb-[88px] !pt-[104px] max-md:grid-cols-1 max-md:gap-8">
        <div>
          <Eyebrow>BQH · QHHT® · Transformational coaching — online</Eyebrow>
          <h1 className="mb-[26px] font-display text-[58px] font-medium leading-[1.12] text-ink text-pretty max-md:text-[34px]">
            Some patterns don&rsquo;t come from this life.
          </h1>
          <p className="mb-9 max-w-[52ch] text-lg leading-[1.75] text-body-3">
            For the ache you can&rsquo;t trace back to anything — the grief that won&rsquo;t settle, the pattern that
            keeps returning, the question underneath everything. I&rsquo;m {PRACTITIONER.name}, transformational life
            coach and BQH/QHHT® practitioner, and I guide deep, gentle regression sessions. You stay aware the whole
            time. Most people remember everything.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <BookingButton />
            <Link href="/session" className="border-b border-sage-light pb-0.5 text-[15px] font-semibold text-sage-dark hover:text-ink">
              What a session actually looks like →
            </Link>
          </div>
          <p className="mt-5 text-[13px] text-muted">No obligation. It&rsquo;s a conversation, not a sales call.</p>
        </div>
        <div className="flex justify-center">
          {/* Portrait: 380×480 desktop, rounded to a full arch (radius 190px). */}
          <ImageSlot
            src="/images/hero-portrait.png"
            alt={PRACTITIONER.name}
            label="Warm portrait of the practitioner, arch crop"
            width={380}
            height={480}
            priority
            className="h-[480px] w-[380px] rounded-[190px] object-cover max-md:h-[360px] max-md:w-full max-md:max-w-[300px]"
          />
        </div>
      </Section>

      {/* ASSURANCE BAR */}
      <div className="border-y border-rule bg-linen-warm">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-6 px-8 py-[26px] max-md:px-[22px]">
          {ASSURANCES.map(([bold, rest]) => (
            <p key={bold} className="text-sm text-muted">
              <strong className="text-body">{bold}</strong> — {rest}
            </p>
          ))}
        </div>
      </div>

      {/* VIDEO */}
      <Section width="mid" className="text-center">
        <Eyebrow tone="clay">A two-minute hello</Eyebrow>
        <H2 className="mb-4">Hear my voice before you book anything.</H2>
        <p className="mx-auto mb-10 max-w-[56ch] text-[16.5px] leading-[1.75] text-body-3">
          Hypnosis is a relationship of trust. Before you decide anything, listen to how I speak and how a session is
          held — your nervous system will tell you whether this feels safe.
        </p>
        {/* Replace with the real embed (Mux / YouTube / self-hosted). 16:9. */}
        <div className="relative mx-auto aspect-video max-w-[720px] overflow-hidden rounded-2xl bg-linen-warm">
          <ImageSlot
            alt="Welcome video"
            label="Video poster frame — the two-minute practitioner introduction"
            width={1280}
            height={720}
            fill
            className="object-cover"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-linen/90 shadow-[0_8px_30px_rgba(53,48,42,0.25)]">
              <span className="ml-1.5 border-y-[12px] border-l-[20px] border-y-transparent border-l-clay" />
            </span>
          </span>
        </div>
      </Section>

      {/* SESSION TEASER */}
      <Section tone="warm" className="grid grid-cols-[0.9fr_1.1fr] gap-[72px] max-md:grid-cols-1 max-md:gap-8">
        <div>
          <Eyebrow tone="clay">No mystery, no surprises</Eyebrow>
          <H2 className="mb-5">What actually happens in a session</H2>
          <p className="mb-8 text-[16.5px] leading-[1.75] text-body-3">
            A deep session is a long block of time together — most of it is simply talking. Here&rsquo;s the shape of
            it, hour by hour. The full walkthrough covers everything, including what happens if you don&rsquo;t reach a
            deep trance.
          </p>
          <Link
            href="/session"
            className="inline-block rounded-full border border-clay-light px-[26px] py-3.5 text-[15px] font-semibold text-clay-dark hover:border-clay hover:bg-parchment"
          >
            Read the full walkthrough
          </Link>
        </div>
        <div className="flex flex-col">
          {[
            ["Hours 1–2", "The conversation", "We talk about your life, your questions, and what brought you here. Nothing hypnotic yet — just honesty."],
            ["Hour 3", "Settling in", "You lie down, eyes closed. A guided relaxation — like the edge of a nap, except you can always hear me and always answer."],
            ["Hours 3–5", "The regression", "You describe the scenes that arise, and we ask your deeper self the questions you brought — including any about health and the body."],
            ["Final hour", "Coming back & debrief", "We talk through what came up while it's fresh. You leave with the full audio recording — most of the integration happens re-listening over the following weeks."],
          ].map(([span, title, body], i, arr) => (
            <div
              key={title}
              className={`grid grid-cols-[88px_1fr] gap-5 py-5 max-md:grid-cols-1 max-md:gap-1 ${i < arr.length - 1 ? "border-b border-rule-2" : ""}`}
            >
              <p className="font-display text-[22px] text-clay-dark">{span}</p>
              <div>
                <p className="mb-1 font-semibold text-body">{title}</p>
                <p className="text-[14.5px] leading-[1.65] text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FIT CHECK */}
      <Section>
        <div className="mb-14 text-center">
          <Eyebrow tone="clay">An honest fit check</Eyebrow>
          <H2>Is this work for you?</H2>
        </div>
        <div className="mx-auto grid max-w-[960px] grid-cols-2 gap-8 max-md:grid-cols-1">
          <Card className="!p-10 max-md:!p-[26px]">
            <p className="mb-[22px] font-display text-[26px] text-sage-dark">This tends to be a fit if…</p>
            <ul className="flex flex-col gap-4 text-[15px] leading-[1.65] text-body-3">
              {FIT.yes.map((line) => (
                <li key={line} className="flex gap-3"><span aria-hidden="true" className="text-sage">✦</span><span>{line}</span></li>
              ))}
            </ul>
          </Card>
          <Card className="!p-10 max-md:!p-[26px]">
            <p className="mb-[22px] font-display text-[26px] text-clay">It isn&rsquo;t the right tool if…</p>
            <ul className="flex flex-col gap-4 text-[15px] leading-[1.65] text-body-3">
              {FIT.no.map((line) => (
                <li key={line} className="flex gap-3"><span aria-hidden="true" className="text-[#C09A82]">—</span><span>{line}</span></li>
              ))}
            </ul>
          </Card>
        </div>
        <p className="mx-auto mt-8 max-w-[60ch] text-center text-sm text-muted">
          Not sure which side you fall on? That&rsquo;s exactly what the free discovery call is for.
        </p>
      </Section>

      {/* TESTIMONIALS — see SITE.testimonialsApproved */}
      {showTestimonials && (
        <Section tone="ink">
          <div className="mb-14 text-center">
            <Eyebrow tone="light">In their words</Eyebrow>
            <H2 dark>What shifted for clients</H2>
          </div>
          <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
            {TESTIMONIALS.map((t) => (
              <figure key={t.attribution} className="flex flex-col gap-5 rounded-[18px] border border-rule/20 bg-linen/[0.06] p-9 max-md:p-[26px]">
                <blockquote className="font-display text-xl italic leading-[1.55] text-rule-4">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto text-[13px] uppercase tracking-[0.12em] text-clay-light">{t.attribution}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {/* LADDER */}
      <Section outerClassName={showTestimonials ? "" : "border-t border-rule"}>
        <div className="mb-14 text-center">
          <Eyebrow>Ways to work together</Eyebrow>
          <H2 className="mb-3.5">Start where you are</H2>
          <p className="mx-auto max-w-[58ch] text-base leading-[1.7] text-muted">
            Not everyone is ready for deep regression work — and that&rsquo;s fine. Many clients begin with a single
            coaching session and move deeper when it feels right.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6 max-md:grid-cols-1">
          {ladder.map((p, i) => {
            const dark = p.slug === "beyond-the-mind";
            return (
              <div
                key={p.slug}
                className={`relative flex flex-col gap-3 rounded-[18px] border p-8 max-md:p-[26px] ${
                  dark ? "border-ink bg-ink" : "border-rule bg-parchment"
                }`}
              >
                {i === 0 && (
                  <span className="absolute -top-[11px] left-6 rounded-full bg-sage px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-linen">
                    Start here
                  </span>
                )}
                <p className={`mt-2 font-display text-[25px] ${dark ? "text-cream-2" : "text-ink"}`}>{p.name}</p>
                <p className={`flex-1 text-sm leading-[1.65] ${dark ? "text-cream" : "text-muted"}`}>{p.blurb}</p>
                <p className={`text-sm font-semibold ${dark ? "text-clay-light" : "text-clay-dark"}`}>
                  {p.price} · {p.duration}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-center">
          <Link href="/programs" className="inline-block rounded-full bg-sage px-[26px] py-3.5 text-[15px] font-semibold text-linen hover:bg-sage-dark">
            Explore all 8 programs →
          </Link>
        </p>
      </Section>

      {/* JOURNAL — takes the ink slot in the rhythm, so the band alternates
          whether or not the testimonial section above is showing. */}
      <Section tone="ink" width="mid">
        <div className="mb-12 text-center">
          <Eyebrow tone="light">From the journal</Eyebrow>
          <H2 dark>The questions people ask first</H2>
        </div>
        <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
          {[...JOURNAL]
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 3)
            .map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="flex flex-col gap-3 rounded-[18px] border border-rule/20 bg-linen/[0.06] p-8 no-underline hover:border-clay-light max-md:p-[26px]"
              >
                <span className="text-xs uppercase tracking-[0.16em] text-clay-light">{post.tag}</span>
                <span className="font-display text-[23px] leading-tight text-cream-2">{post.title}</span>
                <span className="flex-1 text-sm leading-[1.7] text-cream">{post.excerpt}</span>
              </Link>
            ))}
        </div>
        <p className="mt-10 text-center">
          <Link href="/journal" className="text-sm font-semibold text-clay-light">
            Read the journal →
          </Link>
        </p>
      </Section>

      {/* PRICING */}
      <Section tone="warm" width="narrow">
        <div className="mb-11 text-center">
          <Eyebrow tone="clay">No surprises</Eyebrow>
          <H2 className="mb-3.5">Pricing, plainly</H2>
          <p className="text-[15.5px] leading-[1.7] text-muted">
            Deep work takes real time. Here is exactly what everything costs.
          </p>
        </div>
        <div className="overflow-hidden rounded-[18px] border border-rule-2 bg-parchment">
          {PRICING_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-8 py-5 max-md:px-5 max-md:py-4 ${
                i < PRICING_ROWS.length - 1 ? "border-b border-rule-4" : ""
              } ${row.highlight ? "bg-highlight" : ""}`}
            >
              <span className="text-[15.5px] text-body">{row.label}</span>
              <span className={`font-bold ${row.price === "Free" ? "text-sage-dark" : row.highlight ? "text-lg text-clay-dark" : "text-body"}`}>
                {row.price}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-[22px] text-center text-[13px] text-muted">
          Payment plans available — just ask on the discovery call. A deposit holds your session.
        </p>
      </Section>

      {/* CLOSING CTA */}
      <Section width="narrow" className="text-center !py-[104px]">
        <h2 className="mb-5 font-display text-[44px] font-medium leading-tight text-ink max-md:text-[27px]">
          Start with fifteen minutes.
        </h2>
        <p className="mb-9 text-[17px] leading-[1.75] text-body-3">
          Bring your questions — the practical ones and the strange ones. If this isn&rsquo;t the right work for you,
          I&rsquo;ll say so and point you somewhere better.
        </p>
        <BookingButton>Book a free discovery call</BookingButton>
      </Section>
    </>
  );
}
