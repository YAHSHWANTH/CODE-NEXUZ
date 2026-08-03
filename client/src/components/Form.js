// import React, { useState } from "react";

// const Form = ({ email, setEmail, password, setPassword }) => {
//   // Local states for form fields and OTP/verification logic
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");

//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);

//   const [showLogin, setShowLogin] = useState(false); // toggle login form only

//   // --- Handlers ---

//   const sendOtp = async () => {
//     if (!email) return alert("Please enter an email first");

//     try {
//       const res = await fetch((process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com") + "/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setOtpSent(true);
//         alert(data.message || "OTP sent successfully to your email!");
//       } else {
//         console.error("send-otp response (not ok):", data);
//         alert(data.message || "Failed to send OTP.");
//         setOtpSent(false);
//       }
//     } catch (err) {
//       console.error("send-otp error:", err);
//       alert("Failed to send OTP. Check backend console and network tab.");
//       setOtpSent(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otp) return alert("Please enter the OTP you received");

//     try {
//       const res = await fetch((process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com") + "/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setIsVerified(true);
//         alert(data.message || "Email verified successfully!");
//       } else {
//         console.error("verify-otp response (not ok):", data);
//         alert(data.message || "Invalid OTP.");
//       }
//     } catch (err) {
//       console.error("verify-otp error:", err);
//       alert("Error verifying OTP. See console for details.");
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (!isVerified) return alert("Please verify your email before signing up.");

//     if (!firstName || !lastName ||
