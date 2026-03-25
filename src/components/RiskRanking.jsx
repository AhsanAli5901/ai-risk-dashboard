import { WHITE, DGREY, GREY, priorityColor } from "../data/dashboardData";

export default function RiskRanking({
  risks,
  onSelectRisk,
  selectedRisk,
  hoveredRisk,
  onHoverRisk,
}) {
  return (
    <div
      style={{
        background: WHITE,
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: 20,
        flex: 1.2,
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
        RISK RANKING
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {risks.map((r, index) => {
          const isSelected = selectedRisk?.id === r.id;
          const isHovered = hoveredRisk?.id === r.id;

          return (
            <div
              key={`${r.id}-${index}`}
              onClick={() => onSelectRisk?.(r)}
              onMouseEnter={() => onHoverRisk?.(r)}
              onMouseLeave={() => onHoverRisk?.(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: 12,
                cursor: "pointer",
                background: isSelected
                  ? "#EEF2FF"
                  : isHovered
                    ? "#F8FAFC"
                    : "transparent",
                border: isSelected
                  ? "1px solid #C7D2FE"
                  : "1px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              {/* ID BADGE */}
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {/* <span
                  style={{ fontSize: 8, color: "#64748B", fontWeight: 700 }}
                >
                  #{index + 1}
                </span> */}

                <div
                  style={{
                    minWidth: 32,
                    height: 20,
                    borderRadius: 6,
                    background: "#F1F5F9",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    fontWeight: 800,
                    color: "#0F172A",
                  }}
                >
                  {r.id}
                </div>
              </div>

              {/* NAME */}
              <div
                style={{
                  width: 100,
                  fontSize: 9,
                  color: DGREY,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  flexShrink: 0,
                }}
              >
                {r.name}
              </div>

              {/* BAR */}
              <div
                style={{
                  flex: 1,
                  background: "#F1F5F9",
                  borderRadius: 999,
                  height: 12,
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
                    width: `${(r.score / 16) * 100}%`,
                    background: priorityColor[r.priority] || "#94A3B8",
                    borderRadius: 999,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>

              {/* SCORE */}
              <div
                style={{
                  width: 30,
                  fontSize: 9,
                  fontWeight: 700,
                  color: priorityColor[r.priority] || "#94A3B8",
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {r.score}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
