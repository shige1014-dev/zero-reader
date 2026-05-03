import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "黑科技谱系 · BLACK TECH 2076";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "radial-gradient(circle at 78% 36%, rgba(212,182,112,0.22), transparent 28%), linear-gradient(135deg, #1A1612 0%, #14110D 62%, #0E0C0A 100%)",
          color: "#F5EFE3",
          fontFamily: "serif"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 40
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#D4B670",
                fontSize: 22,
                letterSpacing: 8,
                fontFamily: "monospace"
              }}
            >
              BLACK TECH 2076
            </div>
            <div
              style={{
                marginTop: 36,
                fontSize: 104,
                lineHeight: 0.98,
                fontWeight: 700
              }}
            >
              黑科技谱系
            </div>
            <div
              style={{
                marginTop: 28,
                color: "#D4B670",
                fontSize: 28,
                letterSpacing: 4
              }}
            >
              军方先用 · 民用后到 · 从黑箱到日常
            </div>
          </div>

          <div
            style={{
              width: 260,
              height: 260,
              borderRadius: 260,
              border: "2px solid rgba(212,182,112,0.36)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(circle, rgba(212,182,112,0.18), transparent 58%), conic-gradient(from 220deg, rgba(212,182,112,0.38), transparent 35%, rgba(157,168,196,0.16))"
            }}
          >
            <div
              style={{
                color: "#E8C880",
                fontFamily: "monospace",
                fontSize: 18,
                letterSpacing: 6,
                textAlign: "center",
                lineHeight: 1.5
              }}
            >
              TECH
              <br />
              SCAN
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 18,
            color: "#C9BFA8",
            fontSize: 24,
            fontFamily: "monospace"
          }}
        >
          <span>14 SIGNALS</span>
          <span>8 OPEN</span>
          <span>3 GRAY</span>
          <span>3 RUMOR</span>
        </div>
      </div>
    ),
    size
  );
}
