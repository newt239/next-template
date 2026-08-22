import { ImageResponse } from "next/og";

import { SITE_NAME } from "#/lib/site";

export const alt = SITE_NAME;

export const size = { height: 630, width: 1200 };

export const contentType = "image/png";

const OpengraphImage = () =>
  new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0a0a0a",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column",
        fontSize: 72,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.03em",
        width: "100%",
      }}
    >
      <div style={{ fontWeight: 700 }}>{SITE_NAME}</div>
      <div style={{ color: "#a3a3a3", fontSize: 32, marginTop: 24 }}>
        App Router / Tailwind CSS / Drizzle / Better Auth
      </div>
    </div>,
    size,
  );

export default OpengraphImage;
