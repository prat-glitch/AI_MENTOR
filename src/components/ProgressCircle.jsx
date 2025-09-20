import React from "react";

const ProgressCircle = ({ percent = 0, label = "" }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#f3f2ff"
          fill="none"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
        />
        <circle
          stroke="#6c63ff"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          style={{ transition: "stroke-dashoffset 0.5s" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="22"
          fontWeight="bold"
          fill="#6c63ff"
        >
          {percent}%
        </text>
      </svg>
      {label && <div className="text-gray-500 text-base mt-2">{label}</div>}
    </div>
  );
};

export default ProgressCircle;
