import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";
import { CATEGORIES, PROGRAM_PAGES, categoryOf, masteryOf, programBySlug } from "@/content/programs";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Program";

export function generateStaticParams() {
  return PROGRAM_PAGES.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program || program.pageOf) {
    return ogImage({ eyebrow: "Programs & pricing", title: "Coaching & Hypnotherapy Programs" });
  }
  const mastery = masteryOf(slug);
  const eyebrow = mastery ? `${CATEGORIES.coaching.label} · ${mastery.name}` : CATEGORIES[categoryOf(slug)].label;
  const price = program.priceNote ? `${program.price} ${program.priceNote}` : program.price;
  return ogImage({ eyebrow, title: program.name, meta: `${price} · ${program.duration}` });
}
