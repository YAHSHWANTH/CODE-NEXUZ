import React from "react";
import {
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

const Touch = () => {
  // Smooth scroll helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="text-white w-full" style={{ backgroundColor: "#002147" }}>
      {/* Main Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center py-10 px-8 md:px-12">
        
        {/* LEFT SIDE - Logo + Social Media */}
        <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-10 lg:space-x-14">
          {/* Logo */}
          <img src="/logo.png" alt="KodNexuz Logo" width="144" height="56" className="w-36 mb-4 md:mb-0" />

          {/* Social Media Section */}
          <div className="flex flex-col items-start md:items-center">
            <p className="text-sm text-gray-300 mb-2">Do follow and support</p>
            <div className="flex space-x-4 text-2xl">
              <a
                href="https://www.youtube.com/@CODENexus-032"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 transition"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.linkedin.com/in/kodnexuz-tech-65bb99426/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com/CODENexus032"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/codenexus032/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Navigation + Contact */}
        <div className="flex flex-col items-center md:items-end space-y-5 mt-10 md:mt-0 md:pr-8 lg:pr-16">
          {/* Navigation Menu */}
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-lg font-medium">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-300 hover:text-white transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-300 hover:text-white transition"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-300 hover:text-white transition"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("signup-form")}
              className="text-gray-300 hover:text-white transition"
            >
              Career
            </button>
          </div>

          {/* Telegram & Email */}
          <div className="flex flex-col md:flex-row items-center md:space-x-6 text-sm text-gray-300 mt-2">
            <a
              href="https://t.me/CODENexus032"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-400 transition"
            >
              <FaTelegramPlane className="text-xl" />
              <span>Join our Telegram</span>
            </a>
            <a
              href="mailto:codenexus032@gmail.com"
              className="hover:text-pink-500 transition mt-2 md:mt-0"
            >
              codenexus032@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#001933] border-t border-gray-700 py-3 mt-6">
        <div className="max-w-6xl mx-auto flex justify-center items-center text-xs text-gray-400 px-4">
          <p>© 2025 KodNexuz. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
};

export default Touch;
