import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import BorderGlow from "./BorderGlow";

const AuthModal = ({ isOpen, initialMode = "login", onClose }) => {
  const [mode, setMode] = useState(initialMode); // "login" or "signup"
  
  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // OTP states
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Status message states
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  // Submit loading states
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com";

  // Mode updates when modal opens/changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      clearForm();
    }
  }, [isOpen, initialMode]);

  // Cooldown timer
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setOtp("");
    setOtpSent(false);
    setIsVerified(false);
    setErrorMsg("");
    setSuccessMsg("");
  };

  if (!isOpen) return null;

  // ---------------- Send OTP ----------------
  const sendOtp = async () => {
    if (!email) return setErrorMsg("Please enter your email first");

    setLoadingOtp(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post(`${API_BASE}/send-otp`, { email });
      if (res.data?.success) {
        setOtpSent(true);
        setCooldown(60);
        setSuccessMsg("OTP sent successfully!");
        setTimeout(() => {
          document.getElementById("modal-otp-input")?.focus();
        }, 100);
      } else {
        setErrorMsg(res.data?.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error("🔴 OTP sending error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setLoadingOtp(false);
    }
  };

  // ---------------- Verify OTP ----------------
  const verifyOtp = async () => {
    if (!otp) return setErrorMsg("Please enter OTP");

    setVerifyingOtp(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post(`${API_BASE}/verify-otp`, { 
        email: email.trim(), 
        otp: otp.trim() 
      });

      if (res.data?.success) {
        setIsVerified(true);
        setSuccessMsg("✅ Email verified successfully!");
      } else {
        setErrorMsg(res.data?.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error("🔴 OTP verification error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // ---------------- Sign Up Submission ----------------
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!isVerified) return setErrorMsg("Please verify your email before signing up.");
    if (!firstName || !lastName || !email || !password)
      return setErrorMsg("Please fill all required fields.");

    const signupData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password,
    };

    setLoadingSubmit(true);
    try {
      const res = await axios.post(`${API_BASE}/signup`, signupData, {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true,
      });

      if (res.status === 200 && res.data?.success) {
        setSuccessMsg("Signup successful! Please login now.");
        // Clear all fields
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setOtp("");
        setOtpSent(false);
        setIsVerified(false);
        // Switch to login tab in modal
        setTimeout(() => {
          setMode("login");
          setSuccessMsg("Signup successful! Please enter credentials to login.");
        }, 1500);
      } else {
        setErrorMsg(res.data?.message || "Signup failed. Please check your details.");
      }
    } catch (err) {
      console.error("🔴 Signup error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Error signing up.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ---------------- Login Submission ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) return setErrorMsg("Enter email and password");

    setLoadingSubmit(true);
    try {
      const res = await axios.post(`${API_BASE}/login`, { 
        email: email.trim(), 
        password 
      });

      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", email.trim());
        onClose();
        
        if (res.data.role === "admin") navigate("/admin-dashboard");
        else navigate("/dashboard");
      } else {
        setErrorMsg(res.data?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("🔴 Login error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-20 sm:pt-24 bg-slate-950/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      {/* Modal Wrapper with BorderGlow */}
      <BorderGlow
        edgeSensitivity={40}
        glowColor="270 100 65"
        backgroundColor="#ffffff"
        borderRadius={24}
        glowRadius={35}
        glowIntensity={1.2}
        coneSpread={30}
        animated={true}
        colors={['#c084fc', '#f472b6', '#3b82f6']}
        className="w-full max-w-md my-auto mt-10 sm:mt-16 mb-8"
      >
        <div className="relative p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes size={20} />
          </button>

          {/* Toggle Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => { setMode("login"); setErrorMsg(""); setSuccessMsg(""); }}
              className={`flex-1 pb-3 text-lg font-bold text-center border-b-2 transition ${
                mode === "login"
                  ? "border-purple-600 text-purple-600 font-extrabold"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setMode("signup"); setErrorMsg(""); setSuccessMsg(""); }}
              className={`flex-1 pb-3 text-lg font-bold text-center border-b-2 transition ${
                mode === "signup"
                  ? "border-purple-600 text-purple-600 font-extrabold"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error and Success Status Messages */}
          {errorMsg && (
            <p className="bg-red-50 text-red-600 text-sm font-semibold p-2.5 rounded-lg mb-4 border border-red-200">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="bg-green-50 text-green-600 text-sm font-semibold p-2.5 rounded-lg mb-4 border border-green-200">
              {successMsg}
            </p>
          )}

          {/* --- LOGIN FORM --- */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loadingSubmit}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:opacity-95 transition-all duration-300 disabled:opacity-50"
              >
                {loadingSubmit ? "Signing in..." : "Login"}
              </button>
            </form>
          )}

          {/* --- SIGNUP FORM --- */}
          {mode === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition"
                    required
                    disabled={isVerified}
                  />
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={!email || loadingOtp || cooldown > 0 || isVerified}
                    className={`px-4 rounded-xl font-semibold text-sm transition ${
                      email && !loadingOtp && cooldown === 0 && !isVerified
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {loadingOtp 
                      ? "Sending..." 
                      : cooldown > 0 
                        ? `Resend in ${cooldown}s` 
                        : isVerified
                          ? "Verified ✓"
                          : otpSent 
                            ? "Resend" 
                            : "Send OTP"}
                  </button>
                </div>
              </div>

              {otpSent && !isVerified && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Verification Code (OTP)</label>
                  <div className="flex gap-2 animate-slideIn">
                    <input
                      id="modal-otp-input"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={!otp || verifyingOtp}
                      className={`px-6 rounded-xl font-semibold text-sm transition ${
                        otp && !verifyingOtp
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {verifyingOtp ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Create Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isVerified || loadingSubmit}
                className={`w-full py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 ${
                  isVerified && !loadingSubmit
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loadingSubmit ? "Signing up..." : "Register"}
              </button>
            </form>
          )}
        </div>
      </BorderGlow>
    </div>
  );
};

export default AuthModal;
