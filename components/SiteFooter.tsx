import Image from "next/image";
import Link from "next/link";
import BookingButton from "./BookingButton";
import { SITE } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink-2 bg-ink">
      <div className="mx-auto max-w-[1120px] px-8 pb-10 pt-16 max-md:px-[22px]">
        <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-12 border-b border-rule/15 pb-10 max-md:grid-cols-1 max-md:gap-8">
          <div>
            <Image src="/logos/emblem-on-dark.png" alt="" width={142} height={142} className="mb-4 h-14 w-14" />
            <p className="mb-1.5 font-display text-2xl text-cream-2">Inner Alchemy Institution</p>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-cream">
              Life Coaching &amp; Hypnotherapy Services
            </p>
            <p className="max-w-[40ch] text-[13px] leading-relaxed text-cream">
              Transformational life coaching and hypnotherapy sessions, online worldwide. {SITE.location}.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <p className="mb-1 text-[11px] uppercase tracking-[0.16em] text-cream">Explore</p>
            <Link href="/programs" className="text-cream hover:text-cream-2">All programs</Link>
            <Link href="/programs/coaching" className="text-cream hover:text-cream-2">Coaching programs</Link>
            <Link href="/programs/hypnotherapy" className="text-cream hover:text-cream-2">Hypnotherapy sessions</Link>
            <Link href="/session" className="text-cream hover:text-cream-2">What a session looks like</Link>
            <Link href="/faq" className="text-cream hover:text-cream-2">FAQ</Link>
            <Link href="/story" className="text-cream hover:text-cream-2">How I came to this work</Link>
          </div>

          <div className="flex flex-col items-start gap-3 text-sm">
            <p className="mb-1 text-[11px] uppercase tracking-[0.16em] text-cream">Begin</p>
            <BookingButton variant="sand" size="sm">Book a free discovery call</BookingButton>
            <a
              href={SITE.bookingFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-cream-2"
            >
              Book a program (form)
            </a>
            <address className="flex flex-col items-start gap-3 not-italic">
              <a href={SITE.phoneHref} className="text-cream hover:text-cream-2">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="text-cream hover:text-cream-2">
                {SITE.email}
              </a>
              <span className="text-cream">{SITE.location} · sessions online worldwide</span>
            </address>
          </div>
        </div>

        <p className="mt-7 max-w-[90ch] text-xs leading-[1.8] text-cream">
          Hypnotherapy and coaching are complementary practices. They are not a substitute for medical or mental
          health care, and nothing on this site is a diagnosis, treatment, or medical claim. If you are in crisis,
          please contact a licensed professional or your local crisis line. QHHT® and Quantum Healing Hypnosis
          Technique℠ are trademarks of their respective owner; this practitioner is independently certified.
        </p>

        {/* Discovery files for crawlers and AI agents — linked, because agents find them through links, not by guessing paths. */}
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-cream/80">
          <a href="/sitemap.xml" className="text-cream/80 hover:text-cream-2">Sitemap</a>
          <a href="/llms.txt" className="text-cream/80 hover:text-cream-2">llms.txt</a>
          <a href="/llms-full.txt" className="text-cream/80 hover:text-cream-2">Full site as Markdown</a>
        </p>
      </div>
    </footer>
  );
}
