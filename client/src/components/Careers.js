import React, { useState } from "react";
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
  const navigate = useNavigate();

  // ✅ Configure backend base URL for cleaner code
  const API_BASE = (process.env.REACT_APP_API_BASE_URL || "http://localhost:5000") + "";

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
      const res = await axios.post(`${API_BASE}/verify-otp`, { email, otp });

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

    try {
      const res = await axios.post(`${API_BASE}/signup`, signupData, {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true, // prevents axios from throwing automatically
      });

      console.log("🟢 Signup response:", res.data);

      if (res.status === 200 && res.data?.success) {
        setSuccessMsg("Signup successful! Please login now.");
        setShowLogin(true);
      } else {
        setErrorMsg(res.data?.message || "Signup failed. Please check your details.");
      }
    } catch (err) {
      console.error("🔴 Signup error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Error signing up. Check backend logs.");
    }
  };

  // ---------------- Login ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) return setErrorMsg("Enter email and password");

    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });

      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", email);

        if (res.data.role === "admin") navigate("/admin-dashboard");
        else navigate("/dashboard");
      } else {
        setErrorMsg(res.data?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("🔴 Login error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Error logging in. Check backend logs.");
    }
  };

  return (
    <div className="bg-white">
      {/* Top Section */}
      <section className="bg-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center w-full">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              Join With Us, Shape Your Future
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              At Code Nexus, we are passionate about transforming ideas into reality. 
              We foster a culture of innovation, collaboration, and continuous learning. 
              Whether you are a developer, designer, or strategist, every contribution 
              drives progress and shapes the future of technology.
            </p>
            <button
              onClick={() => document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-lg shadow-md hover:opacity-90 transition text-lg"
            >
              Start your journey
            </button>
          </div>
          <div>
            <img src="/stlogo.png" alt="Careers" />
          </div>
        </div>
      </section>

      {/* Signup/Login Section */}
      <section id="signup-form" className="bg-gray-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-32 items-center w-full">
          <div>
            <img src="/logos.png" alt="Sign Up" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-md mx-auto">
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
                      disabled={!email || otpSent || loadingOtp}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        email && !otpSent && !loadingOtp
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {loadingOtp ? "Sending..." : otpSent ? "OTP Sent" : "Send OTP"}
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
                    disabled={!isVerified}
                    className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
                      isVerified
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Sign Up
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
                    className="w-full py-3 rounded-lg font-semibold text-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                  >
                    Login
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
