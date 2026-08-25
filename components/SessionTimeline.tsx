import { SESSION_TIMELINE } from "@/content/site";

/** The quantum healing session, stage by stage. */
export default function SessionTimeline() {
  return (
    <div>
      {SESSION_TIMELINE.map((step, i) => (
        <div
          key={step.title}
          className={`grid grid-cols-[150px_1fr] gap-7 py-8 max-md:grid-cols-1 max-md:gap-2 ${
            i < SESSION_TIMELINE.length - 1 ? "border-b border-rule" : ""
          }`}
        >
          <p className="font-display text-[26px] leading-tight text-clay max-md:text-[22px]">{step.span}</p>
          <div>
            <h3 className="mb-2 text-lg font-bold text-ink">{step.title}</h3>
            <p className="text-[15.5px] leading-[1.75] text-body-3">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
