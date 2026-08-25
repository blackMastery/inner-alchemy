import type { ReactNode } from "react";
import type { ProgramStructure } from "@/content/programs";
import CheckList from "./CheckList";

/** Renders a programme's structure — weekly, phased, single-session or two-day. */
export default function Curriculum({ structure }: { structure: ProgramStructure }) {
  switch (structure.kind) {
    case "weekly":
      return (
        <div>
          {structure.intro && <p className="mb-6 max-w-[60ch] text-base leading-[1.75] text-muted">{structure.intro}</p>}
          {structure.weeks.map((w, i) => (
            <Row key={w.n} label={`Week ${w.n}`} last={i === structure.weeks.length - 1}>
              <h3 className="mb-1.5 text-lg font-bold text-ink">{w.title}</h3>
              <p className="text-[15.5px] leading-[1.75] text-body-3">{w.body}</p>
            </Row>
          ))}
        </div>
      );

    case "phased":
      return (
        <div>
          {structure.intro && <p className="mb-6 max-w-[60ch] text-base leading-[1.75] text-muted">{structure.intro}</p>}
          {structure.phases.map((ph, i) => (
            <Row key={ph.n} label={`Phase ${ph.n}`} sub={ph.weeks} last={i === structure.phases.length - 1}>
              <h3 className="mb-1 text-lg font-bold text-ink">{ph.title}</h3>
              {ph.subtitle && <p className="mb-3 font-display text-[21px] italic text-clay-dark">{ph.subtitle}</p>}
              <div className="flex flex-col gap-3 text-[15.5px] leading-[1.75] text-body-3">
                {ph.paragraphs.map((para) => <p key={para.slice(0, 32)}>{para}</p>)}
              </div>
              {ph.topics && <CheckList items={ph.topics} className="mt-4 !gap-2 !text-[14.5px]" />}
              {ph.outcome && (
                <p className="mt-4 border-l-2 border-sage-light pl-4 text-[15px] italic leading-[1.7] text-body-2">
                  <span className="not-italic font-semibold text-sage-dark">Outcome — </span>
                  {ph.outcome}
                </p>
              )}
            </Row>
          ))}
        </div>
      );

    case "days":
      return (
        <div>
          <p className="mb-8 max-w-[60ch] text-base leading-[1.75] text-muted">{structure.intro}</p>
          <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
            {structure.days.map((d) => (
              <div key={d.n} className="rounded-[18px] border border-rule bg-parchment p-9 max-md:p-[26px]">
                <p className="mb-1 font-display text-[30px] text-clay">Day {d.n}</p>
                <p className="mb-3 text-xs uppercase tracking-[0.12em] text-muted">{d.hours}</p>
                <h3 className="mb-3 text-lg font-bold text-ink">{d.title}</h3>
                <p className="mb-4 text-[15px] leading-[1.7] text-body-3">{d.intro}</p>
                <CheckList items={d.bullets} className="!gap-2 !text-[14.5px]" />
                {d.outcome && <p className="mt-5 text-[15px] font-semibold leading-[1.6] text-body">{d.outcome}</p>}
              </div>
            ))}
          </div>
        </div>
      );

    case "single-session":
      return (
        <div className="rounded-[18px] border border-rule-2 bg-linen-warm px-10 py-9 max-md:p-[26px]">
          <h3 className="mb-3 font-display text-2xl text-ink">{structure.title}</h3>
          <p className="mb-5 text-[15.5px] leading-[1.75] text-body-3">{structure.intro}</p>
          <CheckList items={structure.agenda} marker="clay" className="!gap-2.5 !text-[14.5px]" />
          {structure.note && <p className="mt-5 text-sm text-muted">{structure.note}</p>}
        </div>
      );

    default: {
      const never: never = structure;
      return never;
    }
  }
}

function Row({
  label,
  sub,
  last,
  children,
}: {
  label: string;
  sub?: string;
  last: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`grid grid-cols-[120px_1fr] gap-7 py-7 max-md:grid-cols-1 max-md:gap-2 ${last ? "" : "border-b border-rule"}`}>
      <div>
        <p className="font-display text-[26px] leading-tight text-clay max-md:text-[22px]">{label}</p>
        {sub && <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">{sub}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}
