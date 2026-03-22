import { WHITE, GREY, MGREY } from "../data/dashboardData";

export default function KpiCard({ label, value, sub, color }) {
  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${MGREY}`,
        borderRadius: 6,
        padding: "14px 16px 12px",
        flex: 1,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: color,
          borderRadius: "6px 6px 0 0",
        }}
      />
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: GREY,
          letterSpacing: 1,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color,
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 9, color: GREY }}>{sub}</div>
    </div>
  );
}