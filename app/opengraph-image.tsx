import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Remember who you truly are.";

export default async function Image() {
  return ogImage({ eyebrow: "Transformational life coaching · online", title: "Remember who you truly are.", meta: "Identity transformation, subconscious healing, and practical manifestation." });
}
