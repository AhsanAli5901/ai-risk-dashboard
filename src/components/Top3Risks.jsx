import { WHITE, MGREY, LGREY, DGREY, GREY, RED, ORANGE } from "../data/dashboardData";

export default function Top3Risks() {
  const top3 = [
    {
      num: "01",
      name: "Financial Theft",
      score: 12,
      color: RED,
      desc: "Deepfake CFO impersonation targeting treasury",
    },
    {
      num: "02",
      name: "Executive Spoofing",
      score: 8,
      color: ORANGE,
      desc: "AI voice clone used in wire-transfer fraud",
    },
    {
      num: "03",
      name: "AI Phishing",
      score: 6,
      color: ORANGE,
      desc: "LLM-generated personalised spear-phishing",
    },
  ];

  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${MGREY}`,
        borderRadius: 6,
        padding: 16,
        flex: 1,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: DGREY,
          letterSpacing: 0.5,
          marginBottom: 8,
          paddingBottom: 8,
          borderBottom: `1px solid ${LGREY}`,
        }}
      >
        TOP 3 RISKS BY SCORE
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {top3.map((r) => (
          <div
            key={r.num}
            style={{
              background: LGREY,
              borderRadius: 4,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 4,
                background: r.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 800, color: WHITE }}>{r.num}</span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DGREY }}>{r.name}</div>
              <div style={{ fontSize: 8, color: GREY, marginTop: 2 }}>{r.desc}</div>
            </div>

            <div
              style={{
                background: r.color,
                borderRadius: 12,
                padding: "3px 10px",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 700, color: WHITE }}>
                Score {r.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}