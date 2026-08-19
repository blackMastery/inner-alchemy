import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "What a session actually looks like";

export default async function Image() {
  return ogImage({ eyebrow: "The session, demystified", title: "What a session actually looks like", meta: "Hour by hour — including what happens if you don't go deep." });
}
