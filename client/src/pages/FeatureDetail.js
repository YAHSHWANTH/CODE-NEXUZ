import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCode,
  FaCloud,
  FaUsers,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaDatabase,
  FaLock,
  FaArrowLeft,
  FaCheckCircle,
  FaLockOpen,
  FaKey,
  FaSync,
  FaNetworkWired,
  FaShieldVirus,
  FaUserCheck,
  FaEnvelope,
  FaBolt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Touch from "../components/Touch";
import BorderGlow from "../components/BorderGlow";

// 🖼️ 1. Custom Software Detail View (Split Hero + Editor Mockup + Pipeline)
const CustomSoftwareView = ({ navigate }) => (
  <div className="space-y-16">
    {/* Split Hero with Real High-Res Developer Image */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-xl">
      <div className="space-y-6">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Tailor-Made Full-Stack Applications
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Precision Software Engineered for Your Industry
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          KodNexuz builds high-concurrency web applications using modular React 19 architecture, microservice backend APIS, and automated cloud CI/CD pipelines.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="bg-purple-50 px-4 py-2 rounded-xl text-purple-700 font-bold text-sm">✓ React 19</div>
          <div className="bg-purple-50 px-4 py-2 rounded-xl text-purple-700 font-bold text-sm">✓ Node.js Express</div>
          <div className="bg-purple-50 px-4 py-2 rounded-xl text-purple-700 font-bold text-sm">✓ REST & GraphQL</div>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-purple-200">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
          alt="Custom Software Development"
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent flex items-end p-6">
          <span className="text-white font-semibold text-sm">Full-Stack Code Architecture in Action</span>
        </div>
      </div>
    </div>

    {/* Visual Full-Stack Code Editor Mockup */}
    <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 font-mono text-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-slate-400 font-sans ml-2">AppService.js — KodNexuz Engine</span>
        </div>
        <span className="text-xs text-purple-400 font-sans font-bold">SOLID Modular Code</span>
      </div>

      <pre className="text-purple-300 leading-relaxed overflow-x-auto">
{`// KodNexuz Custom Enterprise Engine
import { createMicroservice, DatabaseCluster } from "@kodnexuz/core";

export const buildEnterpriseApp = async (clientRequirements) => {
  const db = await DatabaseCluster.connect({ ssl: true });
  const app = createMicroservice({
    architecture: "modular-monolith",
    performanceTier: "sub-second-latency",
    security: "OWASP-compliant-jwt"
  });

  return app.listen(4000, () => console.log("🚀 Custom Solution Ready"));
};`}
      </pre>
    </div>
  </div>
);

// 🖼️ 2. Cloud Solutions Detail View (Full-Bleed Datacenter + SLA Grid)
const CloudSolutionsView = ({ navigate }) => (
  <div className="space-y-16">
    {/* Full-Bleed Datacenter Hero Banner */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] flex items-center p-8 sm:p-12 text-white">
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
        alt="Cloud Infrastructure"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-slate-900/85 to-transparent"></div>

      <div className="relative z-10 max-w-xl space-y-4">
        <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-cyan-400/30">
          Global High-Speed Cloud
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          Serverless Infrastructure Powered by Edge CDN
        </h2>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
          Zero downtime deployments, automated SSL certificate validation, and globally distributed servers on Render & Vercel.
        </p>
      </div>
    </div>

    {/* SLA Metrics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-cyan-900 to-slate-900 text-white p-8 rounded-2xl border border-cyan-700/50 shadow-xl space-y-3">
        <FaNetworkWired className="text-4xl text-cyan-400" />
        <h3 className="text-xl font-bold">280+ Global Edge Nodes</h3>
        <p className="text-xs text-cyan-200">Delivering static and dynamic content with sub-50ms latency globally.</p>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 rounded-2xl border border-blue-700/50 shadow-xl space-y-3">
        <FaSync className="text-4xl text-blue-400" />
        <h3 className="text-xl font-bold">Zero-Downtime Rolling Deploys</h3>
        <p className="text-xs text-blue-200">Continuous integration pipelines ensuring non-stop uptime.</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 rounded-2xl border border-indigo-700/50 shadow-xl space-y-3">
        <FaLock className="text-4xl text-yellow-400" />
        <h3 className="text-xl font-bold">TLS 1.3 256-Bit Encryption</h3>
        <p className="text-xs text-indigo-200">Automatic renewal and enforcement of HTTPS security headers.</p>
      </div>
    </div>
  </div>
);

// 🖼️ 3. Team Collaboration Detail View (Real Team Photo + Circular Agile Workflow)
const TeamCollaborationView = ({ navigate }) => (
  <div className="space-y-16">
    {/* Real Team Photo Showcase */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-pink-100 shadow-xl">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-pink-200 order-2 lg:order-1">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
          alt="Team Collaboration"
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent flex items-end p-6">
          <span className="text-white font-semibold text-sm">Interactive Mentorship & Team Coding</span>
        </div>
      </div>

      <div className="space-y-6 order-1 lg:order-2">
        <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Real Corporate Mentorship
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Learn Side-by-Side with Senior Tech Engineers
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          Our collaborative developer community connects interns directly with experienced software leads for live code reviews, daily standups, and career guidance.
        </p>
      </div>
    </div>

    {/* Mentorship Workspaces */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-pink-50/70 p-6 rounded-2xl border border-pink-200 text-center space-y-3">
        <FaUsers className="text-3xl text-pink-600 mx-auto" />
        <h3 className="font-bold text-gray-900 text-lg">Daily Agile Standups</h3>
        <p className="text-xs text-gray-600">Simulating corporate sprint planning and ticket updates.</p>
      </div>

      <div className="bg-purple-50/70 p-6 rounded-2xl border border-purple-200 text-center space-y-3">
        <FaCode className="text-3xl text-purple-600 mx-auto" />
        <h3 className="font-bold text-gray-900 text-lg">1-on-1 Code Reviews</h3>
        <p className="text-xs text-gray-600">Direct feedback on GitHub pull requests and architecture.</p>
      </div>

      <div className="bg-indigo-50/70 p-6 rounded-2xl border border-indigo-200 text-center space-y-3">
        <FaBolt className="text-3xl text-indigo-600 mx-auto" />
        <h3 className="font-bold text-gray-900 text-lg">Live Doubts Resolution</h3>
        <p className="text-xs text-gray-600">Dedicated Telegram & Discord channels with sub-15min responses.</p>
      </div>
    </div>
  </div>
);

// 🖼️ 4. AI Integration Detail View (Robotic AI Photo + Terminal Generator)
const AiIntegrationView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-800">
      <div className="space-y-6">
        <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-purple-400/30">
          Google Gemini 2.0 Engine
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white">
          Intelligent Administrative Automation
        </h2>
        <p className="text-purple-200 text-base leading-relaxed">
          KodNexuz AI processes user prompts, cross-references enrollment statistics, and generates transactional email drafts via Brevo API with 100% fail-safe reliability.
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30">
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80"
          alt="AI Artificial Intelligence"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-6">
          <span className="text-purple-300 font-mono text-xs">AI Engine 2.0 | Multi-Model Architecture</span>
        </div>
      </div>
    </div>
  </div>
);

// 🖼️ 5. Secure Systems Detail View (Cyber Security Lock Image + Shield Specs)
const SecureSystemsView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-emerald-100 shadow-xl">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-emerald-200">
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
          alt="Cyber Security System"
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-6">
          <span className="text-white font-semibold text-sm">Enterprise Multi-Layer Encryption Guard</span>
        </div>
      </div>

      <div className="space-y-6">
        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Zero-Trust Protection Standard
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Bank-Grade Security for Every User
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          From bcrypt password hashing to cryptographic JWT sessions and strict CORS headers, our platform ensures your registration data is 100% immune to leaks.
        </p>
      </div>
    </div>
  </div>
);

// 🖼️ 6. Data Analytics Detail View (Data Charts Image + Interactive Metrics Dashboard)
const DataAnalyticsView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-indigo-100 shadow-xl">
      <div className="space-y-6">
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Real-Time Insights
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Visual Analytics & Platform Metrics
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          Monitor course completions, active registrations, and credential verification logs in real-time.
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-indigo-200">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
          alt="Data Analytics Dashboard"
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  </div>
);

// 🖼️ 7. Database Management Detail View (Database Server Rack Image + Topology)
const DatabaseManagementView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-800">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-blue-500/30">
        <img
          src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
          alt="Database Servers"
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-6">
        <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-blue-400/30">
          MongoDB Atlas Cluster
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white">
          Distributed NoSQL Cloud Reliability
        </h2>
        <p className="text-blue-200 text-base leading-relaxed">
          High-concurrency data storage with sub-15ms query execution times and automated daily snapshot backups.
        </p>
      </div>
    </div>
  </div>
);

// 🖼️ 8. Privacy First & 2-Factor OTP Detail View (Keycard Security Photo + 6-Step Visual Workflow)
const PrivacyFirstView = ({ navigate }) => (
  <div className="space-y-16">
    {/* Split Hero with Real High-Res Privacy Lock Image */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-rose-100 shadow-xl">
      <div className="space-y-6">
        <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Zero-Data-Leak Commitment
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Strict Privacy & 2-Factor OTP Verification
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          Every registration and login on KodNexuz requires a 6-digit one-time passcode delivered via Brevo transactional SMTP servers, guaranteeing 100% account protection.
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-rose-200">
        <img
          src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80"
          alt="Privacy Security Lock"
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-transparent to-transparent flex items-end p-6">
          <span className="text-white font-semibold text-sm">2-Factor OTP & Encryption Guard</span>
        </div>
      </div>
    </div>

    {/* Visual 6-Step 2FA OTP Workflow Cards */}
    <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-purple-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl">
      <div className="text-center mb-10">
        <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-rose-400/30">
          Interactive OTP Verification Sequence
        </span>
        <h3 className="text-3xl font-extrabold text-white mt-2">
          How KodNexuz Protects Your Account Step-by-Step
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { step: "01", icon: <FaUserCheck />, title: "Registration Request", desc: "User submits account details on KodNexuz registration form." },
          { step: "02", icon: <FaKey />, title: "Secret 6-Digit Passcode", desc: "Cryptographic 6-digit OTP passcode generated in memory." },
          { step: "03", icon: <FaEnvelope />, title: "Brevo SMTP Dispatch", desc: "Passcode encrypted & dispatched via Brevo transactional servers." },
          { step: "04", icon: <FaShieldVirus />, title: "SPF/DKIM Validation", desc: "Email domain authenticated to guarantee zero spam delivery." },
          { step: "05", icon: <FaCheckCircle />, title: "OTP Passcode Input", desc: "User inputs 6-digit passcode into verification modal." },
          { step: "06", icon: <FaLockOpen />, title: "Encrypted Session Granted", desc: "Verified JWT session launched with zero data leak guarantee." },
        ].map((item, idx) => (
          <div key={idx} className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-rose-400 font-extrabold text-xl">{item.step}</span>
              <div className="text-rose-300 text-xl">{item.icon}</div>
            </div>
            <h4 className="font-bold text-white text-base">{item.title}</h4>
            <p className="text-xs text-rose-200">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const featureData = {
  "custom-software": {
    title: "Custom Software Development",
    subtitle: "Tailor-made, high-performance web & enterprise applications built to scale.",
    icon: <FaCode className="text-5xl text-purple-600" />,
    badge: "Enterprise Grade",
    overview:
      "KodNexuz engineered custom software development processes to transform complex business challenges into seamless, intuitive web applications. Built on modern modular React architecture and robust Node.js microservices, our tailored solutions deliver enterprise reliability, lightning-fast rendering, and intuitive user experiences.",
    metrics: [
      { label: "Uptime Reliability", value: "99.99%" },
      { label: "Average Page Load", value: "< 0.4s" },
      { label: "Security Standard", value: "OWASP Top 10 Compliant" },
    ],
    component: CustomSoftwareView,
  },
  "cloud-solutions": {
    title: "Cloud Solutions & Infrastructure",
    subtitle: "High-availability, multi-region cloud deployment and serverless architecture.",
    icon: <FaCloud className="text-5xl text-blue-600" />,
    badge: "Cloud Native",
    overview:
      "Our cloud infrastructure powers KodNexuz with high-speed serverless deployment, zero-downtime rolling updates, and globally distributed CDN edge caching. Hosted on enterprise-grade infrastructure with automated SSL certificate renewal, your data and applications stay online 24/7/365.",
    metrics: [
      { label: "CDN Locations", value: "280+ Edge Nodes" },
      { label: "SSL Encryption", value: "TLS 1.3 256-bit" },
      { label: "Deployment Speed", value: "< 60 seconds" },
    ],
    component: CloudSolutionsView,
  },
  "team-collaboration": {
    title: "Team Collaboration & Mentorship",
    subtitle: "Interactive learning communities, real-time code reviews, and mentor guidance.",
    icon: <FaUsers className="text-5xl text-pink-600" />,
    badge: "Interactive Community",
    overview:
      "KodNexuz fosters an environment of continuous growth and collaboration. Our platform connects aspiring developers and interns directly with experienced industry mentors, collaborative project workspaces, and live Q&A channels.",
    metrics: [
      { label: "Active Interns", value: "10,000+" },
      { label: "Mentor Response", value: "< 15 mins" },
      { label: "Community Rating", value: "4.9 / 5.0" },
    ],
    component: TeamCollaborationView,
  },
  "ai-integration": {
    title: "AI Integration & Automation",
    subtitle: "KodNexuz AI Engine powered by Google Gemini models for automated administrative intelligence.",
    icon: <FaRobot className="text-5xl text-purple-600" />,
    badge: "AI Powered 2.0",
    overview:
      "KodNexuz integrates cutting-edge Artificial Intelligence to automate administrative analysis, student email drafting, and platform metrics calculation. Featuring our fail-safe multi-model fallback engine (supporting Gemini 1.5 Flash, 2.0 Flash Exp, and local DB fallback), platform operations run with 100% reliability.",
    metrics: [
      { label: "AI Response Time", value: "< 1.2s" },
      { label: "Automation Reliability", value: "100% Fail-safe" },
      { label: "Gemini Model Vers.", value: "v1beta / v1" },
    ],
    component: AiIntegrationView,
  },
  "secure-systems": {
    title: "Enterprise-Grade Secure Systems",
    subtitle: "Multi-layer security, role-based access control, and encrypted authentication.",
    icon: <FaShieldAlt className="text-5xl text-emerald-600" />,
    badge: "Zero-Trust Security",
    overview:
      "Security is engineered into every layer of KodNexuz. From JWT token authentication with expiration timers to bcrypt password hashing and strict CORS policies, our platform ensures your operational data and account credentials remain 100% protected.",
    metrics: [
      { label: "Password Encryption", value: "Bcrypt 10 Rounds" },
      { label: "Token Expiry", value: "JWT Timed Session" },
      { label: "Vulnerability Score", value: "Zero Known Risk" },
    ],
    component: SecureSystemsView,
  },
  "data-analytics": {
    title: "Data Analytics & Performance Insights",
    subtitle: "Real-time student progress tracking, enrollment analytics, and credential logs.",
    icon: <FaChartLine className="text-5xl text-indigo-600" />,
    badge: "Real-Time Insights",
    overview:
      "KodNexuz empowers administrators and students with live performance metrics. Monitor active registrations, course completion velocity, certificate issuance counts, and student feedback through intuitive visual dashboard charts.",
    metrics: [
      { label: "Data Refresh Rate", value: "Real-Time" },
      { label: "Tracking Accuracy", value: "100%" },
      { label: "Analytics Latency", value: "< 50ms" },
    ],
    component: DataAnalyticsView,
  },
  "database-management": {
    title: "Database Management & Reliability",
    subtitle: "High-throughput MongoDB cluster architecture with automated indexing and backups.",
    icon: <FaDatabase className="text-5xl text-blue-600" />,
    badge: "MongoDB Atlas Cluster",
    overview:
      "Powered by MongoDB Atlas distributed cloud database, KodNexuz ensures data integrity, fast query execution times, and automatic replication across multi-region server clusters.",
    metrics: [
      { label: "Database Cluster", value: "MongoDB Atlas Cloud" },
      { label: "Query Speed", value: "< 15ms" },
      { label: "Data Availability", value: "99.99%" },
    ],
    component: DatabaseManagementView,
  },
  "privacy-first": {
    title: "Privacy First & Zero Data Leak Guarantee",
    subtitle: "Complete data protection, 2-Factor OTP verification, and strict confidentiality.",
    icon: <FaLock className="text-5xl text-rose-600" />,
    badge: "100% Data Protection",
    overview:
      "At KodNexuz, user privacy is our highest priority. We enforce a zero-data-leak architecture where your personal credentials, contact info, and registration details are protected with bank-grade encryption, secure 2-Factor OTP verification via Brevo SMTP API, and strict HTTPS transmission protocols.",
    metrics: [
      { label: "OTP Delivery", value: "< 5 Seconds" },
      { label: "Encryption Standard", value: "AES-256 / TLS 1.3" },
      { label: "Data Leak History", value: "0 Incidents (100% Safe)" },
    ],
    component: PrivacyFirstView,
  }
};

const FeatureDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const feature = featureData[slug] || featureData["custom-software"];
  const CustomViewComponent = feature.component;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Header Section */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent opacity-60"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <button
            onClick={() => navigate("/#features")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition mb-6 bg-purple-900/40 px-4 py-2 rounded-full border border-purple-700/50 backdrop-blur-sm cursor-pointer"
          >
            <FaArrowLeft /> Back to Features
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-md">
                {feature.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                {feature.title}
              </h1>
              <p className="text-lg sm:text-xl text-purple-200 leading-relaxed font-light">
                {feature.subtitle}
              </p>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center">
              {feature.icon}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 w-full flex-grow space-y-16">
        {/* Executive Overview */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="270 100 65"
          backgroundColor="#ffffff"
          borderRadius={20}
          glowRadius={25}
          glowIntensity={0.8}
        >
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-purple-600">✦</span> Executive Overview
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {feature.overview}
            </p>
          </div>
        </BorderGlow>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {feature.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-1">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* 🎨 DIVERSE UNIQUE FEATURE VIEW WITH HIGH-RES REALISTIC IMAGES */}
        {CustomViewComponent && <CustomViewComponent navigate={navigate} />}

        {/* Call to Action Footer Card */}
        <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-purple-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Experience Next-Gen Technology with <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">KodNexuz</span>
            </h2>
            <p className="text-purple-200 text-base sm:text-lg">
              Unlock industry-standard software, certified internships, and high-performance cloud tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  if (window.openAuthModal) {
                    window.openAuthModal("signup");
                  } else {
                    navigate("/#signup-form");
                  }
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition cursor-pointer"
              >
                Register & Get Started
              </button>
              <button
                onClick={() => navigate("/#features")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition backdrop-blur-sm cursor-pointer"
              >
                Explore Other Features
              </button>
            </div>
          </div>
        </div>
      </section>

      <Touch />
    </div>
  );
};

export default FeatureDetail;
