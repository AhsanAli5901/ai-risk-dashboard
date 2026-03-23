import { WHITE, DGREY, treatments } from "../data/dashboardData";

export default function TreatmentFramework() {
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
        RISK TREATMENT FRAMEWORK
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {treatments.map((t) => (
          <div
            key={t.type}
            style={{
              background: "#F8FAFC",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid #E2E8F0",
            }}
          >
            <div style={{ background: t.color, padding: "8px 14px" }}>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  color: WHITE,
                  letterSpacing: 1,
                }}
              >
                {t.type}
              </span>
            </div>

            <div
              style={{
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {t.items.map((item) => (
                <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: t.color, fontSize: 9, marginTop: 1, flexShrink: 0 }}>
                    ▸
                  </span>
                  <span style={{ fontSize: 9, color: DGREY, lineHeight: 1.45 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}