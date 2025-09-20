import React from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import SegmentedProgressCircle from "../components/SegmentedProgressCircle";

const samplePlan = [
  { subject: "Organic Chemistry", duration: "50 min" },
  { subject: "Inorganic Chemistry", duration: "40 min" },
  { subject: "Physics", duration: "1 hr" }
];

const todaySegments = [
  { label: "Physics", percent: 80, color: "#6c63ff" },
  { label: "Chemistry", percent: 60, color: "#f7b801" },
  { label: "Maths", percent: 40, color: "#2ecc71" }
];
const overallSegments = [
  { label: "Physics", percent: 70, color: "#6c63ff" },
  { label: "Chemistry", percent: 50, color: "#f7b801" },
  { label: "Maths", percent: 30, color: "#2ecc71" }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const handleExplainEasier = () => {
    alert("Explain Easier clicked!");
  };
  const handleGiveHarder = () => {
    alert("Give Harder Question clicked!");
  };
  const handleNextQuestate = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          {/* Greeting Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold m-0">Hi Pratyush, ready to learn?</h2>
            <p className="text-gray-500 my-4 mb-6">
              Here’s your personalized plan for today. Let’s crush your goals!
            </p>
            <button onClick={handleNextQuestate} className="bg-indigo-500 text-white rounded-xl w-full py-3 font-bold text-lg hover:bg-indigo-600 transition">
              Next Questate
            </button>
          </div>
          {/* Plan Card */}
          <PlanCard planItems={samplePlan} onExplainEasier={handleExplainEasier} onGiveHarder={handleGiveHarder} />
        </div>
        {/* Right Column */}
        <div className="flex flex-col gap-8">
          {/* Segmented Progress Circle for Today */}
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Today's Progress by Subject</h3>
            <SegmentedProgressCircle segments={todaySegments} label={"Today"} />
          </div>
          {/* Segmented Progress Circle for Overall Course */}
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Overall Course Progress</h3>
            <SegmentedProgressCircle segments={overallSegments} label={"Course"} />
          </div>
          {/* Progress List Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-semibold mb-4">Today's Plan Overview</h3>
            {samplePlan.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2 mb-2 text-base">
                <span className="font-medium">{item.subject}</span>
                <span className="text-indigo-500 font-semibold">{item.duration}</span>
              </div>
            ))}
          </div>
          {/* Weak Topics Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="font-medium mb-2">Weak Topics</div>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-indigo-50 text-indigo-500 rounded-lg px-3 py-1 font-medium">Thermodynamics</span>
              <span className="bg-indigo-50 text-indigo-500 rounded-lg px-3 py-1 font-medium">Organic Chemistry</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
