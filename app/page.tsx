import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import BookingButton from "@/components/BookingButton";
import CheckList from "@/components/CheckList";
import { Section, Eyebrow, H2, Card } from "@/components/ui";
import {
  SITE,
  PRACTITIONER,
  HOME_HERO,
  HOME_INTRO,
  SHORT_BIO,
  METHOD,
  TESTIMONIALS,
  FIT,
} from "@/content/site";
import { CATEGORIES, COACHING, HYPNOTHERAPY, programHref } from "@/content/programs";
import { STATIC_PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(STATIC_PAGES.home);

export default function HomePage() {
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
        <Image src="/logos/emblem-on-light.png" alt="" width={142} height={142} className="mx-auto mb-6 h-14 w-14" />
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
          Explore the programs →
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

      {/* TWO PATHS — coaching and hypnotherapy, each with its own page */}
      <Section tone="warm">
        <div className="mb-10 text-center">
          <Eyebrow>Where to begin</Eyebrow>
          <H2>Two paths in</H2>
        </div>
        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          <Card className="flex flex-col">
            <Eyebrow tone="clay">{CATEGORIES.coaching.label}</Eyebrow>
            <p className="mb-4 font-display text-[28px] leading-tight text-ink">Rebuild the pattern underneath it all.</p>
            <p className="mb-6 text-[15.5px] leading-[1.7] text-body-3">
              Private, one-to-one coaching across five areas of mastery — from a single 90-minute reset to a two-day
              in-person intensive.
            </p>
            <ul className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {COACHING.map((m) => (
                <li key={m.id}>
                  <Link href={`${CATEGORIES.coaching.href}#${m.id}`} className="text-body-2 hover:text-clay-dark">
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={CATEGORIES.coaching.href} className="mt-auto text-[15px] font-semibold">
              See the coaching programs →
            </Link>
          </Card>
          <Card className="flex flex-col">
            <Eyebrow tone="clay">{CATEGORIES.hypnotherapy.label}</Eyebrow>
            <p className="mb-4 font-display text-[28px] leading-tight text-ink">Go beneath the mind.</p>
            <p className="mb-6 text-[15.5px] leading-[1.7] text-body-3">
              Some patterns don&rsquo;t move through conversation alone. A quantum healing session reaches the
              subconscious directly — deeply relaxed, fully aware, speaking the whole time.{" "}
              <Link href="/session">Read the session, stage by stage</Link>.
            </p>
            <ul className="mb-8 flex flex-col gap-2 text-sm">
              {HYPNOTHERAPY.map((p) => (
                <li key={p.slug} className="flex justify-between gap-4">
                  <Link href={programHref(p.slug)} className="font-semibold text-body-2 hover:text-clay-dark">
                    {p.name}
                  </Link>
                  <span className="whitespace-nowrap font-bold text-clay-dark">{p.price}</span>
                </li>
              ))}
            </ul>
            <Link href={CATEGORIES.hypnotherapy.href} className="mt-auto text-[15px] font-semibold">
              See the hypnotherapy sessions →
            </Link>
          </Card>
        </div>
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
        <H2 className="mb-4">Before you book, hear this.</H2>
        <div className="mx-auto mb-10 flex max-w-[56ch] flex-col gap-4 text-[16.5px] leading-[1.75] text-body-3">
          <p>
            You&rsquo;re about to hand me access to the parts of your life you don&rsquo;t usually talk about. That
            deserves more than a bio and a price list.
          </p>
          <p>Press play. No pitch, no pressure — just two minutes to see if this feels right.</p>
        </div>
        {/* Replace with the real embed (Mux / YouTube / self-hosted). 16:9. */}
        <div className="relative mx-auto aspect-video max-w-[720px] overflow-hidden rounded-2xl bg-linen-warm">
          <ImageSlot
            alt={`${PRACTITIONER.name} — welcome video`}
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

    </>
  );
}
