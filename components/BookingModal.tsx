"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useBooking } from "./BookingContext";

type Errors = Partial<Record<"name" | "email" | "form", string>>;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/** Deliberately permissive — real deliverability is the backend's problem. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingModal() {
  const { isOpen, close } = useBooking();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const dismiss = useCallback(() => {
    close();
    setSent(false);
    setStatus("idle");
    setErrors({});
    setValues({ name: "", email: "", message: "" });
  }, [close]);

  // Remember what opened the modal so focus can go back there on close.
  useEffect(() => {
    if (isOpen) restoreFocusTo.current = document.activeElement as HTMLElement | null;
  }, [isOpen]);

  // Lock the page behind the modal. Without this the background scrolls under it.
  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  // Escape to close, and keep Tab inside the dialog.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, dismiss]);

  // Move focus into the dialog on open, and back out on close.
  useEffect(() => {
    if (isOpen) {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    } else {
      restoreFocusTo.current?.focus();
      restoreFocusTo.current = null;
    }
  }, [isOpen, sent]);

  if (!isOpen) return null;

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please tell me your name.";
    if (!values.email.trim()) next.email = "I need an email address to reply to.";
    else if (!EMAIL.test(values.email.trim())) next.email = "That doesn't look like an email address.";
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { errors?: Errors } | null;
        setErrors(body?.errors ?? { form: "Something went wrong. Please try again." });
        setStatus("idle");
        return;
      }
      setSent(true);
      setStatus("idle");
    } catch {
      // Network failure — keep everything the visitor typed.
      setErrors({ form: "Couldn't reach the server. Check your connection and try again." });
      setStatus("idle");
    }
  };

  const field =
    "w-full rounded-[10px] border border-rule-3 bg-parchment px-4 py-3.5 text-[15px] text-body outline-none focus:border-clay";
  const invalid = "border-clay-dark";
  const errorText = "text-[13px] text-clay-dark";

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-ink/55 p-6"
      onClick={dismiss}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative box-border max-h-[90vh] w-full max-w-[520px] overflow-auto rounded-[22px] bg-linen px-12 py-11 max-md:px-[22px] max-md:py-[34px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-6 top-5 cursor-pointer text-[22px] text-muted hover:text-body"
        >
          ×
        </button>

        {!sent ? (
          <>
            <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
              Free · 15 minutes · no obligation
            </p>
            <h2 id="booking-modal-title" className="mb-2.5 font-display text-[32px] font-medium text-ink">
              Book a discovery call
            </h2>
            <p className="mb-7 text-[14.5px] leading-relaxed text-muted">
              Tell me a little about what&rsquo;s bringing you here, and I&rsquo;ll reply within one business day
              with times to talk.
            </p>

            <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="booking-name" className="sr-only">Your name</label>
                <input
                  id="booking-name"
                  name="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "booking-name-error" : undefined}
                  className={`${field} ${errors.name ? invalid : ""}`}
                />
                {errors.name && (
                  <p id="booking-name-error" className={errorText}>{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="booking-email" className="sr-only">Email</label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "booking-email-error" : undefined}
                  className={`${field} ${errors.email ? invalid : ""}`}
                />
                {errors.email && (
                  <p id="booking-email-error" className={errorText}>{errors.email}</p>
                )}
              </div>

              <label htmlFor="booking-message" className="sr-only">
                What&rsquo;s drawing you to this work?
              </label>
              <textarea
                id="booking-message"
                name="message"
                rows={4}
                placeholder="What's drawing you to this work? (optional — a sentence is plenty)"
                value={values.message}
                onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                className={`${field} resize-y`}
              />

              {errors.form && (
                <p role="alert" className={errorText}>{errors.form}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="cursor-pointer rounded-full bg-clay py-[15px] text-[15px] font-semibold text-linen hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "Sending…" : "Request my call"}
              </button>
              <p className="text-center text-xs text-muted">
                Programs and sessions are booked after we&rsquo;ve spoken.
              </p>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <p aria-hidden="true" className="mb-4 text-3xl text-sage">✦</p>
            <h2 id="booking-modal-title" className="mb-3 font-display text-3xl font-medium text-ink">
              Received. Breathe easy.
            </h2>
            <p className="mb-7 text-[15px] leading-relaxed text-muted">
              I&rsquo;ll be in touch within one business day with a few times to talk. In the meantime, the{" "}
              <Link href="/programs" onClick={dismiss} className="border-b border-clay-pale">
                programs page
              </Link>{" "}
              answers most questions.
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="cursor-pointer rounded-full border border-rule-3 px-[26px] py-3 text-sm font-semibold text-muted hover:border-clay hover:text-clay-dark"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
