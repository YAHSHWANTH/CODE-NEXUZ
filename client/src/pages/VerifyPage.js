import React, { useState, useCallback } from "react";
import axios from "axios";
import BorderGlow from "../components/BorderGlow";

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-purple-50/20 text-slate-800 flex flex-col items-center justify-between font-sans relative overflow-hidden">
      {/* Decorative ambient background accents with slow pulsing animation */}
      <div 
        className="absolute top-0 right-0 w-[40%] h-[30%] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none animate-pulse" 
        style={{ animationDuration: "8s" }}
      ></div>
      <div 
        className="absolute bottom-12 left-0 w-[45%] h-[35%] bg-pink-100/20 rounded-full blur-[100px] pointer-events-none animate-pulse" 
        style={{ animationDuration: "10s" }}
      ></div>
      
      {/* Top Professional Header Bar */}
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">
            KodNexuz
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          <span>Official Verification Hub</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl px-4 py-12 flex flex-col items-center justify-center">
        
        {/* Core Verification Card wrapped in BorderGlow */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="270 100 65"
          backgroundColor="#ffffff"
          borderRadius={24}
          glowRadius={35}
          glowIntensity={1.0}
          colors={['#c084fc', '#f472b6', '#3b82f6']}
          className="w-full max-w-2xl"
        >
          <div className="p-8 md:p-10 relative overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Credential Verification
              </h1>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                Verify the authenticity of internship certificates and training credentials issued by KodNexuz.
              </p>
            </div>

            {/* Form input block */}
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Credential Unique ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="e.g. CNX4A8B"
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 font-mono text-center text-lg tracking-widest uppercase font-bold"
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
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.98]"
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
              <div className="mt-8 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 animate-slideIn">
                <div className="p-1.5 bg-rose-100 rounded-lg text-rose-600 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-rose-800 text-sm">Verification Failed</h4>
                  <p className="text-rose-600 text-xs mt-0.5 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Certificate verified result sheet */}
            {certificate && (
              <div className="mt-10 pt-8 border-t border-slate-200 animate-slideIn">
                
                {/* Official Seal / Badge */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 flex items-center gap-4">
                  <div className="p-3 bg-emerald-500 text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-emerald-900 font-extrabold text-lg">Verified Credential Record</h3>
                    <p className="text-emerald-700 text-sm font-medium">This certificate has been verified as authentic and legally issued.</p>
                  </div>
                </div>

                {/* Document Details Grid */}
                <div className="space-y-4">
                  {/* Row 1: Candidate & Mentor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Candidate Name</span>
                      <span className="font-extrabold text-slate-800 text-base">{certificate.fullName}</span>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Mentor / Guided By</span>
                      <span className="font-extrabold text-slate-800 text-base">{certificate.mentor || "N/A"}</span>
                    </div>
                  </div>

                  {/* Row 2: Program & Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Program Domain</span>
                      <span className="font-extrabold text-slate-800 text-base">{certificate.course}</span>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Internship Duration</span>
                      <span className="font-bold text-slate-800 text-sm">{certificate.duration || "N/A"}</span>
                    </div>
                  </div>

                  {/* Row 3: Email & Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Email Registered</span>
                      <span className="font-semibold text-slate-700 text-sm break-all">{certificate.email}</span>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Credential Code</span>
                      <span className="font-mono text-purple-600 font-extrabold text-sm uppercase tracking-widest">{certificate.uniqueId}</span>
                    </div>
                  </div>

                  {/* Row 4: Affiliated College */}
                  {certificate.college && (
                    <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl">
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Affiliated Institution</span>
                      <span className="font-bold text-slate-700 text-sm">{certificate.college}</span>
                    </div>
                  )}
                </div>

                {/* Professional Footer Stamp */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {certificate.createdAt && !isNaN(new Date(certificate.createdAt).getTime()) ? (
                    <div className="text-center sm:text-left">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Database Record timestamp</span>
                      <span className="text-slate-500 text-xs font-semibold">
                        {new Date(certificate.createdAt).toUTCString()}
                      </span>
                    </div>
                  ) : (
                    <div className="hidden sm:block"></div>
                  )}
                  
                  {/* Secure Badge Graphic */}
                  <div className="flex items-center space-x-2 bg-purple-50 border border-purple-100 rounded-lg px-3 py-1.5 text-purple-600">
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
        <div className="mt-6 text-center text-xs text-slate-500 max-w-sm leading-relaxed">
          For further assistance or query status, please contact us at:{" "}
          <a
            href="mailto:kodnexustech@gmail.com"
            className="text-purple-600 hover:text-purple-700 font-bold underline transition duration-200"
          >
            kodnexustech@gmail.com
          </a>
        </div>

      </main>

      {/* Footer Info */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
        &copy; {new Date().getFullYear()} KodNexuz. All rights reserved.
      </footer>

    </div>
  );
};

export default VerifyPage;
