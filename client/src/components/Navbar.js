import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleCareerClick = () => {
    if (window.openAuthModal) {
      window.openAuthModal("signup");
    } else {
      handleNavClick("signup-form");
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (sectionId) => {
    if (isOpen) setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between h-16 items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img src="/logoo.png" alt="KodNexuz Logo" width="160" height="56" fetchpriority="high" className="h-14 w-auto object-contain py-1" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() => handleNavClick("home")}
            className="cursor-pointer font-bold text-gray-800 hover:text-indigo-600 transition"
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick("features")}
            className="cursor-pointer font-bold text-gray-800 hover:text-indigo-600 transition"
          >
            Features
          </button>

          <button
            onClick={() => handleNavClick("courses")}
            className="cursor-pointer font-bold text-gray-800 hover:text-indigo-600 transition"
          >
            Courses
          </button>

          <button
            onClick={() => handleNavClick("faq")}
            className="cursor-pointer font-bold text-gray-800 hover:text-indigo-600 transition"
          >
            FAQ
          </button>

          {/* Shining Career Button */}
          <button
            onClick={handleCareerClick}
            className="cursor-pointer bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-bold animate-gradient-shift"
          >
            Career
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-indigo-600 focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-4 py-4 space-y-4 flex flex-col">
            <button
              onClick={() => handleNavClick("home")}
              className="text-left font-bold text-gray-800 hover:text-indigo-600 transition"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("features")}
              className="text-left font-bold text-gray-800 hover:text-indigo-600 transition"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("courses")}
              className="text-left font-bold text-gray-800 hover:text-indigo-600 transition"
            >
              Courses
            </button>
            <button
              onClick={() => handleNavClick("faq")}
              className="text-left font-bold text-gray-800 hover:text-indigo-600 transition"
            >
              FAQ
            </button>
            <button
              onClick={() => { setIsOpen(false); handleCareerClick(); }}
              className="cursor-pointer text-center font-bold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 px-4 py-2 rounded-xl transition duration-300 animate-gradient-shift"
            >
              Career
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
