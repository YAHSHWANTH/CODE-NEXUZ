import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Do I need any prior experience to join?",
    answer: "No prior experience is required! Our programs and internship tracks start from foundational concepts and guide you step-by-step up to advanced industry frameworks.",
  },
  {
    question: "Are the projects really live company projects?",
    answer: "Yes! All projects are built based on real-world industry requirements and live corporate technology stacks.",
  },
  {
    question: "Is there a guarantee for a full-time role?",
    answer: "We offer comprehensive career guidance, resume building, portfolio reviews, and mock interview preparation to help you land top roles across technology companies.",
  },
  {
    question: "Will I get a certificate?",
    answer: "Yes! Upon successful completion of your course or internship track, you will receive an industry-recognized certificate featuring a unique credential ID and instant QR code verification.",
  },
  {
    question: "How are the classes and internship modules delivered?",
    answer: "Learning is hands-on and flexible, combining self-paced coding modules with live Q&A sessions and dedicated mentor support.",
  },
  {
    question: "Is learning on KodNexuz free or affordable?",
    answer: "KodNexuz provides industry-standard technology tracks with highly accessible, affordable pricing and free starter learning materials.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header matching Image 2 with project brand gradient */}
        <div className="text-center mb-12 scroll-reveal-text">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">
            Got questions? We've got answers.
          </p>
        </div>

        {/* Accordion List matching Image 2 */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white border transition-all duration-200 rounded-2xl overflow-hidden scroll-reveal-card delay-${(index % 4) + 1} ${
                  isOpen
                    ? "border-purple-200 shadow-md ring-1 ring-purple-100"
                    : "border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-purple-50 transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-purple-100 text-purple-600" : "text-gray-400"
                    }`}
                  >
                    <FaChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-4 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
