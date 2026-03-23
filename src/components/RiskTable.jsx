import { WHITE, DGREY, GREY, priorityColor } from "../data/dashboardData";

export default function RiskTable({ risks }) {
  return (
    <div
      style={{
        background: WHITE,
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: 20,
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
        RISK REGISTER — SUMMARY VIEW
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 9 }}>
        <thead>
          <tr style={{ background: "#F1F5F9" }}>
            {[
              "ID",
              "Risk Name",
              "Category",
              "Likelihood",
              "Impact",
              "Score",
              "Priority",
              "Owner",
            ].map((h) => (
              <th
                key={h}
                style={{
                  padding: "8px 10px",
                  textAlign: "left",
                  color: "#334155",
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  fontSize: 8.5,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {risks.map((r, i) => (
            <tr
              key={`${r.id}-${i}`}
              style={{
                background: i % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#EEF2FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  i % 2 === 0 ? "#FFFFFF" : "#F8FAFC";
              }}
            >
              <td
                style={{ padding: "8px 10px", fontWeight: 700, color: DGREY }}
              >
                {r.id}
              </td>
              <td style={{ padding: "8px 10px", color: DGREY }}>{r.name}</td>
              <td style={{ padding: "8px 10px", color: GREY }}>{r.category}</td>
              <td
                style={{
                  padding: "8px 10px",
                  color: DGREY,
                  textAlign: "center",
                }}
              >
                {r.likelihood}
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  color: DGREY,
                  textAlign: "center",
                }}
              >
                {r.impact}
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  fontWeight: 700,
                  color: priorityColor[r.priority],
                  textAlign: "center",
                }}
              >
                {r.score}
              </td>
              <td style={{ padding: "8px 10px" }}>
                <span
                  style={{
                    background: priorityColor[r.priority],
                    color: WHITE,
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontSize: 8,
                    fontWeight: 700,
                  }}
                >
                  {r.priority}
                </span>
              </td>
              <td style={{ padding: "8px 10px", color: GREY }}>{r.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
