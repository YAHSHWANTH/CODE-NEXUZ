import React from "react";

// ✅ Inline styles for the running animation
const styles = `
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
.running-marquee {
  display: inline-block;
  min-width: 100%;
  white-space: nowrap;
  animation: marquee 18s linear infinite;
}
.running-marquee:hover {
  animation-play-state: paused;
}
`;

const RunningMessage = () => {
  return (
    <>
      {/* Inject animation styles directly */}
      <style>{styles}</style>

      {/* Softer background and lighter styling */}
      <div className="fixed top-16 left-0 w-full z-40 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 text-gray-800 py-2 overflow-hidden border-t border-gray-200">
        <div className="running-marquee text-sm font-medium tracking-wide px-6 opacity-90">
          💡 Important Update: New internships and courses are live now! | 🎓 Join
          our latest Python Bootcamp starting soon! | 🚀 Learn, build, and grow
          with Code Nexus Technology!
        </div>
      </div>
    </>
  );
};

export default RunningMessage;
