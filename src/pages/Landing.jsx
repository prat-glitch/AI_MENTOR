import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Landing = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <Navbar />
    
    {/* Hero Section */}
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI Mentor for
            <span className="gradient-text block">JEE/NEET Success</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Personalized learning, smart quizzes, and progress tracking for ambitious students. 
            <span className="text-blue-600 font-semibold"> Transform your preparation</span> with AI-powered insights.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/signup"
              className="btn-primary text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            >
              🚀 Start Free Trial
            </Link>
            <Link
              to="/signin"
              className="btn-secondary text-lg px-8 py-4 rounded-2xl"
            >
              Sign In
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card-modern text-center animate-slide-up">
              <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div className="card-modern text-center animate-slide-up delay-200">
              <div className="text-3xl font-bold gradient-text mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="card-modern text-center animate-slide-up delay-400">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Features Section */}
    <section className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose AI Mentor?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of exam preparation with our cutting-edge AI technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-gradient text-center hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl">
              🧠
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Learning</h3>
            <p className="text-gray-600">
              AI adapts to your learning style and pace, providing personalized study plans and recommendations.
            </p>
          </div>
          
          <div className="card-gradient text-center hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl">
              📊
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your performance with detailed analytics and insights to stay on track with your goals.
            </p>
          </div>
          
          <div className="card-gradient text-center hover-lift">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Feedback</h3>
            <p className="text-gray-600">
              Get immediate feedback on quizzes and practice tests to identify areas for improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    {/* CTA Section */}
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Ace Your Exams?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of successful students who have transformed their preparation with AI Mentor.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center bg-white text-blue-600 font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300"
        >
          Get Started Now
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </section>
  </div>
);

export default Landing;
