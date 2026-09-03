import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Coaching Programs";

export default async function Image() {
  return ogImage({
    eyebrow: "Coaching Programs",
    title: "Life. Money. Business. Relationships. Spirit.",
    meta: "Twenty programs across five areas of mastery — from a 90-minute reset to a two-day private intensive.",
  });
}
