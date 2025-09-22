import React from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import SegmentedProgressCircle from "../components/SegmentedProgressCircle";
import Navbar from "../components/Navbar";
import BoltIcon from "@mui/icons-material/Bolt";
import SchoolIcon from "@mui/icons-material/School";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="gradient-text">Pratyush</span>!
          </h1>
          <p className="text-xl text-gray-600">
            Ready to continue your learning journey? Let's make today productive!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions Card */}
            <div className="card-modern animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                  <BoltIcon />
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Here's your personalized plan for today. Let's crush your goals!
              </p>
              <button 
                onClick={handleNextQuestate} 
                className="btn-primary w-full text-lg py-4 rounded-2xl"
              >
                <span className="inline-flex items-center gap-2"><SchoolIcon fontSize="small" /> Start Next Questate</span>
              </button>
            </div>

            {/* Study Plan Card */}
            <div className="card-modern animate-slide-up delay-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Today's Study Plan</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleExplainEasier}
                    className="btn-ghost text-sm px-3 py-2"
                  >
                    <span className="inline-flex items-center gap-1"><SchoolIcon fontSize="small" /> Easier</span>
                  </button>
                  <button 
                    onClick={handleGiveHarder}
                    className="btn-ghost text-sm px-3 py-2"
                  >
                    <span className="inline-flex items-center gap-1"><WhatshotIcon fontSize="small" /> Harder</span>
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {samplePlan.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.subject}</div>
                        <div className="text-sm text-gray-600">Study Session</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">{item.duration}</div>
                      <div className="text-sm text-gray-500">Duration</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Today's Progress */}
            <div className="card-gradient animate-slide-up delay-300">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Today's Progress</h3>
                <p className="text-gray-600">By Subject</p>
              </div>
              <SegmentedProgressCircle segments={todaySegments} label={"Today"} />
            </div>

            {/* Overall Progress */}
            <div className="card-gradient animate-slide-up delay-400">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Course Progress</h3>
                <p className="text-gray-600">Overall Performance</p>
              </div>
              <SegmentedProgressCircle segments={overallSegments} label={"Course"} />
            </div>

            {/* Weak Topics */}
            <div className="card-modern animate-slide-up delay-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Focus Areas</h3>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-sm">
                  <TrackChangesIcon fontSize="small" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">Topics that need more attention</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium border border-orange-200">
                  Thermodynamics
                </span>
                <span className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium border border-orange-200">
                  Organic Chemistry
                </span>
              </div>
            </div>

            {/* Study Streak */}
            <div className="card-modern animate-slide-up delay-600">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                  <WhatshotIcon />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Study Streak</h3>
                <div className="text-3xl font-bold gradient-text mb-2">7 Days</div>
                <p className="text-gray-600 text-sm">Keep it up! You're on fire!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
