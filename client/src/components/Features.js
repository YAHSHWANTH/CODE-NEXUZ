import React from "react";
import {
  FaCode,
  FaCloud,
  FaUsers,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaDatabase,
  FaLock,
  // FaCogs,
} from "react-icons/fa";

const Features = () => {
  const features = [
    { icon: <FaCode className="text-3xl text-indigo-600" />, title: "Custom Software", desc: "Tailor-made applications designed to fit your business needs." },
    { icon: <FaCloud className="text-3xl text-indigo-600" />, title: "Cloud Solutions", desc: "Scale effortlessly with secure and reliable cloud services." },
    { icon: <FaUsers className="text-3xl text-indigo-600" />, title: "Team Collaboration", desc: "Boost productivity with advanced collaboration tools." },
    { icon: <FaRobot className="text-3xl text-indigo-600" />, title: "AI Integration", desc: "Leverage AI to automate tasks and gain insights." },
    { icon: <FaShieldAlt className="text-3xl text-indigo-600" />, title: "Secure Systems", desc: "Enterprise-grade security built into every solution." },
    { icon: <FaChartLine className="text-3xl text-indigo-600" />, title: "Data Analytics", desc: "Unlock the power of data for smarter decisions." },
    { icon: <FaDatabase className="text-3xl text-indigo-600" />, title: "Database Management", desc: "Reliable, optimized, and scalable database solutions." },
    { icon: <FaLock className="text-3xl text-indigo-600" />, title: "Privacy First", desc: "Your data is protected with advanced encryption." },
    // { icon: <FaCogs className="text-3xl text-indigo-600" />, title: "Automation Tools", desc: "Save time with automated workflows and integrations." },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-20" id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        {/* Title */}
        <h2 className="text-3.5xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Features of <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">KodNexuz?</span>
        </h2>
        
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          At KodNexuz, we provide end-to-end solutions that combine innovation, efficiency, and security.
          Our team ensures seamless collaboration, cutting-edge technology, and personalized strategies for every client.
          Partner with us to accelerate growth and transform your business digitally.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
