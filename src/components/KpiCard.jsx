import { WHITE } from "../data/dashboardData";

export default function KpiCard({ label, value, sub, color }) {
  return (
    <div
      style={{
        background: WHITE,
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: "18px",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        transition: "all 0.25s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 14px 30px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.06)";
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
          borderRadius: "16px 16px 0 0",
        }}
      />

      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#64748B",
          letterSpacing: 1,
          marginBottom: 8,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: 800,
          color,
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value}
      </div>

      <div style={{ fontSize: 10, color: "#64748B" }}>{sub}</div>
    </div>
  );
}
