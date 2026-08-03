import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

// 🔐 Pages
// import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import EnrollForm from "./pages/EnrollForm";
import AdminEnrollments from "./pages/AdminEnrollments";
import VerifyPage from "./pages/VerifyPage";
 // ✅ updated import

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

      {/* Navbar & running message (hidden on specific pages) */}
      {!hideLayout && <Navbar />}
      {!hideLayout && <RunningMessage />}

      <Routes>
        {/* Public Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Features />
              <Courses />
              <FAQ />
              <Careers />
              <Touch />
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

      {/* Footer */}
      {/* {!hideLayout && <Footer />} */}
    </>
  );
};

export default App;
