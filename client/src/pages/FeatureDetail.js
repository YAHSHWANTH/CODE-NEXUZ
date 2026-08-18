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
  FaServer,
  FaLockOpen,
  FaKey,
  FaTerminal,
  FaSync,
  FaNetworkWired,
  FaMobileAlt,
  FaShieldVirus,
  FaUserCheck,
  FaEnvelope,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Touch from "../components/Touch";
import BorderGlow from "../components/BorderGlow";

// 🌟 1. Custom Software View
const CustomSoftwareView = ({ navigate }) => (
  <div className="space-y-16">
    {/* Full-Stack Architecture Diagram */}
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-xl">
      <div className="text-center mb-10">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Visual System Architecture
        </span>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
          Full-Stack Enterprise Blueprint
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          High-performance modular React frontend connected to scalable Node.js microservices and MongoDB database.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200 text-center relative group hover:shadow-lg transition">
          <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl shadow-md">
            <FaMobileAlt />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">1. Responsive Frontend UI</h3>
          <p className="text-gray-600 text-sm mt-2">React 19, Tailwind CSS, Framer animations, sub-0.4s initial paint.</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 text-center relative group hover:shadow-lg transition">
          <div className="w-12 h-12 bg-pink-600 text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl shadow-md">
            <FaServer />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">2. Node.js API Gateway</h3>
          <p className="text-gray-600 text-sm mt-2">RESTful microservices, Express router, CORS protection, JWT middleware.</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-200 text-center relative group hover:shadow-lg transition">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-xl shadow-md">
            <FaDatabase />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">3. MongoDB Data Cluster</h3>
          <p className="text-gray-600 text-sm mt-2">Indexed schema collections, automated daily snapshots, fast queries.</p>
        </div>
      </div>
    </div>

    {/* Agile Development Timeline */}
    <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
      <h2 className="text-3xl font-extrabold text-center mb-10">
        5-Step Agile Software Lifecycle
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {[
          { step: "01", title: "Discovery", desc: "Requirements & System Spec" },
          { step: "02", title: "UI/UX", desc: "Figma Mockups & Wireframes" },
          { step: "03", title: "Code", desc: "Modular Full-Stack Builds" },
          { step: "04", title: "Testing", desc: "Automated Unit & Stress Checks" },
          { step: "05", title: "Deploy", desc: "Vercel & Render Cloud Edge" },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 text-center space-y-2">
            <span className="text-pink-400 font-extrabold text-2xl">{item.step}</span>
            <h4 className="font-bold text-white">{item.title}</h4>
            <p className="text-xs text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 🌟 2. Cloud Solutions View
const CloudSolutionsView = ({ navigate }) => (
  <div className="space-y-16">
    {/* Global Multi-Zone Network Map */}
    <div className="bg-gradient-to-br from-blue-900 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="text-center mb-10">
        <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-400/30">
          Cloud Edge Distribution Map
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-2">
          Globally Distributed Server Infrastructure
        </h2>
        <p className="text-blue-200 mt-2 max-w-2xl mx-auto text-sm">
          Hosted across multi-region edge nodes ensuring sub-millisecond asset delivery and zero downtime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
          <FaNetworkWired className="text-4xl text-cyan-400 mx-auto mb-3" />
          <h3 className="font-bold text-xl">280+ Edge CDN Nodes</h3>
          <p className="text-xs text-blue-200 mt-1">Automatic geo-routing to closest server.</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
          <FaSync className="text-4xl text-green-400 mx-auto mb-3" />
          <h3 className="font-bold text-xl">Zero-Downtime CI/CD</h3>
          <p className="text-xs text-blue-200 mt-1">Instant rolling deployment without drops.</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
          <FaLock className="text-4xl text-yellow-400 mx-auto mb-3" />
          <h3 className="font-bold text-xl">256-Bit SSL TLS 1.3</h3>
          <p className="text-xs text-blue-200 mt-1">Automated HTTPS certificate renewals.</p>
        </div>
      </div>
    </div>

    {/* Cloud vs Traditional Comparison Table */}
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Cloud Edge vs Traditional Hosting
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-700">
              <th className="p-4 font-bold">Feature Metric</th>
              <th className="p-4 font-bold text-blue-600">KodNexuz Cloud Architecture</th>
              <th className="p-4 font-bold text-gray-400">Traditional Hosting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="p-4 font-semibold text-gray-800">Uptime SLA</td>
              <td className="p-4 font-bold text-green-600">99.99% Multi-Zone Guarantee</td>
              <td className="p-4 text-gray-500">98.5% Single Location</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-gray-800">Traffic Peak Scaling</td>
              <td className="p-4 font-bold text-green-600">Instant Serverless Auto-Scale</td>
              <td className="p-4 text-gray-500">Manual Server Upgrades</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-gray-800">Global Response Time</td>
              <td className="p-4 font-bold text-green-600">&lt; 50ms Edge Latency</td>
              <td className="p-4 text-gray-500">300ms - 800ms Server Latency</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// 🌟 3. Team Collaboration View
const TeamCollaborationView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-pink-100 shadow-xl">
      <div className="text-center mb-10">
        <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Agile Developer Ecosystem
        </span>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
          Collaborative Project Sprint Flow
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Simulating real corporate software engineering environments for interns and mentors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {[
          { title: "Sprint Backlog", desc: "Agile task assignment & Jira-style boards." },
          { title: "Pair Coding", desc: "Collaborative Git branches & live reviews." },
          { title: "Pull Request Audit", desc: "Senior developer code verification." },
          { title: "Live Q&A Sessions", desc: "1-on-1 mentor guidance & daily standups." },
        ].map((item, idx) => (
          <div key={idx} className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100 hover:shadow-md transition">
            <div className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
              {idx + 1}
            </div>
            <h4 className="font-bold text-gray-900">{item.title}</h4>
            <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 🌟 4. AI Integration View
const AiIntegrationView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl">
      <div className="text-center mb-10">
        <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-400/30">
          Neural Intelligence Pipeline
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-2">
          KodNexuz Multi-Model AI Engine 2.0
        </h2>
        <p className="text-purple-200 mt-2 max-w-2xl mx-auto text-sm">
          Integrated with Google Gemini models and Brevo SMTP API for fail-safe administrative automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
          <FaRobot className="text-4xl text-purple-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg">Intent Processor</h3>
          <p className="text-xs text-purple-200 mt-1">Parses user prompts & statistics queries instantly.</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
          <FaTerminal className="text-4xl text-pink-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg">Gemini 2.0 Engine</h3>
          <p className="text-xs text-purple-200 mt-1">Generates personalized email drafts & analytical counts.</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
          <FaShieldAlt className="text-4xl text-emerald-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg">Fail-Safe DB Fallback</h3>
          <p className="text-xs text-purple-200 mt-1">Ensures 100% operational uptime if external API limits trigger.</p>
        </div>
      </div>
    </div>
  </div>
);

// 🌟 5. Secure Systems View
const SecureSystemsView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-emerald-100 shadow-xl">
      <div className="text-center mb-10">
        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Zero-Trust Security Defense
        </span>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
          5-Layer Protection Architecture
        </h2>
      </div>

      <div className="space-y-4">
        {[
          { layer: "Layer 1: Transport", title: "TLS 1.3 HTTPS Encryption", desc: "All network payload data in transit is encrypted using bank-grade TLS 1.3 protocol." },
          { layer: "Layer 2: Network Firewall", title: "CORS & XSS Payload Sanitization", desc: "Strict origin header checks and input sanitization to block script injection attempts." },
          { layer: "Layer 3: Authentication", title: "Bcrypt Password Salt Hashing", desc: "User passwords salted and hashed with 10 rounds of bcrypt prior to storage." },
          { layer: "Layer 4: Session Security", title: "JWT Token Access Control", desc: "Cryptographically signed JSON Web Tokens with strict automatic expiration timers." },
          { layer: "Layer 5: Scoping", title: "Role-Based Access Control (RBAC)", desc: "Strict database boundary separation between Admin dashboard capabilities and Student views." },
        ].map((item, idx) => (
          <div key={idx} className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 flex items-start gap-4">
            <div className="p-3 bg-emerald-600 text-white rounded-xl font-bold text-sm">
              0{idx + 1}
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{item.layer}</span>
              <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 🌟 6. Data Analytics View
const DataAnalyticsView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-indigo-100 shadow-xl text-center">
      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Interactive Visual Mockup
      </span>
      <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-8">
        Real-Time Administrative Metric Visualizer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-indigo-50/60 p-6 rounded-2xl border border-indigo-100">
          <div className="text-xs font-bold text-indigo-600 uppercase">Active Registrations</div>
          <div className="text-3xl font-extrabold text-gray-900 mt-2">12,480</div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-indigo-600 h-full w-[85%]"></div>
          </div>
        </div>

        <div className="bg-pink-50/60 p-6 rounded-2xl border border-pink-100">
          <div className="text-xs font-bold text-pink-600 uppercase">Course Completions</div>
          <div className="text-3xl font-extrabold text-gray-900 mt-2">9,120</div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-pink-600 h-full w-[74%]"></div>
          </div>
        </div>

        <div className="bg-purple-50/60 p-6 rounded-2xl border border-purple-100">
          <div className="text-xs font-bold text-purple-600 uppercase">Verified Credentials</div>
          <div className="text-3xl font-extrabold text-gray-900 mt-2">8,950</div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-purple-600 h-full w-[92%]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 🌟 7. Database Management View
const DatabaseManagementView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl">
      <div className="text-center mb-10">
        <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-400/30">
          Distributed NoSQL Topology
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-2">
          MongoDB Atlas High-Throughput Cluster
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <FaServer className="text-4xl text-blue-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg">Primary Master Node</h3>
          <p className="text-xs text-gray-300 mt-1">Handles high-concurrency write operations & user sessions.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <FaDatabase className="text-4xl text-green-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg">Secondary Replicas</h3>
          <p className="text-xs text-gray-300 mt-1">Replicated read scaling with sub-15ms search queries.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <FaLock className="text-4xl text-purple-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg">Continuous Snapshot Vault</h3>
          <p className="text-xs text-gray-300 mt-1">Automated daily point-in-time database restoration.</p>
        </div>
      </div>
    </div>
  </div>
);

// 🌟 8. Privacy First & 2-Factor OTP View
const PrivacyFirstView = ({ navigate }) => (
  <div className="space-y-16">
    <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-purple-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl">
      <div className="text-center mb-10">
        <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-rose-400/30">
          Zero Data Leak Protection
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-2">
          Interactive 6-Step 2-Factor OTP Verification
        </h2>
        <p className="text-rose-200 mt-2 max-w-2xl mx-auto text-sm">
          Ensuring 100% data confidentiality and authenticating every user registration via Brevo transactional SMTP API.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { step: "01", icon: <FaUserCheck />, title: "Registration Request", desc: "User submits account details on KodNexuz registration form." },
          { step: "02", icon: <FaKey />, title: "Secret 6-Digit Gen", desc: "Cryptographic 6-digit OTP passcode generated in memory." },
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

        {/* 🎨 DIVERSE UNIQUE FEATURE VIEW LAYOUT */}
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
