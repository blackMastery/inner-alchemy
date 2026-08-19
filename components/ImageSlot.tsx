import Image from "next/image";

/**
 * A photography slot that holds its exact layout before the real photo exists.
 *
 * Three of the four image slots in the design are still placeholders. Rather
 * than ship broken <Image> requests or reflow the page around missing art, this
 * renders a tokenized block at the intended dimensions with a caption naming
 * what belongs there. Supplying `src` swaps in the real photo — no other change.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  width,
  height,
  className = "",
  fill = false,
  priority = false,
}: {
  /** Set once the real asset lands in public/images/. */
  src?: string;
  alt: string;
  /** Shown in the placeholder state — describes the photo that goes here. */
  label: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  if (src) {
    return fill ? (
      <Image src={src} alt={alt} fill priority={priority} className={className} />
    ) : (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`flex flex-col items-center justify-center gap-2 border border-dashed border-rule-3 bg-parchment-2 p-6 text-center ${
        fill ? "absolute inset-0" : ""
      } ${className}`}
    >
      <span aria-hidden="true" className="font-display text-[26px] text-clay-light">
        ✦
      </span>
      <span className="max-w-[28ch] text-[13px] leading-relaxed text-muted">{label}</span>
      {width && height && (
        <span className="text-xs uppercase tracking-[0.16em] text-muted">
          {width}×{height}
        </span>
      )}
    </div>
  );
}
