import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared Open Graph card renderer.
 *
 * ImageResponse renders with Satori, which cannot use next/font/google — it
 * needs real font buffers, and it does not parse WOFF2. The two faces are
 * therefore vendored as latin-subset WOFF under assets/fonts/.
 *
 * Layout: dark editorial card. Portrait on the right (its charcoal studio
 * backdrop dissolves into the ink ground), the gold emblem as a large
 * watermark behind the copy, brand lockup top-left, title and eyebrow in the
 * middle, practitioner name along the bottom.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Tokens are duplicated here as literals because Satori resolves no CSS
// variables. Keep in sync with the @theme block in app/globals.css.
const C = {
  ink: "#2E2A24",
  inkDeep: "#1E1B17",
  ink2: "#3A342C",
  cream: "#C9BFAE",
  cream2: "#F4EEE2",
  mutedDark: "#9A8F80",
  gold: "#D9AC62",
  goldSoft: "#C7A98F",
};

/** Satori cannot fetch from the running server, so assets are inlined. */
async function dataUrl(relPath: string, mime: string) {
  const buf = await readFile(join(process.cwd(), "public", ...relPath.split("/")));
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export async function ogFonts() {
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

/** Portrait column: 1200 × 630 card, photo occupies the right 540px. */
const PORTRAIT_W = 540;
/** Copy column stops well before the portrait so the title never runs under her face. */
const COPY_W = 566;

export async function ogImage({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  const [emblem, portrait] = await Promise.all([
    dataUrl("logos/emblem-on-dark.png", "image/png"),
    dataUrl("images/portrait-dark.jpg", "image/jpeg"),
  ]);

  const titleSize = title.length > 44 ? 56 : title.length > 26 ? 66 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(120deg, ${C.inkDeep} 0%, ${C.ink} 55%, ${C.ink2} 100%)`,
          fontFamily: "Karla",
          color: C.cream2,
        }}
      >
        {/* Emblem watermark behind the copy */}
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
        <img
          src={emblem}
          alt=""
          width={880}
          height={880}
          style={{
            position: "absolute",
            left: -200,
            top: -125,
            width: 880,
            height: 880,
            opacity: 0.13,
          }}
        />

        {/* Portrait, right column */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: PORTRAIT_W,
            height: OG_SIZE.height,
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
          <img
            src={portrait}
            alt=""
            width={PORTRAIT_W}
            height={OG_SIZE.height}
            style={{
              width: PORTRAIT_W,
              height: OG_SIZE.height,
              objectFit: "cover",
              objectPosition: "50% 12%",
            }}
          />
          {/* Dissolve the photo's left edge into the ink ground */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: PORTRAIT_W,
              height: OG_SIZE.height,
              background: `linear-gradient(90deg, ${C.ink} 0%, rgba(46,42,36,0.6) 20%, rgba(46,42,36,0) 50%)`,
            }}
          />
          {/* Soften the bottom so the card reads as one surface */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: PORTRAIT_W,
              height: OG_SIZE.height,
              background: `linear-gradient(180deg, rgba(46,42,36,0) 60%, rgba(30,27,23,0.75) 100%)`,
            }}
          />
        </div>

        {/* Gold hairline along the top */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: 6,
            background: `linear-gradient(90deg, ${C.gold} 0%, ${C.goldSoft} 60%, rgba(199,169,143,0) 100%)`,
          }}
        />

        {/* Copy column */}
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 0,
            width: COPY_W,
            height: OG_SIZE.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 0 56px",
          }}
        >
          {/* Brand lockup */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
            <img src={emblem} alt="" width={68} height={68} style={{ width: 68, height: 68 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "Cormorant",
                  fontSize: 34,
                  lineHeight: 1,
                  color: C.cream2,
                  letterSpacing: 1.5,
                }}
              >
                Inner Alchemy Institution
              </span>
              <span
                style={{
                  fontSize: 14,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: C.mutedDark,
                  marginTop: 8,
                }}
              >
                Coaching · Hypnotherapy · Online
              </span>
            </div>
          </div>

          {/* Eyebrow + title + meta */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div style={{ width: 36, height: 2, background: C.gold }} />
              <span
                style={{
                  fontSize: 18,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: C.gold,
                }}
              >
                {eyebrow}
              </span>
            </div>
            <div
              style={{
                fontFamily: "Cormorant",
                fontSize: titleSize,
                lineHeight: 1.06,
                color: C.cream2,
                letterSpacing: -0.5,
              }}
            >
              {title}
            </div>
            {meta && (
              <div style={{ fontSize: 22, lineHeight: 1.4, color: C.cream, marginTop: 22, maxWidth: COPY_W }}>
                {meta}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Cormorant", fontSize: 28, color: C.cream2, lineHeight: 1 }}>
                Hadassah Headley
              </span>
              <span style={{ fontSize: 15, letterSpacing: 2, color: C.mutedDark, marginTop: 7 }}>
                TRANSFORMATIONAL LIFE COACH · BQH / QHHT®
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
