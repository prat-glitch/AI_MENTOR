import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const ProfileSetup = () => {
  const [name, setName] = useState("");
  const [exam, setExam] = useState("JEE");
  const [subjects, setSubjects] = useState([]);
  const [goal, setGoal] = useState("");
  const navigate = useNavigate();

  const subjectOptions = ["Physics", "Chemistry", "Maths", "Biology"];
  const goalOptions = ["2025", "2026", "2027"];

  const toggleSubject = (subj) => {
    setSubjects(subjects.includes(subj)
      ? subjects.filter(s => s !== subj)
      : [...subjects, subj]);
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-3xl">
              <PersonIcon fontSize="large" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
            <p className="text-xl text-gray-600">Help us personalize your learning experience</p>
          </div>

          {/* Form Card */}
          <div className="card-modern animate-slide-up">
            <form className="space-y-8" onSubmit={handleNext}>
              {/* Name Input */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  What's your name?
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-modern text-lg py-4"
                  required
                />
              </div>

              {/* Exam Type */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Which exam are you preparing for?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    exam === "JEE" 
                      ? "border-blue-500 bg-blue-50 shadow-lg" 
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}>
                    <input 
                      type="radio" 
                      value="JEE" 
                      checked={exam === "JEE"} 
                      onChange={() => setExam("JEE")}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2"><ScienceIcon /></div>
                      <div className="font-bold text-lg text-gray-900">JEE</div>
                      <div className="text-sm text-gray-600">Joint Entrance Exam</div>
                    </div>
                  </label>
                  <label className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    exam === "NEET" 
                      ? "border-blue-500 bg-blue-50 shadow-lg" 
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}>
                    <input 
                      type="radio" 
                      value="NEET" 
                      checked={exam === "NEET"} 
                      onChange={() => setExam("NEET")}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2"><MedicalServicesIcon /></div>
                      <div className="font-bold text-lg text-gray-900">NEET</div>
                      <div className="text-sm text-gray-600">National Eligibility Test</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Select your subjects
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {subjectOptions.map(subj => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => toggleSubject(subj)}
                      className={`p-4 rounded-xl font-semibold text-lg transition-all duration-200 border-2 ${
                        subjects.includes(subj)
                          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-lg"
                          : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Year */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Target Year
                </label>
                <select
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  className="input-modern text-lg py-4"
                  required
                >
                  <option value="">Select your target year</option>
                  {goalOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full text-xl py-5 rounded-2xl"
              >
                Complete Setup →
              </button>
            </form>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center animate-fade-in delay-300">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Step 2 of 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
