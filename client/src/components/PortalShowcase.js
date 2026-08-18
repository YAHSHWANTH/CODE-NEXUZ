import React, { useState } from "react";
import {
  FaGraduationCap,
  FaChartLine,
  FaQrcode,
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
  FaPaperPlane,
  FaUserCheck,
  FaDownload,
} from "react-icons/fa";

const tabsData = [
  {
    id: "student",
    icon: <FaGraduationCap className="text-xl" />,
    title: "Student Learning Portal",
    subtitle: "Interactive course dashboard, progress tracking, live projects & direct certificate downloads.",
    color: "from-pink-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "admin",
    icon: <FaChartLine className="text-xl" />,
    title: "Admin Intelligence & Analytics",
    subtitle: "Automated student registration tracking, enrollment velocity, and Brevo email action triggers.",
    color: "from-purple-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "verify",
    icon: <FaQrcode className="text-xl" />,
    title: "Instant Certificate Verifier",
    subtitle: "Unique QR code validation and tamper-proof credential verification system.",
    color: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ai",
    icon: <FaRobot className="text-xl" />,
    title: "KodNexuz AI Assistant 2.0",
    subtitle: "Google Gemini multi-model intelligence for automated analysis & email drafting.",
    color: "from-indigo-600 to-cyan-600",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
  },
];

const PortalShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleOpenAuth = () => {
    if (window.openAuthModal) {
      window.openAuthModal("signup");
    } else {
      const el = document.getElementById("signup-form");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white text-gray-900 relative overflow-hidden" id="portal-showcase">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-200 mb-4">
            ✦ KODNEXUZ PRODUCT SUITE
          </span>
          <h2 className="text-3.5xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            KodNexuz Platform{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-medium">
            Business Intelligence · Analytics · AI — all in one verified source
          </p>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side (Interactive Portal Window Mockup with REALISTIC UI SCREENSHOT) - 7 cols */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden text-white">
            {/* Browser Header Bar */}
            <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="bg-slate-900 text-slate-300 text-xs font-mono px-4 py-1.5 rounded-full border border-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>app.kodnexuz.in / portal / {tabsData[activeTab].id}</span>
              </div>
              <div className="w-12"></div>
            </div>

            {/* Dynamic View Content + Realistic Portal UI Screenshot Image */}
            <div className="p-6 sm:p-8 min-h-[400px] flex flex-col justify-between space-y-6">
              
              {/* Realistic Portal UI Screenshot Mockup Banner */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 group">
                <img
                  src={tabsData[activeTab].image}
                  alt={tabsData[activeTab].title}
                  className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-4 sm:p-5">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="bg-pink-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        LIVE PORTAL VIEW
                      </span>
                      <div className="text-white font-bold text-base mt-1">
                        {tabsData[activeTab].title}
                      </div>
                    </div>
                    <span className="text-xs text-purple-300 font-mono bg-slate-900/80 px-3 py-1 rounded-lg border border-purple-500/30">
                      v2.0 Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Overlay Metrics based on Active Tab */}
              {activeTab === 0 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                      <div className="text-xs text-slate-400">Course Progress</div>
                      <div className="text-xl font-bold text-white mt-1">85% Completed</div>
                      <div className="w-full bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full w-[85%]"></div>
                      </div>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                      <div className="text-xs text-slate-400">Live Projects</div>
                      <div className="text-xl font-bold text-white mt-1">4 Completed</div>
                      <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                        <FaCheckCircle /> Ready for Certificate
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaDownload className="text-pink-400 text-lg" />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">Verified Internship Certificate</div>
                        <div className="text-[11px] text-slate-400">Credential ID: KNX-2026-9841</div>
                      </div>
                    </div>
                    <button onClick={handleOpenAuth} className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer">
                      Download PDF
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <div className="text-[11px] text-slate-400">Total Registered</div>
                      <div className="text-lg font-bold text-white mt-0.5">500+</div>
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <div className="text-[11px] text-slate-400">Active Users</div>
                      <div className="text-lg font-bold text-green-400 mt-0.5">300+</div>
                    </div>
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <div className="text-[11px] text-slate-400">Pending Actions</div>
                      <div className="text-lg font-bold text-yellow-400 mt-0.5">45 Users</div>
                    </div>
                  </div>

                  <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Batch Email Action (Brevo API)</div>
                      <div className="text-[11px] text-slate-400">Selected 45 pending users for enrollment reminders.</div>
                    </div>
                    <button onClick={handleOpenAuth} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer">
                      <FaPaperPlane /> Launch Email
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
                    <div className="w-16 h-16 bg-white p-1.5 rounded-lg flex items-center justify-center shrink-0">
                      <FaQrcode className="text-slate-900 w-full h-full" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <FaUserCheck /> Authentic Student Record Verified
                      </div>
                      <div className="text-sm font-bold text-white">Certificate Holder: Alex Morgan</div>
                      <div className="text-xs text-slate-300">Track: Full-Stack Web Development</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
                    <div className="text-xs text-indigo-300 font-bold">User Prompt:</div>
                    <div className="text-xs text-slate-200 font-mono bg-slate-950 p-2 rounded-lg border border-slate-800">
                      "Draft reminder email to pending students who registered yesterday"
                    </div>
                    <div className="text-[11px] text-green-400 flex items-center gap-1 font-bold">
                      <FaCheckCircle /> Generated draft ready with direct login link!
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Card Controls */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Active Portal Module: {tabsData[activeTab].title}</span>
                <span className="text-purple-400 font-bold">Interactive Preview ⚡</span>
              </div>
            </div>
          </div>

          {/* Right Side (Selectable Clean Light Tabs Navigation) - 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            {tabsData.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? "bg-white border-purple-500 shadow-xl ring-2 ring-purple-400/20"
                      : "bg-white border-gray-200 hover:border-purple-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        isActive
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {tab.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-bold text-base ${isActive ? "text-gray-900" : "text-gray-800"}`}>
                          {tab.title}
                        </h3>
                        <FaArrowRight className={`text-xs transition-transform duration-300 ${isActive ? "text-purple-600 translate-x-1" : "text-gray-400"}`} />
                      </div>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {tab.subtitle}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAuth();
                        }}
                        className="text-xs font-bold text-purple-600 hover:text-pink-600 transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>Access {tab.title}</span>
                        <span>→</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalShowcase;
