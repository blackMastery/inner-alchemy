import type { Metadata } from "next";
import Link from "next/link";
import BookingButton from "@/components/BookingButton";
import { Section, Eyebrow, H1 } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section width="narrow" className="text-center">
      <Eyebrow>404</Eyebrow>
      <H1 className="mb-5">That page isn&rsquo;t here.</H1>
      <p className="mx-auto mb-9 max-w-[48ch] text-[17px] leading-[1.75] text-body-3">
        It may have moved, or the link was typed wrong. Everything on this site is a step or two from the pages below.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <BookingButton />
        <Link href="/programs" className="text-[15px] font-semibold">
          See all programs →
        </Link>
      </div>
    </Section>
  );
}
