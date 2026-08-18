import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaReact,
  FaAws,
  FaGithub,
  FaBrain,
  FaShieldAlt,
  FaChartLine,
  FaDatabase,
  FaUserShield,
  FaArrowRight,
} from "react-icons/fa";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      slug: "custom-software",
      icon: <FaReact className="text-3xl text-indigo-600 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />,
      title: "Custom Software",
      desc: "Tailor-made applications designed to fit your business needs.",
    },
    {
      slug: "cloud-solutions",
      icon: <FaAws className="text-3xl text-amber-500 group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300" />,
      title: "Cloud Solutions",
      desc: "Scale effortlessly with secure and reliable cloud services.",
    },
    {
      slug: "team-collaboration",
      icon: <FaGithub className="text-3xl text-gray-800 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />,
      title: "Team Collaboration",
      desc: "Boost productivity with advanced collaboration tools.",
    },
    {
      slug: "ai-integration",
      icon: <FaBrain className="text-3xl text-purple-600 group-hover:animate-pulse group-hover:scale-110 transition-transform duration-300" />,
      title: "AI Integration",
      desc: "Leverage AI to automate tasks and gain insights.",
    },
    {
      slug: "secure-systems",
      icon: <FaShieldAlt className="text-3xl text-emerald-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Secure Systems",
      desc: "Enterprise-grade security built into every solution.",
    },
    {
      slug: "data-analytics",
      icon: <FaChartLine className="text-3xl text-indigo-500 group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" />,
      title: "Data Analytics",
      desc: "Unlock the power of data for smarter decisions.",
    },
    {
      slug: "database-management",
      icon: <FaDatabase className="text-3xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Database Management",
      desc: "Reliable, optimized, and scalable database solutions.",
    },
    {
      slug: "privacy-first",
      icon: <FaUserShield className="text-3xl text-rose-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Privacy First",
      desc: "Your data is protected with advanced encryption.",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-20" id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        {/* Title */}
        <h2 className="text-3.5xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight codevia-mouse-tilt" data-tilt-factor="0.8">
          Features of <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">KodNexuz?</span>
        </h2>
        
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto codevia-mouse-tilt" data-tilt-factor="0.5">
          At KodNexuz, we provide end-to-end solutions that combine innovation, efficiency, and security.
          Our team ensures seamless collaboration, cutting-edge technology, and personalized strategies for every client.
          Partner with us to accelerate growth and transform your business digitally.
        </p>

        {/* Features Grid with Clear Arrow Clickable Indicator & Icon Animations */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(`/feature/${feature.slug}`)}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-2xl hover:border-purple-300 transform hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-center group flex flex-col justify-between codevia-mouse-tilt"
              data-tilt-factor={index % 2 === 0 ? "0.6" : "0.9"}
            >
              <div>
                <div className="w-14 h-14 mx-auto mb-4 bg-purple-50/60 group-hover:bg-purple-100 rounded-xl flex items-center justify-center transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>

              {/* 🎯 Clear Arrow Clickable Indicator */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs font-bold text-purple-600 group-hover:text-pink-500 transition-colors">
                <span>Explore Details</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
