import { WHITE, DGREY, RED, ORANGE, GREY, MGREY } from "../data/dashboardData";

export default function CategoryDistribution({ risks }) {
  const categoryMap = {};

  risks.forEach((risk) => {
    categoryMap[risk.category] = (categoryMap[risk.category] || 0) + 1;
  });

  const total = risks.length || 1;

  const categoryList = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count,
    pct: Math.round((count / total) * 100),
    color:
      name === "Financial"
        ? RED
        : name === "Identity"
          ? ORANGE
          : name === "Infrastructure"
            ? GREY
            : name === "Data"
              ? MGREY
              : "#94A3B8",
  }));

  return (
    <div
      style={{
        background: WHITE,
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: 20,
        flex: 1,
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
        CATEGORY DISTRIBUTION
      </div>

      <div
        style={{
          display: "flex",
          height: 16,
          borderRadius: 999,
          overflow: "hidden",
          marginBottom: 14,
          background: "#F1F5F9",
        }}
      >
        {categoryList.map((cat) => (
          <div
            key={cat.name}
            style={{
              flex: cat.pct,
              background: cat.color,
              transition: "all 0.2s ease",
            }}
            title={`${cat.name}: ${cat.pct}%`}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 10px",
        }}
      >
        {categoryList.map((cat) => (
          <div
            key={cat.name}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: cat.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 9, color: DGREY, flex: 1 }}>
              {cat.name} ({cat.count})
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, color: cat.color }}>
              {cat.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
