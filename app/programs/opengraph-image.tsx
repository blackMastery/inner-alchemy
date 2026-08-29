import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Coaching & Hypnotherapy Programs";

export default async function Image() {
  return ogImage({
    eyebrow: "Programs & pricing",
    title: "Coaching & Hypnotherapy Programs",
    meta: "Two paths in — coaching across five areas of mastery, and BQH/QHHT® hypnotherapy sessions.",
  });
}
