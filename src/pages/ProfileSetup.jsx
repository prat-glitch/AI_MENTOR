import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-10 min-w-[320px] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Profile Setup</h2>
        <form className="w-full" onSubmit={handleNext}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <div className="w-full mb-4">
            <span className="font-medium text-base">Exam Type</span>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" checked={exam === "JEE"} onChange={() => setExam("JEE")} />
                <span>JEE</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" checked={exam === "NEET"} onChange={() => setExam("NEET")} />
                <span>NEET</span>
              </label>
            </div>
          </div>
          <div className="w-full mb-4">
            <span className="font-medium text-base">Subjects</span>
            <div className="flex gap-3 mt-2 flex-wrap">
              {subjectOptions.map(subj => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => toggleSubject(subj)}
                  className={`px-4 py-2 rounded-lg font-medium border transition ` +
                    (subjects.includes(subj)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 bg-gray-50 text-gray-900 hover:bg-indigo-50")}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full mb-6">
            <span className="font-medium text-base">Goal</span>
            <select
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 mt-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="">Target Year</option>
              {goalOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-500 text-white font-bold text-lg hover:bg-indigo-600 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
