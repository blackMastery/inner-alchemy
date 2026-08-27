import { SITE } from "@/content/site";

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
  outline: "border border-rule-3 text-muted hover:border-clay hover:text-clay-dark",
} as const;

/** The site-wide call to action. Dials SITE.phone directly — no form in between. */
export default function BookingButton({
  children = "Book a free 15-minute call",
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  const pad = size === "sm" ? "px-[22px] py-[11px] text-[13.5px]" : "px-[30px] py-4 text-[15px]";
  return (
    <a
      href={SITE.phoneHref}
      className={`inline-block rounded-full font-semibold no-underline transition-colors whitespace-nowrap ${pad} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
