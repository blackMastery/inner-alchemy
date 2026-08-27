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
  HOME_INTRO,
  SHORT_BIO,
  METHOD,
  PRICING_ROWS,
  TESTIMONIALS,
  FIT,
} from "@/content/site";
import { FLAGSHIP_SLUG, programBySlug } from "@/content/programs";

export default function HomePage() {
  const flagship = programBySlug(FLAGSHIP_SLUG)!;
  const bqh = programBySlug("beyond-the-mind")!;

  // Testimonials stay out of the DOM entirely until written consent is on file.
  const showTestimonials = SITE.testimonialsApproved && TESTIMONIALS.length > 0;

  return (
    <>
      {/* HERO */}
      <Section className="grid grid-cols-[1.15fr_0.85fr] items-center gap-[72px] !pb-[88px] !pt-[104px] max-md:grid-cols-1 max-md:gap-8">
        <div>
          <Eyebrow>{HOME_HERO.eyebrow}</Eyebrow>
          <h1 className="mb-7 font-display text-ink">
            {HOME_HERO.headline.map((line) => (
              <span key={line} className="block text-[60px] font-medium leading-[1.04] tracking-[-0.01em] max-md:text-[38px]">
                {line}
              </span>
            ))}
            <span className="mt-5 block max-w-[26ch] text-[30px] font-normal italic leading-[1.25] text-clay-dark max-md:mt-3 max-md:text-[23px]">
              {HOME_HERO.subline}
            </span>
          </h1>
          <p className="mb-8 max-w-[44ch] text-[17px] leading-[1.7] text-body-3">{HOME_HERO.body}</p>
          <BookingButton>{HOME_HERO.cta}</BookingButton>
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

      {/* INTRO */}
      <Section width="mid" className="text-center !py-20">
        <Eyebrow>{HOME_INTRO.eyebrow}</Eyebrow>
        <div className="mx-auto flex max-w-[58ch] flex-col gap-5 text-[19px] leading-[1.7] text-body-3 max-md:text-[17px]">
          {HOME_INTRO.paragraphs.map((text, i) => (
            <p key={text.slice(0, 24)} className={i === 0 ? "font-display text-[28px] leading-[1.3] text-ink max-md:text-[24px]" : ""}>
              {text}
            </p>
          ))}
        </div>
        <Link
          href="/programs"
          className="mt-8 inline-block border-b border-sage-light pb-0.5 text-[15px] font-semibold text-sage-dark hover:text-ink"
        >
          Explore the eight programs →
        </Link>
      </Section>

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
