export const RED = "#C0392B";
export const ORANGE = "#E67E22";
export const GREY = "#7F8C8D";
export const DGREY = "#2C3E50";
export const LGREY = "#ECF0F1";
export const MGREY = "#BDC3C7";
export const WHITE = "#FFFFFF";
export const BGPAGE = "#F4F6F7";


export const priorityColor = {
  Critical: RED,
  High: ORANGE,
  Medium: GREY,
  Low: MGREY,
};

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