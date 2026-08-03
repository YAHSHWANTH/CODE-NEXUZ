import React from "react";
import {
  FaCheck,
  FaTimes,
  FaDollarSign,
  FaClock,
  FaLaptop,
  FaChalkboardTeacher,
} from "react-icons/fa";

const FAQ = () => {
  const problems = [
    {
      icon: <FaDollarSign className="w-6 h-6 text-red-500" />,
      title: "Learning is expensive?",
      description: "Traditional education costs thousands of dollars, making it hard to access.",
    },
    {
      icon: <FaClock className="w-6 h-6 text-red-500" />,
      title: "Certifications take too long?",
      description: "Complicated processes and high requirements delay learners.",
    },
    {
      icon: <FaLaptop className="w-6 h-6 text-red-500" />,
      title: "Limited access to resources?",
      description: "Not everyone gets exposure to world-class materials.",
    },
    {
      icon: <FaChalkboardTeacher className="w-6 h-6 text-red-500" />,
      title: "Boring teaching methods?",
      description: "Static slides and theory-heavy content disengage learners.",
    },
  ];

  const solutions = [
    {
      icon: <FaCheck className="w-6 h-6 text-green-500" />,
      title: "Free & Affordable Learning",
      description: "Learn premium content without paying huge fees.",
    },
    {
      icon: <FaCheck className="w-6 h-6 text-blue-500" />,
      title: "Quick Certifications",
      description: "Earn certificates in weeks, not years.",
    },
    {
      icon: <FaCheck className="w-6 h-6 text-purple-500" />,
      title: "Unlimited Resources",
      description: "Access videos, labs, projects, and articles anytime.",
    },
    {
      icon: <FaCheck className="w-6 h-6 text-teal-500" />,
      title: "Interactive Learning",
      description: "Hands-on projects, quizzes, and gamified content.",
    },
  ];

  return (
    // 👇 add id here for react-scroll
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Code Nexus?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We solve the biggest challenges in modern tech learning.
          </p>
        </div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Problems */}
          <div className="space-y-8">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Common Problems</h3>
              <p className="text-gray-600">Challenges that learners often face</p>
            </div>
            {problems.map((problem, index) => (
              <div
                key={index}
                className="p-6 border border-red-200 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">{problem.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold">{problem.title}</h4>
                      <FaTimes className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-gray-700">{problem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-8">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-green-500 mb-4">Our Solutions</h3>
              <p className="text-gray-600">How Code Nexus bridges the gap</p>
            </div>
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="p-6 border border-green-200 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">{solution.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold">{solution.title}</h4>
                      {solution.icon}
                    </div>
                    <p className="text-gray-700">{solution.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
            Transform Your Learning Journey
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default FAQ;
