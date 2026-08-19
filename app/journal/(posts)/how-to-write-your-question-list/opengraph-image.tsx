import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "How to write your question list";

export default async function Image() {
  return ogImage({
    eyebrow: "Preparing",
    title: "How to write your question list",
    meta: "Half the session is built from the list you bring.",
  });
}
