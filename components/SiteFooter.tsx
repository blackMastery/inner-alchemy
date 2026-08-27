import Link from "next/link";
import BookingButton from "./BookingButton";
import { SITE } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink-2 bg-ink">
      <div className="mx-auto max-w-[1120px] px-8 pb-10 pt-16 max-md:px-[22px]">
        <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-12 border-b border-rule/15 pb-10 max-md:grid-cols-1 max-md:gap-8">
          <div>
            <p className="mb-1.5 font-display text-2xl text-cream-2">
              Inner <span aria-hidden="true" className="text-sm text-clay-light">✦</span> Alchemy
            </p>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-cream">
              Institution · Life Coaching &amp; Hypnotherapy Services
            </p>
            <p className="max-w-[40ch] text-[13px] leading-relaxed text-cream">
              Transformational life coaching and quantum healing sessions, online worldwide. {SITE.location}.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <p className="mb-1 text-[11px] uppercase tracking-[0.16em] text-cream">Explore</p>
            <Link href="/programs" className="text-cream hover:text-cream-2">Programs &amp; pricing</Link>
            <Link href="/programs/beyond-the-mind" className="text-cream hover:text-cream-2">Quantum healing sessions</Link>
            <Link href="/session" className="text-cream hover:text-cream-2">What a session looks like</Link>
            <Link href="/faq" className="text-cream hover:text-cream-2">FAQ</Link>
            <Link href="/journal" className="text-cream hover:text-cream-2">Journal</Link>
            <Link href="/story" className="text-cream hover:text-cream-2">How I came to this work</Link>
          </div>

          <div className="flex flex-col items-start gap-3 text-sm">
            <p className="mb-1 text-[11px] uppercase tracking-[0.16em] text-cream">Begin</p>
            <BookingButton variant="sand" size="sm">Book a free discovery call</BookingButton>
            <a href={SITE.phoneHref} className="text-cream hover:text-cream-2">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="text-cream hover:text-cream-2">
              {SITE.email}
            </a>
          </div>
        </div>

        <p className="mt-7 max-w-[90ch] text-xs leading-[1.8] text-cream">
          Hypnotherapy and coaching are complementary practices. They are not a substitute for medical or mental
          health care, and nothing on this site is a diagnosis, treatment, or medical claim. If you are in crisis,
          please contact a licensed professional or your local crisis line. QHHT® and Quantum Healing Hypnosis
          Technique℠ are trademarks of their respective owner; this practitioner is independently certified.
          <em> [Have final copy reviewed by a lawyer or the certifying body before launch.]</em>
        </p>
      </div>
    </footer>
  );
}
