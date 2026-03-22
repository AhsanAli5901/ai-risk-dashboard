import { WHITE, MGREY, LGREY, DGREY, GREY, priorityColor } from "../data/dashboardData";

export default function RiskTable({ risks }) {
  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${MGREY}`,
        borderRadius: 6,
        padding: 16,
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
        RISK REGISTER — SUMMARY VIEW
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 8.5 }}>
        <thead>
          <tr style={{ background: DGREY }}>
            {["ID", "Risk Name", "Category", "Likelihood", "Impact", "Score", "Priority", "Owner"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "5px 8px",
                  textAlign: "left",
                  color: WHITE,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  fontSize: 8,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {risks.map((r, i) => (
            <tr key={r.id} style={{ background: i % 2 === 0 ? LGREY : WHITE }}>
              <td style={{ padding: "5px 8px", fontWeight: 700, color: DGREY }}>{r.id}</td>
              <td style={{ padding: "5px 8px", color: DGREY }}>{r.name}</td>
              <td style={{ padding: "5px 8px", color: GREY }}>{r.category}</td>
              <td style={{ padding: "5px 8px", color: DGREY, textAlign: "center" }}>{r.likelihood}</td>
              <td style={{ padding: "5px 8px", color: DGREY, textAlign: "center" }}>{r.impact}</td>
              <td
                style={{
                  padding: "5px 8px",
                  fontWeight: 700,
                  color: priorityColor[r.priority],
                  textAlign: "center",
                }}
              >
                {r.score}
              </td>
              <td style={{ padding: "5px 8px" }}>
                <span
                  style={{
                    background: priorityColor[r.priority],
                    color: WHITE,
                    borderRadius: 10,
                    padding: "2px 8px",
                    fontSize: 7.5,
                    fontWeight: 700,
                  }}
                >
                  {r.priority}
                </span>
              </td>
              <td style={{ padding: "5px 8px", color: GREY }}>{r.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}