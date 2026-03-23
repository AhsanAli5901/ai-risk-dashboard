import { WHITE, DGREY, GREY, priorityColor } from "../data/dashboardData";

export default function SelectedRiskPanel({ risk }) {
  if (!risk) {
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
        <div style={{ fontSize: 11, fontWeight: 800, color: "#0F172A" }}>
          SELECTED RISK
        </div>
        <div style={{ marginTop: 12, fontSize: 9, color: GREY }}>
          Click a risk to inspect details.
        </div>
      </div>
    );
  }

  const badgeColor = priorityColor[risk.priority] || "#94A3B8";

  return (
    <div
      style={{
        background: WHITE,
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        transition: "all 0.25s ease",
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
        SELECTED RISK
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: DGREY }}>
            {risk.id}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: DGREY,
              marginTop: 4,
            }}
          >
            {risk.name}
          </div>
        </div>

        <span
          style={{
            background: badgeColor,
            color: WHITE,
            borderRadius: 999,
            padding: "6px 12px",
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          {risk.priority}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Info label="Category" value={risk.category} />
        <Info label="Threat" value={risk.threat} />
        <Info label="Owner" value={risk.owner} />
        <Info label="Likelihood" value={risk.likelihood} />
        <Info label="Impact" value={risk.impact} />
        <Info label="Score" value={risk.score} />
      </div>

      <div
        style={{
          marginTop: 16,
          padding: 14,
          borderRadius: 12,
          background: "#F8FAFC",
          border: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#334155",
            marginBottom: 6,
          }}
        >
          Executive Insight
        </div>
        <div style={{ fontSize: 9.5, color: GREY, lineHeight: 1.5 }}>
          {risk.name} is currently categorized as a <b>{risk.priority}</b> risk
          with a score of <b>{risk.score}</b>. It belongs to the{" "}
          <b>{risk.category}</b> domain and is primarily associated with{" "}
          <b> {risk.threat}</b>.
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 12,
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
      }}
    >
      <div
        style={{
          fontSize: 8,
          fontWeight: 700,
          color: "#64748B",
          letterSpacing: 0.8,
        }}
      >
        {label.toUpperCase()}
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 10,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        {value}
      </div>
    </div>
  );
}
