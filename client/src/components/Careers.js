import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Careers = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  // ✅ Configure backend base URL for cleaner code
  const API_BASE = (process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com") + "";

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
        document.getElementById("otp-input")?.focus();
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
      const res = await axios.post(`${API_BASE}/verify-otp`, { email: email.trim(), otp: otp.trim() });

      if (res.data?.success) {
        setIsVerified(true);
        setSuccessMsg("✅ Email verified successfully!");
      } else {
        setErrorMsg(res.data?.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error("🔴 OTP verify error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Error verifying OTP.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // ---------------- Signup ----------------
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

    console.log("🟡 Sending signup data:", signupData);

    setSigningUp(true);
    try {
      const res = await axios.post(`${API_BASE}/signup`, signupData, {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true, // prevents axios from throwing automatically
      });

      console.log("🟢 Signup response:", res.data);

      if (res.status === 200 && res.data?.success) {
        setSuccessMsg("Signup successful! Please login now.");
      } else {
        setErrorMsg(res.data?.message || "Signup failed. Please check your details.");
      }
    } catch (err) {
      console.error("🔴 Signup error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Error signing up. Check backend logs.");
    } finally {
      setSigningUp(false);
    }
  };

  // ---------------- Login ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) return setErrorMsg("Enter email and password");

    setLoadingLogin(true);
    try {
      const res = await axios.post(`${API_BASE}/login`, { email: email.trim(), password });

      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", email.trim());

        if (res.data.role === "admin") navigate("/admin-dashboard");
        else navigate("/dashboard");
      } else {
        setErrorMsg(res.data?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("🔴 Login error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Error logging in. Check backend logs.");
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Top Section */}
      <section className="bg-white min-h-screen flex items-center pt-28 pb-16 md:py-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center w-full">
          <div className="text-center md:text-left">
            <h2 className="text-3.5xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
              Join With Us, Shape Your Future
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl mx-auto md:mx-0">
              At KodNexuz, we are passionate about transforming ideas into reality. 
              We foster a culture of innovation, collaboration, and continuous learning. 
              Whether you are a developer, designer, or strategist, every contribution 
              drives progress and shapes the future of technology.
            </p>
            <button
              onClick={() => document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3.5 rounded-lg shadow-md hover:opacity-90 transition text-base sm:text-lg"
            >
              Start your journey
            </button>
          </div>
          <div className="flex justify-center">
            <img src="/stlogo.png" alt="Careers" className="max-w-full h-auto max-h-[350px] md:max-h-full" />
          </div>
        </div>
      </section>

      {/* Signup/Login Section */}
      <section id="signup-form" className="bg-gray-50 min-h-screen flex items-center py-16 md:py-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center w-full">
          <div className="flex justify-center order-2 md:order-1">
            <img src="/logos.png" alt="Sign Up" className="max-w-full h-auto max-h-[300px] md:max-h-full" />
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-md mx-auto order-1 md:order-2">
            {!showLogin ? (
              <>
                <h3 className="text-2xl font-bold text-center text-purple-600 mb-6">
                  Create your account
                </h3>

                {errorMsg && <p className="text-red-600 font-semibold mb-2">{errorMsg}</p>}
                {successMsg && <p className="text-green-600 font-semibold mb-2">{successMsg}</p>}

                <form className="space-y-5" onSubmit={handleSignup}>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />

                  {/* Email + OTP */}
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={!email || loadingOtp || cooldown > 0}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        email && !loadingOtp && cooldown === 0
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {loadingOtp 
                        ? "Sending..." 
                        : cooldown > 0 
                          ? `Resend in ${cooldown}s` 
                          : otpSent 
                            ? "Resend OTP" 
                            : "Send OTP"}
                    </button>
                  </div>

                  {otpSent && !isVerified && (
                    <div className="flex gap-2 mt-2">
                      <input
                        id="otp-input"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={verifyOtp}
                        disabled={!otp || verifyingOtp}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          otp && !verifyingOtp
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {verifyingOtp ? "Verifying..." : "Verify"}
                      </button>
                    </div>
                  )}

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />

                  <button
                    type="submit"
                    disabled={!isVerified || signingUp}
                    className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
                      isVerified && !signingUp
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {signingUp ? "Signing up..." : "Sign Up"}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setShowLogin(true)}
                    className="text-pink-500 font-semibold hover:underline"
                  >
                    Login
                  </button>
                </p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-center text-purple-600 mb-6">
                  Login
                </h3>
                {errorMsg && <p className="text-red-600 font-semibold mb-2">{errorMsg}</p>}
                <form className="space-y-5" onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loadingLogin}
                    className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
                      loadingLogin
                        ? "bg-purple-400 text-white cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    {loadingLogin ? "Signing in..." : "Login"}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="text-pink-500 font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
