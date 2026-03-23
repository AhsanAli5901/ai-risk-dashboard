import { motion } from "framer-motion";

export default function UrgencyIndicator({
  text = "Immediate attention",
  compact = false,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: compact ? "0" : "8px 10px",
        borderRadius: compact ? 0 : 10,
        background: compact ? "transparent" : "#FEF2F2",
        border: compact ? "none" : "1px solid #FECACA",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#DC2626",
          boxShadow: compact ? "none" : "0 0 0 6px rgba(220, 38, 38, 0.10)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 8.5,
          fontWeight: 800,
          color: "#B91C1C",
          letterSpacing: 0.6,
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
    </div>
  );
}