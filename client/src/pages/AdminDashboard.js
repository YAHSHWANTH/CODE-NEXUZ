import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DocumentFormModal from "../components/DataEntryModal";
import BorderGlow from "../components/BorderGlow";

const BASE_URL = (process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com") + "/api/admin";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // QR Code display states
  const [qrData, setQrData] = useState(null); 

  const [themeSetting, setThemeSetting] = useState("none");
  const [updatingTheme, setUpdatingTheme] = useState(false);

  // Secure context menu state
  const [contextMenu, setContextMenu] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");


  // AI Agent States
  const [agentPrompt, setAgentPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "agent",
      text: "Hello Admin! 🤖 I am your AI Co-Pilot. I have analyzed our platform's registrations, course enrollments, and issued certificates. I can help you summarize statistics, find users who registered but haven't enrolled yet, and draft warning emails to them! What would you like to do?"
    }
  ]);
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem("kodnexus_gemini_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [executingActions, setExecutingActions] = useState(false);
  const [selectedActions, setSelectedActions] = useState({});

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
        id: "radar",
        name: "Radar Scan",
        description: "Radial vector grids sweep and radar scan line scanner.",
        bgClass: "bg-gradient-to-br from-slate-950 to-purple-950 border-violet-500/30",
        previewDot: "bg-violet-600"
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
      rowId: row._id,
      name: row.name || row.fullName || row.firstName || row.email || "Unknown"
    });
  };

  const handleDeleteRecord = async (id, name, password) => {
    try {
      const apiBase = (process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com");
      const deleteUrl = `${apiBase}/api/admin/${activeTab}/${id}`;
      const res = await axios.delete(deleteUrl, {
        headers: { "x-delete-password": password }
      });

      if (res.data?.success) {
        alert("✅ Record deleted successfully.");
        setDeleteModal(null);
        setDeletePassword("");
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

  const handleSaveGeminiKey = (key) => {
    localStorage.setItem("kodnexus_gemini_key", key);
    setGeminiKey(key);
    setShowKeyInput(false);
  };

  const handleSendAgentMessage = async (e) => {
    e?.preventDefault();
    if (!agentPrompt.trim()) return;

    const userMsg = agentPrompt.trim();
    setAgentPrompt("");
    setChatHistory((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatLoading(true);

    try {
      const headers = geminiKey ? { "x-gemini-key": geminiKey } : {};
      const res = await axios.post(
        `${BASE_URL}/agent/chat`,
        { prompt: userMsg },
        { headers }
      );

      if (res.data?.success && res.data?.data) {
        const { reply, actions } = res.data.data;
        
        // Save message to history
        setChatHistory((prev) => [
          ...prev,
          { role: "agent", text: reply, actions: actions || [] }
        ]);

        // Pre-select all proposed actions
        if (actions && actions.length > 0) {
          const selections = {};
          actions.forEach((_, idx) => {
            selections[idx] = true;
          });
          setSelectedActions(selections);
        }
      } else {
        setChatHistory((prev) => [
          ...prev,
          { role: "agent", text: "❌ Error: Failed to retrieve analysis from agent." }
        ]);
      }
    } catch (err) {
      console.error("❌ Agent Chat Error:", err);
      const errMsg = err.response?.data?.message || err.message;
      if (errMsg.includes("Gemini API Key is required")) {
        setShowKeyInput(true);
        setChatHistory((prev) => [
          ...prev,
          { role: "agent", text: `⚠️ API Key Required: Please enter your Google Gemini API Key in the settings panel on the left or get a free key from https://aistudio.google.com/app/apikey` }
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { role: "agent", text: `❌ ${errMsg}` }
        ]);
      }
    } finally {
      setChatLoading(false);
    }
  };

  const handleExecuteActions = async (actionsToExecute) => {
    if (!actionsToExecute || actionsToExecute.length === 0) return;
    setExecutingActions(true);
    try {
      const res = await axios.post(`${BASE_URL}/agent/execute`, { actions: actionsToExecute });
      if (res.data?.success) {
        alert("✅ AI Agent actions executed successfully!");
        
        // Clear actions on current chat item to prevent double-execution
        setChatHistory((prev) =>
          prev.map((msg) =>
            msg.actions === actionsToExecute ? { ...msg, actions: [], executed: true } : msg
          )
        );
      } else {
        alert("❌ Action execution failed: " + (res.data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Action Execution Error:", err);
      alert("❌ Action execution error: " + (err.response?.data?.message || err.message));
    } finally {
      setExecutingActions(false);
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
              <th className="px-4 py-2 text-left font-bold text-gray-700 w-16">S.No</th>
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
                className="border-t hover:bg-gray-50 cursor-pointer"
                onContextMenu={(e) => handleRowContextMenu(e, row)}
              >
                <td className="px-4 py-2 text-sm font-semibold text-gray-500 w-16">{i + 1}</td>
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

    return (
      <div className="space-y-8 animate-slideIn">
        {/* Metric Cards Grid - Keep this to show overview counters */}
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

          {/* Card 4: AI Status */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold tracking-wider uppercase opacity-80">Co-Pilot Status</span>
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <h4 className="text-2.5xl font-extrabold truncate">ONLINE</h4>
            <p className="text-xs mt-3 opacity-70">Ready to execute actions</p>
          </div>
        </div>

        {/* AI Agent Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Robot avatar and Settings card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setShowKeyInput(!showKeyInput)}
                  className="p-2 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-gray-50 transition"
                  title="Configure Gemini API Key"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.827m11.379-8.16l1.15-.827M8.14 21.27l.707-1.03m6.307-9.18l.707-1.03m-5.13 14.095l.513-1.41M16.5 3v1.5m-9 0V3M6.215 6.215l1.15.827m7.27-5.187l1.15.827M3 12a9 9 0 009 9m-9-9a9 9 0 019-9m0 18a9 9 0 009-9m-9 9V12" />
                  </svg>
                </button>
              </div>

              {/* Humanoid Robot illustration */}
              <div className="py-4">
                <svg viewBox="0 0 200 220" className="w-40 h-40 mx-auto drop-shadow-xl animate-float">
                  <style>{`
                    @keyframes float {
                      0% { transform: translateY(0px); }
                      50% { transform: translateY(-10px); }
                      100% { transform: translateY(0px); }
                    }
                    .animate-float {
                      animation: float 4s ease-in-out infinite;
                    }
                  `}</style>
                  {/* Antennas */}
                  <rect x="97" y="10" width="6" height="25" rx="3" fill="#8B5CF6" />
                  <circle cx="100" cy="10" r="8" fill="#EC4899" className="animate-pulse" />
                  {/* Arms */}
                  <rect x="36" y="80" width="14" height="55" rx="7" fill="#A7F3D0" transform="rotate(15 43 80)" />
                  <rect x="150" y="80" width="14" height="55" rx="7" fill="#A7F3D0" transform="rotate(-15 157 80)" />
                  {/* Hands */}
                  <circle cx="28" cy="135" r="9" fill="#34D399" />
                  <circle cx="172" cy="135" r="9" fill="#34D399" />
                  {/* Legs */}
                  <rect x="75" y="150" width="16" height="45" rx="8" fill="#D1D5DB" />
                  <rect x="109" y="150" width="16" height="45" rx="8" fill="#D1D5DB" />
                  {/* Feet */}
                  <ellipse cx="83" cy="195" rx="14" ry="7" fill="#374151" />
                  <ellipse cx="117" cy="195" rx="14" ry="7" fill="#374151" />
                  {/* Body Torso */}
                  <rect x="55" y="70" width="90" height="85" rx="20" fill="#E5E7EB" stroke="#8B5CF6" strokeWidth="4" />
                  {/* Chest Plate Screen */}
                  <rect x="68" y="82" width="64" height="36" rx="8" fill="#1F2937" />
                  {/* Heart Pulse line inside screen */}
                  <path d="M 75 100 L 88 100 L 93 88 L 98 112 L 103 100 L 125 100" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Neck */}
                  <rect x="88" y="60" width="24" height="12" fill="#9CA3AF" />
                  {/* Head */}
                  <rect x="65" y="22" width="70" height="48" rx="16" fill="#F3F4F6" stroke="#8B5CF6" strokeWidth="4" />
                  {/* Visor display screen */}
                  <rect x="73" y="30" width="54" height="28" rx="8" fill="#111827" />
                  {/* Glowing Blue Eyes */}
                  <circle cx="88" cy="44" r="5" fill="#60A5FA" className="animate-pulse" />
                  <circle cx="112" cy="44" r="5" fill="#60A5FA" className="animate-pulse" />
                </svg>
              </div>

              <h4 className="text-xl font-bold text-gray-800">KodNexuz AI</h4>
              <p className="text-gray-400 text-xs mt-1">Humanoid Intelligence Engine</p>

              {/* Gemini Key Config Overlay */}
              {showKeyInput && (
                <div className="mt-4 p-4 border border-purple-100 bg-purple-50/80 rounded-2xl text-left animate-slideIn shadow-sm">
                  <label className="block text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2">
                    Enter Gemini API Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="flex-1 p-2.5 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none text-xs transition bg-white text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!geminiKey.trim()) {
                          alert("⚠️ Please enter an API Key first!");
                          return;
                        }
                        handleSaveGeminiKey(geminiKey.trim());
                        alert("✅ Gemini API Key saved successfully!");
                      }}
                      className="px-3.5 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold rounded-xl text-xs transition shadow-md"
                    >
                      Save
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                    Enter your Google Gemini API key or access token from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline font-bold text-purple-600 hover:text-purple-800">Google AI Studio</a>.
                  </p>
                </div>
              )}

              {/* Setup warning if key is missing */}
              {!geminiKey && !showKeyInput && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-amber-800 text-[11px] font-semibold leading-relaxed">
                    ⚠️ API Key missing. Click the settings gear to add your Google Gemini Key.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm">
              <h5 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-3">Quick Suggestions</h5>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setAgentPrompt("Summarize all dashboard stats and platform activity.");
                  }}
                  className="w-full text-left p-3 text-xs bg-gray-50 hover:bg-purple-50 border hover:border-purple-200 text-gray-600 rounded-xl transition font-semibold"
                >
                  📊 Summarize all dashboard stats
                </button>
                <button
                  onClick={() => {
                    setAgentPrompt("Identify registered users who haven't enrolled in a course yet.");
                  }}
                  className="w-full text-left p-3 text-xs bg-gray-50 hover:bg-purple-50 border hover:border-purple-200 text-gray-600 rounded-xl transition font-semibold"
                >
                  🔍 Find users registered but not enrolled
                </button>
                <button
                  onClick={() => {
                    setAgentPrompt("Draft and send follow-up reminder emails to all non-enrolled students.");
                  }}
                  className="w-full text-left p-3 text-xs bg-gray-50 hover:bg-purple-50 border hover:border-purple-200 text-gray-600 rounded-xl transition font-semibold"
                >
                  📨 Draft reminder email to non-enrolled users
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Chat Terminal and Actions execute console */}
          <div className="lg:col-span-2 space-y-6 flex flex-col h-[550px]">
            
            {/* Terminal Message Log */}
            <div className="flex-1 bg-[#09070f] text-slate-100 border border-purple-950/20 rounded-3xl p-6 shadow-lg flex flex-col overflow-hidden">
              <div className="flex justify-between items-center border-b border-purple-950/40 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                  <span className="text-gray-400 text-xs font-mono ml-2">co-pilot-shell v1.0.0</span>
                </div>
                {chatLoading && <div className="text-[11px] text-purple-400 font-mono animate-pulse">SYSTEM PROCESSING...</div>}
              </div>

              {/* Message scroll list */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 font-mono text-sm leading-relaxed scrollbar-thin">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-3.5 max-w-[85%] rounded-2xl ${
                      msg.role === "user" 
                        ? "bg-purple-600 text-white rounded-br-none" 
                        : "bg-slate-900 border border-purple-950/30 rounded-bl-none text-slate-200"
                    }`}>
                      {msg.role === "agent" ? (
                        <div className="prose prose-invert max-w-none text-xs">
                          {msg.text.split("\n").map((line, idx) => (
                            <p key={idx} className="mb-1">{line}</p>
                          ))}
                        </div>
                      ) : (
                        msg.text
                      )}
                    </div>

                    {/* Proposed Actions card inside chat history */}
                    {msg.role === "agent" && msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 w-full bg-slate-900 border border-purple-900/40 rounded-2xl p-4 animate-fadeIn max-w-[95%] text-left shadow-lg">
                        <div className="flex justify-between items-center border-b border-purple-950/60 pb-2.5 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-purple-400 font-bold tracking-wide">✉️ DRAFTED EMAILS ({msg.actions.length})</span>
                            <span className="text-[10px] text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/40 font-mono">
                              {msg.actions.filter((_, i) => selectedActions[i]).length} Selected
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newSelections = {};
                                msg.actions.forEach((_, i) => { newSelections[i] = true; });
                                setSelectedActions(newSelections);
                              }}
                              className="text-[10px] font-semibold text-purple-400 hover:text-purple-300 hover:underline"
                            >
                              Select All
                            </button>
                            <span className="text-gray-600 text-[10px]">|</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newSelections = {};
                                msg.actions.forEach((_, i) => { newSelections[i] = false; });
                                setSelectedActions(newSelections);
                              }}
                              className="text-[10px] font-semibold text-gray-400 hover:text-red-400 hover:underline"
                            >
                              Deselect All
                            </button>
                          </div>
                        </div>

                        {/* Actions item checklist */}
                        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                          {msg.actions.map((act, actIdx) => {
                            const isSelected = !!selectedActions[actIdx];
                            return (
                              <div 
                                key={actIdx} 
                                onClick={() => {
                                  setSelectedActions(prev => ({
                                    ...prev,
                                    [actIdx]: !prev[actIdx]
                                  }));
                                }}
                                className={`flex items-start gap-3 p-3 rounded-xl border text-xs transition cursor-pointer select-none ${
                                  isSelected 
                                    ? "bg-purple-950/40 border-purple-600/50 text-slate-100" 
                                    : "bg-slate-950/60 border-slate-800 text-slate-400 opacity-60 hover:opacity-100"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    setSelectedActions(prev => ({
                                      ...prev,
                                      [actIdx]: !prev[actIdx]
                                    }));
                                  }}
                                  className="mt-1 w-4 h-4 accent-purple-500 rounded cursor-pointer"
                                />
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-100 text-xs">{act.to}</span>
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : 'bg-gray-800 text-gray-400'}`}>
                                      {isSelected ? '✓ WILL SEND' : '✗ SKIPPED'}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-purple-300 font-mono mt-0.5">Subject: {act.subject}</div>
                                  <details 
                                    className="mt-1.5 text-gray-400"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <summary className="text-[9px] font-bold text-purple-400 hover:text-purple-300 cursor-pointer">Preview Email Body & Link</summary>
                                    <div 
                                      className="p-3 bg-slate-950 border border-purple-950/60 rounded-xl mt-1.5 text-[11px] font-sans leading-normal text-slate-200"
                                      dangerouslySetInnerHTML={{ __html: act.body }}
                                    />
                                  </details>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Execute Action submit button */}
                        <div className="mt-4 flex justify-between items-center border-t border-purple-950/60 pt-3">
                          <span className="text-[11px] text-gray-400 font-mono">
                            Ready to send <strong className="text-purple-300">{msg.actions.filter((_, i) => selectedActions[i]).length}</strong> of {msg.actions.length} email(s)
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const approved = msg.actions.filter((_, i) => selectedActions[i]);
                              if (approved.length === 0) {
                                alert("⚠️ Please select at least one email recipient to send!");
                                return;
                              }
                              handleExecuteActions(approved);
                            }}
                            disabled={executingActions}
                            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition disabled:opacity-50"
                          >
                            {executingActions ? "EXECUTING..." : `🚀 EXECUTE ${msg.actions.filter((_, i) => selectedActions[i]).length} APPROVED EMAIL(S)`}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Executed success banner */}
                    {msg.role === "agent" && msg.executed && (
                      <div className="mt-2 w-full bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-2.5 text-center text-xs text-emerald-400 font-semibold animate-pulse">
                        ✅ Actions Executed Successfully
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input form bar */}
              <form onSubmit={handleSendAgentMessage} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={agentPrompt}
                  onChange={(e) => setAgentPrompt(e.target.value)}
                  placeholder={chatLoading ? "System is executing analysis..." : "Type instructions... (e.g. Email registered non-enrolled students)"}
                  disabled={chatLoading}
                  className="flex-1 p-3.5 bg-[#0e0c15] border border-purple-950/40 focus:ring-2 focus:ring-purple-600 rounded-2xl text-slate-100 placeholder-gray-600 outline-none transition text-xs font-mono"
                />
                <button
                  type="submit"
                  disabled={chatLoading}
                  className="px-5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl active:scale-95 transition disabled:opacity-50 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </form>
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
            onClick={() => setDeleteModal({ id: contextMenu.rowId, name: contextMenu.name })}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold transition"
          >
            Delete this record
          </button>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[60] animate-fadeIn">
          {/* Custom style overrides to make BorderGlow highly visible on white/light background */}
          <style>{`
            .delete-modal-glow .edge-light {
              mix-blend-mode: normal !important;
              opacity: 0.95 !important;
            }
            .delete-modal-glow {
              border: 3px solid rgba(239, 68, 68, 0.8) !important;
              box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.15), 0 10px 10px -5px rgba(239, 68, 68, 0.08) !important;
            }
          `}</style>
          <BorderGlow
            edgeSensitivity={30}
            glowColor="0 100 60"
            colors={['#ef4444', '#f97316', '#dc2626']}
            backgroundColor="rgba(255, 255, 255, 0.98)"
            borderRadius={20}
            className="max-w-md w-full delete-modal-glow"
          >
            <div className="text-center p-6">
              {/* Trash Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center border-4 border-red-200 text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Record</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Are you sure you want to permanently delete the record for:<br/>
                <strong className="text-red-600">{deleteModal.name}</strong>?<br/>
                This action cannot be undone.
              </p>

              {/* Password input */}
              <div className="mb-6 text-left">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Enter Delete Password
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteModal(null);
                    setDeletePassword("");
                  }}
                  className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (deletePassword !== "Boyamma@109") {
                      alert("❌ Access denied: Incorrect password.");
                      return;
                    }
                    await handleDeleteRecord(deleteModal.id, deleteModal.name, deletePassword);
                  }}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </BorderGlow>
        </div>
      )}

      {/* Modal for Certificate Form */}
      {showModal && <DocumentFormModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminDashboard;
