import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

/* Web app manifest — Android home-screen icons, install name and colours. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Inner Alchemy",
    description: "Transformational life coaching and BQH/QHHT® quantum healing sessions with Hadassah Headley.",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#FAF6EF",
    theme_color: "#FAF6EF",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
