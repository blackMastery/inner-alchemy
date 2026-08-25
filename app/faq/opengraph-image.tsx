import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Questions & honest answers";

export default async function Image() {
  return ogImage({ eyebrow: "Everything people ask", title: "Questions & honest answers", meta: "Coaching formats, support between sessions, hypnosis, and what this is not." });
}
