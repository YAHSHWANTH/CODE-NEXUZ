import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthModal from "./components/AuthModal";

// 🌐 Common Components
import Navbar from "./components/Navbar";
import RunningMessage from "./components/RunningMessage";
import Home from "./components/Home";
import Features from "./components/Features";
import Courses from "./components/Courses";
import FAQ from "./components/FAQ";
import Careers from "./components/Careers";
import Touch from "./components/Touch";
// import Footer from "./components/Footer";

// 🔐 Pages (Lazy Loaded for performance/code-splitting)
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const EnrollForm = lazy(() => import("./pages/EnrollForm"));
const AdminEnrollments = lazy(() => import("./pages/AdminEnrollments"));
const VerifyPage = lazy(() => import("./pages/VerifyPage"));

// 🧭 Scroll-to-top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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

  // 🚀 Scroll reveal observer for Codevia-style text/section entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location]);

  // 🚀 Codevia-style interactive text & card translate parallax on mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const offsetX = (clientX / windowWidth - 0.5) * 24;
      const offsetY = (clientY / windowHeight - 0.5) * 24;

      const tiltElements = document.querySelectorAll(".codevia-mouse-tilt");
      tiltElements.forEach((el) => {
        const factor = parseFloat(el.getAttribute("data-tilt-factor") || "1");
        const tx = (offsetX * factor).toFixed(2);
        const ty = (offsetY * factor).toFixed(2);
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        el.style.transition = "transform 0.25s ease-out";
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
