import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";
import { PROGRAMS, TIER_LABELS } from "@/content/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Inner Alchemy Institution program";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) {
    return ogImage({ eyebrow: "Programs", title: "Eight doorways. One destination." });
  }
  return ogImage({
    eyebrow: TIER_LABELS[program.tier],
    title: program.name,
    meta: `${program.price} · ${program.duration}`,
  });
}
