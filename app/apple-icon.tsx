import { ImageResponse } from "next/og";
import { ogFonts } from "@/components/og";

/* iOS home-screen / share-sheet icon: the "IA" monogram on ink, matching the OG cards. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2E2A24",
          color: "#FAF6EF",
          fontFamily: "Cormorant",
          fontSize: 96,
          letterSpacing: 2,
        }}
      >
        IA
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
