import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getquiz } from "../services/quizservice";

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
    return <div className="min-h-screen flex items-center justify-center text-2xl">Loading quiz...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-2xl text-red-400">{error}</div>;
  }
  if (!questions.length) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">No quiz questions found.</div>;
  }

  const q = questions[current];

  if (!Array.isArray(q.options)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-red-400">
        Error: Malformed quiz data. Options missing or not an array.
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-10 min-w-[340px] max-w-md w-full flex flex-col items-stretch">
        <div className="font-semibold text-lg mb-4">Problem {current + 1} of {questions.length}</div>
        <div className="text-2xl font-bold mb-6">{q.question}</div>
        <div className="flex flex-col gap-3 mb-7">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOption(idx)}
              disabled={submitted}
              className={
                `rounded-xl px-4 py-3 font-medium text-base transition border ` +
                (selected === idx
                  ? submitted
                    ? (q.answers.includes(opt)
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-red-400 text-white border-red-400")
                    : "bg-indigo-500 text-white border-indigo-500"
                  : "bg-gray-100 text-gray-900 border-gray-200 hover:bg-indigo-50")
              }
              style={{ cursor: submitted ? "default" : "pointer" }}
            >
              {opt}
            </button>
          ))}
        </div>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className={`w-full rounded-xl py-3 font-bold text-lg mb-4 transition shadow-md ` +
              (selected === null ? "bg-gray-300 text-white cursor-not-allowed" : "bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer")}
          >
            Submit
          </button>
        ) : (
          <div className={`font-bold text-lg mb-4 ${q.answers.includes(q.options[selected]) ? "text-green-500" : "text-red-400"}`}>
            {q.answers.includes(q.options[selected])
              ? "Correct!"
              : `Incorrect. Correct answer: ${q.answers.join(", ")}`}
          </div>
        )}
        <div className="flex justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className={`w-full rounded-lg py-2 font-medium text-base transition ` +
              (current === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-indigo-50 text-indigo-500 hover:bg-indigo-100 cursor-pointer")}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!submitted}
            className={`w-full rounded-lg py-2 font-medium text-base transition ` +
              (!submitted ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-indigo-50 text-indigo-500 hover:bg-indigo-100 cursor-pointer")}
          >
            {current === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
