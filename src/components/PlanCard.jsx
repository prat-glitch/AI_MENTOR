import React from "react";

const PlanCard = ({ planItems = [], onExplainEasier, onGiveHarder }) => (
  <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
    <h2 className="text-xl font-bold mb-5">Today's Plan</h2>
    <div className="mb-5">
      {planItems.length === 0 ? (
        <div className="text-gray-400 text-base">No plan for today.</div>
      ) : (
        planItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2 mb-2 text-base">
            <span className="font-medium">{item.subject}</span>
            <span className="text-indigo-500 font-semibold">{item.duration}</span>
          </div>
        ))
      )}
    </div>
    <button
      onClick={onExplainEasier}
      className="bg-indigo-500 text-white rounded-lg w-full py-2 font-medium text-base mb-2 hover:bg-indigo-600 transition"
    >
      Explain Easier
    </button>
    <button
      onClick={onGiveHarder}
      className="bg-indigo-50 text-indigo-500 border border-indigo-500 rounded-lg w-full py-2 font-medium text-base hover:bg-indigo-100 transition"
    >
      Give Harder Question
    </button>
  </div>
);

export default PlanCard;
