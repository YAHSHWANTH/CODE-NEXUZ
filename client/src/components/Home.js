// src/components/Home.js
import React from "react";
import { FaBook, FaGraduationCap, FaCertificate } from "react-icons/fa";
import BlurText from "./BlurText";

const Home = ({ animateKey }) => {
  return (
    <section id="home" className="relative bg-white text-black pt-32 pb-24 md:pt-52 md:pb-40 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        <source src="/home-bg.mp4" type="video/mp4" />
        <source src="https://drive.google.com/uc?export=download&id=1hy0uf9Vj__wjHcfj4Q_jKgnrj0zSExwo" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Light Overlay for Text Readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Left Side - Text */}
        <div className="space-y-6 text-center md:text-left animate-fade-in-left max-w-2xl">
          {/* WELCOME LINE */}
          <p className="uppercase tracking-widest text-xs sm:text-sm text-gray-600">
            Welcome to KodNexuz
          </p>

          {/* MAIN QUOTE */}
          <div className="text-[22px] sm:text-[32px] md:text-[36px] lg:text-[38px] xl:text-[48px] font-extrabold leading-tight text-gray-900">
            <BlurText
              text="Learn. Grow. Get Certified"
              delay={150}
              animateBy="words"
              direction="top"
              highlightStartIndex={2}
              highlightClass="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold"
              className="justify-center md:justify-start flex-wrap md:flex-nowrap whitespace-nowrap"
            />
          </div>

          {/* FEATURE TAGS */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mt-6">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 shadow transition-transform duration-300 hover:scale-110">
              <FaBook className="text-indigo-600 text-sm animate-pulse" />
              Free Courses
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 shadow transition-transform duration-300 hover:scale-105">
              <FaGraduationCap className="text-indigo-600 text-sm animate-bounce" />
              Quality Education
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 shadow transition-transform duration-300 hover:scale-110">
              <FaCertificate className="text-indigo-600 text-sm animate-spin" />
              Certificates & Badges
            </span>
          </div>

          {/* SHORT DESCRIPTION */}
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-6 max-w-2xl mx-auto md:mx-0">
            KodNexuz is a forward-thinking software and IT services
            company dedicated to building scalable, secure, and innovative
            digital solutions. We help organizations modernize their systems,
            adopt AI-powered tools, and move seamlessly to the cloud.
          </p>

          {/* EXPLORE BUTTON */}
          <button
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3.5 rounded-lg shadow-md hover:opacity-90 transition text-base sm:text-lg cursor-pointer"
            onClick={() => {
              const element = document.getElementById("signup-form");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
