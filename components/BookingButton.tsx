import { SITE } from "@/content/site";

type Props = {
  children?: React.ReactNode;
  /** `call` dials SITE.phone; `program` opens the booking form in a new tab. */
  kind?: "call" | "program";
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

const kinds = {
  call: { href: SITE.phoneHref, label: "Book a free 15-minute call", external: false },
  program: { href: SITE.bookingFormUrl, label: "Book a program", external: true },
} as const;

/** The site-wide calls to action: a `tel:` link for the discovery call, or the program booking form. */
export default function BookingButton({
  children,
  kind = "call",
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  const { href, label, external } = kinds[kind];
  const pad = size === "sm" ? "px-[22px] py-[11px] text-[13.5px]" : "px-[30px] py-4 text-[15px]";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-block rounded-full font-semibold no-underline transition-colors whitespace-nowrap ${pad} ${variants[variant]} ${className}`}
    >
      {children ?? label}
    </a>
  );
}
