import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthModal from "./components/AuthModal";

// 🌐 Common Components
import Navbar from "./components/Navbar";
import RunningMessage from "./components/RunningMessage";
import Home from "./components/Home";
import EnterpriseImpact from "./components/EnterpriseImpact";
import Features from "./components/Features";
import Courses from "./components/Courses";
import FAQ from "./components/FAQ";
import PortalShowcase from "./components/PortalShowcase";
import Careers from "./components/Careers";
import Touch from "./components/Touch";
// import Footer from "./components/Footer";

// 🔐 Pages (Lazy Loaded for performance/code-splitting)
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const EnrollForm = lazy(() => import("./pages/EnrollForm"));
const AdminEnrollments = lazy(() => import("./pages/AdminEnrollments"));
const VerifyPage = lazy(() => import("./pages/VerifyPage"));
const FeatureDetail = lazy(() => import("./pages/FeatureDetail"));

// 🧭 Scroll-to-top on route change + clean hash from address bar
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const sectionId = hash.replace("#", "");
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
      // Clean up hash from browser address bar so kodnexuz.in/#features shows kodnexuz.in/ cleanly
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [pathname, hash]);
  return null;
};

// 🧩 Protected Route Wrapper (with JWT expiry check)
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // No token or role -> force logout to be safe
  if (!token || !userRole) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // Check JWT expiry
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (!decoded || typeof decoded.exp !== "number" || decoded.exp < now) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    // if decode fails, clear and redirect
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // Role mismatch -> redirect to respective dashboard or logout
  if (role && userRole !== role) {
    if (userRole === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (userRole === "user") return <Navigate to="/dashboard" replace />;
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // Authorized
  return children;
};

// 🧠 Main App Component
const App = () => {
  const location = useLocation();
  const [authType, setAuthType] = useState(null);

  // Global listeners to trigger auth modal
  useEffect(() => {
    window.openAuthModal = (type) => setAuthType(type);
    window.closeAuthModal = () => setAuthType(null);
    return () => {
      delete window.openAuthModal;
      delete window.closeAuthModal;
    };
  }, []);

  // Check URL params for login/signup triggers
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const auth = params.get("auth");
    if (auth === "login" || auth === "signup") {
      setAuthType(auth);
      // Clear param to keep URL clean
      const newSearch = location.search.replace(/[?&]auth=[^&]+/, "").replace(/^&/, "?");
      window.history.replaceState({}, document.title, location.pathname + newSearch);
    }
  }, [location]);

  // 🚀 Senior UI/UX Scroll Reveal Observer
  useEffect(() => {
    const selector = ".scroll-reveal, .scroll-reveal-text, .scroll-reveal-card, .scroll-reveal-image";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(`${selector}:not(.reveal-visible)`);
      elements.forEach((el) => observer.observe(el));
    };

    const frameId = requestAnimationFrame(observeAll);
    const interval = setInterval(observeAll, 600);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(interval);
      observer.disconnect();
    };
  }, [location]);



  // Hide Navbar/Footer for auth/dashboard/enroll routes + verify
  const hideLayout =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/admin-dashboard") ||
    location.pathname.startsWith("/admin/") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/enroll") ||
    location.pathname.startsWith("/verify"); // ✅ added verify

  return (
    <>
      <ScrollToTop />

      {/* Global Floating Auth Modal */}
      <AuthModal
        isOpen={authType !== null}
        initialMode={authType || "login"}
        onClose={() => setAuthType(null)}
      />

      {/* Navbar & running message (hidden on specific pages) */}
      {!hideLayout && <Navbar />}
      {!hideLayout && <RunningMessage />}

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      }>
        <Routes>
          {/* Public Landing Page */}
          <Route
            path="/"
            element={
              <>
                <div className="scroll-reveal"><Home /></div>
                <div className="scroll-reveal"><Features /></div>
                <div className="scroll-reveal"><Courses /></div>
                <div className="scroll-reveal"><PortalShowcase /></div>
                <div className="scroll-reveal"><EnterpriseImpact /></div>
                <div className="scroll-reveal"><FAQ /></div>
                <div className="scroll-reveal"><Careers /></div>
                <div className="scroll-reveal"><Touch /></div>
              </>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin - View Enrollments */}
          <Route
            path="/admin/enrollments"
            element={
              <ProtectedRoute role="admin">
                <AdminEnrollments />
              </ProtectedRoute>
            }
          />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Enrollment Form */}
          <Route
            path="/enroll"
            element={
              <ProtectedRoute role="user">
                <EnrollForm />
              </ProtectedRoute>
            }
          />

          {/* ✅ Certificate Verification Page */}
          <Route path="/verify" element={<VerifyPage />} />

          {/* 🌟 Deep Feature Detail Breakdown Page */}
          <Route path="/feature/:slug" element={<FeatureDetail />} />

          {/* Legacy redirects */}
          <Route path="/login" element={<Navigate to="/?auth=login" replace />} />
          <Route path="/signup" element={<Navigate to="/?auth=signup" replace />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
                404 — Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>

      {/* Footer */}
      {/* {!hideLayout && <Footer />} */}
    </>
  );
};

export default App;
