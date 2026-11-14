// src/components/Home.js
import React, { useEffect, useRef } from "react";
import { FaBook, FaGraduationCap, FaCertificate } from "react-icons/fa";
import BlurText from "./BlurText";

const Home = ({ animateKey }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Programmatically ensure muted autoplay works smoothly across iOS & Android devices
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <section id="home" className="relative bg-slate-950 text-white min-h-screen min-h-[100dvh] flex items-center pt-28 pb-20 sm:pt-36 sm:pb-24 md:pt-48 md:pb-36 overflow-hidden">
      {/* 100% Responsive Background Video for Mobile, Tablet & Desktop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        className="absolute top-0 left-0 w-full h-full min-w-full min-h-full object-cover object-center z-0 pointer-events-none filter brightness-90 contrast-105"
      >
        <source src="/home-bg.mp4" type="video/mp4" />
        <source src="https://drive.google.com/uc?export=download&id=1hy0uf9Vj__wjHcfj4Q_jKgnrj0zSExwo" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for High Text Contrast & Visual Clarity */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90 z-[1] backdrop-blur-[1px] pointer-events-none" />

      {/* Ambient background glow highlights */}
      <div className="absolute top-1/3 left-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-purple-600/20 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none z-[1]" />
      <div className="absolute bottom-10 left-1/2 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-indigo-600/15 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
        {/* Left Side - Responsive Text in original position */}
        <div className="space-y-6 text-center md:text-left animate-fade-in-left max-w-2xl mx-auto md:mx-0">
          {/* WELCOME LINE */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <p className="uppercase tracking-widest text-xs font-semibold text-purple-200">
                Welcome to KodNexuz
              </p>
            </div>
          </div>

          {/* MAIN QUOTE */}
          <div className="text-[22px] min-[380px]:text-[26px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[48px] font-extrabold leading-tight text-white drop-shadow-md">
            <BlurText
              text="Learn. Grow. Get Certified"
              delay={100}
              animateBy="words"
              direction="top"
              highlightStartIndex={2}
              highlightClass="gradient-text-animate font-extrabold drop-shadow"
              className="justify-center md:justify-start flex-wrap whitespace-normal md:whitespace-nowrap"
            />
          </div>

          {/* FEATURE TAGS */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2.5 sm:gap-3.5 mt-6">
            <span className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-default">
              <FaBook className="text-pink-400 text-sm" />
              Free Courses
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-default">
              <FaGraduationCap className="text-purple-300 text-sm" />
              Quality Education
            </span>
            <span className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-default">
              <FaCertificate className="text-indigo-300 text-sm" />
              Certificates & Badges
            </span>
          </div>

          {/* SHORT DESCRIPTION */}
          <p className="text-sm sm:text-lg text-gray-200 leading-relaxed mt-6 max-w-2xl mx-auto md:mx-0 drop-shadow-sm font-normal">
            KodNexuz is a forward-thinking software and IT services
            company dedicated to building scalable, secure, and innovative
            digital solutions. We help organizations modernize their systems,
            adopt AI-powered tools, and move seamlessly to the cloud.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5 sm:gap-4 pt-2">
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 text-base sm:text-lg cursor-pointer"
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
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-semibold px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 text-base sm:text-lg cursor-pointer"
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
