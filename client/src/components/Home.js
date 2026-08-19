// src/components/Home.js
import React from "react";
import { FaBook, FaGraduationCap, FaCertificate, FaRocket, FaShieldAlt } from "react-icons/fa";
import BlurText from "./BlurText";

const Home = () => {
  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden bg-slate-950 text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-90 contrast-105"
      >
        <source src="/home-bg.mp4" type="video/mp4" />
        <source src="https://drive.google.com/uc?export=download&id=1hy0uf9Vj__wjHcfj4Q_jKgnrj0zSExwo" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay with Blur & Glowing Accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/65 to-slate-950/85 z-[1] backdrop-blur-[1px]" />
      
      {/* Ambient background glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-[1]" />
      <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none z-[1]" />

      {/* Hero Content Container */}
      <div className="relative z-[2] max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8 animate-fade-in">
        {/* Subtitle / Welcome pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-widest text-purple-300 uppercase shadow-inner">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          Welcome to KodNexuz
        </div>

        {/* Main Quote Title */}
        <div className="text-[28px] sm:text-[40px] md:text-[50px] lg:text-[56px] font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
          <BlurText
            text="Learn. Grow. Get Certified"
            delay={150}
            animateBy="words"
            direction="top"
            highlightStartIndex={2}
            highlightClass="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent font-extrabold drop-shadow"
            className="justify-center flex-wrap whitespace-nowrap"
          />
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2">
          <span className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium text-gray-100 shadow transition-transform duration-300 hover:scale-105">
            <FaBook className="text-pink-400 text-sm animate-pulse" />
            Free Courses
          </span>
          <span className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium text-gray-100 shadow transition-transform duration-300 hover:scale-105">
            <FaGraduationCap className="text-purple-400 text-sm animate-bounce" />
            Quality Education
          </span>
          <span className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium text-gray-100 shadow transition-transform duration-300 hover:scale-105">
            <FaCertificate className="text-indigo-400 text-sm animate-spin" />
            Certificates & Badges
          </span>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-normal drop-shadow-sm">
          KodNexuz is a forward-thinking software and IT services company dedicated to building scalable, secure, and innovative digital solutions. We help organizations modernize their systems, adopt AI-powered tools, and move seamlessly to the cloud.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 text-base sm:text-lg cursor-pointer"
            onClick={() => {
              const element = document.getElementById("courses") || document.getElementById("signup-form");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Explore Courses
          </button>
          <button
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold px-8 py-3.5 rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-base sm:text-lg cursor-pointer"
            onClick={() => {
              if (window.openAuthModal) {
                window.openAuthModal("signup");
              } else {
                const element = document.getElementById("signup-form");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
          >
            Get Started
          </button>
        </div>

        {/* Key Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-white/15 max-w-4xl mx-auto mt-8">
          <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <FaRocket className="text-pink-400 text-xl" />
            <div className="text-left">
              <div className="text-white font-bold text-sm sm:text-base">Modern Stack</div>
              <div className="text-gray-400 text-xs">AI & Cloud Ready</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <FaShieldAlt className="text-purple-400 text-xl" />
            <div className="text-left">
              <div className="text-white font-bold text-sm sm:text-base">Verified Badges</div>
              <div className="text-gray-400 text-xs">Secure Certification</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <FaGraduationCap className="text-indigo-400 text-xl" />
            <div className="text-left">
              <div className="text-white font-bold text-sm sm:text-base">Expert Mentors</div>
              <div className="text-gray-400 text-xs">Hands-on Learning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
