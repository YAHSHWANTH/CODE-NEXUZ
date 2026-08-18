import React, { useState, useEffect, useRef } from "react";
import {
  FaRocket,
  FaUsers,
  FaBookOpen,
  FaGlobe,
  FaAward,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

// 🌟 Counter Animation Component
const AnimatedCounter = ({ target, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 1500; // 1.5s smooth count-up
    const frameTime = 1000 / 60;
    const totalFrames = Math.round(duration / frameTime);
    const increment = target / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, frameTime);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <span ref={counterRef}>
      {target % 1 !== 0 ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
};

const EnterpriseImpact = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-purple-50/30 to-white relative overflow-hidden" id="enterprise-impact">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 text-center">
        
        {/* Badge */}
        <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-200 mb-4">
          ✦ REAL-WORLD STARTUP IMPACT
        </span>

        {/* Title */}
        <h2 className="text-3.5xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Empowering Developers. Built for{" "}
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Real Tech Growth
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          KodNexuz accelerates tech learning and software delivery with hands-on project builds, expert mentor guidance, and reliable cloud tools.
        </p>

        {/* Stat Counters Grid with Gradual Number Increase Animation */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition duration-300 text-center group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <FaRocket className="text-pink-500 text-3xl mx-auto mb-2" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              <AnimatedCounter target={10} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Projects & Builds Delivered
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition duration-300 text-center group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <FaUsers className="text-purple-500 text-3xl mx-auto mb-2" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              <AnimatedCounter target={5} suffix="+" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Expert Mentors & Engineers
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition duration-300 text-center group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <FaBookOpen className="text-indigo-500 text-3xl mx-auto mb-2" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              <AnimatedCounter target={100} suffix="%" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Hands-On Practical Curriculum
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition duration-300 text-center group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <FaGlobe className="text-cyan-500 text-3xl mx-auto mb-2" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              <AnimatedCounter target={99.9} suffix="%" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Cloud Infrastructure SLA
            </div>
          </div>

        </div>

        {/* Believable Startup Trust Pillars */}
        <div className="mt-12 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaAward className="text-pink-400 text-2xl" />
                <h3 className="text-xl font-bold text-white">Proven Track Record</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Over 10+ full-stack projects, web applications, and developer tracks completed with clean code and zero security issues.
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
                <h3 className="text-xl font-bold text-white">Dedicated Support SLA</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Prompt mentor guidance and sub-15 minute technical support during active project working hours.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default EnterpriseImpact;
