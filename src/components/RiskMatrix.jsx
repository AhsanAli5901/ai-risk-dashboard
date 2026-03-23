import { WHITE, MGREY, DGREY, GREY, RED, ORANGE } from "../data/dashboardData";

export default function RiskMatrix({ risks }) {
  const zoneColors = [
    ["#FDFEFE", "#FEF9F0", "#FEF0EE"],
    ["#FEF9F0", "#FEF0EE", "#FBECEB"],
    ["#FEF0EE", "#FBECEB", "#F9E4E3"],
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
          border: `1px solid ${MGREY}`,
          borderRadius: 6,
          padding: 16,
          flex: 1.1,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 700, color: DGREY }}>
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
        border: `1px solid ${MGREY}`,
        borderRadius: 6,
        padding: 16,
        flex: 1.1,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: DGREY,
          letterSpacing: 0.5,
          marginBottom: 2,
        }}
      >
        RISK CRITICALITY MATRIX
      </div>

      <div style={{ fontSize: 8.5, color: GREY, marginBottom: 10 }}>
        Probability vs Impact
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 16,
          }}
        >
          <div
            style={{
              fontSize: 7,
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
                height: 150,
                border: `1px solid ${MGREY}`,
              }}
            >
              {[2, 1, 0].map((row) =>
                [0, 1, 2].map((col) => (
                  <div
                    key={`${row}-${col}`}
                    style={{
                      background: zoneColors[row][col],
                      border: `0.5px solid ${MGREY}`,
                      position: "relative",
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
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: r.color,
                    border: "2px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 7,
                    fontWeight: 800,
                    color: WHITE,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    zIndex: 2,
                    cursor: "default",
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
              marginTop: 4,
            }}
          >
            {["Low", "Medium", "High"].map((l) => (
              <div
                key={l}
                style={{ fontSize: 7.5, color: GREY, textAlign: "center" }}
              >
                {l}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 7.5,
              color: GREY,
              textAlign: "center",
              letterSpacing: 1,
              fontWeight: 700,
              marginTop: 2,
            }}
          >
            IMPACT
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {topMatrixRisks.map((r) => (
          <div
            key={r.id}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
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
            <span style={{ fontSize: 8, color: DGREY }}>
              <b>{r.id}</b> — {r.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
