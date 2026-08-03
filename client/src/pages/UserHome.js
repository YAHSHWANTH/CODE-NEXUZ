import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut, BookOpen, User as UserIcon } from "lucide-react";

const UserHome = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email") || "User";
  const firstName = userEmail.split("@")[0];
  const firstLetter = firstName.charAt(0).toUpperCase();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // go back to main page
  };

  const handleEnroll = () => {
    navigate("/enroll");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Top Navigation Bar */}
      <div className="flex justify-between items-center bg-white shadow px-6 py-4">
        {/* Menu Icon */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 hover:text-purple-600 transition"
        >
          <Menu size={26} />
        </button>

        {/* Enroll Button */}
        <button
          onClick={handleEnroll}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          Enroll Now
        </button>

        {/* Profile Icon */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold cursor-pointer">
          {firstLetter}
        </div>
      </div>

      {/* ✅ Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold">
              {firstLetter}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{firstName}</h2>
              <p className="text-sm text-gray-500">{userEmail}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-4 text-gray-700">
            <button className="flex items-center gap-2 hover:text-purple-600 transition">
              <BookOpen size={18} /> My Courses
            </button>
            <button className="flex items-center gap-2 hover:text-purple-600 transition">
              <UserIcon size={18} /> Profile
            </button>
          </nav>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Overlay (when sidebar open) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition z-40"
        ></div>
      )}

      {/* ✅ Main Content */}
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-3">
          Welcome, {firstName} 👋
        </h1>
        <p className="text-gray-600 mb-8">
          Explore and enroll in exciting opportunities.
        </p>
      </div>
    </div>
  );
};

export default UserHome;
