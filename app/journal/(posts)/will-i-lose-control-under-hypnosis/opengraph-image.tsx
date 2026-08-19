import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Will I lose control under hypnosis?";

export default async function Image() {
  return ogImage({
    eyebrow: "Before you book",
    title: "Will I lose control under hypnosis?",
    meta: "The single most common reason people don't book.",
  });
}
