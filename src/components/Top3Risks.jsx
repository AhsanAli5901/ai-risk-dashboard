import { WHITE, DGREY, GREY, RED, ORANGE } from "../data/dashboardData";

export default function Top3Risks({ risks }) {
  const top3 = [...risks]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((risk, index) => ({
      ...risk,
      num: String(index + 1).padStart(2, "0"),
      color: risk.priority === "Critical" ? RED : ORANGE,
      desc: `${risk.threat} risk owned by ${risk.owner}`,
    }));

  if (!risks.length) {
    return (
      <div
        style={{
          background: WHITE,
          border: "1px solid #E2E8F0",
          borderRadius: 16,
          padding: 20,
          flex: 1,
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: "#0F172A" }}>
          TOP 3 RISKS BY SCORE
        </div>
        <div style={{ marginTop: 12, fontSize: 9, color: GREY }}>
          No risks available for current filters.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: WHITE,
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: 20,
        flex: 1,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: "#0F172A",
          letterSpacing: 0.6,
          marginBottom: 10,
          paddingBottom: 10,
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        TOP 3 RISKS BY SCORE
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {top3.map((r) => (
          <div
            key={`${r.id}-${r.num}`}
            style={{
              background: "#F8FAFC",
              borderRadius: 14,
              border: "1px solid #E2E8F0",
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transition: "all 0.2s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.background = "#EEF2FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#F8FAFC";
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: r.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 800, color: WHITE }}>
                {r.num}
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DGREY }}>
                {r.name}
              </div>
              <div style={{ fontSize: 8.5, color: GREY, marginTop: 3 }}>
                {r.desc}
              </div>
            </div>

            <div
              style={{
                background: r.color,
                borderRadius: 999,
                padding: "5px 12px",
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
