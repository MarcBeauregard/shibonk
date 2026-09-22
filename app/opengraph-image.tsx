import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { token } from "@/config/token";

export const dynamic = "force-static";
export const alt = `${token.name} ($${token.ticker}) — ${token.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [bagel, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/BagelFatOne-Regular.ttf")),
    readFile(join(process.cwd(), "public/brand/shibonk-token-512.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 80px",
          background: "#9ed8ff",
          backgroundImage: "radial-gradient(rgba(29,20,38,.14) 2px, transparent 2.4px)",
          backgroundSize: "18px 18px",
          fontFamily: "Bagel",
          color: "#1d1426",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={logoSrc} width={420} height={420} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#1d1426",
              color: "#ffd23f",
              fontSize: 30,
              padding: "10px 18px",
              borderRadius: 10,
            }}
          >
            ${token.ticker} · SOLANA
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 108, lineHeight: 0.92, marginTop: 24 }}>
            <span>One bonk</span>
            <span style={{ color: "#fff8ec", textShadow: "6px 6px 0 #ff8a1f, -3px -3px 0 #1d1426, 3px -3px 0 #1d1426, -3px 3px 0 #1d1426, 3px 3px 0 #1d1426" }}>
              at a time.
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bagel", data: bagel, style: "normal", weight: 400 }] }
  );
}
