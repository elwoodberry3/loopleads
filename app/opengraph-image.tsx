import { ImageResponse } from "next/og";

export const alt = "LoopLeads — Stop losing leads when you miss a call.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1C2333", padding: 72, color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
          <span style={{ color: "#E07A40" }}>LOOP</span>
          <span style={{ color: "#F6F4EF" }}>LEADS</span>
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>
          Stop losing leads when you miss a call.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", background: "#E07A40", color: "#121627", borderRadius: 12, padding: "16px 26px", fontSize: 30, fontWeight: 700 }}>
            New estimate request — (555) 010-XXXX
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#DAD4BE" }}>Missed-call lead recovery for junk removal crews</div>
        </div>
      </div>
    ),
    size,
  );
}
