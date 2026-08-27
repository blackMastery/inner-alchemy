import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import BookingButton from "@/components/BookingButton";
import FlagshipCard from "@/components/FlagshipCard";
import ProgramCard from "@/components/ProgramCard";
import CheckList from "@/components/CheckList";
import { Section, Eyebrow, H2, Card } from "@/components/ui";
import {
  SITE,
  PRACTITIONER,
  HOME_HERO,
  SHORT_BIO,
  METHOD,
  ASSURANCES,
  PRICING_ROWS,
  TESTIMONIALS,
  FIT,
} from "@/content/site";
import { FLAGSHIP_SLUG, programBySlug, programsByPrice } from "@/content/programs";
import { JOURNAL } from "@/content/journal";

export default function HomePage() {
  const flagship = programBySlug(FLAGSHIP_SLUG)!;
  const bqh = programBySlug("beyond-the-mind")!;
  const programs = programsByPrice().filter((p) => p.slug !== FLAGSHIP_SLUG);

  // Testimonials stay out of the DOM entirely until written consent is on file.
  const showTestimonials = SITE.testimonialsApproved && TESTIMONIALS.length > 0;

  return (
    <>
      {/* HERO */}
      <Section className="grid grid-cols-[1.15fr_0.85fr] items-center gap-[72px] !pb-[88px] !pt-[104px] max-md:grid-cols-1 max-md:gap-8">
        <div>
          <Eyebrow>{HOME_HERO.eyebrow}</Eyebrow>
          <h1 className="mb-[26px] font-display text-[58px] font-medium leading-[1.12] text-ink text-pretty max-md:text-[34px]">
            {HOME_HERO.headline}
          </h1>
          <p className="mb-9 max-w-[52ch] text-lg leading-[1.75] text-body-3">{HOME_HERO.lede}</p>
          <div className="flex flex-wrap items-center gap-6">
            <BookingButton />
            <Link href="/programs" className="border-b border-sage-light pb-0.5 text-[15px] font-semibold text-sage-dark hover:text-ink">
              Explore the eight programs →
            </Link>
          </div>
          <p className="mt-5 text-[13px] text-muted">No obligation. It&rsquo;s a conversation, not a sales call.</p>
        </div>
        <div className="flex justify-center">
          {/* Portrait: 380×480 desktop, rounded to a full arch (radius 190px). */}
          <ImageSlot
            src="/images/hero-portrait.png"
            alt={`${PRACTITIONER.name}, ${PRACTITIONER.title.toLowerCase()}`}
            label="Portrait of the practitioner, arch crop"
            width={380}
            height={480}
            priority
            className="h-[480px] w-[380px] rounded-[190px] object-cover object-top max-md:h-[360px] max-md:w-full max-md:max-w-[300px]"
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

      {/* METHOD */}
      <Section>
        <div className="mb-14 text-center">
          <Eyebrow tone="clay">How the work works</Eyebrow>
          <H2 className="mb-3.5">Three things, done together</H2>
          <p className="mx-auto max-w-[56ch] text-base leading-[1.7] text-muted">
            Every program blends the same three threads. The difference is depth, length, and which door you walk in
            through.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
          {METHOD.map((m, i) => (
            <Card key={m.title}>
              <p className="mb-3 font-display text-[34px] text-clay">0{i + 1}</p>
              <p className="mb-2 font-display text-[25px] text-ink">{m.title}</p>
              <p className="text-[15px] leading-[1.7] text-body-3">{m.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* FLAGSHIP */}
      <Section tone="warm">
        <div className="mb-10 text-center">
          <Eyebrow>The signature program</Eyebrow>
          <H2>Where the name comes from</H2>
        </div>
        <FlagshipCard p={flagship} />
      </Section>

      {/* ALL PROGRAMS */}
      <Section>
        <div className="mb-14 text-center">
          <Eyebrow>Ways to work together</Eyebrow>
          <H2 className="mb-3.5">Find your doorway</H2>
          <p className="mx-auto max-w-[58ch] text-base leading-[1.7] text-muted">
            Eight programs, from a single session to a two-day intensive — listed from the lightest investment to the deepest.
            Many clients begin with a single session and move deeper when it feels right.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          {programs.map((p) => <ProgramCard key={p.slug} p={p} variant="compact" />)}
        </div>
        <p className="mt-10 text-center">
          <Link href="/programs" className="inline-block rounded-full bg-sage px-[26px] py-3.5 text-[15px] font-semibold text-linen hover:bg-sage-dark">
            Compare all 8 programs →
          </Link>
        </p>
      </Section>

      {/* MEET HADASSAH */}
      <Section tone="ink" className="grid grid-cols-[0.8fr_1.2fr] items-center gap-[72px] max-md:grid-cols-1 max-md:gap-8">
        <div className="flex justify-center">
          <ImageSlot
            src="/images/portrait-dark.jpg"
            alt={PRACTITIONER.name}
            label="Portrait of the practitioner on a dark backdrop"
            width={400}
            height={533}
            className="h-auto w-full max-w-[400px] rounded-[20px] object-cover object-top"
          />
        </div>
        <div>
          <Eyebrow tone="light">Meet {PRACTITIONER.name.split(" ")[0]}</Eyebrow>
          <H2 dark className="mb-6">{PRACTITIONER.title}</H2>
          <div className="flex flex-col gap-[18px] text-[16.5px] leading-[1.8] text-cream">
            {SHORT_BIO.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <Link href="/story" className="mt-8 inline-block text-[15px] font-semibold text-clay-light hover:text-cream-2">
            How I came to this work →
          </Link>
        </div>
      </Section>

      {/* VIDEO */}
      <Section width="mid" className="text-center">
        <Eyebrow tone="clay">A two-minute hello</Eyebrow>
        <H2 className="mb-4">Hear my voice before you book anything.</H2>
        <p className="mx-auto mb-10 max-w-[56ch] text-[16.5px] leading-[1.75] text-body-3">
          Coaching is a relationship of trust. Before you decide anything, listen to how I speak and how I hold a
          conversation — you&rsquo;ll know quickly whether this feels like a fit.
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

      {/* WHEN TALK ISN'T ENOUGH — the one place hypnosis is framed on the home page */}
      <Section tone="warm" className="grid grid-cols-[1fr_1fr] items-center gap-[72px] max-md:grid-cols-1 max-md:gap-8">
        <div>
          <Eyebrow tone="clay">When talk isn&rsquo;t enough</Eyebrow>
          <H2 className="mb-5">Go beneath the mind</H2>
          <p className="mb-5 text-[16.5px] leading-[1.75] text-body-3">
            Some patterns don&rsquo;t move through conversation alone. A BQH quantum healing session reaches the
            subconscious directly — a deeply relaxed state where you stay aware, speak the whole time, and put your own
            questions to the part of you that knows why the pattern is there.
          </p>
          <p className="text-[15px] text-muted">
            Curious what that looks like? <Link href="/session">Read the session, stage by stage</Link>.
          </p>
        </div>
        <ProgramCard p={bqh} variant="compact" dark />
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
            <CheckList items={FIT.yes} />
          </Card>
          <Card className="!p-10 max-md:!p-[26px]">
            <p className="mb-[22px] font-display text-[26px] text-clay">It isn&rsquo;t the right tool if…</p>
            <CheckList items={FIT.no} marker="dash" />
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

      {/* JOURNAL */}
      <Section tone="warm" width="mid">
        <div className="mb-12 text-center">
          <Eyebrow tone="clay">From the journal</Eyebrow>
          <H2>Read before you book</H2>
        </div>
        <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
          {[...JOURNAL]
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 3)
            .map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="flex flex-col gap-3 rounded-[18px] border border-rule bg-parchment p-8 no-underline hover:border-clay-light max-md:p-[26px]"
              >
                <span className="text-xs uppercase tracking-[0.16em] text-clay-dark">{post.tag}</span>
                <span className="font-display text-[23px] leading-tight text-ink">{post.title}</span>
                <span className="flex-1 text-sm leading-[1.7] text-body-3">{post.excerpt}</span>
              </Link>
            ))}
        </div>
        <p className="mt-10 text-center">
          <Link href="/journal" className="text-sm font-semibold">
            Read the journal →
          </Link>
        </p>
      </Section>

      {/* PRICING */}
      <Section width="narrow">
        <div className="mb-11 text-center">
          <Eyebrow tone="clay">No surprises</Eyebrow>
          <H2 className="mb-3.5">Pricing, plainly</H2>
          <p className="text-[15.5px] leading-[1.7] text-muted">
            Deep work takes real time. Here is exactly what everything costs.
          </p>
        </div>
        <div className="overflow-hidden rounded-[18px] border border-rule-2 bg-parchment">
          {PRICING_ROWS.map((row, i) => {
            const rowClass = `flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-8 py-5 max-md:px-5 max-md:py-4 ${
              i < PRICING_ROWS.length - 1 ? "border-b border-rule-4" : ""
            } ${row.highlight ? "bg-highlight" : ""}`;
            const priceClass = `font-bold ${
              row.price === "Free" ? "text-sage-dark" : row.highlight ? "text-lg text-clay-dark" : "text-body"
            }`;
            const inner = (
              <>
                <span className="text-[15.5px] text-body">{row.label}</span>
                <span className={priceClass}>{row.price}</span>
              </>
            );
            return row.href ? (
              <Link key={row.label} href={row.href} className={`${rowClass} no-underline hover:bg-highlight`}>
                {inner}
              </Link>
            ) : (
              <div key={row.label} className={rowClass}>
                {inner}
              </div>
            );
          })}
        </div>
        <p className="mt-[22px] text-center text-[13px] text-muted">
          Payment plans available — just ask on the discovery call. A deposit holds your place.
        </p>
      </Section>

      {/* CLOSING CTA */}
      <Section tone="ink" width="narrow" className="text-center !py-[104px]">
        <h2 className="mb-5 font-display text-[44px] font-medium leading-tight text-cream-2 max-md:text-[27px]">
          Start with fifteen minutes.
        </h2>
        <p className="mb-9 text-[17px] leading-[1.75] text-cream">
          Bring your questions — the practical ones and the strange ones. If this isn&rsquo;t the right work for you,
          I&rsquo;ll say so and point you somewhere better.
        </p>
        <BookingButton variant="sand">Book a free discovery call</BookingButton>
      </Section>
    </>
  );
}
