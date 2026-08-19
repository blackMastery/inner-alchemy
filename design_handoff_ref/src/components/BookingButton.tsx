"use client";

import { useBooking } from "./BookingContext";

type Props = {
  children?: React.ReactNode;
  variant?: "primary" | "sage" | "sand" | "outline";
  size?: "sm" | "md";
  className?: string;
};

const variants = {
  primary: "bg-clay text-linen hover:bg-clay-dark",
  sage: "bg-sage text-linen hover:bg-sage-dark",
  sand: "bg-sand text-ink hover:bg-cream-2",
  outline: "border border-rule-3 text-muted hover:border-clay hover:text-clay",
} as const;

export default function BookingButton({
  children = "Book a free 15-minute call",
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  const { open } = useBooking();
  const pad = size === "sm" ? "px-[22px] py-[11px] text-[13.5px]" : "px-[30px] py-4 text-[15px]";
  return (
    <button
      type="button"
      onClick={open}
      className={`rounded-full font-semibold cursor-pointer transition-colors ${pad} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
