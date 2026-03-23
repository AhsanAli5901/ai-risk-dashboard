import {
  WHITE,
  MGREY,
  LGREY,
  DGREY,
  GREY,
  RED,
  ORANGE,
} from "../data/dashboardData";

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
          border: `1px solid ${MGREY}`,
          borderRadius: 6,
          padding: 16,
          flex: 1,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 700, color: DGREY }}>
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
            key={r.id}
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
              <span style={{ fontSize: 9, fontWeight: 800, color: WHITE }}>
                {r.num}
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DGREY }}>
                {r.name}
              </div>
              <div style={{ fontSize: 8, color: GREY, marginTop: 2 }}>
                {r.desc}
              </div>
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
