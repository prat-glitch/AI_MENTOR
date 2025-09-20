import React from "react";

const LogoCard = () => (
  <div className="bg-white rounded-3xl shadow-xl px-8 py-12 flex flex-col items-center justify-center min-w-[320px] min-h-[360px] mx-auto">
    <div className="mb-6">
      {/* Replace with SVG or image as needed */}
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 10C53.8071 10 65 21.1929 65 35C65 48.8071 53.8071 60 40 60C26.1929 60 15 48.8071 15 35C15 21.1929 26.1929 10 40 10Z" fill="#F7B801"/>
        <path d="M40 10C53.8071 10 65 21.1929 65 35C65 48.8071 53.8071 60 40 60V10Z" fill="#2ECC71"/>
      </svg>
    </div>
    <h1 className="text-3xl font-bold m-0">AI Mentor</h1>
    <p className="text-white text-base mt-2">for JEE/NEET Success</p>
  </div>
);

export default LogoCard;
