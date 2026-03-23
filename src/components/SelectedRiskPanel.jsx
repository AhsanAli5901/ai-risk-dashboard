import { motion } from "framer-motion";
import { WHITE, DGREY, GREY, priorityColor } from "../data/dashboardData";

export default function SelectedRiskPanel({ risk, isPreview = false }) {
  if (!risk) {
    return (
      <motion.div
        key="empty"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
      </motion.div>
    );
  }

  const badgeColor = priorityColor[risk.priority] || "#94A3B8";

  return (
    <motion.div
      key={`${risk.id}-${isPreview ? "preview" : "selected"}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        background: WHITE,
        border: `1px solid ${badgeColor}22`,
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: badgeColor,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          paddingBottom: 10,
          borderBottom: "1px solid #E2E8F0",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: 0.6,
          }}
        >
          {isPreview ? "RISK PREVIEW" : "SELECTED RISK"}
        </div>

        <span
          style={{
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            padding: "5px 10px",
            borderRadius: 999,
            background: isPreview ? "#FEF3C7" : "#E2E8F0",
            color: isPreview ? "#92400E" : "#475569",
          }}
        >
          {isPreview ? "Hover Preview" : "Pinned Selection"}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          gap: 12,
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
              lineHeight: 1.35,
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
            whiteSpace: "nowrap",
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
          <b>{risk.threat}</b>.
        </div>
      </div>
    </motion.div>
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
          lineHeight: 1.35,
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}