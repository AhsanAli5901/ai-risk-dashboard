import { WHITE, MGREY, LGREY, DGREY, treatments } from "../data/dashboardData";

export default function TreatmentFramework() {
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
          marginBottom: 10,
          paddingBottom: 8,
          borderBottom: `1px solid ${LGREY}`,
        }}
      >
        RISK TREATMENT FRAMEWORK
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {treatments.map((t) => (
          <div
            key={t.type}
            style={{
              background: LGREY,
              borderRadius: 4,
              overflow: "hidden",
              border: `1px solid #E5E8E8`,
            }}
          >
            <div style={{ background: t.color, padding: "6px 12px" }}>
              <span
                style={{
                  fontSize: 8.5,
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
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {t.items.map((item) => (
                <div key={item} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <span style={{ color: t.color, fontSize: 8, marginTop: 1, flexShrink: 0 }}>
                    ▸
                  </span>
                  <span style={{ fontSize: 8.5, color: DGREY, lineHeight: 1.4 }}>
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