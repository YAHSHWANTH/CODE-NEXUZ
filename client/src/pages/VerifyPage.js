import React, { useState, useCallback } from "react";
import axios from "axios";
import BorderGlow from "../components/BorderGlow";
import Galaxy from "../components/Galaxy";

const VerifyPage = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyCredential = useCallback(async (idToVerify) => {
    if (!idToVerify || !idToVerify.trim()) {
      setError("Please enter a valid Credential ID");
      setCertificate(null);
      return;
    }

    setLoading(true);
    setError("");
    setCertificate(null);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com"}/api/verify/${idToVerify.trim()}`
      );
      setCertificate(res.data.certificate);
      setError("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid Credential ID. Record not found in our database.");
      }
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVerify = () => {
    verifyCredential(uniqueId);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Interactive Galaxy animation background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.6}
          saturation={0.9}
          hueShift={280} // Beautiful purple/pink galaxy tone
        />
      </div>
      
      {/* Top Clean Header Bar matching Navbar */}
      <header className="w-full bg-[#030014]/30 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center z-10">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => window.location.href = "/"}
        >
          <img 
            src="/logo.png" 
            alt="KodNexuz Logo" 
            width="160" 
            height="56" 
            fetchpriority="high" 
            className="h-14 w-auto object-contain py-1" 
          />
        </div>
        <div className="hidden md:flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
          <span>Official Verification Hub</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center relative z-10">
        
        {/* Core Verification Card wrapped in BorderGlow */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="270 100 65"
          backgroundColor="rgba(8, 7, 16, 0.85)"
          borderRadius={24}
          glowRadius={40}
          glowIntensity={1.2}
          colors={['#c084fc', '#f472b6', '#3b82f6']}
          className="w-full max-w-2xl backdrop-blur-md"
        >
          <div className="p-8 md:p-10 relative overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                Credential Verification
              </h1>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                Verify the authenticity of internship certificates and training credentials issued by KodNexuz.
              </p>
            </div>

            {/* Form input block */}
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Credential Unique ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="e.g. CNX4A8B"
                    className="w-full px-5 py-4 border-2 border-slate-700/50 bg-slate-900/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 font-mono text-center text-lg tracking-widest uppercase font-bold"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={handleVerify}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Searching Ledger...</span>
                  </>
                ) : (
                  <span>Verify Credential</span>
                )}
              </button>
            </div>

            {/* Feedback alerts */}
            {error && (
              <div className="mt-8 p-4 bg-rose-950/40 border border-rose-500/30 rounded-xl flex items-start gap-3 animate-slideIn">
                <div className="p-1.5 bg-rose-900/30 rounded-lg text-rose-400 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-rose-400 text-sm">Verification Failed</h4>
                  <p className="text-rose-300 text-xs mt-0.5 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Certificate verified result sheet */}
            {certificate && (
              <div className="mt-10 pt-8 border-t border-slate-800/80 animate-slideIn">
                
                {/* Official Seal / Badge */}
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 mb-8 flex items-center gap-4">
                  <div className="p-3 bg-emerald-500 text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-emerald-400 font-extrabold text-lg">Verified Credential Record</h3>
                    <p className="text-emerald-300/80 text-sm font-medium">This certificate has been verified as authentic and legally issued.</p>
                  </div>
                </div>

                {/* Document Details Grid */}
                <div className="space-y-4">
                  {/* Row 1: Candidate & Mentor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/40 border border-slate-700/30 p-4 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Candidate Name</span>
                      <span className="font-extrabold text-white text-base">{certificate.fullName}</span>
                    </div>
                    <div className="bg-slate-900/40 border border-slate-700/30 p-4 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Mentor / Guided By</span>
                      <span className="font-extrabold text-white text-base">{certificate.mentor || "N/A"}</span>
                    </div>
                  </div>

                  {/* Row 2: Program & Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/40 border border-slate-700/30 p-4 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Program Domain</span>
                      <span className="font-extrabold text-white text-base">{certificate.course}</span>
                    </div>
                    <div className="bg-slate-900/40 border border-slate-700/30 p-4 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Internship Duration</span>
                      <span className="font-bold text-white text-sm">{certificate.duration || "N/A"}</span>
                    </div>
                  </div>

                  {/* Row 3: Email & Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/40 border border-slate-700/30 p-4 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Email Registered</span>
                      <span className="font-semibold text-slate-200 text-sm break-all">{certificate.email}</span>
                    </div>
                    <div className="bg-slate-900/40 border border-slate-700/30 p-4 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Credential Code</span>
                      <span className="font-mono text-purple-400 font-extrabold text-sm uppercase tracking-widest">{certificate.uniqueId}</span>
                    </div>
                  </div>

                  {/* Row 4: Affiliated College */}
                  {certificate.college && (
                    <div className="bg-slate-900/40 border border-slate-700/30 p-4 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Affiliated Institution</span>
                      <span className="font-bold text-white text-sm">{certificate.college}</span>
                    </div>
                  )}
                </div>

                {/* Professional Footer Stamp */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {certificate.createdAt && !isNaN(new Date(certificate.createdAt).getTime()) ? (
                    <div className="text-center sm:text-left">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Database Record timestamp</span>
                      <span className="text-slate-300 text-xs font-semibold">
                        {new Date(certificate.createdAt).toUTCString()}
                      </span>
                    </div>
                  ) : (
                    <div className="hidden sm:block"></div>
                  )}
                  
                  {/* Secure Badge Graphic */}
                  <div className="flex items-center space-x-2 bg-purple-950/40 border border-purple-500/30 rounded-lg px-3 py-1.5 text-purple-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest">Secured System Record</span>
                  </div>
                </div>

              </div>
            )}
          </div>
        </BorderGlow>

        {/* Small Tip below card */}
        <p className="mt-6 text-center text-xs text-slate-400 max-w-sm leading-relaxed">
          Need help? The Credential ID can typically be found at the bottom-left of your official printed internship certificate.
        </p>

        {/* Contact Support Information */}
        <div className="mt-6 text-center text-xs text-slate-400 max-w-sm leading-relaxed">
          For further assistance or query status, please contact us at:{" "}
          <a
            href="mailto:kodnexustech@gmail.com"
            className="text-purple-400 hover:text-purple-300 font-bold underline transition duration-200"
          >
            kodnexustech@gmail.com
          </a>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="w-full bg-[#030014]/60 border-t border-slate-900 py-6 text-center text-xs text-slate-500 font-semibold uppercase tracking-wider z-10">
        &copy; {new Date().getFullYear()} KodNexuz. All rights reserved.
      </footer>

    </div>
  );
};

export default VerifyPage;
