// src/components/Howitworks.js
import React from "react";
import { FaHtml5, FaAndroid, FaJava, FaPython } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

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
];

const Courses = () => {
  return (
    <main className="pt-24 ">
      <section
        id="how-it-works"
        className="py-20 bg-white min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Virtual Internships &{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Get started with Code Nexus Technology Internships & Courses!
          </p>

          {/* Courses Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:border-pink-400 hover:shadow-xl hover:-translate-y-2 transform transition duration-300 ease-in-out"
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
          <div className="mt-12 flex justify-end px-6 lg:px-10">
            <ScrollLink
              to="signup-form"
              smooth={true}
              duration={800}
              offset={-70}
            >
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-xl shadow-md hover:opacity-90 hover:scale-105 transition duration-300 text-lg font-semibold">
                View All
              </button>
            </ScrollLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Courses;
