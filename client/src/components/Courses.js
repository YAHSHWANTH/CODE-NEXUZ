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
    logo: <FaHtml5 className="text-orange-500 w-16 h-16 mx-auto" />,
    desc: "Learn HTML, CSS, JavaScript, and modern frameworks to build responsive websites.",
  },
  {
    id: 2,
    title: "App Development",
    logo: <FaAndroid className="text-green-500 w-16 h-16 mx-auto" />,
    desc: "Create mobile applications for Android & iOS using Flutter, React Native, or native tools.",
  },
  {
    id: 3,
    title: "Java",
    logo: <FaJava className="text-red-500 w-16 h-16 mx-auto" />,
    desc: "Master Java programming for backend, desktop, and Android application development.",
  },
  {
    id: 4,
    title: "Python",
    logo: <FaPython className="text-blue-500 w-16 h-16 mx-auto" />,
    desc: "Learn Python programming for web, automation, AI, and data science projects.",
  },
  {
    id: 5,
    title: "Data Science & AI",
    logo: <FaBrain className="text-purple-500 w-16 h-16 mx-auto" />,
    desc: "Master Machine Learning, Data Analytics, Python Pandas, and AI model deployment.",
  },
  {
    id: 6,
    title: "Cloud & DevOps",
    logo: <FaCloud className="text-cyan-500 w-16 h-16 mx-auto" />,
    desc: "Master AWS, Docker, Kubernetes, CI/CD pipelines, and cloud edge infrastructure.",
  },
  {
    id: 7,
    title: "Cyber Security",
    logo: <FaShieldAlt className="text-emerald-500 w-16 h-16 mx-auto" />,
    desc: "Learn Ethical Hacking, Network Defense, Security Audits, and OWASP penetration testing.",
  },
  {
    id: 8,
    title: "UI/UX Design",
    logo: <FaFigma className="text-pink-500 w-16 h-16 mx-auto" />,
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4 codevia-mouse-tilt" data-tilt-factor="1.2">
            Virtual Internships &{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Get started with KodNexuz Trending Internships & Courses!
          </p>

          {/* Courses Grid - 8 Trending Courses */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between border border-gray-100 codevia-card-hover hover:border-pink-400 hover:shadow-xl hover:-translate-y-2 transform transition duration-300 ease-in-out cursor-pointer group"
                onClick={() => {
                  if (window.openAuthModal) {
                    window.openAuthModal("signup");
                  }
                }}
              >
                <div className="mb-4 animate-bounce hover:animate-none transition-all duration-500">
                  {course.logo}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
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
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-xl shadow-lg hover:opacity-90 hover:scale-105 transition duration-300 text-lg font-semibold cursor-pointer"
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
