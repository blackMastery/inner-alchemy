import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "The questions people ask first";

export default async function Image() {
  return ogImage({ eyebrow: "Journal", title: "The questions people ask first", meta: "Longer answers to what comes up before anyone books." });
}
