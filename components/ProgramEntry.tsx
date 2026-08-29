import BookingButton from "./BookingButton";
import CheckList from "./CheckList";
import RichText from "./RichText";
import type { Program } from "@/content/programs";

/** The full program: header, copy, structure, "for you if", and the CTA. Used on /programs/<slug>. */
export default function ProgramEntry({ p }: { p: Program }) {
  return (
    <article className="rounded-[18px] border border-rule bg-parchment p-[38px] max-md:p-[26px]">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-display text-[30px] leading-tight text-ink max-md:text-[25px]">{p.name}</h3>
        <p className="flex flex-wrap items-baseline gap-x-2.5 text-[15px] text-body-3">
          <span className="text-[12.5px] uppercase tracking-[0.1em] text-sage-dark">{p.duration}</span>
          <span className="text-muted" aria-hidden="true">·</span>
          <span className="font-bold text-clay-dark">
            {p.price}
            {p.priceNote && <span className="font-normal text-muted"> {p.priceNote}</span>}
          </span>
          {p.format === "in-person" && (
            <>
              <span className="text-muted" aria-hidden="true">·</span>
              <span className="text-[12.5px] uppercase tracking-[0.1em] text-sage-dark">In person</span>
            </>
          )}
        </p>
      </div>

      <div className="flex max-w-[64ch] flex-col gap-4 text-[16px] leading-[1.75] text-body-3">
        {p.paragraphs.map((text) => (
          <RichText key={text.slice(0, 32)} text={text} />
        ))}
        {p.idealFor && (
          <p className="text-[15.5px] italic text-body-2">
            <span className="not-italic font-semibold text-ink">Ideal for:</span> {p.idealFor}
          </p>
        )}
      </div>

      {p.structure && (
        <div className="mt-7">
          <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-clay-dark">{p.structure.heading}</h4>
          <ol className="flex flex-col gap-4">
            {p.structure.steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[44px_1fr] gap-3 max-md:grid-cols-[36px_1fr]">
                <span className="font-display text-[28px] leading-none text-clay">0{i + 1}</span>
                <div>
                  <p className="mb-1 font-semibold text-ink">{step.title}</p>
                  <p className="text-[15px] leading-[1.7] text-body-3">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {p.forYouIf && (
        <div className="mt-7">
          <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-clay-dark">This is for you if</h4>
          <CheckList items={p.forYouIf} className="!gap-3 !text-[15px]" />
        </div>
      )}

      <div className="mt-8">
        <BookingButton>Book a free 15-minute call</BookingButton>
      </div>
    </article>
  );
}
