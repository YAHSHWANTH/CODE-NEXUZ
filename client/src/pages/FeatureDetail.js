import React, { useEffect, useState } from "react";
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
  FaQuestionCircle,
  FaChevronDown,
  FaCogs,
  FaServer,
  FaLaptopCode,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Touch from "../components/Touch";
import BorderGlow from "../components/BorderGlow";

// 🌟 Reusable Accordion FAQ Component
const FeatureFaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition hover:border-purple-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left font-bold text-gray-800 hover:text-purple-600 transition cursor-pointer"
      >
        <span className="flex items-center gap-3 text-base sm:text-lg">
          <FaQuestionCircle className="text-purple-500 text-lg shrink-0" />
          {question}
        </span>
        <FaChevronDown className={`text-sm transition-transform duration-300 ${isOpen ? "rotate-180 text-purple-600" : "text-gray-400"}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-4 bg-gray-50/50">
          {answer}
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// 🖼️ 1. Custom Software Detail View (3-5 Scroll Pages Deep)
// ----------------------------------------------------------------------
const CustomSoftwareView = ({ navigate }) => (
  <div className="space-y-20">
    {/* Page Section 1: Executive Engineering Overview */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-xl">
      <div className="space-y-6">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Full-Stack Web & Mobile Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Tailor-Made Applications Built for Enterprise Scale
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          At KodNexuz, custom software development goes far beyond writing basic templates. We engineer bespoke full-stack applications designed around your exact business logic, workflow automation, and security requirements.
        </p>
        <p className="text-gray-600 leading-relaxed text-base">
          Leveraging React 19 component architecture on the frontend and high-throughput Node.js microservices on the backend, our software solutions deliver lightning-fast rendering speeds, zero-latency user interactions, and 99.99% operational uptime.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <span className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-xl text-purple-700 font-bold text-xs">✓ React 19 & Next.js</span>
          <span className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-xl text-purple-700 font-bold text-xs">✓ Node.js Express REST</span>
          <span className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-xl text-purple-700 font-bold text-xs">✓ GraphQL APIs</span>
          <span className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-xl text-purple-700 font-bold text-xs">✓ MongoDB Atlas</span>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-purple-200">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
          alt="Custom Software Development Coding"
          className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent flex items-end p-6">
          <span className="text-white font-semibold text-sm">Modular Software Engineering & Code Architecture</span>
        </div>
      </div>
    </div>

    {/* Page Section 2: Visual Multi-Tier Architecture Diagram */}
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-xl space-y-10">
      <div className="text-center max-w-3xl mx-auto">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Visual System Blueprint
        </span>
        <h3 className="text-3xl font-extrabold text-gray-900 mt-3">
          3-Tier Microservices Architecture
        </h3>
        <p className="text-gray-600 mt-2 text-sm">
          Decoupled frontend, middleware, and database layers built for maximum scalability and failover safety.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-200 space-y-4 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-md">
            <FaLaptopCode />
          </div>
          <h4 className="font-bold text-gray-900 text-xl">1. Presentation Layer</h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Component-driven React 19 frontend with client-side state management, instant form validation, micro-animations, and responsive Tailwind layouts.
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border border-purple-200 space-y-4 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-pink-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-md">
            <FaCogs />
          </div>
          <h4 className="font-bold text-gray-900 text-xl">2. API Gateway Layer</h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Asynchronous Node.js Express microservices handling JWT authentication middleware, CORS firewalls, rate limiting, and Brevo SMTP API triggers.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-200 space-y-4 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-md">
            <FaServer />
          </div>
          <h4 className="font-bold text-gray-900 text-xl">3. Persistence Cluster</h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Distributed MongoDB Atlas NoSQL database with indexed queries, schema validation, encrypted connections, and automated daily snapshots.
          </p>
        </div>
      </div>
    </div>

    {/* Page Section 3: High-Res Image Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 group h-80">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
          alt="Engineering Team Collaboration"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Agile Sprint Pair Programming & Code Reviews</div>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 group h-80">
        <img
          src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80"
          alt="Code Terminal Optimization"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Automated CI/CD Pipeline Build Testing</div>
        </div>
      </div>
    </div>

    {/* Page Section 4: 5-Step Agile Delivery Lifecycle */}
    <div className="bg-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-pink-500/30">
          Seamless Delivery Method
        </span>
        <h3 className="text-3xl font-extrabold text-white mt-3">
          5-Stage Custom Software Engineering Process
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
        {[
          { step: "01", title: "Discovery", desc: "Detailed requirements gathering, system architecture blueprinting, and wireframing." },
          { step: "02", title: "UI/UX Design", desc: "Interactive Figma prototypes, design system design, and component library styling." },
          { step: "03", title: "Development", desc: "Modular React 19 frontend & Node.js backend coding with strict type safety." },
          { step: "04", title: "Security Audit", desc: "OWASP vulnerability scanning, bcrypt password hashing, and token validation." },
          { step: "05", title: "Cloud Launch", desc: "Automated Vercel & Render edge deployment with zero-downtime rolling updates." },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-pink-400 font-extrabold text-3xl">{item.step}</span>
            <h4 className="font-bold text-white text-base">{item.title}</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Page Section 5: Real-World Enterprise Use Cases */}
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-xl space-y-8">
      <h3 className="text-2xl font-extrabold text-gray-900 text-center">
        Real-World Enterprise Applications We Build
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-3">
          <h4 className="font-bold text-purple-900 text-lg">Custom ERP Systems</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Centralized inventory tracking, payroll processing, and multi-department workflow management tools.
          </p>
        </div>
        <div className="p-6 bg-pink-50/50 rounded-2xl border border-pink-100 space-y-3">
          <h4 className="font-bold text-pink-900 text-lg">E-Learning Portals</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Interactive student dashboards, live video course streaming, automated quizzes, and QR-verified certificates.
          </p>
        </div>
        <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
          <h4 className="font-bold text-indigo-900 text-lg">SaaS Analytics Portals</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Real-time subscriber tracking dashboards, automated email campaign triggers, and financial metrics reporting.
          </p>
        </div>
      </div>
    </div>

    {/* Page Section 6: Comprehensive Feature FAQs */}
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900">Custom Software FAQs</h3>
        <p className="text-gray-600 text-sm mt-2">Answers to common enterprise engineering questions</p>
      </div>
      <FeatureFaqItem
        question="How does KodNexuz ensure custom software can scale with high traffic spikes?"
        answer="Our software builds decouple frontend presentation from backend microservices and database tiers. By leveraging serverless cloud edge routing on Vercel/Render and MongoDB Atlas auto-scaling, your application handles high traffic volume without any performance degradation."
      />
      <FeatureFaqItem
        question="Can custom modules integrate with our pre-existing corporate software?"
        answer="Yes! Our Node.js microservice architecture supports standard RESTful endpoints, GraphQL schemas, and Webhooks, enabling effortless data synchronization with your existing CRM, ERP, or payment gateway APIs."
      />
      <FeatureFaqItem
        question="Who owns the source code once the custom project is completed?"
        answer="You own 100% of the custom source code, repository rights, and intellectual property. KodNexuz provides full documentation and Git repository access upon project handoff."
      />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 🖼️ 2. Cloud Solutions Detail View (3-5 Scroll Pages Deep)
// ----------------------------------------------------------------------
const CloudSolutionsView = ({ navigate }) => (
  <div className="space-y-20">
    {/* Hero Datacenter Banner */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px] flex items-center p-8 sm:p-12 text-white">
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
        alt="Cloud Infrastructure Global Datacenter"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-slate-900/90 to-transparent"></div>

      <div className="relative z-10 max-w-2xl space-y-6">
        <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-cyan-400/30">
          Multi-Region Global Cloud Edge
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
          Serverless Infrastructure Powered by Global Edge CDN
        </h2>
        <p className="text-blue-100 text-base sm:text-lg leading-relaxed font-light">
          Scale your digital applications effortlessly across 280+ global CDN edge nodes with zero-downtime rolling deployments, automated TLS 1.3 encryption, and sub-50ms latency.
        </p>
      </div>
    </div>

    {/* SLA Metrics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gradient-to-br from-cyan-950 to-slate-900 text-white p-8 rounded-3xl border border-cyan-700/40 shadow-xl space-y-4">
        <FaNetworkWired className="text-4xl text-cyan-400" />
        <h3 className="text-xl font-bold">280+ Global Edge Nodes</h3>
        <p className="text-xs text-cyan-200 leading-relaxed">
          Static and dynamic content cached across multi-region serverless nodes for instant page loading anywhere in the world.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white p-8 rounded-3xl border border-blue-700/40 shadow-xl space-y-4">
        <FaSync className="text-4xl text-blue-400" />
        <h3 className="text-xl font-bold">Zero-Downtime Rolling Deploys</h3>
        <p className="text-xs text-blue-200 leading-relaxed">
          Automated GitHub CI/CD integration builds and updates your production code in under 60 seconds with zero server restart downtime.
        </p>
      </div>

      <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-8 rounded-3xl border border-indigo-700/40 shadow-xl space-y-4">
        <FaLock className="text-4xl text-yellow-400" />
        <h3 className="text-xl font-bold">TLS 1.3 256-Bit SSL</h3>
        <p className="text-xs text-indigo-200 leading-relaxed">
          Automated SSL certificate generation, renewal, and HTTPS enforcement guaranteeing 100% data transmission confidentiality.
        </p>
      </div>
    </div>

    {/* Cloud Image Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
          alt="Server Hardware Infrastructure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">High-Performance Server Hardware Racks</div>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
          alt="Cloud Networking Fiber Optics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">High-Speed Fiber Optic Data Exchange</div>
        </div>
      </div>
    </div>

    {/* Cloud FAQs */}
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900">Cloud Infrastructure FAQs</h3>
      </div>
      <FeatureFaqItem
        question="How does KodNexuz ensure zero data loss during server maintenance?"
        answer="By maintaining multi-zone replica clusters on Vercel Edge and Render cloud servers, live traffic is seamlessly routed to secondary mirror nodes during maintenance without interrupting active users."
      />
      <FeatureFaqItem
        question="Is automated SSL included with custom domain setups?"
        answer="Yes! All custom domains hosted on KodNexuz cloud infrastructure receive free automated TLS 1.3 256-bit SSL certificates that auto-renew every 90 days."
      />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 🖼️ 3. Team Collaboration Detail View (3-5 Scroll Pages Deep)
// ----------------------------------------------------------------------
const TeamCollaborationView = ({ navigate }) => (
  <div className="space-y-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-pink-100 shadow-xl">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-pink-200 order-2 lg:order-1">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
          alt="Software Team Collaboration"
          className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-transparent flex items-end p-6">
          <span className="text-white font-semibold text-sm">Interactive Developer Community & Mentorship</span>
        </div>
      </div>

      <div className="space-y-6 order-1 lg:order-2">
        <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Real Corporate Tech Mentorship
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Learn Side-by-Side with Senior Industry Engineers
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          Our collaborative developer ecosystem connects students and interns directly with senior tech leads for daily standups, pull-request code reviews, and sub-15 minute doubt resolution support.
        </p>
        <p className="text-gray-600 leading-relaxed text-base">
          Rather than learning in isolation, you work on real production Git repositories, master Agile sprint cycles, and build industry-ready teamwork experience.
        </p>
      </div>
    </div>

    {/* Team Collaboration Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
          alt="1-on-1 Code Review Session"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">1-on-1 Senior Mentor Code Review Sessions</div>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
          alt="Agile Sprint Planning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Daily Agile Standups & Sprint Planning</div>
        </div>
      </div>
    </div>

    {/* Team FAQs */}
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900">Collaboration & Mentorship FAQs</h3>
      </div>
      <FeatureFaqItem
        question="How fast do mentors respond to code questions?"
        answer="Our dedicated senior engineering team maintains a sub-15 minute response SLA during active project working hours."
      />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 🖼️ 4. AI Integration Detail View (3-5 Scroll Pages Deep)
// ----------------------------------------------------------------------
const AiIntegrationView = ({ navigate }) => (
  <div className="space-y-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-800">
      <div className="space-y-6">
        <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-purple-400/30">
          Google Gemini 2.0 & 1.5 Flash Engine
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white">
          Intelligent Administrative Automation
        </h2>
        <p className="text-purple-200 text-base leading-relaxed">
          KodNexuz AI processes user prompts, cross-references enrollment statistics, and generates transactional email drafts via Brevo API with 100% fail-safe reliability.
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 h-80">
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80"
          alt="Artificial Intelligence Neural Robotic Hand"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* AI Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
          alt="Neural Network Intelligence"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Google Gemini Multi-Model Language Pipeline</div>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
          alt="Automated AI Insights"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Automated Student Insights & Email Drafting</div>
        </div>
      </div>
    </div>

    {/* AI FAQs */}
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900">AI Integration FAQs</h3>
      </div>
      <FeatureFaqItem
        question="What happens if the primary AI API experiences downtime?"
        answer="KodNexuz AI features an automated multi-model failover stack: if Gemini 2.0 is unreachable, the system instantly routes requests to Gemini 1.5 Flash, followed by our local database fallback engine."
      />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 🖼️ 5. Secure Systems Detail View (3-5 Scroll Pages Deep)
// ----------------------------------------------------------------------
const SecureSystemsView = ({ navigate }) => (
  <div className="space-y-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-emerald-100 shadow-xl">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-emerald-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
          alt="Cyber Security Lock System"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-6">
        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Zero-Trust Protection Standard
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Bank-Grade Security Built into Every Layer
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          From bcrypt password hashing to cryptographic JWT sessions and strict CORS headers, our platform ensures your operational data and account credentials remain 100% protected against unauthorized access or leak attempts.
        </p>
      </div>
    </div>

    {/* Security Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
          alt="Firewall Protection Network"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">CORS Firewall & Rate-Limiting Defense</div>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&w=1200&q=80"
          alt="Cryptographic Encryption Keys"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Bcrypt Salt Hashing & JWT Session Keys</div>
        </div>
      </div>
    </div>

    {/* Security FAQs */}
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900">Security FAQs</h3>
      </div>
      <FeatureFaqItem
        question="Are passwords stored in plain text anywhere in the system?"
        answer="Never! Passwords are hashed using bcrypt with 10 rounds of salt before being stored in the database."
      />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 🖼️ 6. Data Analytics Detail View (3-5 Scroll Pages Deep)
// ----------------------------------------------------------------------
const DataAnalyticsView = ({ navigate }) => (
  <div className="space-y-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-indigo-100 shadow-xl">
      <div className="space-y-6">
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Real-Time Insights & Dashboards
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          Visual Analytics & Platform Performance Metrics
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          Monitor course completions, active registrations, certificate issuance logs, and student feedback through intuitive real-time visual charts.
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-indigo-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
          alt="Data Analytics Charts Screen"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Analytics Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
          alt="Financial Dashboard Analytics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Executive Performance Reports & Trends</div>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80"
          alt="Real-Time Data Graphs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Real-Time Registration Stream Visualizer</div>
        </div>
      </div>
    </div>

    {/* Analytics FAQs */}
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900">Analytics FAQs</h3>
      </div>
      <FeatureFaqItem
        question="How fast do analytics refresh on the admin portal?"
        answer="Metrics refresh in real-time as registrations, course completions, and certificate verifications occur."
      />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 🖼️ 7. Database Management Detail View (3-5 Scroll Pages Deep)
// ----------------------------------------------------------------------
const DatabaseManagementView = ({ navigate }) => (
  <div className="space-y-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-800">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30 h-80">
        <img
          src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
          alt="Database Servers Rack"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-6">
        <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-blue-400/30">
          MongoDB Atlas Cloud Cluster
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white">
          Distributed NoSQL Cloud Database Reliability
        </h2>
        <p className="text-blue-200 text-base leading-relaxed">
          High-concurrency data storage with sub-15ms query execution times and automated daily snapshot backups.
        </p>
      </div>
    </div>

    {/* Database Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
          alt="High-Speed Database Infrastructure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">High-Concurrency Data Storage Infrastructure</div>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
          alt="Digital Database Matrix"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Primary Master & Secondary Read Replica Nodes</div>
        </div>
      </div>
    </div>

    {/* Database FAQs */}
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900">Database FAQs</h3>
      </div>
      <FeatureFaqItem
        question="How often are database backups created?"
        answer="MongoDB Atlas generates automated daily cloud snapshot backups stored across multi-region cloud vaults."
      />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 🖼️ 8. Privacy First Detail View (3-5 Scroll Pages Deep)
// ----------------------------------------------------------------------
const PrivacyFirstView = ({ navigate }) => (
  <div className="space-y-20">
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

      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-rose-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80"
          alt="Privacy Security Lock Screen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-transparent to-transparent flex items-end p-6">
          <span className="text-white font-semibold text-sm">2-Factor OTP & Encryption Guard</span>
        </div>
      </div>
    </div>

    {/* Privacy 6-Step Workflow */}
    <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-purple-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl">
      <div className="text-center mb-10">
        <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-rose-400/30">
          Interactive OTP Verification Sequence
        </span>
        <h3 className="text-3xl font-extrabold text-white mt-3">
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

    {/* Privacy Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
          alt="Encrypted Tunnel Security"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Encrypted End-to-End Data Tunnel Transmission</div>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-80">
        <img
          src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80"
          alt="Data Confidentiality Shield"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
          <div className="text-white font-bold text-base">Zero Third-Party Sharing Guarantee</div>
        </div>
      </div>
    </div>

    {/* Privacy FAQs */}
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900">Privacy First FAQs</h3>
      </div>
      <FeatureFaqItem
        question="Is user data ever sold to third-party advertisers?"
        answer="Never! KodNexuz enforces a strict zero third-party sharing policy. Your email, contact info, and registration details are used strictly for portal account management."
      />
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

        {/* 🎨 DIVERSE UNIQUE FEATURE VIEW WITH RICH DATA & HIGH-RES REALISTIC IMAGES */}
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
