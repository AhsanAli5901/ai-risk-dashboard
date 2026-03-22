import { useState } from "react";
import "./App.css";

const RED = "#C0392B";
const ORANGE = "#E67E22";
const GREY = "#7F8C8D";
const DGREY = "#2C3E50";
const LGREY = "#ECF0F1";
const MGREY = "#BDC3C7";
const WHITE = "#FFFFFF";
const BGPAGE = "#F4F6F7";

const risks = [
  {
    id: "R1",
    name: "Financial Theft",
    category: "Financial",
    likelihood: 5,
    impact: 4,
    score: 12,
    priority: "Critical",
    owner: "CFO Office",
    threat: "Deepfake",
  },
  {
    id: "R2",
    name: "Executive Spoofing",
    category: "Identity",
    likelihood: 4,
    impact: 4,
    score: 8,
    priority: "High",
    owner: "CISO",
    threat: "Deepfake",
  },
  {
    id: "R3",
    name: "AI Phishing",
    category: "Identity",
    likelihood: 3,
    impact: 3,
    score: 6,
    priority: "High",
    owner: "SOC Team",
    threat: "Phishing",
  },
  {
    id: "R4",
    name: "Data Exfiltration",
    category: "Data",
    likelihood: 3,
    impact: 3,
    score: 5,
    priority: "Medium",
    owner: "DPO",
    threat: "Data",
  },
  {
    id: "R5",
    name: "Infra Disruption",
    category: "Infrastructure",
    likelihood: 2,
    impact: 4,
    score: 4,
    priority: "Medium",
    owner: "IT Ops",
    threat: "Infrastructure",
  },
  {
    id: "R6",
    name: "Credential Harvest",
    category: "Identity",
    likelihood: 3,
    impact: 2,
    score: 3,
    priority: "Low",
    owner: "IAM Team",
    threat: "Phishing",
  },
];

const priorityColor = { Critical: RED, High: ORANGE, Medium: GREY, Low: MGREY };

const matrixRisks = [
  { id: "R1", impact: 4, likelihood: 5, color: RED },
  { id: "R2", impact: 4, likelihood: 4, color: ORANGE },
  { id: "R11", impact: 3, likelihood: 3, color: ORANGE },
];

// const categories = [
//   { name: "Financial", count: 5, color: RED, pct: 40 },
//   { name: "Identity", count: 4, color: ORANGE, pct: 32 },
//   { name: "Infrastructure", count: 3, color: GREY, pct: 24 },
//   { name: "Data", count: 2, color: MGREY, pct: 16 },
//   { name: "Other", count: 1, color: "#CBD0D1", pct: 8 },
// ];

const treatments = [
  {
    type: "PREVENTIVE",
    color: RED,
    items: [
      "Multi-factor authentication",
      "AI deepfake detection layer",
      "Zero-trust access architecture",
      "Vendor due-diligence protocols",
    ],
  },
  {
    type: "PROTECTIVE",
    color: ORANGE,
    items: [
      "Real-time transaction monitoring",
      "AI anomaly detection (SIEM)",
      "Privileged access management",
      "Encrypted communication channels",
    ],
  },
  {
    type: "CURATIVE",
    color: GREY,
    items: [
      "Incident response playbooks",
      "Forensic audit trail system",
      "Crisis communication protocol",
      "Cyber insurance coverage",
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, color }) {
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

function RiskMatrix() {
  const grid = [[], [], []]; // 3 cols × 3 rows
  const zoneColors = [
    ["#FDFEFE", "#FEF9F0", "#FEF0EE"],
    ["#FEF9F0", "#FEF0EE", "#FBECEB"],
    ["#FEF0EE", "#FBECEB", "#F9E4E3"],
  ];

  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${MGREY}`,
        borderRadius: 6,
        padding: 16,
        flex: 1.1,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: DGREY,
          letterSpacing: 0.5,
          marginBottom: 2,
        }}
      >
        RISK CRITICALITY MATRIX
      </div>
      <div style={{ fontSize: 8.5, color: GREY, marginBottom: 10 }}>
        Probability vs Impact
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {/* Y-axis label */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 16,
          }}
        >
          <div
            style={{
              fontSize: 7,
              fontWeight: 700,
              color: GREY,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: 1,
            }}
          >
            PROBABILITY
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {/* Grid */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gridTemplateRows: "repeat(3,1fr)",
                height: 150,
                border: `1px solid ${MGREY}`,
              }}
            >
              {[2, 1, 0].map((row) =>
                [0, 1, 2].map((col) => (
                  <div
                    key={`${row}-${col}`}
                    style={{
                      background: zoneColors[row][col],
                      border: `0.5px solid ${MGREY}`,
                      position: "relative",
                    }}
                  />
                )),
              )}
            </div>
            {/* Risk dots */}
            {matrixRisks.map((r) => {
              const x = ((r.impact - 1) / 4) * 100;
              const y = ((5 - r.likelihood) / 4) * 100;
              return (
                <div
                  key={r.id}
                  style={{
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%,-50%)",
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: r.color,
                    border: "2px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 7,
                    fontWeight: 800,
                    color: WHITE,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    zIndex: 2,
                    cursor: "default",
                  }}
                >
                  {r.id}
                </div>
              );
            })}
          </div>
          {/* X-axis labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 4,
            }}
          >
            {["Low", "Medium", "High"].map((l) => (
              <div
                key={l}
                style={{ fontSize: 7.5, color: GREY, textAlign: "center" }}
              >
                {l}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 7.5,
              color: GREY,
              textAlign: "center",
              letterSpacing: 1,
              fontWeight: 700,
              marginTop: 2,
            }}
          >
            IMPACT
          </div>
        </div>
      </div>
      {/* Legend */}
      <div
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {[
          ["R1", "Financial Theft", RED],
          ["R2", "Exec Spoofing", ORANGE],
          ["R11", "AI Phishing", ORANGE],
        ].map(([id, name, col]) => (
          <div
            key={id}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: col,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 8, color: DGREY }}>
              <b>{id}</b> — {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Top3Risks() {
  const top3 = [
    {
      num: "01",
      name: "Financial Theft",
      score: 12,
      color: RED,
      desc: "Deepfake CFO impersonation targeting treasury",
    },
    {
      num: "02",
      name: "Executive Spoofing",
      score: 8,
      color: ORANGE,
      desc: "AI voice clone used in wire-transfer fraud",
    },
    {
      num: "03",
      name: "AI Phishing",
      score: 6,
      color: ORANGE,
      desc: "LLM-generated personalised spear-phishing",
    },
  ];
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
        TOP 3 RISKS BY SCORE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {top3.map((r) => (
          <div
            key={r.num}
            style={{
              background: LGREY,
              borderRadius: 4,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 4,
                background: r.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 800, color: WHITE }}>
                {r.num}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: DGREY }}>
                {r.name}
              </div>
              <div style={{ fontSize: 8, color: GREY, marginTop: 2 }}>
                {r.desc}
              </div>
            </div>
            <div
              style={{
                background: r.color,
                borderRadius: 12,
                padding: "3px 10px",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 700, color: WHITE }}>
                Score {r.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskRanking({ risks }) {
  return (
    <div
      style={{
        background: WHITE,
        border: `1px solid ${MGREY}`,
        borderRadius: 6,
        padding: 16,
        flex: 1.2,
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
        RISK RANKING
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {risks.map((r) => (
          <div
            key={r.id}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: 90,
                fontSize: 8.5,
                color: DGREY,
                fontWeight: 600,
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {r.name}
            </div>
            <div
              style={{
                flex: 1,
                background: LGREY,
                borderRadius: 3,
                height: 10,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${(r.score / 12) * 100}%`,
                  background: priorityColor[r.priority],
                  borderRadius: 3,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <div
              style={{
                width: 22,
                fontSize: 9,
                fontWeight: 700,
                color: priorityColor[r.priority],
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {r.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryDistribution({ risks }) {
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
          <div
            key={cat.name}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
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

function RiskTable({ risks }) {
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
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 8.5 }}
      >
        <thead>
          <tr style={{ background: DGREY }}>
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
              <td style={{ padding: "5px 8px", fontWeight: 700, color: DGREY }}>
                {r.id}
              </td>
              <td style={{ padding: "5px 8px", color: DGREY }}>{r.name}</td>
              <td style={{ padding: "5px 8px", color: GREY }}>{r.category}</td>
              <td
                style={{
                  padding: "5px 8px",
                  color: DGREY,
                  textAlign: "center",
                }}
              >
                {r.likelihood}
              </td>
              <td
                style={{
                  padding: "5px 8px",
                  color: DGREY,
                  textAlign: "center",
                }}
              >
                {r.impact}
              </td>
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

function TreatmentFramework() {
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
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}
      >
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
                <div
                  key={item}
                  style={{ display: "flex", gap: 6, alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      color: t.color,
                      fontSize: 8,
                      marginTop: 1,
                      flexShrink: 0,
                    }}
                  >
                    ▸
                  </span>
                  <span
                    style={{ fontSize: 8.5, color: DGREY, lineHeight: 1.4 }}
                  >
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

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [threat, setThreat] = useState("All");

  const selectStyle = {
    fontSize: 8.5,
    border: `1px solid #5D6D7E`,
    borderRadius: 3,
    padding: "3px 20px 3px 6px",
    background: WHITE,
    color: DGREY,
    cursor: "pointer",
    outline: "none",
    fontFamily: "inherit",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath fill='%237F8C8D' d='M0 2l4 4 4-4z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 5px center",
  };

  const filteredRisks = risks.filter((risk) => {
    const matchesPriority = priority === "All" || risk.priority === priority;
    const matchesCategory = category === "All" || risk.category === category;
    const matchesThreat = threat === "All" || risk.threat === threat;

    return matchesPriority && matchesCategory && matchesThreat;
  });

  const totalRisks = filteredRisks.length;

  const highPriorityRisks = filteredRisks.filter(
    (r) => r.priority === "Critical" || r.priority === "High",
  ).length;

  const avgRiskScore = totalRisks
    ? (filteredRisks.reduce((sum, r) => sum + r.score, 0) / totalRisks).toFixed(
        1,
      )
    : "0.0";

  const topRisk = totalRisks
    ? filteredRisks.reduce(
        (max, r) => (r.score > max.score ? r : max),
        filteredRisks[0],
      )
    : null;

  return (
    <div
      style={{
        background: BGPAGE,
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: 18,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: DGREY,
          borderRadius: 6,
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: WHITE,
                letterSpacing: -0.5,
              }}
            >
              E-NRG
            </span>
            <span style={{ fontSize: 11, color: MGREY, fontWeight: 400 }}>
              AI Risk Intelligence Dashboard
            </span>
          </div>
          <div
            style={{
              display: "inline-block",
              background: "#3D566E",
              borderRadius: 3,
              padding: "2px 10px",
              marginTop: 5,
            }}
          >
            <span
              style={{
                fontSize: 7.5,
                fontWeight: 700,
                color: "#E8ECF0",
                letterSpacing: 1.5,
              }}
            >
              OPERATION GHOST-CHECK
            </span>
          </div>
        </div>
        {/* Filters */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {[
            {
              label: "CATEGORY",
              value: category,
              setter: setCategory,
              opts: ["All", "Financial", "Identity", "Infrastructure", "Data"],
            },
            {
              label: "PRIORITY",
              value: priority,
              setter: setPriority,
              opts: ["All", "Critical", "High", "Medium", "Low"],
            },
            {
              label: "THREAT",
              value: threat,
              setter: setThreat,
              opts: ["All", "Deepfake", "Phishing", "Data", "Infrastructure"],
            },
          ].map((f) => (
            <div
              key={f.label}
              style={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <span
                style={{
                  fontSize: 7,
                  fontWeight: 700,
                  color: MGREY,
                  letterSpacing: 0.8,
                }}
              >
                {f.label}
              </span>
              <select
                value={f.value}
                onChange={(e) => f.setter(e.target.value)}
                style={selectStyle}
              >
                {f.opts.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <KpiCard
          label="TOTAL RISKS"
          value={totalRisks}
          sub="Filtered results"
          color={DGREY}
        />
        <KpiCard
          label="HIGH PRIORITY"
          value={highPriorityRisks}
          sub="Critical + High"
          color={RED}
        />
        <KpiCard
          label="AVG RISK SCORE"
          value={avgRiskScore}
          sub="Current selection"
          color={ORANGE}
        />
        <KpiCard
          label="TOP RISK"
          value={topRisk ? topRisk.id : "-"}
          sub={topRisk ? topRisk.name : "No risk selected"}
          color={RED}
        />
      </div>

      {/* ── Row 1: Matrix + Top3 ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <RiskMatrix />
        <Top3Risks />
      </div>

      {/* ── Row 2: Ranking + Category ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <RiskRanking risks={filteredRisks} />
        <CategoryDistribution risks={filteredRisks} />
      </div>

      {/* ── Row 3: Table ── */}
      <div style={{ marginBottom: 12 }}>
        <RiskTable risks={filteredRisks} />
      </div>

      {/* ── Row 4: Treatment ── */}
      <div style={{ marginBottom: 12 }}>
        <TreatmentFramework />
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          borderTop: `1px solid ${MGREY}`,
          paddingTop: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 8, color: GREY }}>
          E-NRG Consulting · Operation Ghost-Check · AI Risk Intelligence
        </span>
        <span style={{ fontSize: 8, color: GREY }}>
          CONFIDENTIAL — For Executive Use Only
        </span>
      </div>
    </div>
  );
}
