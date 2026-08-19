import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "QHHT® sessions, in person";

export default async function Image() {
  return ogImage({ eyebrow: "QHHT® · Quantum Healing Hypnosis", title: "QHHT® sessions, in person", meta: "A full 4–6 hour session, with the recording to keep." });
}
