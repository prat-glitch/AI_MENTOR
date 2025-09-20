import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/signin", label: "Login" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/quiz", label: "Quiz" },
  { to: "/profile-setup", label: "Profile" }
];

const Landing = () => (
  <div className="min-h-screen bg-indigo-500">
    {/* Navbar */}
    <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-md sticky top-0 z-10">
      <div className="font-extrabold text-2xl text-indigo-500 tracking-wide">AI Mentor</div>
      <div className="flex gap-7">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="text-gray-800 font-medium text-lg px-1 border-b-2 border-transparent hover:border-indigo-500 transition"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
    {/* Hero Section */}
    <section className="flex flex-col items-center justify-center min-h-[70vh] px-4 pt-10">
      <div className="bg-white rounded-3xl shadow-xl px-8 py-12 max-w-xl w-full text-center">
        <div className="text-4xl font-extrabold text-gray-900 mb-4">
          Your AI Mentor for JEE/NEET Success
        </div>
        <div className="text-xl text-gray-500 mb-8">
          Personalized learning, smart quizzes, and progress tracking for ambitious students.
        </div>
        <Link
          to="/signup"
          className="bg-blue-300 text-black rounded-full px-10 py-4 font-bold text-lg shadow-md border-2 border-black hover:bg-blue-500 hover:border-blue-500 transition duration-300"
          >
            Get Started
        </Link>
      </div>
    </section>
  </div>
);

export default Landing;
