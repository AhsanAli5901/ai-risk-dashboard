import { WHITE, MGREY, LGREY, DGREY, RED, ORANGE, GREY } from "../data/dashboardData";

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
              : "#CBD0D1",
  }));

  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${MGREY}`,
        borderRadius: 6,
        padding: 16,
        flex: 1,
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
        CATEGORY DISTRIBUTION
      </div>

      <div
        style={{
          display: "flex",
          height: 14,
          borderRadius: 3,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        {categoryList.map((cat) => (
          <div
            key={cat.name}
            style={{ flex: cat.pct, background: cat.color }}
            title={`${cat.name}: ${cat.pct}%`}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px 8px",
        }}
      >
        {categoryList.map((cat) => (
          <div key={cat.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: 2,
                background: cat.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 8, color: DGREY, flex: 1 }}>
              {cat.name} ({cat.count})
            </span>
            <span style={{ fontSize: 8, fontWeight: 700, color: cat.color }}>
              {cat.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}