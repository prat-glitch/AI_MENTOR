import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuizIcon from "@mui/icons-material/Quiz";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if user is logged in (you can modify this logic based on your auth implementation)
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem('token');
    // Redirect to sign in page
    navigate('/signin');
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  
  const navLinks = [
    { to: "/", label: "Home", icon: <HomeIcon fontSize="small" /> },
    { to: "/signin", label: "Login", icon: <LoginIcon fontSize="small" /> },
    { to: "/signup", label: "Sign Up", icon: <PersonAddIcon fontSize="small" /> },
    { to: "/dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
    { to: "/quiz", label: "Quiz", icon: <QuizIcon fontSize="small" /> },
    { to: "/profile-setup", label: "Profile", icon: <PersonIcon fontSize="small" /> }
  ];

  // Filter out certain links based on current page and login status
  const getVisibleLinks = () => {
    const currentPath = location.pathname;
    
    // If user is logged in, show different navigation
    if (isLoggedIn) {
      // For auth pages when logged in, redirect to dashboard
      if (currentPath === "/signin" || currentPath === "/signup") {
        return navLinks.filter(link => 
          link.to === "/" || link.to === "/dashboard" || link.to === "/profile-setup"
        );
      }
      
      // For other pages when logged in, show main navigation
      return navLinks.filter(link => 
        link.to !== "/signin" && link.to !== "/signup"
      );
    }
    
    // If user is not logged in, show auth navigation
    if (currentPath === "/signin" || currentPath === "/signup") {
      return navLinks.filter(link => 
        link.to === "/" || 
        (currentPath === "/signin" ? link.to === "/signup" : link.to === "/signin")
      );
    }
    
    // For profile setup when not logged in, show limited navigation
    if (currentPath === "/profile-setup") {
      return navLinks.filter(link => 
        link.to === "/" || link.to === "/signin" || link.to === "/signup"
      );
    }
    
    // For quiz and result pages when not logged in, show limited navigation
    if (currentPath === "/quiz" || currentPath === "/result") {
      return navLinks.filter(link => 
        link.to === "/" || link.to === "/signin" || link.to === "/signup"
      );
    }
    
    // For splash page, show minimal navigation
    if (currentPath === "/splash") {
      return navLinks.filter(link => 
        link.to === "/" || link.to === "/signin" || link.to === "/signup"
      );
    }
    
    // Default: show all links
    return navLinks;
  };

  const visibleLinks = getVisibleLinks();

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-bold text-xl gradient-text">Mentor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {visibleLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover-lift ${
                  location.pathname === link.to
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            
            {/* Logout Button - Only show when logged in */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover-lift text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <span className="text-lg">🚪</span>
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg rounded-2xl mt-2 shadow-xl border border-white/20">
              {visibleLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    location.pathname === link.to
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {/* Mobile Logout Button - Only show when logged in */}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left"
                >
                  <span className="text-lg"><LoginIcon fontSize="small" /></span>
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
