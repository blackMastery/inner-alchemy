import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "What if nothing happens for me?";

export default async function Image() {
  return ogImage({
    eyebrow: "During the session",
    title: "What if nothing happens for me?",
    meta: "An honest answer to the fear underneath the booking: that you'll be the one it doesn't work for.",
  });
}
