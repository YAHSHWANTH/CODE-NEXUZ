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
} from "react-icons/fa";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      slug: "custom-software",
      icon: <FaReact className="text-4xl text-cyan-500 group-hover:rotate-45 transition-transform duration-500" />,
      title: "Custom Software",
      desc: "Tailor-made applications designed to fit your business needs.",
      brandTag: "React 19 & Node.js",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    {
      slug: "cloud-solutions",
      icon: <FaAws className="text-4xl text-amber-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Cloud Solutions",
      desc: "Scale effortlessly with secure and reliable cloud services.",
      brandTag: "AWS & CDN Edge",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      slug: "team-collaboration",
      icon: <FaGithub className="text-4xl text-slate-800 group-hover:scale-110 transition-transform duration-300" />,
      title: "Team Collaboration",
      desc: "Boost productivity with advanced collaboration tools.",
      brandTag: "Git & Agile Workspaces",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    },
    {
      slug: "ai-integration",
      icon: <FaBrain className="text-4xl text-purple-600 group-hover:animate-pulse transition-all duration-300" />,
      title: "AI Integration",
      desc: "Leverage AI to automate tasks and gain insights.",
      brandTag: "Google Gemini 2.0",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      slug: "secure-systems",
      icon: <FaShieldAlt className="text-4xl text-emerald-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Secure Systems",
      desc: "Enterprise-grade security built into every solution.",
      brandTag: "Zero-Trust & Bcrypt",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      slug: "data-analytics",
      icon: <FaChartLine className="text-4xl text-indigo-600 group-hover:translate-x-1 transition-transform duration-300" />,
      title: "Data Analytics",
      desc: "Unlock the power of data for smarter decisions.",
      brandTag: "Real-Time Visuals",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      slug: "database-management",
      icon: <FaDatabase className="text-4xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: "Database Management",
      desc: "Reliable, optimized, and scalable database solutions.",
      brandTag: "MongoDB Atlas Cloud",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      slug: "privacy-first",
      icon: <FaUserShield className="text-4xl text-rose-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Privacy First",
      desc: "Your data is protected with advanced encryption.",
      brandTag: "2-Factor OTP Guard",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
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

        {/* Features Grid with Real-World Brand Logos */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(`/feature/${feature.slug}`)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-purple-300 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center group flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 group-hover:bg-purple-50 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-sm border border-gray-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{feature.desc}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${feature.badgeColor}`}>
                  {feature.brandTag}
                </span>
                <span className="text-xs font-bold text-purple-600 group-hover:text-pink-500 transition-colors">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
