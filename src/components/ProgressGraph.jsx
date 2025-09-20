import React from "react";

const GraphLine = ({ data, color = "#6c63ff" }) => {
  const width = 220;
  const height = 60;
  const max = Math.max(...data, 1);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (d / max) * (height - 10) - 5;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block", width: "100%", maxWidth: width }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={points}
        style={{ filter: "drop-shadow(0 2px 6px #6c63ff22)" }}
      />
    </svg>
  );
};

const ProgressGraph = ({ todayData = [10, 30, 50, 70, 90], overallData = [20, 40, 60, 80, 100] }) => (
  <div style={{
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
    padding: 32,
    marginBottom: 32
  }}>
    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Progress Graphs</h3>
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontWeight: 500, marginBottom: 8 }}>Today's Progress</div>
      <GraphLine data={todayData} color="#6c63ff" />
    </div>
    <div>
      <div style={{ fontWeight: 500, marginBottom: 8 }}>Overall Course Progress</div>
      <GraphLine data={overallData} color="#2ecc71" />
    </div>
  </div>
);

export default ProgressGraph;
