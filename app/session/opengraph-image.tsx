import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "What a quantum healing session looks like";

export default async function Image() {
  return ogImage({ eyebrow: "The session, demystified", title: "What a quantum healing session looks like", meta: "Stage by stage — including what happens if you don't go deep." });
}
