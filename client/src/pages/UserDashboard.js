import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  // Get user info from localStorage
  const firstName = localStorage.getItem("firstName") || "User";

  // 🔹 Navigate to /enroll on button click
  const handleEnrollClick = () => {
    navigate("/enroll");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Welcome, {firstName}! 🌸
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Begin your journey with CodeNexus — explore, enroll, and grow your skills.
        </p>

        {/* ✅ Important Notice */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-pink-200 p-6 rounded-xl shadow-inner text-gray-700 text-left">
          <h2 className="text-xl font-semibold text-purple-700 mb-3">
            📋 Important Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2 leading-relaxed">
            <li>
              <span className="font-semibold text-pink-600">Step 1:</span> Begin by
              signing up and then logging into your account using your registered
              credentials.
            </li>
            <li>
              <span className="font-semibold text-pink-600">Step 2:</span> Once logged
              in, carefully read the provided instructions on the User Dashboard before
              proceeding.
            </li>
            <li>
              <span className="font-semibold text-pink-600">Step 3:</span> Click the{" "}
              <span className="font-semibold">Enroll Now</span> button and fill in all
              the required details accurately in the enrollment form.
            </li>
            <li>
              <span className="font-semibold text-pink-600">Step 4:</span> After
              submitting the form, you will be redirected to the Home page. Please wait
              for a confirmation email from{" "}
              <span className="font-semibold text-purple-600">CodeNexus</span> within{" "}
              <span className="font-semibold">1–2 business days</span>.
            </li>
            <li>
              <span className="font-semibold text-pink-600">Step 5:</span> The admin
              team will review your enrollment and send an official{" "}
              <span className="font-semibold">Offer Letter</span> along with a{" "}
              <span className="font-semibold">Task PDF or File</span> that you are
              required to complete as per the given guidelines.
            </li>
            <li>
              <span className="font-semibold text-pink-600">Step 6:</span> Before the
              end of your course duration, you will receive another email from{" "}
              <span className="font-semibold text-purple-600">CodeNexus</span> regarding
              task submission.
            </li>
            <li>
              <span className="font-semibold text-pink-600">Step 7:</span> After your
              submission, our verification team will review your task. Upon successful
              verification, you will be awarded your official{" "}
              <span className="font-semibold text-green-600">Completion Certificate</span>.
            </li>
          </ol>

          <p className="mt-6 text-gray-600 text-sm italic">
            💡 Please ensure that you regularly check your registered email for
            updates and follow all the provided instructions carefully to avoid any
            delays in your process.
          </p>
        </div>

        {/* ✅ Enroll Button (Moved Below Instructions) */}
        <div className="mt-10">
          <button
            onClick={handleEnrollClick}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
