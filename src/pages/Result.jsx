import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score ?? 2;
  const total = location.state?.total ?? 3;
  const percent = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-2xl">
          {/* Result Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-3xl">
              {percent >= 70 ? "🎉" : percent >= 40 ? "👍" : "💪"}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className="text-xl text-gray-600">Here's how you performed</p>
          </div>

          {/* Score Card */}
          <div className="card-modern animate-slide-up mb-8">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-4 ${
                percent >= 70 ? "text-green-500" : 
                percent >= 40 ? "text-yellow-500" : "text-red-500"
              }`}>
                {score} / {total}
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-2">
                {percent}% Score
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    percent >= 70 ? "bg-gradient-to-r from-green-500 to-green-600" :
                    percent >= 40 ? "bg-gradient-to-r from-yellow-500 to-orange-500" :
                    "bg-gradient-to-r from-red-500 to-red-600"
                  }`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* Performance Message */}
              <div className={`p-6 rounded-2xl mb-6 ${
                percent >= 70 ? "bg-green-50 border-2 border-green-200" :
                percent >= 40 ? "bg-yellow-50 border-2 border-yellow-200" :
                "bg-red-50 border-2 border-red-200"
              }`}>
                <div className="text-xl font-bold mb-2">
                  {percent >= 70 && "🎉 Excellent Work!"}
                  {percent < 70 && percent >= 40 && "👍 Good Effort!"}
                  {percent < 40 && "💪 Keep Practicing!"}
                </div>
                <p className="text-gray-700">
                  {percent >= 70 && "Outstanding performance! You're mastering the concepts brilliantly."}
                  {percent < 70 && percent >= 40 && "You're making good progress! Review the mistakes and try again."}
                  {percent < 40 && "Don't give up! Every expert was once a beginner. Keep practicing!"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-primary w-full text-lg py-4 rounded-2xl"
                >
                  🏠 Go to Dashboard
                </button>
                <button
                  onClick={() => navigate("/quiz")}
                  className="btn-secondary w-full text-lg py-4 rounded-2xl"
                >
                  🔄 Try Another Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in delay-300">
            <div className="card-gradient text-center">
              <div className="text-2xl font-bold gradient-text mb-1">{score}</div>
              <div className="text-gray-600 text-sm">Correct Answers</div>
            </div>
            <div className="card-gradient text-center">
              <div className="text-2xl font-bold gradient-text mb-1">{total - score}</div>
              <div className="text-gray-600 text-sm">Incorrect Answers</div>
            </div>
            <div className="card-gradient text-center">
              <div className="text-2xl font-bold gradient-text mb-1">{percent}%</div>
              <div className="text-gray-600 text-sm">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
