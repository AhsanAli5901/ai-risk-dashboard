export const RED = "#C0392B";
export const ORANGE = "#E67E22";
export const GREY = "#7F8C8D";
export const DGREY = "#2C3E50";
export const LGREY = "#ECF0F1";
export const MGREY = "#BDC3C7";
export const WHITE = "#FFFFFF";
export const BGPAGE = "#F4F6F7";

export const risks = [
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

export const priorityColor = {
  Critical: RED,
  High: ORANGE,
  Medium: GREY,
  Low: MGREY,
};

export const matrixRisks = [
  { id: "R1", impact: 4, likelihood: 5, color: RED },
  { id: "R2", impact: 4, likelihood: 4, color: ORANGE },
  { id: "R3", impact: 3, likelihood: 3, color: ORANGE },
];

export const treatments = [
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