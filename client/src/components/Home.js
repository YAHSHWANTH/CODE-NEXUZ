// src/components/Home.js
import React from "react";
import Slider from "react-slick";
import { FaBook, FaGraduationCap, FaCertificate } from "react-icons/fa";
import BlurText from "./BlurText";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = ({ animateKey }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // ✅ hide arrows
  };

  return (
    <section id="home" className="bg-white text-black pt-32 pb-24 md:pt-52 md:pb-40 overflow-hidden">

  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Side - Text */}
      <div className="space-y-6 text-center md:text-left animate-fade-in-left">
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
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-800 shadow transition-transform duration-300 hover:scale-110">
              <FaBook className="text-indigo-600 text-sm animate-pulse" />
              Free Courses
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-800 shadow transition-transform duration-300 hover:scale-105">
              <FaGraduationCap className="text-indigo-600 text-sm animate-bounce" />
              Quality Education
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-800 shadow transition-transform duration-300 hover:scale-110">
              <FaCertificate className="text-indigo-600 text-sm animate-spin" />
              Certificates & Badges
            </span>
          </div>

          {/* SHORT DESCRIPTION */}
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-6 max-w-2xl mx-auto md:mx-0 codevia-mouse-tilt" data-tilt-factor="1.4">
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

      {/* Right Side - Carousel */}
      <div className="w-full max-w-md mx-auto animate-fade-in-right">
        <Slider {...settings}>
          <div>
            <img
              src="https://images.ctfassets.net/5i1m3im8l2b5/uP8R4sj9jDRbqawg3vfhb/fb307cebbd6f38a50a10813633c7cdba/You-can-use-remote-access-to-work-from-home.jpg?w=450&h=236&q=75&fm=webp&fit=fill"
              alt="Workspace with remote access setup"
              width="450"
              height="288"
              fetchpriority="high"
              className="rounded-xl shadow-lg w-full h-72 object-cover"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=540&h=360&fm=webp&q=75"
              alt="Team collaboration at office table"
              width="450"
              height="288"
              className="rounded-xl shadow-lg w-full h-72 object-cover"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=540&h=360&fm=webp&q=75"
              alt="Modern tech office workstations"
              width="450"
              height="288"
              className="rounded-xl shadow-lg w-full h-72 object-cover"
            />
          </div>
        </Slider>
      </div>
    </div>
  </div>
</section>

  );
};

export default Home;
