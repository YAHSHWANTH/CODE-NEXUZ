import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaCloud,
  FaUsers,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaDatabase,
  FaLock,
} from "react-icons/fa";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    { slug: "custom-software", icon: <FaCode className="text-3xl text-purple-600" />, title: "Custom Software", desc: "Tailor-made applications designed to fit your business needs." },
    { slug: "cloud-solutions", icon: <FaCloud className="text-3xl text-blue-600" />, title: "Cloud Solutions", desc: "Scale effortlessly with secure and reliable cloud services." },
    { slug: "team-collaboration", icon: <FaUsers className="text-3xl text-pink-600" />, title: "Team Collaboration", desc: "Boost productivity with advanced collaboration tools." },
    { slug: "ai-integration", icon: <FaRobot className="text-3xl text-purple-600" />, title: "AI Integration", desc: "Leverage AI to automate tasks and gain insights." },
    { slug: "secure-systems", icon: <FaShieldAlt className="text-3xl text-emerald-600" />, title: "Secure Systems", desc: "Enterprise-grade security built into every solution." },
    { slug: "data-analytics", icon: <FaChartLine className="text-3xl text-indigo-600" />, title: "Data Analytics", desc: "Unlock the power of data for smarter decisions." },
    { slug: "database-management", icon: <FaDatabase className="text-3xl text-blue-600" />, title: "Database Management", desc: "Reliable, optimized, and scalable database solutions." },
    { slug: "privacy-first", icon: <FaLock className="text-3xl text-rose-600" />, title: "Privacy First", desc: "Your data is protected with advanced encryption." },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-20" id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        {/* Title */}
        <h2 className="text-3.5xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight codevia-mouse-tilt" data-tilt-factor="1.2">
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
              onClick={() => navigate(`/feature/${feature.slug}`)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 cursor-pointer border border-gray-100 codevia-card-hover flex flex-col justify-between group text-left"
            >
              <div>
                <div className="flex justify-start mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                <span>Deep Feature Breakdown</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
