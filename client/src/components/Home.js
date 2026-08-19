// src/components/Home.js
import React from "react";
import { FaBook, FaGraduationCap, FaCertificate } from "react-icons/fa";
import BlurText from "./BlurText";

const Home = ({ animateKey }) => {
  return (
    <section id="home" className="relative bg-slate-950 text-white pt-32 pb-24 md:pt-52 md:pb-40 overflow-hidden">
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

      {/* Dark Overlay for Text Legibility & Cinematic Impression */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90 z-[1] backdrop-blur-[1px]" />

      {/* Ambient background glow highlights */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[130px] pointer-events-none z-[1]" />
      <div className="absolute bottom-10 left-1/2 w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Left Side - Text in original position */}
        <div className="space-y-6 text-center md:text-left animate-fade-in-left max-w-2xl">
          {/* WELCOME LINE */}
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <p className="uppercase tracking-widest text-xs sm:text-sm font-semibold text-purple-300">
              Welcome to KodNexuz
            </p>
          </div>

          {/* MAIN QUOTE */}
          <div className="text-[24px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[48px] font-extrabold leading-tight text-white drop-shadow-md">
            <BlurText
              text="Learn. Grow. Get Certified"
              delay={150}
              animateBy="words"
              direction="top"
              highlightStartIndex={2}
              highlightClass="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent font-extrabold drop-shadow"
              className="justify-center md:justify-start flex-wrap md:flex-nowrap whitespace-nowrap"
            />
          </div>

          {/* FEATURE TAGS */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mt-6">
            <span className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white shadow transition-all duration-300 hover:scale-105">
              <FaBook className="text-pink-400 text-sm animate-pulse" />
              Free Courses
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white shadow transition-all duration-300 hover:scale-105">
              <FaGraduationCap className="text-purple-400 text-sm animate-bounce" />
              Quality Education
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white shadow transition-all duration-300 hover:scale-105">
              <FaCertificate className="text-indigo-400 text-sm animate-spin" />
              Certificates & Badges
            </span>
          </div>

          {/* SHORT DESCRIPTION */}
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed mt-6 max-w-2xl mx-auto md:mx-0 drop-shadow-sm font-normal">
            KodNexuz is a forward-thinking software and IT services
            company dedicated to building scalable, secure, and innovative
            digital solutions. We help organizations modernize their systems,
            adopt AI-powered tools, and move seamlessly to the cloud.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
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
        </div>
      </div>
    </section>
  );
};

export default Home;
