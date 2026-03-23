import { WHITE, DGREY, GREY, priorityColor } from "../data/dashboardData";

export default function RiskRanking({ risks, onSelectRisk, selectedRisk }) {
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
        {risks.map((r, index) => (
          <div
            key={`${r.id}-${index}`}
            onClick={() => onSelectRisk?.(r)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "6px 8px",
              borderRadius: 12,
              cursor: "pointer",
              background: selectedRisk?.id === r.id ? "#EEF2FF" : "transparent",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (selectedRisk?.id !== r.id)
                e.currentTarget.style.background = "#F8FAFC";
            }}
            onMouseLeave={(e) => {
              if (selectedRisk?.id !== r.id)
                e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                width: 110,
                fontSize: 9,
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
                  width: `${(r.score / 25) * 100}%`,
                  background: priorityColor[r.priority],
                  borderRadius: 999,
                  transition: "width 0.6s ease",
                }}
              />
            </div>

            <div
              style={{
                width: 30,
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
