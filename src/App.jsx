import { useState, useEffect } from "react";
import "./App.css";

import KpiCard from "./components/KpiCard";
import RiskMatrix from "./components/RiskMatrix";
import Top3Risks from "./components/Top3Risks";
import RiskRanking from "./components/RiskRanking";
import CategoryDistribution from "./components/CategoryDistribution";
import RiskTable from "./components/RiskTable";
import TreatmentFramework from "./components/TreatmentFramework";
import SelectedRiskPanel from "./components/SelectedRiskPanel";
import { sendRiskEmail } from "./services/sendRiskEmail";
import Papa from "papaparse";
import { motion } from "framer-motion";

import {
  DGREY,
  RED,
  ORANGE,
  WHITE,
  BGPAGE,
  MGREY,
  GREY,
  HEADER_BG,
  HEADER_TAG,
} from "./data/dashboardData";

export default function Dashboard() {
  const [riskData, setRiskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [threat, setThreat] = useState("All");

  const [selectedRisk, setSelectedRisk] = useState(null);
  const [hoveredRisk, setHoveredRisk] = useState(null);
  const [alertedRisks, setAlertedRisks] = useState([]);

  useEffect(() => {
    Papa.parse("/data/risks.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const formatted = result.data
          .filter((row) => row.ID && row.Name)
          .map((row) => ({
            id: row.ID,
            name: row.Name,
            category: row.Category,
            likelihood: Number(row.Likelihood) || 0,
            impact: Number(row.Impact) || 0,
            score: Number(row.Score) || 0,
            priority: row.Priority,
            owner: row.Owner,
            threat: row.Threat,
          }));

        setRiskData(formatted);
        setIsLoading(false);

        if (formatted.length) {
          setSelectedRisk(formatted[0]);
        } else {
          setLoadError("CSV loaded, but no valid rows were found.");
        }
      },
      error: (error) => {
        console.error("CSV load error:", error);
        setLoadError("Failed to load CSV data.");
        setIsLoading(false);
      },
    });
  }, []);

  const handleSelectRisk = async (risk) => {
    setSelectedRisk(risk);

    if (risk.priority === "Critical" && !alertedRisks.includes(risk.id)) {
      try {
        await sendRiskEmail(risk);
        setAlertedRisks((prev) => [...prev, risk.id]);
      } catch (error) {
        console.error("Failed to send critical risk email:", error);
      }
    }
  };

  const selectStyle = {
    fontSize: 9,
    border: "1px solid rgba(148, 163, 184, 0.35)",
    borderRadius: 10,
    padding: "8px 32px 8px 12px",
    minWidth: 145,
    background: "rgba(255,255,255,0.08)",
    color: WHITE,
    cursor: "pointer",
    outline: "none",
    fontFamily: "inherit",
    appearance: "none",
    backdropFilter: "blur(6px)",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath fill='%23E2E8F0' d='M0 2l4 4 4-4z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
  };

  const filteredRisks = riskData.filter((risk) => {
    const matchesPriority = priority === "All" || risk.priority === priority;
    const matchesCategory = category === "All" || risk.category === category;
    const matchesThreat = threat === "All" || risk.threat === threat;
    return matchesPriority && matchesCategory && matchesThreat;
  });

  useEffect(() => {
    if (!filteredRisks.length) {
      setSelectedRisk(null);
      setHoveredRisk(null);
      return;
    }

    const stillExists = filteredRisks.some((r) => r.id === selectedRisk?.id);
    if (!stillExists) {
      setSelectedRisk(filteredRisks[0]);
    }

    const hoveredStillExists = filteredRisks.some(
      (r) => r.id === hoveredRisk?.id,
    );
    if (!hoveredStillExists) {
      setHoveredRisk(null);
    }
  }, [filteredRisks, selectedRisk, hoveredRisk]);

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

  const priorityOrder = ["Critical", "High", "Medium", "Low"];
  const priorityOptions = [
    "All",
    ...priorityOrder.filter((p) =>
      riskData.some((risk) => risk.priority === p),
    ),
  ];

  const threatOptions = [
    "All",
    ...Array.from(new Set(riskData.map((risk) => risk.threat))).sort(),
  ];

  const pageVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div style={{ padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
        Loading risk data...
      </div>
    );
  }

  if (loadError) {
    return (
      <div
        style={{
          padding: 20,
          fontFamily: "Segoe UI, sans-serif",
          color: "crimson",
        }}
      >
        {loadError}
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: BGPAGE,
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: "24px 28px",
      }}
    >
      <motion.div
        variants={cardVariants}
        style={{
          background: HEADER_BG,
          borderRadius: 14,
          padding: "22px 26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 22,
          gap: 20,
          flexWrap: "wrap",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.18)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: WHITE,
                letterSpacing: -0.6,
              }}
            >
              AI Risk Intelligence Dashboard
            </span>
          </div>

          <div
            style={{
              display: "inline-block",
              background: HEADER_TAG,
              borderRadius: 999,
              padding: "5px 12px",
              marginTop: 8,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: "#E2E8F0",
                letterSpacing: 1.4,
              }}
            >
              OPERATION GHOST-CHECK
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
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
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: "#CBD5E1",
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
                  <option
                    key={o}
                    value={o}
                    style={{ color: "#0F172A", background: "#FFFFFF" }}
                  >
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
          marginBottom: 18,
        }}
      >
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
          urgent={topRisk?.priority === "Critical"}
          urgentText="Urgent attention"
        />
      </motion.div>

      <motion.div
        variants={cardVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 16,
          marginBottom: 18,
          alignItems: "start",
        }}
      >
        <RiskMatrix
          risks={filteredRisks}
          selectedRisk={selectedRisk}
          hoveredRisk={hoveredRisk}
          onSelectRisk={handleSelectRisk}
          onHoverRisk={setHoveredRisk}
        />
        <Top3Risks
          risks={filteredRisks}
          onSelectRisk={handleSelectRisk}
          selectedRisk={selectedRisk}
          hoveredRisk={hoveredRisk}
          onHoverRisk={setHoveredRisk}
        />
      </motion.div>

      <motion.div
        variants={cardVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.9fr 1fr",
          gap: 16,
          marginBottom: 18,
          alignItems: "start",
        }}
      >
        <RiskRanking
          risks={filteredRisks}
          onSelectRisk={handleSelectRisk}
          selectedRisk={selectedRisk}
          hoveredRisk={hoveredRisk}
          onHoverRisk={setHoveredRisk}
        />
        <CategoryDistribution risks={filteredRisks} />
        <SelectedRiskPanel
          risk={hoveredRisk || selectedRisk}
          isPreview={!!hoveredRisk}
        />
      </motion.div>

      <motion.div variants={cardVariants} style={{ marginBottom: 18 }}>
        <RiskTable
          risks={filteredRisks}
          onSelectRisk={handleSelectRisk}
          selectedRisk={selectedRisk}
          hoveredRisk={hoveredRisk}
          onHoverRisk={setHoveredRisk}
        />
      </motion.div>

      <motion.div variants={cardVariants} style={{ marginBottom: 18 }}>
        <TreatmentFramework />
      </motion.div>

      <motion.div
        variants={cardVariants}
        style={{
          borderTop: `1px solid ${MGREY}`,
          paddingTop: 10,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 8.5, color: GREY }}>
          E-NRG Consulting · Operation Ghost-Check · AI Risk Intelligence
        </span>
        <span style={{ fontSize: 8.5, color: GREY }}>
          CONFIDENTIAL — For Executive Use Only
        </span>
      </motion.div>
    </motion.div>
  );
}
