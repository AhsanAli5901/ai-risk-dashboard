import { WHITE, DGREY, GREY, RED, ORANGE } from "../data/dashboardData";

export default function RiskMatrix({ risks }) {
  const zoneColors = [
    ["#F8FAFC", "#FFF7ED", "#FEF2F2"],
    ["#FFF7ED", "#FEF3C7", "#FEE2E2"],
    ["#FEF2F2", "#FDE68A", "#FECACA"],
  ];

  const topMatrixRisks = [...risks]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((risk) => ({
      ...risk,
      color: risk.priority === "Critical" ? RED : ORANGE,
    }));

  if (!risks.length) {
    return (
      <div
        style={{
          background: WHITE,
          border: "1px solid #E2E8F0",
          borderRadius: 16,
          padding: 20,
          flex: 1.1,
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: "#0F172A" }}>
          RISK CRITICALITY MATRIX
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
        flex: 1.1,
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
        RISK CRITICALITY MATRIX
      </div>

      <div style={{ fontSize: 9, color: GREY, marginBottom: 12 }}>
        Probability vs Impact
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 18,
          }}
        >
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              color: GREY,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: 1,
            }}
          >
            PROBABILITY
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gridTemplateRows: "repeat(3,1fr)",
                height: 170,
                border: "1px solid #E2E8F0",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {[2, 1, 0].map((row) =>
                [0, 1, 2].map((col) => (
                  <div
                    key={`${row}-${col}`}
                    style={{
                      background: zoneColors[row][col],
                      border: "0.5px solid #E2E8F0",
                    }}
                  />
                )),
              )}
            </div>

            {topMatrixRisks.map((r) => {
              const x = ((r.impact - 1) / 4) * 100;
              const y = ((5 - r.likelihood) / 4) * 100;

              return (
                <div
                  key={r.id}
                  style={{
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%,-50%)",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: r.color,
                    border: "2px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    fontWeight: 800,
                    color: WHITE,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.16)",
                    zIndex: 2,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translate(-50%, -50%) scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translate(-50%, -50%) scale(1)";
                  }}
                >
                  {r.id}
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 8,
            }}
          >
            {["Low", "Medium", "High"].map((l) => (
              <div
                key={l}
                style={{ fontSize: 8.5, color: GREY, textAlign: "center" }}
              >
                {l}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 8.5,
              color: GREY,
              textAlign: "center",
              letterSpacing: 1,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            IMPACT
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {topMatrixRisks.map((r) => (
          <div
            key={r.id}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: r.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 9, color: DGREY }}>
              <b>{r.id}</b> — {r.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
