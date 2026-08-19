import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Some patterns don't come from this life.";

export default async function Image() {
  return ogImage({ eyebrow: "BQH · QHHT® · Coaching — online", title: "Some patterns don't come from this life.", meta: "Deep, gentle regression sessions. You stay aware the whole time." });
}
