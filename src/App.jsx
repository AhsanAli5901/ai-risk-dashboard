import { useState, useEffect } from "react";
import "./App.css";

import KpiCard from "./components/KpiCard";
import RiskMatrix from "./components/RiskMatrix";
import Top3Risks from "./components/Top3Risks";
import RiskRanking from "./components/RiskRanking";
import CategoryDistribution from "./components/CategoryDistribution";
import RiskTable from "./components/RiskTable";
import TreatmentFramework from "./components/TreatmentFramework";
import Papa from "papaparse";

import {
  DGREY,
  RED,
  ORANGE,
  WHITE,
  BGPAGE,
  MGREY,
  GREY,
} from "./data/dashboardData";

export default function Dashboard() {
  const [riskData, setRiskData] = useState([]);
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [threat, setThreat] = useState("All");

  useEffect(() => {
    Papa.parse("/data/risks.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("CSV raw result:", result);
        console.log("CSV data:", result.data);

        const formatted = result.data
          .filter((row) => row.id && row.name)
          .map((row) => ({
            ...row,
            likelihood: Number(row.likelihood) || 0,
            impact: Number(row.impact) || 0,
            score: Number(row.score) || 0,
          }));

        console.log("Formatted risk data:", formatted);
        setRiskData(formatted);
      },
      error: (error) => {
        console.error("CSV load error:", error);
      },
    });
  }, []);

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

  const filteredRisks = riskData.filter((risk) => {
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

  const categoryOptions = [
    "All",
    ...Array.from(new Set(riskData.map((risk) => risk.category))).sort(),
  ];

  const priorityOptions = [
    "All",
    ...Array.from(new Set(riskData.map((risk) => risk.priority))).sort(),
  ];

  const threatOptions = [
    "All",
    ...Array.from(new Set(riskData.map((risk) => risk.threat))).sort(),
  ];

  if (!riskData.length) {
    return (
      <div style={{ padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
        Loading risk data...
      </div>
    );
  }

  return (
    <div
      style={{
        background: BGPAGE,
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: 18,
      }}
    >
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
              AI Risk Intelligence Dashboard
            </span>
            {/* <span style={{ fontSize: 11, color: MGREY, fontWeight: 400 }}>
              Risk Management
            </span> */}
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

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {[
            {
              label: "CATEGORY",
              value: category,
              setter: setCategory,
              opts: categoryOptions,
            },
            {
              label: "PRIORITY",
              value: priority,
              setter: setPriority,
              opts: priorityOptions,
            },
            {
              label: "THREAT",
              value: threat,
              setter: setThreat,
              opts: threatOptions,
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

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <RiskMatrix risks={filteredRisks} />
        <Top3Risks risks={filteredRisks} />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <RiskRanking risks={filteredRisks} />
        <CategoryDistribution risks={filteredRisks} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <RiskTable risks={filteredRisks} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <TreatmentFramework />
      </div>

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
