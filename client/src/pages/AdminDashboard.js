import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DocumentFormModal from "../components/DataEntryModal";

const BASE_URL = (process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com") + "/api/admin";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // QR Code display states
  const [qrData, setQrData] = useState(null); 

  const [themeSetting, setThemeSetting] = useState("galaxy");
  const [updatingTheme, setUpdatingTheme] = useState(false);

  // Secure context menu state
  const [contextMenu, setContextMenu] = useState(null);

  // Stats state for analysis section
  const [stats, setStats] = useState({
    usersCount: 0,
    enrollmentsCount: 0,
    certificatesCount: 0,
    approvedCertificatesCount: 0,
    totalIncome: 0,
  });

  // Load counts for all three entities to compute stats and financial metrics
  const loadStats = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, enrollmentsRes, certificatesRes] = await Promise.all([
        axios.get(`${BASE_URL}/users`),
        axios.get(`${BASE_URL}/enrollments`),
        axios.get(`${BASE_URL}/certificates`),
      ]);

      const usersList = usersRes.data?.data || usersRes.data || [];
      const enrollmentsList = enrollmentsRes.data?.data || enrollmentsRes.data || [];
      const certificatesList = certificatesRes.data?.data || certificatesRes.data || [];
      const approvedCount = certificatesList.filter(c => c.status === "Approved").length;

      setStats({
        usersCount: usersList.length,
        enrollmentsCount: enrollmentsList.length,
        certificatesCount: certificatesList.length,
        approvedCertificatesCount: approvedCount,
        totalIncome: approvedCount * 150,
      });
    } catch (err) {
      console.error("❌ Error fetching analysis stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchData = useCallback(async (type) => {
    setLoading(true);
    try {
      let endpoint = "";

      if (type === "users") endpoint = `${BASE_URL}/users`;
      else if (type === "enrollments") endpoint = `${BASE_URL}/enrollments`;
      else if (type === "certificates") endpoint = `${BASE_URL}/certificates`;

      const res = await axios.get(endpoint);
      const result = res.data;

      let list = [];
      if (result.success && Array.isArray(result.data)) {
        list = result.data;
      } else if (Array.isArray(result)) {
        list = result;
      }

      setData(list);

      // Dynamically update stats values as the user navigates tabs
      if (type === "users") {
        setStats(prev => ({ ...prev, usersCount: list.length }));
      } else if (type === "enrollments") {
        setStats(prev => ({ ...prev, enrollmentsCount: list.length }));
      } else if (type === "certificates") {
        const approvedCount = list.filter(c => c.status === "Approved").length;
        setStats(prev => ({
          ...prev,
          certificatesCount: list.length,
          approvedCertificatesCount: approvedCount,
          totalIncome: approvedCount * 150
        }));
      }
    } catch (err) {
      console.error(`❌ Error fetching ${type}:`, err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load stats once on mount to initialize analytical data
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Load verification page background theme on mount
  const loadThemeSetting = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com"}/api/settings/verify-theme`
      );
      if (res.data?.success && res.data?.value) {
        setThemeSetting(res.data.value);
      }
    } catch (err) {
      console.error("❌ Error loading theme setting:", err);
    }
  }, []);

  useEffect(() => {
    loadThemeSetting();
  }, [loadThemeSetting]);

  // Close context menu on any outside click
  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  // Fetch individual list data or stats based on active tab selection
  useEffect(() => {
    if (activeTab === "analyze") {
      loadStats();
    } else if (activeTab === "settings") {
      loadThemeSetting();
    } else {
      fetchData(activeTab);
    }
  }, [activeTab, fetchData, loadStats, loadThemeSetting]);

  const handleDownload = (type) => {
    if (!data || !data.length) {
      alert("No data available to download");
      return;
    }

    // Filter out internal keys
    const keys = Object.keys(data[0]).filter(
      (k) => !["_id", "__v", "updatedAt"].includes(k)
    );

    // If activeTab is enrollments, make sure status is in the headers
    if (type === "enrollments" && !keys.includes("status")) {
      keys.push("status");
    }

    const csvContent = [
      keys.join(","),
      ...data.map((row) =>
        keys
          .map((k) => {
            const val = row[k] === null || row[k] === undefined ? (k === "status" ? "Pending" : "") : row[k].toString();
            if (val.includes(",") || val.includes('"') || val.includes("\n")) {
              return `"${val.replace(/"/g, '""')}"`;
            }
            return val;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${type}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    let nextStatus;
    let url;

    if (activeTab === "enrollments") {
      nextStatus = currentStatus === "Done" ? "Pending" : "Done";
      url = `${BASE_URL}/enrollments/${id}/status`;
    } else if (activeTab === "certificates") {
      nextStatus = currentStatus === "Approved" ? "Pending" : "Approved";
      url = `${BASE_URL}/certificates/${id}/status`;
    } else {
      return;
    }

    try {
      const res = await axios.put(url, { status: nextStatus });
      if (res.data?.success) {
        // Update state locally
        setData((prevData) =>
          prevData.map((row) => (row._id === id ? { ...row, status: nextStatus } : row))
        );

        // Dynamically adjust stats if we toggled certificate status
        if (activeTab === "certificates") {
          setStats((prev) => {
            const change = nextStatus === "Approved" ? 1 : -1;
            const newApprovedCount = Math.max(0, prev.approvedCertificatesCount + change);
            return {
              ...prev,
              approvedCertificatesCount: newApprovedCount,
              totalIncome: newApprovedCount * 150,
            };
          });
        }
      }
    } catch (err) {
      console.error("❌ Error toggling status:", err);
      alert("Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleUpdateTheme = async (newTheme) => {
    setUpdatingTheme(true);
    try {
      const res = await axios.put(`${BASE_URL}/settings/verify-theme`, { value: newTheme });
      if (res.data?.success) {
        setThemeSetting(newTheme);
      } else {
        alert("Failed to update theme");
      }
    } catch (err) {
      console.error("❌ Error updating theme:", err);
      alert("Failed to update theme");
    } finally {
      setUpdatingTheme(false);
    }
  };

  const renderSettings = () => {
    const themes = [
      {
        id: "none",
        name: "Solid Dark Theme",
        description: "No animations or canvas elements. A clean solid space dark background.",
        bgClass: "bg-gradient-to-br from-slate-950 to-slate-900 border-slate-800/80",
        previewDot: "bg-slate-600"
      },
      {
        id: "galaxy",
        name: "Deep Space Galaxy",
        description: "Interactive mouse-repelling glowing space stars animation.",
        bgClass: "bg-gradient-to-br from-indigo-950 to-slate-900 border-indigo-500/30",
        previewDot: "bg-purple-500"
      },
      {
        id: "liquid-ether",
        name: "Liquid Ether",
        description: "Fluid velocity particle waves dynamic canvas background.",
        bgClass: "bg-gradient-to-br from-blue-950 via-purple-950 to-slate-900 border-purple-500/30",
        previewDot: "bg-pink-500"
      },
      {
        id: "radar",
        name: "Radar Scan",
        description: "Radial vector grids sweep and radar scan line scanner.",
        bgClass: "bg-gradient-to-br from-slate-950 to-purple-950 border-violet-500/30",
        previewDot: "bg-violet-600"
      },
      {
        id: "dot-grid",
        name: "Magnetic Dot Grid",
        description: "GSAP magnetic inertia interactive dot canvas mesh grid.",
        bgClass: "bg-gradient-to-br from-gray-900 to-indigo-950 border-blue-500/30",
        previewDot: "bg-blue-500"
      }
    ];

    return (
      <div className="space-y-6 animate-slideIn">
        <div className="border-b pb-4">
          <h3 className="text-xl font-bold text-gray-800">Verification Page Theme Settings</h3>
          <p className="text-sm text-gray-500 mt-1">
            Choose the interactive background theme to show on the public Verification Page (www.kodnexuz.in/verify).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {themes.map((t) => {
            const isSelected = themeSetting === t.id;
            return (
              <div
                key={t.id}
                onClick={() => !updatingTheme && handleUpdateTheme(t.id)}
                className={`cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${t.bgClass} ${
                  isSelected
                    ? "ring-4 ring-pink-500/40 border-pink-500 scale-[1.02]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded-full ${t.previewDot} shadow`}></span>
                    <h4 className="text-lg font-bold text-white">{t.name}</h4>
                  </div>
                  {isSelected && (
                    <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {t.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    {t.id === "none" ? "CSS Baseline" : t.id === "galaxy" ? "OGL Canvas" : t.id === "liquid-ether" ? "Three.js WebGL" : t.id === "radar" ? "OGL Canvas" : "GSAP + Canvas"}
                  </span>
                  <button
                    disabled={updatingTheme}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isSelected
                        ? "bg-pink-500 text-white cursor-default"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select Theme"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleGenerateQR = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/generate-qr/${id}`);
      const data = await response.json();

      if (data.success) {
        setQrData({
          qr: data.qr,
          link: data.link,
        });
      } else {
        alert("Failed to generate QR");
      }
    } catch (err) {
      console.error("❌ QR Generation Error:", err);
      alert("QR generation failed");
    }
  };

  const downloadQR = () => {
    const a = document.createElement("a");
    a.href = qrData.qr;
    a.download = "certificate_qr.png";
    a.click();
  };

  const handleRowContextMenu = (e, row) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      rowId: row._id
    });
  };

  const handleDeleteRecord = async (id) => {
    const password = window.prompt("Enter delete authorization password:");
    if (password === null) return; // user cancelled

    if (password !== "Boyamma@109") {
      alert("❌ Access denied: Incorrect password.");
      return;
    }

    if (!window.confirm("Are you sure you want to permanently delete this record? This action cannot be undone.")) {
      return;
    }

    try {
      const apiBase = (process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com");
      const deleteUrl = `${apiBase}/api/admin/${activeTab}/${id}`;
      const res = await axios.delete(deleteUrl, {
        headers: { "x-delete-password": password }
      });

      if (res.data?.success) {
        alert("✅ Record deleted successfully.");
        // Refresh active list
        fetchData(activeTab);
        // Refresh stats
        loadStats();
      } else {
        alert("❌ Failed to delete record: " + (res.data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Error deleting record:", err);
      alert("❌ Error deleting record: " + (err.response?.data?.message || err.message));
    }
  };

  const renderTable = () => {
    if (!data.length)
      return <p className="text-gray-500 text-center text-lg">No records found.</p>;

    const keys = Object.keys(data[0]).filter(
      (k) => !["_id", "__v", "updatedAt"].includes(k)
    );

    // Ensure status key is present for tabs even if not in DB document yet
    if (activeTab === "enrollments" && !keys.includes("status")) {
      keys.push("status");
    }
    if (activeTab === "certificates" && !keys.includes("status")) {
      keys.push("status");
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              {keys.map((key) => {
                let displayName = key.replace(/([A-Z])/g, " $1");
                if (key === "uniqueId") displayName = "Unique ID";
                return (
                  <th key={key} className="px-4 py-2 text-left capitalize">
                    {displayName}
                  </th>
                );
              })}
              {activeTab === "certificates" && <th className="px-4 py-2">QR</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 cursor-pointer select-none"
                onContextMenu={(e) => handleRowContextMenu(e, row)}
              >
                {keys.map((k) => (
                  <td key={k} className="px-4 py-2 text-sm">
                    {k === "status" && (activeTab === "enrollments" || activeTab === "certificates") ? (
                      <button
                        onClick={() => handleToggleStatus(row._id, row[k])}
                        className={`px-3 py-1 rounded-full font-bold text-xs shadow-sm transition duration-300 ${
                          row[k] === "Done" || row[k] === "Approved"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        {row[k] || "Pending"}
                      </button>
                    ) : (
                      row[k]?.toString()
                    )}
                  </td>
                ))}
                {activeTab === "certificates" && (
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleGenerateQR(row._id)}
                      className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition"
                    >
                      Generate QR
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAnalysis = () => {
    const total = stats.usersCount + stats.enrollmentsCount + stats.certificatesCount;
    const radius = 50;
    const circumference = 2 * Math.PI * radius; // ~314.159

    const slices = [
      { value: stats.usersCount, color: "#3B82F6", label: "Registered Users" },
      { value: stats.enrollmentsCount, color: "#EC4899", label: "Enrollments" },
      { value: stats.certificatesCount, color: "#10B981", label: "Certificates Generated" },
    ];

    let accumulatedCircumference = 0;

    return (
      <div className="space-y-8 animate-slideIn">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Users */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold tracking-wider uppercase opacity-80">Registered Users</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 opacity-80">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20M3 11.797a10.45 10.45 0 008.167 8.083m-9.763-9.522a10.469 10.469 0 012.368-5.385m0 0a10.499 10.499 0 018.167-3.083m-1.135 1.135a9.01 9.01 0 01-2.327 5.257m0 0a9.01 9.01 0 005.414 4.26" />
              </svg>
            </div>
            <h4 className="text-4xl font-extrabold">{stats.usersCount}</h4>
            <p className="text-xs mt-2 opacity-70">Total active platform members</p>
          </div>

          {/* Card 2: Enrollments */}
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold tracking-wider uppercase opacity-80">Total Enrollments</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 opacity-80">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.9c4.956 0 9.648-1.741 13.351-4.909a60.42 60.42 0 00-.49-6.347m-18.12 0a9.07 9.07 0 01-2.09-2.613 5.02 5.02 0 01-.252-2.18C1.764 4.268 4.26 2 7.062 2c2.04 0 3.807 1.205 4.604 3.003L12 5.485l.334-.482C13.13 3.205 14.898 2 16.938 2c2.802 0 5.298 2.268 5.004 4.856a5.02 5.02 0 01-.252 2.18 9.07 9.07 0 01-2.09 2.613m-14.28 0a48.536 48.536 0 0114.28 0" />
              </svg>
            </div>
            <h4 className="text-4xl font-extrabold">{stats.enrollmentsCount}</h4>
            <p className="text-xs mt-2 opacity-70">Enrolled student applications</p>
          </div>

          {/* Card 3: Certificates */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold tracking-wider uppercase opacity-80">Certificates Issued</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 opacity-80">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h4 className="text-4xl font-extrabold">{stats.certificatesCount}</h4>
            <p className="text-xs mt-2 opacity-70">Total entries finalized and generated</p>
          </div>

          {/* Card 4: Income */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold tracking-wider uppercase opacity-80">Estimated Revenue</span>
              <span className="text-lg font-bold opacity-80">₹</span>
            </div>
            <h4 className="text-4xl font-extrabold">₹{stats.totalIncome.toLocaleString()}</h4>
            <p className="text-xs mt-2 opacity-70">₹150 earned per certificate approved</p>
          </div>
        </div>

        {/* Data Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donut Chart Visualizer */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-800 mb-6 w-full text-left border-b pb-3">Distribution Breakdown</h3>
            
            {total === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
                <span>No statistical data to display.</span>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-around w-full gap-8">
                {/* SVG Donut Chart */}
                <div className="relative w-36 h-36 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#F3F4F6" strokeWidth="18" />
                    
                    {slices.map((slice, index) => {
                      if (slice.value === 0) return null;
                      const percentage = slice.value / total;
                      const strokeLength = percentage * circumference;
                      const offset = circumference - accumulatedCircumference;
                      accumulatedCircumference += strokeLength;

                      return (
                        <circle
                          key={index}
                          cx="80"
                          cy="80"
                          r={radius}
                          fill="transparent"
                          stroke={slice.color}
                          strokeWidth="18"
                          strokeDasharray={`${strokeLength} ${circumference}`}
                          strokeDashoffset={offset}
                          className="transition-all duration-300 ease-out hover:stroke-[22px] cursor-pointer"
                        />
                      );
                    })}
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Items</span>
                    <span className="text-3xl font-extrabold text-gray-800">{total}</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="flex flex-col space-y-4 flex-1">
                  {slices.map((slice, index) => {
                    const percentage = total > 0 ? ((slice.value / total) * 100).toFixed(1) : 0;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: slice.color }}></span>
                          <span className="text-gray-600 font-semibold text-sm">{slice.label}</span>
                        </div>
                        <div className="text-right">
                          <span className="block font-bold text-gray-800 text-sm">{slice.value}</span>
                          <span className="block text-gray-400 text-xs">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Revenue Calculator Summary Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Earnings & Financial Tracker</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                KodNexuz provides a default processing payout of **₹150** per certificate successfully generated and registered.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-500 text-sm font-semibold">Total Certificates Generated</span>
                  <span className="font-extrabold text-gray-800">{stats.certificatesCount}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-500 text-sm font-semibold">Entry Rate (per Certificate)</span>
                  <span className="font-extrabold text-emerald-600">₹150.00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 border border-purple-100 rounded-2xl">
                  <span className="text-purple-700 text-sm font-bold">Total Accumulated Revenue</span>
                  <span className="font-extrabold text-purple-700 text-lg">₹{stats.totalIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <p className="text-amber-800 text-xs leading-relaxed">
                <strong>Real-time Sync:</strong> Financial data is updated dynamically. Any newly added entries or certificates instantly reflect in the calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 text-center sm:text-left">
          <h2 className="text-2.5xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h2>

          <div className="flex gap-3 justify-center sm:justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-5 sm:px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition text-sm sm:text-base"
            >
              Data Entry
            </button>

            <button
              onClick={handleLogout}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-400 transition text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 items-center w-full">
          <div className="flex flex-wrap gap-2">
            {["users", "enrollments", "certificates", "analyze", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab === "analyze" ? "Analyze 📊" : tab === "settings" ? "Settings ⚙️" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab !== "analyze" && activeTab !== "settings" && (
            <button
              onClick={() => handleDownload(activeTab)}
              className="w-full sm:w-auto ml-0 sm:ml-auto bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition text-sm sm:text-base text-center"
            >
              Download CSV
            </button>
          )}
        </div>

        {/* Table / Analysis Display / Settings */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            Loading dashboard data...
          </div>
        ) : activeTab === "analyze" ? (
          renderAnalysis()
        ) : activeTab === "settings" ? (
          renderSettings()
        ) : (
          renderTable()
        )}

        {/* QR Code display block (only shows for certificates section) */}
        {activeTab === "certificates" && qrData && (
          <div
            style={{
              marginTop: "30px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">
              QR Code Generated
            </h3>
            <img
              src={qrData.qr}
              alt="QR Code"
              style={{ width: "200px", height: "200px", margin: "auto" }}
            />
            <p className="mt-3">
              <strong>Verification URL:</strong>{" "}
              <a
                href={qrData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {qrData.link}
              </a>
            </p>
            <button
              onClick={downloadQR}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Download QR
            </button>
          </div>
        )}
      </div>

      {contextMenu && (
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 animate-fadeIn min-w-[150px]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            onClick={() => handleDeleteRecord(contextMenu.rowId)}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold transition"
          >
            Delete this record
          </button>
        </div>
      )}

      {/* Modal for Certificate Form */}
      {showModal && <DocumentFormModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminDashboard;
