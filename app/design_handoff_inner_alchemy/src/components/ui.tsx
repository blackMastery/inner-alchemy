import type { ReactNode } from "react";

/** Standard page band. tone controls the alternating background rhythm. */
export function Section({
  children,
  tone = "linen",
  width = "wide",
  className = "",
}: {
  children: ReactNode;
  tone?: "linen" | "warm" | "ink";
  width?: "wide" | "mid" | "narrow";
  className?: string;
}) {
  const tones = {
    linen: "bg-linen",
    warm: "bg-linen-warm border-y border-rule",
    ink: "bg-ink",
  } as const;
  const widths = { wide: "max-w-[1120px]", mid: "max-w-[880px]", narrow: "max-w-[760px]" } as const;
  return (
    <section className={tones[tone]}>
      <div className={`mx-auto ${widths[width]} px-8 py-24 max-md:px-[22px] max-md:py-16 ${className}`}>
        {children}
      </div>
    </section>
  );
}

/** Small uppercase kicker above a heading. */
export function Eyebrow({ children, tone = "sage" }: { children: ReactNode; tone?: "sage" | "clay" | "light" }) {
  const tones = { sage: "text-sage", clay: "text-clay", light: "text-clay-light" } as const;
  return (
    <p className={`mb-[18px] text-xs font-semibold uppercase tracking-[0.2em] ${tones[tone]}`}>{children}</p>
  );
}

export function H1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={`font-display text-[52px] font-medium leading-[1.15] text-ink text-pretty max-md:text-[34px] ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <h2 className={`font-display text-[40px] font-medium leading-tight max-md:text-[27px] ${dark ? "text-cream-2" : "text-ink"} ${className}`}>
      {children}
    </h2>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[18px] border border-rule bg-parchment p-9 max-md:p-[26px] ${className}`}>
      {children}
    </div>
  );
}
