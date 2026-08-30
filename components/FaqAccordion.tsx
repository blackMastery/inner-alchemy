/** Native <details> accordion — no JS, keyboard-accessible, and the marker is styled in globals.css.
    Each question is a real <h3> so the answers read as a proper outline to crawlers and screen readers. */
export default function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.q} className="group border-b border-rule">
          <summary className="flex cursor-pointer justify-between gap-4 py-[22px] text-[17px] font-semibold text-ink">
            <h3 className="text-[17px] font-semibold">{item.q}</h3>
            <span aria-hidden="true" className="font-normal text-clay-dark transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mb-6 max-w-[62ch] text-[15.5px] leading-[1.8] text-body-3">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
