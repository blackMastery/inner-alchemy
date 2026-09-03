import Link from "next/link";

import { SITE } from "@/content/site";

type Props = {
  children?: React.ReactNode;
  /** `book` links to the programs page; `program` opens the booking form in a new tab. */
  kind?: "book" | "program";
  variant?: "primary" | "sage" | "sand" | "outline";
  size?: "sm" | "md";
  className?: string;
  /** Only from client components — the mobile nav uses it to close the drawer. */
  onClick?: () => void;
};

const variants = {
  primary: "bg-clay text-linen hover:bg-clay-dark",
  sage: "bg-sage text-linen hover:bg-sage-dark",
  sand: "bg-sand text-ink hover:bg-cream-2",
  outline: "border border-rule-3 text-muted hover:border-clay hover:text-clay-dark",
} as const;

const kinds = {
  book: { href: "/programs", label: "Book Now" },
  program: { href: SITE.bookingFormUrl, label: "Book a program" },
} as const;

/** The site-wide calls to action: the programs page, or the program booking form. */
export default function BookingButton({
  children,
  kind = "book",
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: Props) {
  const { href, label } = kinds[kind];
  const pad = size === "sm" ? "px-[22px] py-[11px] text-[13.5px]" : "px-[30px] py-4 text-[15px]";
  const classes = `inline-block rounded-full font-semibold no-underline transition-colors whitespace-nowrap ${pad} ${variants[variant]} ${className}`;
  const body = children ?? label;

  return kind === "book" ? (
    <Link href={href} onClick={onClick} className={classes}>
      {body}
    </Link>
  ) : (
    <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" className={classes}>
      {body}
    </a>
  );
}
