import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "How I came to this work";

export default async function Image() {
  return ogImage({ eyebrow: "About Hadassah Headley", title: "How I came to this work", meta: "I started from ground zero. Now my mission is to help others remember." });
}
