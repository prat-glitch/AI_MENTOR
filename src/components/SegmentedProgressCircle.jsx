import React from "react";

const SegmentedProgressCircle = ({ segments = [], label = "" }) => {
  const radius = 48;
  const stroke = 14;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  let start = 0;
  const arcs = segments.map((seg, i) => {
    const arcLength = (seg.percent / 100) * circumference;
    const dashArray = `${arcLength} ${circumference - arcLength}`;
    const arc = (
      <circle
        key={seg.label}
        stroke={seg.color}
        fill="none"
        strokeWidth={stroke}
        strokeDasharray={dashArray}
        strokeDashoffset={circumference - start}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        style={{ transition: "stroke-dashoffset 0.5s" }}
      />
    );
    start += arcLength;
    return arc;
  });

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2} className="mb-2">
        <circle
          stroke="#f3f4f6"
          fill="none"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
        />
        {arcs}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="22"
          fontWeight="bold"
          fill="#222"
        >
          {label}
        </text>
      </svg>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {segments.map(seg => (
          <div key={seg.label} className="flex items-center gap-1">
            <span className="inline-block rounded-full" style={{ width: 14, height: 14, background: seg.color }} />
            <span className="font-medium text-gray-700 text-sm">{seg.label}</span>
            <span className="text-gray-400 text-xs">({seg.percent}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentedProgressCircle;
