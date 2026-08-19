"use client";

import { useState } from "react";
import Link from "next/link";
import { useBooking } from "./BookingContext";

export default function BookingModal() {
  const { isOpen, close } = useBooking();
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const field =
    "w-full rounded-[10px] border border-rule-3 bg-parchment px-4 py-3.5 text-[15px] text-body outline-none focus:border-clay";

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-ink/55 p-6"
      onClick={() => { close(); setSent(false); }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative box-border max-h-[90vh] w-full max-w-[520px] overflow-auto rounded-[22px] bg-linen px-12 py-11 max-md:px-[22px] max-md:py-[34px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => { close(); setSent(false); }}
          aria-label="Close"
          className="absolute right-6 top-5 cursor-pointer text-[22px] text-muted-2 hover:text-body"
        >
          ×
        </button>

        {!sent ? (
          <>
            <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              Free · 15 minutes · no obligation
            </p>
            <h2 className="mb-2.5 font-display text-[32px] font-medium text-ink">Book a discovery call</h2>
            <p className="mb-7 text-[14.5px] leading-relaxed text-muted">
              Tell me a little about what&rsquo;s bringing you here, and I&rsquo;ll reply within one business day
              with times to talk.
            </p>
            {/* TODO: wire to a real handler — Resend/Formspree/route handler + calendar (Cal.com / Calendly). */}
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <input required placeholder="Your name" className={field} />
              <input required type="email" placeholder="Email" className={field} />
              <textarea
                rows={4}
                placeholder="What's drawing you to this work? (optional — a sentence is plenty)"
                className={`${field} resize-y`}
              />
              <button
                type="submit"
                className="cursor-pointer rounded-full bg-clay py-[15px] text-[15px] font-semibold text-linen hover:bg-clay-dark"
              >
                Request my call
              </button>
              <p className="text-center text-xs text-muted-2">
                Deep sessions are booked as long blocks, after we&rsquo;ve spoken.
              </p>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <p className="mb-4 text-3xl text-sage">✦</p>
            <h2 className="mb-3 font-display text-3xl font-medium text-ink">Received. Breathe easy.</h2>
            <p className="mb-7 text-[15px] leading-relaxed text-muted">
              I&rsquo;ll be in touch within one business day with a few times to talk. In the meantime, the{" "}
              <Link href="/session" onClick={() => { close(); setSent(false); }} className="border-b border-clay-pale">
                session walkthrough
              </Link>{" "}
              answers most questions.
            </p>
            <button
              type="button"
              onClick={() => { close(); setSent(false); }}
              className="cursor-pointer rounded-full border border-rule-3 px-[26px] py-3 text-sm font-semibold text-muted hover:border-clay hover:text-clay"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
