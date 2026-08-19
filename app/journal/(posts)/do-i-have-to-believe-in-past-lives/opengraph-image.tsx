import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Do I have to believe in past lives for this to work?";

export default async function Image() {
  return ogImage({
    eyebrow: "Before you book",
    title: "Do I have to believe in past lives for this to work?",
    meta: "No \u2014 and skeptics often have the most striking sessions.",
  });
}
