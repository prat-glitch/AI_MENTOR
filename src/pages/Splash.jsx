import React from "react";
import LogoCard from "../components/LogoCard";
import Navbar from "../components/Navbar";

const Splash = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <LogoCard />
    </div>
  </div>
);

export default Splash;
