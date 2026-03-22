import { WHITE, MGREY, LGREY, DGREY, priorityColor } from "../data/dashboardData";

export default function RiskRanking({ risks }) {
  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${MGREY}`,
        borderRadius: 6,
        padding: 16,
        flex: 1.2,
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
        RISK RANKING
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {risks.map((r) => (
          <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 90,
                fontSize: 8.5,
                color: DGREY,
                fontWeight: 600,
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {r.name}
            </div>

            <div
              style={{
                flex: 1,
                background: LGREY,
                borderRadius: 3,
                height: 10,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${(r.score / 12) * 100}%`,
                  background: priorityColor[r.priority],
                  borderRadius: 3,
                  transition: "width 0.6s ease",
                }}
              />
            </div>

            <div
              style={{
                width: 22,
                fontSize: 9,
                fontWeight: 700,
                color: priorityColor[r.priority],
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {r.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}