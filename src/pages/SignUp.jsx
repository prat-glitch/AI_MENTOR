import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/profile-setup");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-10 min-w-[320px] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form className="w-full" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-6 text-base focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-500 text-white font-bold text-lg mb-4 hover:bg-indigo-600 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="text-gray-500 text-base">
          <span>Already have an account? </span>
          <Link to="/signin" className="text-indigo-500 font-medium">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
