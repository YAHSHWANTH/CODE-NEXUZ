import React, { useState } from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleCareerClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo("signup-form", {
          smooth: true,
          duration: 800,
          offset: -70,
        });
      }, 300);
    } else {
      scroller.scrollTo("signup-form", {
        smooth: true,
        duration: 800,
        offset: -70,
      });
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between h-16 items-center">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/logoo.png" alt="KodNexuz Logo" className="h-10 w-auto" />
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
