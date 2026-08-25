import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared Open Graph card renderer.
 *
 * ImageResponse renders with Satori, which cannot use next/font/google — it
 * needs real font buffers, and it does not parse WOFF2. The two faces are
 * therefore vendored as latin-subset WOFF under assets/fonts/.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Tokens are duplicated here as literals because Satori resolves no CSS
// variables. Keep in sync with the @theme block in app/globals.css.
const C = {
  linen: "#FAF6EF",
  ink: "#2E2A24",
  body3: "#5C5347",
  muted: "#6E6558",
  clay: "#A96B4F",
  sage: "#64735C",
  rule: "#E7DECF",
};

async function fonts() {
  const dir = join(process.cwd(), "assets", "fonts");
  const [display, sans] = await Promise.all([
    readFile(join(dir, "cormorant-garamond-500.woff")),
    readFile(join(dir, "karla-600.woff")),
  ]);
  return [
    { name: "Cormorant", data: display, weight: 500 as const, style: "normal" as const },
    { name: "Karla", data: sans, weight: 600 as const, style: "normal" as const },
  ];
}

export async function ogImage({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: C.linen,
          padding: "72px 80px",
          fontFamily: "Karla",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "Cormorant", fontSize: 40, color: C.ink, letterSpacing: 1 }}>
            Inner
          </span>
          {/* The brand mark is ✦, which the latin font subset does not carry —
              it renders as tofu. Drawn as a shape instead. */}
          <span
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 10,
              background: C.clay,
            }}
          />
          <span style={{ fontFamily: "Cormorant", fontSize: 40, color: C.ink, letterSpacing: 1 }}>
            Alchemy
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: C.sage,
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: "Cormorant",
              fontSize: title.length > 54 ? 68 : 84,
              lineHeight: 1.1,
              color: C.ink,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
          {meta && (
            <div style={{ fontSize: 26, color: C.body3, marginTop: 28, maxWidth: 900 }}>{meta}</div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${C.rule}`,
            paddingTop: 24,
            fontSize: 22,
            color: C.muted,
          }}
        >
          <span>Hadassah Headley · Transformational life coach</span>
          <span>Free 15-minute discovery call</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
