import React from "react";
import {
  FaBuilding,
  FaUsers,
  FaRocket,
  FaGlobe,
  FaShieldAlt,
  FaCheckCircle,
  FaAward,
} from "react-icons/fa";

const stats = [
  { icon: <FaRocket className="text-pink-500 text-3xl mx-auto mb-2" />, count: "1,200+", label: "Enterprise Projects Delivered" },
  { icon: <FaUsers className="text-purple-500 text-3xl mx-auto mb-2" />, count: "500+", label: "Full-Stack Engineers & Mentors" },
  { icon: <FaBuilding className="text-indigo-500 text-3xl mx-auto mb-2" />, count: "50+", label: "Global Corporate Partners" },
  { icon: <FaGlobe className="text-cyan-500 text-3xl mx-auto mb-2" />, count: "99.99%", label: "Cloud Infrastructure SLA" },
];

const EnterpriseImpact = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/40 to-white relative overflow-hidden" id="enterprise-impact">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 text-center">
        
        {/* Badge */}
        <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-200 mb-4">
          ✦ GLOBAL ENTERPRISE IT & SOFTWARE SERVICES
        </span>

        {/* Title */}
        <h2 className="text-3.5xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Built for Scale. Trusted by{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Global Enterprises
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          KodNexuz powers digital transformation for organizations worldwide with a dedicated workforce of over 500 software engineers, cloud architects, and AI specialists.
        </p>

        {/* Stat Counters Grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300 text-center group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                {stat.count}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Pillars */}
        <div className="mt-16 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaAward className="text-pink-400 text-2xl" />
                <h3 className="text-xl font-bold text-white">Proven Client Track Record</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Over 1,200 custom software applications engineered across FinTech, E-Learning, HealthTech, and SaaS industries with zero data leaks.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-emerald-400 text-2xl" />
                <h3 className="text-xl font-bold text-white">Bank-Grade Compliance</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                OWASP Top 10 security standards, bcrypt 10-round password salt hashing, and 2-Factor OTP verification via Brevo SMTP API.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-purple-400 text-2xl" />
                <h3 className="text-xl font-bold text-white">24/7 Dedicated Support SLA</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Sub-15 minute response times supported by senior engineers, cloud architects, and dedicated mentorship leads.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default EnterpriseImpact;
