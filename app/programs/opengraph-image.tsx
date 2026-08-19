import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Eight doorways. One destination.";

export default async function Image() {
  return ogImage({ eyebrow: "Coaching & healing programs", title: "Eight doorways. One destination.", meta: "From a 90-minute Power Reset to a two-day private intensive." });
}
