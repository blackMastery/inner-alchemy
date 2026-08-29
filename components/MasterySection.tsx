import ProgramCard from "./ProgramCard";
import { Section, H2 } from "./ui";
import type { Mastery } from "@/content/programs";

/** One area of mastery on the coaching page: heading plus its programs as cards. */
export default function MasterySection({ mastery, tone }: { mastery: Mastery; tone: "linen" | "warm" }) {
  return (
    <Section id={mastery.id} tone={tone} outerClassName="scroll-mt-32 max-md:scroll-mt-28" className="!py-16">
      <H2 className="mb-8">{mastery.name}</H2>
      <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
        {mastery.programs.map((p) => (
          <ProgramCard key={p.slug} p={p} />
        ))}
      </div>
    </Section>
  );
}
