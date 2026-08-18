import React from "react";
import BorderGlow from "./BorderGlow";

const Careers = () => {
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
                onClick={() => {
                  if (window.openAuthModal) {
                    window.openAuthModal("signup");
                  } else {
                    document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3.5 rounded-lg shadow-md hover:opacity-90 transition text-base sm:text-lg cursor-pointer"
              >
                Start your journey
              </button>
          </div>
          <div className="flex justify-center">
            <img src="/stlogo.png" alt="Careers" width="438" height="438" className="max-w-full h-auto max-h-[350px] md:max-h-full" />
          </div>
        </div>
      </section>

      {/* Signup/Login Section */}
      <section id="signup-form" className="bg-gray-50 min-h-[60vh] flex items-center py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center w-full">
          <div className="flex justify-center">
            <img src="/logos.png" alt="Sign Up" width="540" height="360" className="max-w-full h-auto max-h-[300px] md:max-h-full" />
          </div>

          <div className="w-full max-w-md mx-auto">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="270 100 65"
              backgroundColor="#ffffff"
              borderRadius={24}
              glowRadius={30}
              glowIntensity={0.8}
              coneSpread={25}
              animated={true}
              colors={['#c084fc', '#f472b6', '#3b82f6']}
            >
              <div className="p-8 text-center space-y-6">
                <h3 className="text-2.5xl font-extrabold text-gray-900 leading-tight">
                  Ready to Kickstart Your Career?
                </h3>
                <p className="text-gray-600">
                  Register for our certified internship programs or login to manage your application.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => window.openAuthModal ? window.openAuthModal("signup") : null}
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Register Now
                  </button>
                  <button
                    onClick={() => window.openAuthModal ? window.openAuthModal("login") : null}
                    className="flex-1 py-3 border border-purple-600 hover:bg-purple-50 text-purple-600 font-bold rounded-xl transition duration-300"
                  >
                    Login to Account
                  </button>
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
