import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleCareerClick = () => {
    if (window.openAuthModal) {
      window.openAuthModal("signup");
    }
  };

  const handleLoginClick = () => {
    if (window.openAuthModal) {
      window.openAuthModal("login");
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

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between h-16 items-center">
        
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img src="/logoo.png" alt="KodNexuz Logo" width="160" height="56" fetchpriority="high" className="h-14 w-auto object-contain py-1" />
          {/* <span
            className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
            style={{ fontFamily: "Garalama, sans-serif" }}
          >
            KodNexuz
          </span> */}
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <ScrollLink to="home" smooth={true} duration={800} offset={-70} className="cursor-pointer hover:text-indigo-600 transition">
            Home
          </ScrollLink>

          <ScrollLink to="features" smooth={true} duration={800} offset={-70} className="cursor-pointer hover:text-indigo-600 transition">
            Features
          </ScrollLink>

          <ScrollLink to="how-it-works" smooth={true} duration={800} offset={-70} className="cursor-pointer hover:text-indigo-600 transition">
            Courses
          </ScrollLink>

          <ScrollLink to="faq" smooth={true} duration={800} offset={-70} className="cursor-pointer hover:text-indigo-600 transition">
            FAQ
          </ScrollLink>

          {/* ✅ UPDATED Career Button */}
          <button
            onClick={handleCareerClick}
            className="cursor-pointer hover:text-indigo-600 transition"
          >
            Career
          </button>

          {/* Login Button */}
          <button
            onClick={handleLoginClick}
            className="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition font-bold"
          >
            Login
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
            <ScrollLink onClick={() => setIsOpen(false)} to="home" smooth={true} duration={800} offset={-70} className="cursor-pointer hover:text-indigo-600 transition">
              Home
            </ScrollLink>
            <ScrollLink onClick={() => setIsOpen(false)} to="features" smooth={true} duration={800} offset={-70} className="cursor-pointer hover:text-indigo-600 transition">
              Features
            </ScrollLink>
            <ScrollLink onClick={() => setIsOpen(false)} to="how-it-works" smooth={true} duration={800} offset={-70} className="cursor-pointer hover:text-indigo-600 transition">
              Courses
            </ScrollLink>
            <ScrollLink onClick={() => setIsOpen(false)} to="faq" smooth={true} duration={800} offset={-70} className="cursor-pointer hover:text-indigo-600 transition">
              FAQ
            </ScrollLink>
            <button
              onClick={() => { setIsOpen(false); handleCareerClick(); }}
              className="cursor-pointer text-left hover:text-indigo-600 transition"
            >
              Career
            </button>

            <button
              onClick={() => { setIsOpen(false); handleLoginClick(); }}
              className="cursor-pointer text-left font-bold text-purple-600 hover:text-indigo-600 transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
