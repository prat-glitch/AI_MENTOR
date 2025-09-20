import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score ?? 2;
  const total = location.state?.total ?? 3;
  const percent = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-12 min-w-[340px] max-w-md w-full flex flex-col items-center">
        <div className="text-2xl font-bold mb-4">Quiz Result</div>
        <div className={`text-5xl font-extrabold mb-3 ${percent >= 70 ? "text-green-500" : percent >= 40 ? "text-yellow-500" : "text-red-400"}`}>{score} / {total}</div>
        <div className="text-lg text-gray-500 mb-6">
          {percent >= 70 && "Excellent! Keep it up!"}
          {percent < 70 && percent >= 40 && "Good effort! Review your mistakes."}
          {percent < 40 && "Needs improvement. Keep practicing!"}
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-500 text-white rounded-xl w-full py-3 font-bold text-lg hover:bg-indigo-600 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Result;
