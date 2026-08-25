/** The site's bulleted list: a ✦ (or an em-dash for the "not for you" column) before each line. */
export default function CheckList({
  items,
  marker = "sage",
  className = "",
}: {
  items: readonly string[];
  marker?: "sage" | "clay" | "dash";
  className?: string;
}) {
  const glyph = marker === "dash" ? "—" : "✦";
  const tone = { sage: "text-sage", clay: "text-clay", dash: "text-clay-pale" }[marker];
  return (
    <ul className={`flex flex-col gap-4 text-[15px] leading-[1.65] text-body-3 ${className}`}>
      {items.map((line) => (
        <li key={line} className="flex gap-3">
          <span aria-hidden="true" className={tone}>{glyph}</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}
