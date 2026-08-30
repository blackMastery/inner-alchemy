import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import { Section, Eyebrow, H1, H2, Card } from "@/components/ui";
import { CATEGORIES, COACHING, HYPNOTHERAPY, programHref } from "@/content/programs";
import { STATIC_PAGES } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(STATIC_PAGES.programs);

export default function ProgramsPage() {
  return (
    <>
      <Section width="mid" className="text-center !pb-14">
        <Eyebrow>Programs &amp; pricing</Eyebrow>
        <H1 className="mb-5">Programs</H1>
        <p className="mx-auto max-w-[60ch] text-[17px] leading-[1.8] text-body-3">
          Every program leads to the same place — remembering who you truly are and consciously creating from there.
          They differ in depth, length, and the life area they enter through. Not sure which fits? That&rsquo;s what the
          free call is for.
        </p>
      </Section>

      <section className="mx-auto max-w-[1120px] px-8 pb-20 max-md:px-[22px]">
        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          <Card className="flex flex-col">
            <Eyebrow tone="clay">{CATEGORIES.coaching.label}</Eyebrow>
            <H2 className="mb-6 !text-[32px]">Five areas of mastery</H2>
            <ul className="mb-8 flex flex-col gap-3">
              {COACHING.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`${CATEGORIES.coaching.href}#${m.id}`}
                    className="text-[16.5px] font-semibold text-ink hover:text-clay-dark"
                  >
                    {m.name}
                  </Link>
                  <span className="text-sm text-muted"> · {m.programs.length} programs</span>
                </li>
              ))}
            </ul>
            <Link href={CATEGORIES.coaching.href} className="mt-auto text-[15px] font-semibold">
              All coaching programs →
            </Link>
          </Card>

          <Card className="flex flex-col">
            <Eyebrow tone="clay">{CATEGORIES.hypnotherapy.label}</Eyebrow>
            <H2 className="mb-6 !text-[32px]">Three sessions</H2>
            <ul className="mb-8 flex flex-col gap-3">
              {HYPNOTHERAPY.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={programHref(p.slug)}
                    className="text-[16.5px] font-semibold text-ink hover:text-clay-dark"
                  >
                    {p.name}
                  </Link>
                  <span className="text-sm text-muted">
                    {" "}
                    · {p.duration} · {p.price}
                  </span>
                </li>
              ))}
            </ul>
            <Link href={CATEGORIES.hypnotherapy.href} className="mt-auto text-[15px] font-semibold">
              All hypnotherapy sessions →
            </Link>
          </Card>
        </div>
      </section>

      <Section tone="warm" width="narrow" className="text-center">
        <H2 className="mb-4">Not sure which doorway is yours?</H2>
        <p className="mb-[30px] text-base leading-[1.75] text-body-3">
          Tell me what&rsquo;s present in your life right now, and I&rsquo;ll tell you honestly which program fits — or
          whether a single session is the better start.
        </p>
        <BookingButton />
      </Section>
    </>
  );
}
