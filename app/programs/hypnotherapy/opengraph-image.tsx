import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Hypnotherapy Programs";

export default async function Image() {
  return ogImage({
    eyebrow: "Hypnotherapy Programs",
    title: "BQH, QHHT®, or both.",
    meta: "Three quantum healing hypnosis sessions — online and in person.",
  });
}
