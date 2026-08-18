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
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Touch from "../components/Touch";
import BorderGlow from "../components/BorderGlow";

const featureData = {
  "custom-software": {
    title: "Custom Software Development",
    subtitle: "Tailor-made, high-performance web & enterprise applications built to scale.",
    icon: <FaCode className="text-5xl text-purple-600" />,
    badge: "Enterprise Grade",
    overview:
      "KodNexuz engineered custom software development processes to transform complex business challenges into seamless, intuitive web applications. Built on modern modular React architecture and robust Node.js microservices, our tailored solutions deliver enterprise reliability, lightning-fast rendering, and intuitive user experiences.",
    highlights: [
      { title: "Modular Architecture", desc: "Clean component-driven codebase adhering to strict SOLID design principles." },
      { title: "Cross-Platform Optimization", desc: "Fully responsive layouts optimized across mobile, tablet, and ultra-wide desktops." },
      { title: "RESTful & Microservice Integration", desc: "High-throughput API endpoints connecting database layers with instant data sync." },
      { title: "Continuous Delivery", desc: "Automated testing and deployment pipelines hosted on modern cloud edge networks." },
    ],
    deepContent: [
      {
        heading: "Engineered for Scalability & Speed",
        text: "Every custom application built by KodNexuz undergoes rigorous code reviews, automated linting, and stress testing. By utilizing lazy-loading and code-splitting, our web platforms deliver sub-second initial page load times regardless of user location."
      },
      {
        heading: "Tailored to Your Strategic Business Workflows",
        text: "We don't believe in one-size-fits-all solutions. Our development team collaborates directly with stakeholders to design custom workflows, interactive dashboard controls, and automated reporting systems tailored specifically to your company's operational goals."
      }
    ],
    metrics: [
      { label: "Uptime Reliability", value: "99.99%" },
      { label: "Average Page Load", value: "< 0.4s" },
      { label: "Security Standard", value: "OWASP Top 10 Compliant" },
    ]
  },
  "cloud-solutions": {
    title: "Cloud Solutions & Infrastructure",
    subtitle: "High-availability, multi-region cloud deployment and serverless architecture.",
    icon: <FaCloud className="text-5xl text-blue-600" />,
    badge: "Cloud Native",
    overview:
      "Our cloud infrastructure powers KodNexuz with high-speed serverless deployment, zero-downtime rolling updates, and globally distributed CDN edge caching. Hosted on enterprise-grade infrastructure with automated SSL certificate renewal, your data and applications stay online 24/7/365.",
    highlights: [
      { title: "Global Edge CDN Caching", desc: "Sub-millisecond asset delivery via globally distributed edge locations." },
      { title: "Zero-Downtime Deployments", desc: "Seamless continuous integration & deployment pipelines on Render & Vercel." },
      { title: "Automated SSL/TLS Encryption", desc: "256-bit SSL encryption automatically configured for every web protocol." },
      { title: "High-Availability Monitoring", desc: "Automated health checks and instant server fallback routing." },
    ],
    deepContent: [
      {
        heading: "Global High-Speed Architecture",
        text: "KodNexuz leverages distributed cloud networks to serve frontend assets and API endpoints close to end users. Our infrastructure automatically handles traffic spikes during peak enrollment cycles without any loss in responsiveness."
      },
      {
        heading: "Proactive Disaster Recovery & Backups",
        text: "Automated daily snapshot backups ensure that your operational databases, user registries, and certificate records are protected against hardware or network failures."
      }
    ],
    metrics: [
      { label: "CDN Locations", value: "280+ Edge Nodes" },
      { label: "SSL Encryption", value: "TLS 1.3 256-bit" },
      { label: "Deployment Speed", value: "< 60 seconds" },
    ]
  },
  "team-collaboration": {
    title: "Team Collaboration & Mentorship",
    subtitle: "Interactive learning communities, real-time code reviews, and mentor guidance.",
    icon: <FaUsers className="text-5xl text-pink-600" />,
    badge: "Interactive Community",
    overview:
      "KodNexuz fosters an environment of continuous growth and collaboration. Our platform connects aspiring developers and interns directly with experienced industry mentors, collaborative project workspaces, and live Q&A channels.",
    highlights: [
      { title: "Real-Time Project Workspaces", desc: "Collaborative project environments mimicking corporate software teams." },
      { title: "Direct Mentor Support", desc: "One-on-one code reviews and career guidance from senior tech engineers." },
      { title: "Interactive Community Channels", desc: "Dedicated Telegram & Discord developer communities for quick doubt resolution." },
      { title: "Peer Code Reviews", desc: "Learn industry best practices through collaborative pull requests and feedback." },
    ],
    deepContent: [
      {
        heading: "Corporate-Ready Project Workflows",
        text: "Interns on KodNexuz participate in simulated agile sprints, daily standups, and Git-based collaborative workflows to gain authentic experience before entering the tech industry."
      },
      {
        heading: "Personalized Career Coaching",
        text: "Beyond code syntax, our mentors guide students through resume optimization, portfolio presentation, and technical interview prep."
      }
    ],
    metrics: [
      { label: "Active Interns", value: "10,000+" },
      { label: "Mentor Response", value: "< 15 mins" },
      { label: "Community Rating", value: "4.9 / 5.0" },
    ]
  },
  "ai-integration": {
    title: "AI Integration & Automation",
    subtitle: "KodNexuz AI Engine powered by Google Gemini models for automated administrative intelligence.",
    icon: <FaRobot className="text-5xl text-purple-600" />,
    badge: "AI Powered 2.0",
    overview:
      "KodNexuz integrates cutting-edge Artificial Intelligence to automate administrative analysis, student email drafting, and platform metrics calculation. Featuring our fail-safe multi-model fallback engine (supporting Gemini 1.5 Flash, 2.0 Flash Exp, and local DB fallback), platform operations run with 100% reliability.",
    highlights: [
      { title: "Automated Data Analysis", desc: "Instantly cross-references registrations vs enrollments to identify pending students." },
      { title: "Intelligent Action Drafting", desc: "Generates personalized reminder email drafts with direct login links." },
      { title: "Multi-Model Fallback Engine", desc: "Ensures 100% operational uptime across Gemini 1.5 Flash, 2.0, and DB logic." },
      { title: "Conversational Admin Assistant", desc: "Natural language query processing for instant platform statistics and counts." },
    ],
    deepContent: [
      {
        heading: "Conversational Admin Intelligence",
        text: "KodNexuz AI understands casual admin greetings as well as complex analytical prompts, providing human-like conversational responses and structured checklist actions."
      },
      {
        heading: "Fail-Safe Email Automation",
        text: "When admins approve email actions, the AI engine dispatches customized emails directly via Brevo transactional SMTP API with full delivery tracking."
      }
    ],
    metrics: [
      { label: "AI Response Time", value: "< 1.2s" },
      { label: "Automation Reliability", value: "100% Fail-safe" },
      { label: "Gemini Model Vers.", value: "v1beta / v1" },
    ]
  },
  "secure-systems": {
    title: "Enterprise-Grade Secure Systems",
    subtitle: "Multi-layer security, role-based access control, and encrypted authentication.",
    icon: <FaShieldAlt className="text-5xl text-emerald-600" />,
    badge: "Zero-Trust Security",
    overview:
      "Security is engineered into every layer of KodNexuz. From JWT token authentication with expiration timers to bcrypt password hashing and strict CORS policies, our platform ensures your operational data and account credentials remain 100% protected.",
    highlights: [
      { title: "JWT Token Authentication", desc: "Secure JSON Web Tokens signed with cryptographic keys and strict expiration enforcement." },
      { title: "Bcrypt Password Hashing", desc: "Passwords hashed using industry-standard bcrypt algorithm with multi-round salt factor." },
      { title: "Role-Based Access Control (RBAC)", desc: "Strict boundary separation between Administrator controls and Student views." },
      { title: "CORS & XSS Header Defense", desc: "Protected against Cross-Origin Resource Sharing attacks and malicious script injections." },
    ],
    deepContent: [
      {
        heading: "Multi-Tiered Access Security",
        text: "Administrative dashboard routes require verified JWT tokens and explicit password authorization before executing sensitive record deletions or automated actions."
      },
      {
        heading: "Continuous Security Audit",
        text: "Our API endpoints strictly validate incoming payloads, sanitizing inputs to prevent SQL/NoSQL injection vulnerabilities."
      }
    ],
    metrics: [
      { label: "Password Encryption", value: "Bcrypt 10 Rounds" },
      { label: "Token Expiry", value: "JWT Timed Session" },
      { label: "Vulnerability Score", value: "Zero Known Risk" },
    ]
  },
  "data-analytics": {
    title: "Data Analytics & Performance Insights",
    subtitle: "Real-time student progress tracking, enrollment analytics, and credential logs.",
    icon: <FaChartLine className="text-5xl text-indigo-600" />,
    badge: "Real-Time Insights",
    overview:
      "KodNexuz empowers administrators and students with live performance metrics. Monitor active registrations, course completion velocity, certificate issuance counts, and student feedback through intuitive visual dashboard charts.",
    highlights: [
      { title: "Live Enrollment Analytics", desc: "Real-time monitoring of course registrations, active learners, and completion rates." },
      { title: "Certificate Verification Registry", desc: "Instant lookup and validation logs for issued technology certificates." },
      { title: "Action Selection Checklist", desc: "Interactive selection controls for executing batch email reminders with status badges." },
      { title: "Exportable Audit Logs", desc: "Track platform activity with timestamped audit histories." },
    ],
    deepContent: [
      {
        heading: "Actionable Operational Data",
        text: "Visualize key performance indicators across web development, AI, Python, Java, and Android tracks to continuously optimize curriculum content."
      },
      {
        heading: "Automated Administrative Checklists",
        text: "Quickly select or deselect specific student action items with real-time counters before launching transactional communication campaigns."
      }
    ],
    metrics: [
      { label: "Data Refresh Rate", value: "Real-Time" },
      { label: "Tracking Accuracy", value: "100%" },
      { label: "Analytics Latency", value: "< 50ms" },
    ]
  },
  "database-management": {
    title: "Database Management & Reliability",
    subtitle: "High-throughput MongoDB cluster architecture with automated indexing and backups.",
    icon: <FaDatabase className="text-5xl text-blue-600" />,
    badge: "MongoDB Atlas Cluster",
    overview:
      "Powered by MongoDB Atlas distributed cloud database, KodNexuz ensures data integrity, fast query execution times, and automatic replication across multi-region server clusters.",
    highlights: [
      { title: "Distributed NoSQL Architecture", desc: "Schema validation and flexible document storage for high-concurrency read/writes." },
      { title: "Indexed Query Acceleration", desc: "Optimized collection indexing for sub-millisecond user search and certificate lookups." },
      { title: "Automated Cloud Snapshot Backups", desc: "Continuous point-in-time data restoration capabilities." },
      { title: "Connection String Encryption", desc: "All database URI connections encrypted with TLS/SSL protocol in environment variables." },
    ],
    deepContent: [
      {
        heading: "High-Concurrency Optimization",
        text: "Our database schemas for Users, Enrollments, and Certificates are indexed by primary keys and email addresses, allowing instant lookup even as user volume scales into the millions."
      },
      {
        heading: "Strict Data Isolation",
        text: "Database queries enforce strict user scoping, ensuring student data is isolated and accessible only by authenticated account owners."
      }
    ],
    metrics: [
      { label: "Database Cluster", value: "MongoDB Atlas Cloud" },
      { label: "Query Speed", value: "< 15ms" },
      { label: "Data Availability", value: "99.99%" },
    ]
  },
  "privacy-first": {
    title: "Privacy First & Zero Data Leak Guarantee",
    subtitle: "Complete data protection, 2-Factor OTP verification, and strict confidentiality.",
    icon: <FaLock className="text-5xl text-rose-600" />,
    badge: "100% Data Protection",
    overview:
      "At KodNexuz, user privacy is our highest priority. We enforce a zero-data-leak architecture where your personal credentials, contact info, and registration details are protected with bank-grade encryption, secure 2-Factor OTP verification via Brevo SMTP API, and strict HTTPS transmission protocols.",
    highlights: [
      { title: "Secure 2-Factor Email OTP Verification", desc: "Every registration requires a 6-digit one-time passcode sent directly to the user's email via Brevo transactional servers." },
      { title: "Zero Third-Party Data Sharing", desc: "Your personal details are never sold, rented, or shared with external advertising networks." },
      { title: "End-to-End Transport Layer Security (HTTPS)", desc: "All browser-to-server traffic is encrypted using modern TLS 1.3 protocol." },
      { title: "Environment Key Protection", desc: "API keys and database credentials are stored safely in isolated environment configurations, never exposed in client bundles." },
    ],
    deepContent: [
      {
        heading: "How We Protect Your Registration & Login (OTP Process)",
        text: "When signing up or logging in, KodNexuz dispatches a time-sensitive 6-digit verification code to your email address using SPF/DKIM authenticated SMTP servers. This guarantees that only the legitimate owner of the email account can register or access learning tracks."
      },
      {
        heading: "Strict Storage Safety & Zero-Leak Commitment",
        text: "Sensitive password fields are salted and hashed using bcrypt before hitting our database cluster. Even in the unlikely event of network inspection, your actual plain-text credentials can never be deciphered or leaked."
      }
    ],
    metrics: [
      { label: "OTP Delivery", value: "< 5 Seconds" },
      { label: "Encryption Standard", value: "AES-256 / TLS 1.3" },
      { label: "Data Leak History", value: "0 Incidents (100% Safe)" },
    ]
  }
};

const FeatureDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const feature = featureData[slug] || featureData["custom-software"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Header Section */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-800/20 via-transparent to-transparent opacity-60"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <button
            onClick={() => navigate("/#features")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition mb-6 bg-purple-900/40 px-4 py-2 rounded-full border border-purple-700/50 backdrop-blur-sm"
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
      <section className="py-16 max-w-6xl mx-auto px-6 w-full flex-grow">
        {/* Overview Box */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="270 100 65"
          backgroundColor="#ffffff"
          borderRadius={20}
          glowRadius={25}
          glowIntensity={0.8}
          className="mb-12"
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {feature.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center codevia-card-hover"
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

        {/* Highlights Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Key Capabilities & <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Architectural Standards</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feature.highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition flex items-start gap-4 codevia-card-hover"
              >
                <div className="mt-1 text-purple-600 text-xl">
                  <FaCheckCircle />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Technical Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-md space-y-8 mb-16">
          {feature.deepContent.map((block, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-purple-600">■</span> {block.heading}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Card */}
        <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-purple-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Ready to Experience <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">KodNexuz?</span>
            </h2>
            <p className="text-purple-200 text-base sm:text-lg">
              Join thousands of students, developers, and tech teams scaling their capabilities with our platform.
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
                onClick={() => navigate("/#courses")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition backdrop-blur-sm cursor-pointer"
              >
                Browse All Courses
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
