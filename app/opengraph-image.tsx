import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "One decision. A completely different life.";

export default async function Image() {
  return ogImage({ eyebrow: "Transformational life coaching", title: "One decision.\nA completely\ndifferent life.", meta: "Identity transformation, subconscious healing, and practical manifestation." });
}
