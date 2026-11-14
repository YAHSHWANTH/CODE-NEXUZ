// src/components/Courses.js
import React from "react";
import {
  FaHtml5,
  FaAndroid,
  FaJava,
  FaPython,
  FaBrain,
  FaCloud,
  FaShieldAlt,
  FaFigma,
} from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "Web Development",
    logo: <FaHtml5 className="text-orange-500 text-3xl" />,
    desc: "Learn HTML, CSS, JavaScript, and modern frameworks to build responsive websites.",
  },
  {
    id: 2,
    title: "App Development",
    logo: <FaAndroid className="text-green-500 text-3xl" />,
    desc: "Create mobile applications for Android & iOS using Flutter, React Native, or native tools.",
  },
  {
    id: 3,
    title: "Java",
    logo: <FaJava className="text-red-500 text-3xl" />,
    desc: "Master Java programming for backend, desktop, and Android application development.",
  },
  {
    id: 4,
    title: "Python",
    logo: <FaPython className="text-blue-500 text-3xl" />,
    desc: "Learn Python programming for web, automation, AI, and data science projects.",
  },
  {
    id: 5,
    title: "Data Science & AI",
    logo: <FaBrain className="text-purple-500 text-3xl" />,
    desc: "Master Machine Learning, Data Analytics, Python Pandas, and AI model deployment.",
  },
  {
    id: 6,
    title: "Cloud & DevOps",
    logo: <FaCloud className="text-cyan-500 text-3xl" />,
    desc: "Master AWS, Docker, Kubernetes, CI/CD pipelines, and cloud edge infrastructure.",
  },
  {
    id: 7,
    title: "Cyber Security",
    logo: <FaShieldAlt className="text-emerald-500 text-3xl" />,
    desc: "Learn Ethical Hacking, Network Defense, Security Audits, and OWASP penetration testing.",
  },
  {
    id: 8,
    title: "UI/UX Design",
    logo: <FaFigma className="text-pink-500 text-3xl" />,
    desc: "Master Figma, User Research, Wireframing, Prototyping, and modern product UI design.",
  },
];

const Courses = () => {
  return (
    <main className="pt-6 md:pt-16">
      <section
        id="courses"
        className="py-12 md:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          {/* Heading */}
          <h2 className="text-3.5xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 scroll-reveal-text">
            Virtual Internships &{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-gray-600 mb-12 text-base sm:text-lg scroll-reveal-text delay-1">
            Get started with KodNexuz Trending Internships & Courses!
          </p>

          {/* Courses Grid - 8 Trending Courses */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course, idx) => (
              <div
                key={course.id}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-xl p-6 flex flex-col items-center justify-between border border-gray-100 hover:border-purple-300 codevia-card-hover cursor-pointer group scroll-reveal-card delay-${(idx % 4) + 1}`}
                onClick={() => {
                  if (window.openAuthModal) {
                    window.openAuthModal("signup");
                  }
                }}
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-2xl bg-purple-50/70 group-hover:bg-purple-100/90 group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                  {course.logo}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {course.desc}
                </p>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                if (window.openAuthModal) {
                  window.openAuthModal("signup");
                } else {
                  const el = document.getElementById("signup-form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 text-base font-semibold cursor-pointer"
            >
              View All Courses & Enroll
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Courses;
