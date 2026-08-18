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
  FaCheckDouble,
  FaSlidersH,
  FaTerminal,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Touch from "../components/Touch";
import BorderGlow from "../components/BorderGlow";

// 🌟 Accordion Component for Feature FAQs
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
// 🏛️ UNIFIED MULTI-PAGE FEATURE DETAIL COMPONENT (6-8 SCROLL PAGES DEEP)
// ----------------------------------------------------------------------
const featureData = {
  "custom-software": {
    title: "Custom Software Development",
    subtitle: "Tailor-made, high-performance web & enterprise applications built for scale.",
    icon: <FaCode className="text-5xl text-purple-600" />,
    badge: "Enterprise Architecture",
    metrics: [
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Average Page Load", value: "< 0.4s" },
      { label: "Security Compliance", value: "OWASP Top 10" },
    ],
    paragraphs: [
      "At KodNexuz, custom software development is engineered around your exact business requirements, security standards, and workflow automation goals. Rather than using generic, rigid software templates, we design modular full-stack applications that scale seamlessly alongside your user base.",
      "Our software solutions leverage React 19 component architecture on the frontend to deliver instant, client-side rendering with zero UI lag. On the backend, asynchronous Node.js microservices process thousands of concurrent API requests while maintaining strict token authentication and database connection pooling.",
      "Every line of code undergoes rigorous automated CI/CD unit testing, vulnerability scanning, and cross-browser performance benchmarking before deployment. This guarantees a resilient digital foundation built to support enterprise growth.",
    ],
    layers: [
      { step: "01", title: "Presentation Layer", desc: "Component-driven React 19 frontend with client-side state management, instant form validation, micro-animations, and responsive Tailwind grid layouts.", icon: <FaLaptopCode /> },
      { step: "02", title: "API Gateway Layer", desc: "Asynchronous Node.js Express microservices handling JWT authentication middleware, CORS firewalls, rate limiting, and Brevo SMTP API triggers.", icon: <FaCogs /> },
      { step: "03", title: "Persistence Cluster", desc: "Distributed MongoDB Atlas NoSQL database with indexed queries, schema validation, encrypted connections, and automated daily snapshots.", icon: <FaServer /> },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80", caption: "Full-Stack Code Engineering & React 19 Architecture" },
      { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80", caption: "Agile Sprint Code Reviews & Technical Quality Audits" },
    ],
    lifecycle: [
      { step: "01", title: "Discovery", desc: "Detailed requirements gathering, system architecture blueprinting, and wireframing." },
      { step: "02", title: "UI/UX Design", desc: "Interactive Figma prototypes, design system design, and component library styling." },
      { step: "03", title: "Development", desc: "Modular React 19 frontend & Node.js backend coding with strict type safety." },
      { step: "04", title: "Security Audit", desc: "OWASP vulnerability scanning, bcrypt password hashing, and token validation." },
      { step: "05", title: "Cloud Launch", desc: "Automated Vercel & Render edge deployment with zero-downtime rolling updates." },
    ],
    useCases: [
      { title: "Custom Enterprise ERPs", desc: "Centralized inventory tracking, payroll processing, and multi-department workflow management tools." },
      { title: "Interactive E-Learning Portals", desc: "Student learning dashboards, live video course streaming, automated quizzes, and QR-verified certificates." },
      { title: "SaaS Analytics Dashboards", desc: "Real-time subscriber tracking dashboards, automated email campaign triggers, and financial reporting." },
    ],
    codeSnippet: `// 🚀 KodNexuz Modular Custom Software Architecture
import { express, jwt, mongoAtlas } from "@kodnexuz/core";

export const buildCustomModule = async (req, res) => {
  const { userPayload, authHeader } = req;
  const verifiedSession = await jwt.verifyToken(authHeader);
  
  if (verifiedSession) {
    const dataCluster = await mongoAtlas.executeIndexedQuery({
      collection: "enterprise_modules",
      filter: { tenantId: userPayload.tenantId },
    });
    return res.status(200).json({ status: "SUCCESS", data: dataCluster });
  }
};`,
    safeguards: [
      "Strict ESLint & TypeScript compilation checks before code merge",
      "Automated OWASP Top 10 vulnerability scanning in CI/CD pipeline",
      "Bcrypt password salt hashing with 10 encryption rounds",
      "Timed cryptographic JWT session tokens with HTTP-only security",
    ],
    specs: [
      { key: "Frontend Framework", value: "React 19 / Tailwind CSS" },
      { key: "Backend Microservices", value: "Node.js / Express.js REST APIs" },
      { key: "Database Cluster", value: "MongoDB Atlas NoSQL Indexed" },
      { key: "Security Protocol", value: "JWT Auth / Bcrypt Password Hashing" },
      { key: "Deployment Host", value: "Vercel / Render Serverless Edge" },
    ],
    faqs: [
      { q: "How does KodNexuz ensure custom software scales during traffic spikes?", a: "Our software builds decouple frontend presentation from backend microservices and database tiers. By leveraging serverless cloud edge routing on Vercel/Render and MongoDB Atlas auto-scaling, your application handles high traffic volume without any performance degradation." },
      { q: "Can custom modules integrate with our pre-existing corporate software?", a: "Yes! Our Node.js microservice architecture supports standard RESTful endpoints, GraphQL schemas, and Webhooks, enabling effortless data synchronization with your existing CRM, ERP, or payment gateway APIs." },
      { q: "Who owns the source code once the custom project is completed?", a: "You own 100% of the custom source code, repository rights, and intellectual property. KodNexuz provides full documentation and Git repository access upon project handoff." },
    ],
  },

  "cloud-solutions": {
    title: "Cloud Solutions & Infrastructure",
    subtitle: "High-availability, multi-region cloud deployment and serverless architecture.",
    icon: <FaCloud className="text-5xl text-blue-600" />,
    badge: "Cloud Native",
    metrics: [
      { label: "CDN Global Edge", value: "280+ Nodes" },
      { label: "SSL Encryption", value: "TLS 1.3 256-bit" },
      { label: "Deployment Speed", value: "< 60 seconds" },
    ],
    paragraphs: [
      "KodNexuz Cloud Infrastructure powers modern digital applications with serverless multi-region routing, zero-downtime rolling updates, and globally distributed CDN edge caching. Hosted across top cloud environments including Vercel Edge and Render, your web platforms remain lightning-fast and accessible worldwide.",
      "By eliminating traditional single-server bottlenecks, our cloud architecture dynamically load-balances incoming web traffic across redundant serverless nodes. This ensures that even during massive traffic spikes, page render speed remains well under 50 milliseconds.",
      "Every cloud deployment includes automated TLS 1.3 256-bit SSL encryption, DDoS mitigation firewalls, and daily cloud snapshot backups to guarantee continuous 99.99% operational uptime.",
    ],
    layers: [
      { step: "01", title: "Global CDN Routing", desc: "Automated DNS routing directing user requests to the geographically closest CDN edge node.", icon: <FaNetworkWired /> },
      { step: "02", title: "Serverless Compute", desc: "Auto-scaling Node.js function execution with zero cold-start latency or server overhead.", icon: <FaSync /> },
      { step: "03", title: "Encrypted Transport", desc: "Automated TLS 1.3 SSL certificate generation, renewal, and HTTPS security header enforcement.", icon: <FaLock /> },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80", caption: "Global High-Speed Cloud Datacenter Fiber Optics" },
      { url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80", caption: "High-Performance Cloud Server Hardware Racks" },
    ],
    lifecycle: [
      { step: "01", title: "Architecture Plan", desc: "Assessing bandwidth requirements and multi-region failover strategies." },
      { step: "02", title: "CDN Setup", desc: "Configuring global edge caching rules and SSL certificate auto-renewals." },
      { step: "03", title: "CI/CD Pipeline", desc: "Connecting GitHub repositories for automated 60-second production builds." },
      { step: "04", title: "Load Testing", desc: "Simulating high-concurrency user spikes to verify auto-scaling response." },
      { step: "05", title: "Production Launch", desc: "Enabling DNS edge routing with 24/7 automated monitoring." },
    ],
    useCases: [
      { title: "High-Traffic SaaS Portals", desc: "Global web platforms serving thousands of active users with sub-50ms latency." },
      { title: "Zero-Downtime E-Commerce", desc: "Online marketplaces with automated serverless scaling during flash sales." },
      { title: "Disaster Recovery Clouds", desc: "Multi-region cloud backups with automated failover switching." },
    ],
    codeSnippet: `// ☁️ KodNexuz Cloud Serverless Edge Configuration
export default {
  edgeNetwork: "VERCEL_RENDER_GLOBAL",
  cdnNodes: 280,
  tlsProtocol: "TLS_1_3_256_BIT",
  autoScaleRules: {
    minInstances: 2,
    maxInstances: 100,
    targetCpuUtilization: "75%",
  },
};`,
    safeguards: [
      "Sub-50ms global latency via 280+ CDN Edge caching nodes",
      "Automated TLS 1.3 256-bit SSL certificate generation & 90-day renewal",
      "Zero-downtime rolling production deployments in under 60 seconds",
      "DDoS mitigation firewalls with edge rate-limiting defense",
    ],
    specs: [
      { key: "Global Edge Nodes", value: "280+ CDN Caching Points" },
      { key: "Uptime SLA", value: "99.99% Guaranteed Uptime" },
      { key: "SSL Protocol", value: "TLS 1.3 256-Bit Encryption" },
      { key: "CI/CD Automation", value: "60-Second GitHub Auto-Build" },
      { key: "DDoS Mitigation", value: "Edge Firewall Rate Limiting" },
    ],
    faqs: [
      { q: "How does KodNexuz maintain 99.99% uptime during server maintenance?", a: "By maintaining multi-zone replica clusters on Vercel Edge and Render cloud servers, live traffic is seamlessly routed to secondary mirror nodes during maintenance without interrupting active users." },
      { q: "Is automated SSL included with custom domain setups?", a: "Yes! All custom domains hosted on KodNexuz cloud infrastructure receive free automated TLS 1.3 256-bit SSL certificates that auto-renew every 90 days." },
      { q: "Can we scale cloud resources on demand?", a: "Yes! Our serverless cloud infrastructure automatically scales compute resources up or down depending on real-time traffic volume." },
    ],
  },

  "team-collaboration": {
    title: "Team Collaboration & Mentorship",
    subtitle: "Interactive learning communities, real-time code reviews, and mentor guidance.",
    icon: <FaUsers className="text-5xl text-pink-600" />,
    badge: "Interactive Community",
    metrics: [
      { label: "Active Interns", value: "10,000+" },
      { label: "Mentor Response", value: "< 15 mins" },
      { label: "Community Rating", value: "4.9 / 5.0" },
    ],
    paragraphs: [
      "KodNexuz fosters a collaborative learning environment where students, interns, and developers work side-by-side with experienced industry leads. Our platform bridges the gap between academic theory and real-world software engineering.",
      "Interns participate in daily Agile standups, submit pull requests on production Git repositories, and receive detailed 1-on-1 code reviews from senior engineers. This ensures you master industry coding standards, version control workflows, and project management practices.",
      "With dedicated sub-15 minute Q&A support channels, peer group coding sprints, and structured career guidance, KodNexuz prepares you to step confidently into professional software developer roles.",
    ],
    layers: [
      { step: "01", title: "Daily Agile Standups", desc: "Structured morning syncs to review daily sprint tasks, blockers, and project goals.", icon: <FaUsers /> },
      { step: "02", title: "Git Code Reviews", desc: "Senior mentor pull request reviews providing line-by-line feedback on code quality.", icon: <FaCode /> },
      { step: "03", title: "Live Doubt Resolution", desc: "Dedicated sub-15 minute support channels to resolve technical roadblocks instantly.", icon: <FaCheckDouble /> },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80", caption: "Software Engineering Team Collaboration & Mentorship" },
      { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80", caption: "1-on-1 Senior Mentor Pull Request Code Reviews" },
    ],
    lifecycle: [
      { step: "01", title: "Onboarding", desc: "Setting up development environments, Git access, and team channels." },
      { step: "02", title: "Sprint Planning", desc: "Assigning real-world project tasks and user stories." },
      { step: "03", title: "Pair Coding", desc: "Collaborative feature building with peer developer partners." },
      { step: "04", title: "Mentor Review", desc: "Submitting code for senior engineering pull request review." },
      { step: "05", title: "Project Handoff", desc: "Deploying completed features and updating internship portfolios." },
    ],
    useCases: [
      { title: "Virtual Tech Internships", desc: "Hands-on internship programs with real-world software project experience." },
      { title: "Corporate Onboarding", desc: "Accelerated developer onboarding with structured mentor guidance." },
      { title: "Peer Coding Sprints", desc: "Collaborative hackathons and sprint projects built in developer teams." },
    ],
    codeSnippet: `// 👥 KodNexuz Mentorship Pull Request Audit Hook
export const auditPullRequest = async (prData) => {
  const { author, codeChanges, testsPassed } = prData;
  if (testsPassed && codeChanges.coverage > 90) {
    await assignSeniorMentorReviewer(author.id);
    return { status: "READY_FOR_MENTOR_REVIEW" };
  }
};`,
    safeguards: [
      "Sub-15 minute SLA response time for mentor doubt resolution",
      "Mandatory senior engineer pull request approvals before code merge",
      "Real production Git repository branch protection rules",
      "Structured Agile Kanban boards tracking sprint progress",
    ],
    specs: [
      { key: "Mentor SLA Response", value: "< 15 Minutes" },
      { key: "Version Control", value: "GitHub Enterprise Repositories" },
      { key: "Sprint Management", value: "Agile Kanban Method" },
      { key: "Review Frequency", value: "Daily Pull Request Audits" },
      { key: "Community Platform", value: "KodNexuz Interactive Workspace" },
    ],
    faqs: [
      { q: "How fast do mentors respond to technical questions?", a: "Our dedicated senior engineering team maintains a sub-15 minute response SLA during active project working hours." },
      { q: "Do interns work on real software projects?", a: "Yes! All interns build production-grade full-stack web applications, REST APIs, and database modules under mentor supervision." },
      { q: "Is a certificate provided upon completing the internship?", a: "Yes! Every successful intern receives a QR-verified digital certificate of completion with a unique Credential ID." },
    ],
  },

  "ai-integration": {
    title: "AI Integration & Automation",
    subtitle: "KodNexuz AI Engine powered by Google Gemini models for automated administrative intelligence.",
    icon: <FaRobot className="text-5xl text-purple-600" />,
    badge: "AI Powered 2.0",
    metrics: [
      { label: "AI Response Speed", value: "< 1.2s" },
      { label: "Automation Reliability", value: "100% Fail-Safe" },
      { label: "Gemini Model Vers.", value: "v1beta / v1" },
    ],
    paragraphs: [
      "KodNexuz integrates state-of-the-art Artificial Intelligence powered by Google Gemini 2.0 and 1.5 Flash models to automate administrative operations, student communications, and platform metrics analysis.",
      "Our AI engine processes natural language prompts from administrators to automatically analyze student registration velocity, draft personalized enrollment reminder emails, and generate transactional campaigns sent via Brevo SMTP servers.",
      "To ensure 100% uptime, KodNexuz AI features an automated multi-model fallback stack: if Gemini 2.0 is unreachable, requests seamlessly route to Gemini 1.5 Flash, followed by our local database fallback engine.",
    ],
    layers: [
      { step: "01", title: "Natural Language Processor", desc: "Translates administrative instructions into structured database query parameters.", icon: <FaRobot /> },
      { step: "02", title: "Google Gemini Neural Engine", desc: "High-speed multi-model language processing for automated draft generation.", icon: <FaCogs /> },
      { step: "03", title: "Brevo SMTP Dispatcher", desc: "Automated 1-click email campaign execution with tracking logs.", icon: <FaEnvelope /> },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80", caption: "Google Gemini Artificial Intelligence Neural Engine" },
      { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80", caption: "Automated Natural Language Email Generation" },
    ],
    lifecycle: [
      { step: "01", title: "Prompt Input", desc: "Admin enters natural language operational instructions." },
      { step: "02", title: "AI Analysis", desc: "Gemini 2.0 analyzes registration data and intent." },
      { step: "03", title: "Draft Generation", desc: "AI generates personalized student email templates." },
      { step: "04", title: "Verification", desc: "Admin reviews draft content and target recipient count." },
      { step: "05", title: "Brevo Dispatch", desc: "Emails dispatched via Brevo SMTP with execution logs." },
    ],
    useCases: [
      { title: "Automated Student Reminders", desc: "AI-generated reminder emails to pending registered students." },
      { title: "Registration Velocity Analysis", desc: "Automated summary reports on weekly course enrollment trends." },
      { title: "Intelligent Admin Assistant", desc: "Conversational admin helper for instant platform analytics lookups." },
    ],
    codeSnippet: `// 🤖 KodNexuz Google Gemini 2.0 Multi-Model AI Router
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateEmailDraft = async (promptText) => {
  try {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const result = await model.generateContent(promptText);
    return { status: "SUCCESS", text: result.response.text() };
  } catch (err) {
    return fallbackLocalAiEngine(promptText);
  }
};`,
    safeguards: [
      "Multi-model failover stack: Gemini 2.0 ➔ Gemini 1.5 Flash ➔ Local DB Fallback",
      "Zero public training policy: student prompts remain strictly private",
      "Interactive 1-click preview modal before executing batch emails",
      "Sub-1.2 second response time for administrative queries",
    ],
    specs: [
      { key: "AI Core Models", value: "Google Gemini 2.0 / 1.5 Flash" },
      { key: "Fallback Safety", value: "Multi-Model + Local DB Engine" },
      { key: "Email Integration", value: "Brevo Transactional SMTP API" },
      { key: "Response Latency", value: "Sub-1.2 Seconds" },
      { key: "Data Confidentiality", value: "Zero Data Training Usage" },
    ],
    faqs: [
      { q: "What happens if the primary AI API experiences downtime?", a: "KodNexuz AI features an automated multi-model failover stack: if Gemini 2.0 is unreachable, the system instantly routes requests to Gemini 1.5 Flash, followed by our local database fallback engine." },
      { q: "Is student data used to train public AI models?", a: "Never! All prompts processed through KodNexuz AI are strictly scoped to private operational sessions and are never submitted to public AI training datasets." },
      { q: "Can administrators review AI-generated emails before sending?", a: "Yes! All email drafts are presented in an interactive preview modal where admins can edit, approve, or launch campaigns with 1 click." },
    ],
  },

  "secure-systems": {
    title: "Enterprise-Grade Secure Systems",
    subtitle: "Multi-layer security, role-based access control, and encrypted authentication.",
    icon: <FaShieldAlt className="text-5xl text-emerald-600" />,
    badge: "Zero-Trust Security",
    metrics: [
      { label: "Password Encryption", value: "Bcrypt 10 Rounds" },
      { label: "Token Expiry", value: "JWT Timed Session" },
      { label: "Vulnerability Score", value: "Zero Known Risk" },
    ],
    paragraphs: [
      "Security is engineered into every layer of KodNexuz. We adhere to strict Zero-Trust security principles, ensuring that every user request, API payload, and session token is cryptographically authenticated before execution.",
      "User credentials are encrypted using bcrypt with 10 rounds of salt, rendering passwords immune to brute-force or rainbow table attacks. Active sessions are managed via timed JSON Web Tokens (JWT) stored securely with HTTP-only attributes.",
      "In addition, our platform features CORS domain firewalls, automated input sanitization against SQL/NoSQL injection attacks, and strict Role-Based Access Control (RBAC) to guarantee total enterprise data safety.",
    ],
    layers: [
      { step: "01", title: "Transport Layer Security", desc: "HTTPS TLS 1.3 256-bit encryption protecting all data in transit.", icon: <FaLock /> },
      { step: "02", title: "Cryptographic Password Salt", desc: "Bcrypt 10-round hashing algorithm safeguarding user credentials.", icon: <FaKey /> },
      { step: "03", title: "Role-Based Access Control", desc: "RBAC middleware enforcing strict permissions for admin vs student roles.", icon: <FaShieldVirus /> },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80", caption: "Cyber Security Lock & Digital Shield Protection" },
      { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80", caption: "CORS Firewall & Network Security Monitoring" },
    ],
    lifecycle: [
      { step: "01", title: "Authentication", desc: "Verifying user credentials against bcrypt encrypted hashes." },
      { step: "02", title: "Token Issuance", desc: "Generating timed, signed JWT session authorization tokens." },
      { step: "03", title: "Sanitization", desc: "Filtering incoming payload parameters to prevent XSS/SQL injections." },
      { step: "04", title: "Permission Check", desc: "Verifying RBAC middleware route access rights." },
      { step: "05", title: "Session Audit", desc: "Logging security events to automated audit audit trails." },
    ],
    useCases: [
      { title: "Enterprise Identity Management", desc: "Secure multi-role authentication for admins, mentors, and students." },
      { title: "Financial Transaction Protection", desc: "Encrypted payment verification with zero payload tampering." },
      { title: "Confidential Data Storage", desc: "Encrypted database collections with strict access controls." },
    ],
    codeSnippet: `// 🛡️ KodNexuz Bcrypt Salt Password Encryption & JWT Token Security
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPasswordAndSignToken = async (plainPassword, userId) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return { hashedPassword, token };
};`,
    safeguards: [
      "Bcrypt password salting with 10 cryptographic hashing rounds",
      "HTTP-only timed JWT session authorization tokens",
      "CORS domain origin firewall restricting unauthorized API access",
      "Automatic payload input sanitization blocking SQL/NoSQL injections",
    ],
    specs: [
      { key: "Password Hashing", value: "Bcrypt (10 Salt Rounds)" },
      { key: "Session Token", value: "JSON Web Token (JWT) Timed" },
      { key: "Transport Encryption", value: "HTTPS / TLS 1.3 256-Bit" },
      { key: "Access Control", value: "RBAC Admin / User Middleware" },
      { key: "Firewall Defense", value: "CORS / Helmet HTTP Headers" },
    ],
    faqs: [
      { q: "Are passwords stored in plain text anywhere in the database?", a: "Never! Passwords are hashed using bcrypt with 10 rounds of salt before being stored in the database." },
      { q: "What happens when a user session expires?", a: "When a JWT token expires, the system automatically redirects the user to the login screen to re-authenticate." },
      { q: "How are API endpoints protected against unauthorized access?", a: "All sensitive API endpoints pass through JWT verification middleware that validates token signatures and role permissions before executing database queries." },
    ],
  },

  "data-analytics": {
    title: "Data Analytics & Performance Insights",
    subtitle: "Real-time student progress tracking, enrollment analytics, and credential logs.",
    icon: <FaChartLine className="text-5xl text-indigo-600" />,
    badge: "Real-Time Insights",
    metrics: [
      { label: "Data Refresh Rate", value: "Real-Time" },
      { label: "Tracking Accuracy", value: "100%" },
      { label: "Analytics Latency", value: "< 50ms" },
    ],
    paragraphs: [
      "KodNexuz empowers platform administrators and educators with real-time performance analytics and student progress tracking. Our interactive visual dashboards provide clear visibility into course completion rates, active enrollment trends, and certificate issuance velocity.",
      "Automated analytics aggregate student interaction logs, quiz scores, and project submission statuses, presenting actionable data through clean visual charts, gauges, and metric counters.",
      "With instant data filtering, exportable report logs, and automated registration alerts, platform decision-makers can identify learning bottlenecks and optimize course delivery in real time.",
    ],
    layers: [
      { step: "01", title: "Live Event Stream", desc: "Real-time aggregation of student logins, quiz completions, and project submissions.", icon: <FaChartLine /> },
      { step: "02", title: "Visual Dashboard Engine", desc: "Interactive charts, progress meters, and registration counters.", icon: <FaSlidersH /> },
      { step: "03", title: "Automated Export Logs", desc: "Exportable analytics reports for administrative reviews.", icon: <FaCheckDouble /> },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", caption: "Real-Time Data Analytics & Performance Metrics Screen" },
      { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80", caption: "Executive Dashboard Reports & Trend Tracking" },
    ],
    lifecycle: [
      { step: "01", title: "Data Collection", desc: "Tracking user events across portal modules in real time." },
      { step: "02", title: "Aggregation", desc: "Summarizing registration counts, course completion %, and active users." },
      { step: "03", title: "Chart Rendering", desc: "Displaying interactive visual charts and progress meters." },
      { step: "04", title: "Alert Triggers", desc: "Notifying admins when pending student actions require attention." },
      { step: "05", title: "Report Export", desc: "Generating administrative PDF/CSV analytical summaries." },
    ],
    useCases: [
      { title: "Student Progress Monitoring", desc: "Tracking individual course completion percentages and project reviews." },
      { title: "Batch Enrollment Analytics", desc: "Analyzing student registration velocity across Web Dev, App Dev, Python, and AI tracks." },
      { title: "Certificate Verification Logs", desc: "Auditing QR-code credential verification requests." },
    ],
    codeSnippet: `// 📈 KodNexuz Analytics Real-Time Aggregation Pipeline
export const getActiveRegistrationMetrics = async () => {
  const activeCount = await User.countDocuments({ status: "ACTIVE" });
  const pendingCount = await User.countDocuments({ status: "PENDING" });
  return {
    totalRegistered: activeCount + pendingCount,
    activeUsers: activeCount,
    pendingUsers: pendingCount,
    refreshTimestamp: new Date().toISOString(),
  };
};`,
    safeguards: [
      "Sub-50ms visual chart rendering latency",
      "Real-time event stream synchronization for live registration counters",
      "1-click exportable PDF/CSV administrative analytics reports",
      "365-day historical log retention for platform audit compliance",
    ],
    specs: [
      { key: "Data Processing Rate", value: "Real-Time Stream Sync" },
      { key: "Visual Component Engine", value: "React Chart / Gauge Metrics" },
      { key: "Query Execution Speed", value: "Sub-50 Milliseconds" },
      { key: "Log Retention", value: "365 Days Historical Audit" },
      { key: "Export Formats", value: "PDF / CSV Analytical Logs" },
    ],
    faqs: [
      { q: "How fast do analytics refresh on the admin portal?", a: "Metrics refresh in real-time as registrations, course completions, and certificate verifications occur." },
      { q: "Can analytics reports be exported for official reviews?", a: "Yes! Administrators can generate exportable PDF and CSV reports containing student enrollment and completion metrics." },
      { q: "Are student identity logs protected during analytics aggregation?", a: "Yes! All data aggregation complies with strict privacy rules, anonymizing personal identifying data in analytical reports." },
    ],
  },

  "database-management": {
    title: "Database Management & Reliability",
    subtitle: "High-throughput MongoDB cluster architecture with automated indexing and backups.",
    icon: <FaDatabase className="text-5xl text-blue-600" />,
    badge: "MongoDB Atlas Cluster",
    metrics: [
      { label: "Database Cluster", value: "MongoDB Atlas Cloud" },
      { label: "Query Execution Speed", value: "< 15ms" },
      { label: "Data Availability", value: "99.99%" },
    ],
    paragraphs: [
      "Powered by MongoDB Atlas distributed cloud database clusters, KodNexuz delivers ultra-fast data read and write operations with sub-15 millisecond query latency. Our database topology is optimized for high-concurrency student registrations and course progress tracking.",
      "The database architecture uses indexed collections, strict Mongoose schema validation, and automated connection pooling to maintain consistent performance even under heavy traffic loads.",
      "Data is automatically replicated across Primary Master and Secondary Read Replica nodes in multi-region cloud datacenters, supported by automated daily cloud snapshot backups to prevent data loss.",
    ],
    layers: [
      { step: "01", title: "Primary Master Node", desc: "Handles high-throughput write operations for user registrations and project updates.", icon: <FaDatabase /> },
      { step: "02", title: "Secondary Read Replicas", desc: "Distributed read replica nodes optimizing query execution speeds.", icon: <FaServer /> },
      { step: "03", title: "Cloud Snapshot Vault", desc: "Automated daily snapshot backups stored in encrypted multi-region storage.", icon: <FaLock /> },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80", caption: "High-Performance Database Server Rack Hardware" },
      { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80", caption: "Distributed Cloud Data Storage Infrastructure" },
    ],
    lifecycle: [
      { step: "01", title: "Schema Design", desc: "Defining indexed Mongoose schemas with strict type validation." },
      { step: "02", title: "Cluster Provisioning", desc: "Deploying multi-region MongoDB Atlas server nodes." },
      { step: "03", title: "Query Optimization", desc: "Creating primary and compound indexes for fast lookups." },
      { step: "04", title: "Snapshot Backup", desc: "Configuring automated daily cloud backups." },
      { step: "05", title: "Failover Audit", desc: "Testing automated primary node failover scenarios." },
    ],
    useCases: [
      { title: "High-Concurrency Student Records", desc: "Storing thousands of active student profiles, course progress, and project logs." },
      { title: "Certificate Credential Vault", desc: "Tamper-proof storage of issued certificates and verification hashes." },
      { title: "Admin Audit Logging", desc: "Immutable recording of administrative system actions." },
    ],
    codeSnippet: `// 🗄️ MongoDB Atlas High-Throughput Indexed Schema & Connection Pooling
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  status: { type: String, enum: ["ACTIVE", "PENDING"], default: "PENDING" },
  createdAt: { type: Date, default: Date.now },
});

export const connectDatabaseCluster = async () => {
  return await mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 50,
    serverSelectionTimeoutMS: 5000,
  });
};`,
    safeguards: [
      "Sub-15 millisecond indexed query execution speed",
      "Automated Primary Master failover switching in under 5 seconds",
      "Daily automated cloud snapshot backups stored across multi-region vaults",
      "Encrypted TLS 1.3 database connection strings with IP whitelist rules",
    ],
    specs: [
      { key: "Database Engine", value: "MongoDB Atlas NoSQL Distributed Cluster" },
      { key: "Query Execution Speed", value: "Sub-15 Milliseconds" },
      { key: "Replica Nodes", value: "Primary Master + Secondary Replicas" },
      { key: "Backup Schedule", value: "Automated Daily Cloud Snapshots" },
      { key: "Connection Encryption", value: "TLS 1.3 / Encrypted String Secrets" },
    ],
    faqs: [
      { q: "How often are database backups created?", a: "MongoDB Atlas generates automated daily cloud snapshot backups stored across multi-region cloud vaults." },
      { q: "What happens if a primary database node fails?", a: "MongoDB Atlas automatically promotes a secondary read replica to primary master in under 5 seconds without data loss." },
      { q: "How is database connection security enforced?", a: "Database access requires encrypted connection strings with IP whitelist restrictions and environment secret authorization." },
    ],
  },

  "privacy-first": {
    title: "Privacy First & Zero Data Leak Guarantee",
    subtitle: "Complete data protection, 2-Factor OTP verification, and strict confidentiality.",
    icon: <FaLock className="text-5xl text-rose-600" />,
    badge: "100% Data Protection",
    metrics: [
      { label: "OTP Delivery Speed", value: "< 5 Seconds" },
      { label: "Encryption Standard", value: "AES-256 / TLS 1.3" },
      { label: "Data Leak History", value: "0 Incidents (100% Safe)" },
    ],
    paragraphs: [
      "At KodNexuz, user privacy is our highest priority. We enforce a zero-data-leak architecture where your personal credentials, contact info, and registration details are protected with bank-grade encryption, secure 2-Factor OTP verification via Brevo SMTP API, and strict HTTPS transmission protocols.",
      "Every user login or account registration requires a 6-digit one-time passcode delivered directly to your verified email address within 5 seconds. This guarantees that unauthorized access or credential stuffing attempts are blocked immediately.",
      "We operate under a strict zero third-party sharing commitment: your personal information is used exclusively for portal learning management and is never sold, shared, or exposed to external advertisers.",
    ],
    layers: [
      { step: "01", title: "6-Digit OTP Passcode", desc: "Cryptographic 6-digit one-time passcode generated in memory.", icon: <FaKey /> },
      { step: "02", title: "Brevo SMTP Dispatcher", desc: "Passcode encrypted and dispatched via Brevo transactional servers.", icon: <FaEnvelope /> },
      { step: "03", title: "Zero Third-Party Sharing", desc: "100% data confidentiality guarantee with encrypted session tokens.", icon: <FaUserCheck /> },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80", caption: "Privacy Keycard Security & 2-Factor OTP Verification Guard" },
      { url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80", caption: "Encrypted End-to-End Data Tunnel Transmission" },
    ],
    lifecycle: [
      { step: "01", title: "Registration Input", desc: "User submits account details on KodNexuz registration form." },
      { step: "02", title: "OTP Generation", desc: "Cryptographic 6-digit OTP passcode generated in memory." },
      { step: "03", title: "Brevo Dispatch", desc: "Passcode encrypted & dispatched via Brevo SMTP." },
      { step: "04", title: "Passcode Entry", desc: "User inputs 6-digit passcode into verification modal." },
      { step: "05", title: "Session Granted", desc: "Verified JWT session launched with zero data leak guarantee." },
    ],
    useCases: [
      { title: "2-Factor Student Verification", desc: "Mandatory OTP verification for every account registration and login." },
      { title: "Confidential Student Data Vault", desc: "Encrypted storage of personal student records with zero leak history." },
      { title: "Secure Certificate Issuance", desc: "Tamper-proof credential validation with unique QR code seals." },
    ],
    codeSnippet: `// 🔒 KodNexuz 2-Factor 6-Digit OTP Verification Routine
import crypto from "crypto";
import { brevoSmtp } from "@kodnexuz/email";

export const generateAndDispatchOtp = async (userEmail) => {
  const otpCode = crypto.randomInt(100000, 999999).toString();
  await brevoSmtp.sendTransactionalEmail({
    to: userEmail,
    subject: "Your KodNexuz 6-Digit Verification Code",
    htmlContent: \`<p>Your OTP code is: <strong>\${otpCode}</strong>. Valid for 10 minutes.</p>\`,
  });
  return { status: "OTP_DISPATCHED", expiresAt: Date.now() + 600000 };
};`,
    safeguards: [
      "Sub-5 second 6-digit OTP passcode delivery via Brevo SMTP",
      "SPF & DKIM authenticated email domain verification",
      "Strict 100% zero third-party data sharing guarantee",
      "10-minute automatic OTP passcode expiration timer",
    ],
    specs: [
      { key: "OTP Passcode Length", value: "6 Cryptographic Digits" },
      { key: "Delivery Gateway", value: "Brevo Transactional SMTP API" },
      { key: "Domain Authentication", value: "SPF / DKIM Authenticated" },
      { key: "Session Encryption", value: "AES-256 / TLS 1.3 HTTPS" },
      { key: "Third-Party Data Policy", value: "Strict 100% Zero Sharing" },
    ],
    faqs: [
      { q: "Is user data ever sold to third-party advertisers?", a: "Never! KodNexuz enforces a strict zero third-party sharing policy. Your email, contact info, and registration details are used strictly for portal account management." },
      { q: "What happens if I don't receive my 6-digit OTP code?", a: "You can click 'Resend OTP' in the verification modal to generate a new 6-digit passcode dispatched instantly via Brevo SMTP." },
      { q: "How long is a 6-digit OTP passcode valid?", a: "OTP passcodes expire after 10 minutes for maximum security." },
    ],
  },
};

const FeatureDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Fallback to custom-software if slug not found
  const feature = featureData[slug] || featureData["custom-software"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* 🌟 1. Hero Header Section */}
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
              <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-md">
                {feature.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                {feature.title}
              </h1>
              <p className="text-lg sm:text-xl text-purple-200 leading-relaxed font-light">
                {feature.subtitle}
              </p>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center shrink-0">
              {feature.icon}
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 Main Multi-Page Content Section (6-8 Scroll Pages Deep) */}
      <section className="py-16 max-w-6xl mx-auto px-6 w-full flex-grow space-y-20">
        
        {/* Section 1: Executive SLA Metrics Bar */}
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

        {/* Section 2: Deep Executive & Technical Narrative */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="270 100 65"
          backgroundColor="#ffffff"
          borderRadius={24}
          glowRadius={25}
          glowIntensity={0.8}
        >
          <div className="p-8 sm:p-12 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="text-purple-600">✦</span> Comprehensive Technical Capability Breakdown
            </h2>
            {feature.paragraphs.map((pText, idx) => (
              <p key={idx} className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal">
                {pText}
              </p>
            ))}
          </div>
        </BorderGlow>

        {/* Section 3: Visual 3-Tier Layer Blueprint */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-xl space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Visual System Blueprint
            </span>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-3">
              3-Stage Technical Architecture
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Decoupled, high-performance modular layers engineered for enterprise safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feature.layers.map((layer, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-50/60 to-indigo-50/60 p-8 rounded-2xl border border-purple-200 space-y-4 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-md">
                  {layer.icon}
                </div>
                <h4 className="font-bold text-gray-900 text-xl">{layer.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: High-Res Technology Photography Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {feature.gallery.map((img, idx) => (
            <div key={idx} className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 group h-80">
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white font-bold text-base sm:text-lg leading-snug">{img.caption}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 5: 5-Stage Delivery & Execution Lifecycle */}
        <div className="bg-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-pink-500/30">
              Seamless Execution Method
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-3">
              5-Step Implementation Journey
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {feature.lifecycle.map((item, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-pink-400 font-extrabold text-3xl">{item.step}</span>
                <h4 className="font-bold text-white text-base">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Real-World Enterprise Use Cases */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-purple-100 shadow-xl space-y-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
            Real-World Enterprise Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feature.useCases.map((uc, idx) => (
              <div key={idx} className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-3">
                <h4 className="font-bold text-purple-900 text-lg">{uc.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Interactive Code Snippet & Terminal Output Mockup */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <FaTerminal className="text-sm" />
              <span>kodnexuz-production-engine // {slug}.config.js</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <pre className="font-mono text-xs sm:text-sm text-purple-200 overflow-x-auto p-4 bg-slate-900 rounded-xl border border-slate-800 leading-relaxed">
            {feature.codeSnippet}
          </pre>
        </div>

        {/* Section 8: Security & Compliance Safeguards Checklist */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-emerald-100 shadow-xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
            Security & Quality Safeguards Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {feature.safeguards.map((sg, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <FaCheckCircle className="text-emerald-500 text-lg shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">{sg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 9: Feature Technical Specifications Table */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
            Technical Specifications & Standards
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Specification Category</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Technical Standard / Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {feature.specs.map((spec, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/30 transition">
                    <td className="p-4 font-bold text-gray-800">{spec.key}</td>
                    <td className="p-4 text-purple-700 font-semibold">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 10: Comprehensive Feature FAQs */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h3>
            <p className="text-gray-600 text-sm mt-2">Answers to key technical questions</p>
          </div>
          {feature.faqs.map((faq, idx) => (
            <FeatureFaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>

        {/* Section 11: Call to Action Conversion Banner */}
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
