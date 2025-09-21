import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getquiz } from "../services/quizservice";
import Navbar from "../components/Navbar";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await getquiz();
        // Parse options/answers if stored as strings in MockAPI
        const parsed = data.map(q => ({
          ...q,
          options: typeof q.options === "string" ? JSON.parse(q.options) : q.options,
          answers: typeof q.answers === "string" ? JSON.parse(q.answers) : q.answers
        }));
        setQuestions(parsed);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quiz.");
        setLoading(false);
        console.log(err);
      }
    }
    fetchQuiz();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] text-2xl">Loading quiz...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] text-2xl text-red-400">{error}</div>
      </div>
    );
  }
  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] text-2xl">No quiz questions found.</div>
      </div>
    );
  }

  const q = questions[current];

  if (!Array.isArray(q.options)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] text-2xl text-red-400">
          Error: Malformed quiz data. Options missing or not an array.
        </div>
      </div>
    );
  }

  const handleOption = idx => {
    if (!submitted) setSelected(idx);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (q.answers.includes(q.options[selected])) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current === questions.length - 1) {
      navigate("/result", {
        state: {
          score: q.answers.includes(q.options[selected]) ? score + 1 : score,
          total: questions.length
        }
      });
    } else {
      setCurrent(c => Math.min(c + 1, questions.length - 1));
      setSelected(null);
      setSubmitted(false);
    }
  };

  const handlePrev = () => {
    setCurrent(c => Math.max(c - 1, 0));
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl">
              🧠
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI Quiz Challenge</h1>
          </div>
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm">
              Question {current + 1} of {questions.length}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="card-modern animate-slide-up">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
              {q.question}
            </h2>
            
            <div className="space-y-4">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOption(idx)}
                  disabled={submitted}
                  className={`w-full text-left p-6 rounded-2xl font-medium text-lg transition-all duration-200 border-2 ${
                    selected === idx
                      ? submitted
                        ? q.answers.includes(opt)
                          ? "bg-green-50 text-green-800 border-green-300 shadow-lg"
                          : "bg-red-50 text-red-800 border-red-300 shadow-lg"
                        : "bg-blue-50 text-blue-800 border-blue-300 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                  style={{ cursor: submitted ? "default" : "pointer" }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                      selected === idx
                        ? submitted
                          ? q.answers.includes(opt)
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{opt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selected === null}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 ${
                  selected === null 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "btn-primary hover:scale-105"
                }`}
              >
                {selected === null ? "Select an answer to continue" : "Submit Answer"}
              </button>
            ) : (
              <div className={`p-6 rounded-2xl text-center font-bold text-lg mb-4 animate-scale-in ${
                q.answers.includes(q.options[selected]) 
                  ? "bg-green-50 text-green-800 border-2 border-green-200" 
                  : "bg-red-50 text-red-800 border-2 border-red-200"
              }`}>
                <div className="text-2xl mb-2">
                  {q.answers.includes(q.options[selected]) ? "🎉 Correct!" : "❌ Incorrect"}
                </div>
                {!q.answers.includes(q.options[selected]) && (
                  <div className="text-sm font-normal">
                    Correct answer: {q.answers.join(", ")}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={current === 0}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                  current === 0 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "btn-secondary hover:scale-105"
                }`}
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!submitted}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                  !submitted 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "btn-primary hover:scale-105"
                }`}
              >
                {current === questions.length - 1 ? "Finish Quiz →" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
