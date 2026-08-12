// src/components/DataEntryModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const DataEntryModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    location: "",
    course: "",       // manual text input
    duration: "",
    mentor: "",
  });
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // Fetch the current enrollments list when modal loads to verify emails offline/in-memory
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const apiBase = process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com";
        const res = await axios.get(`${apiBase}/api/admin/enrollments`);
        const list = res.data?.data || res.data || [];
        setEnrollments(list);
      } catch (err) {
        console.error("❌ Error fetching enrollments inside DataEntryModal:", err);
      }
    };
    fetchEnrollments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return alert("Full name is required.");
    if (!form.email.trim()) return alert("Email is required.");
    if (!form.phone.trim()) return alert("Phone is required.");
    if (!form.college.trim()) return alert("College is required.");
    if (!form.course.trim()) return alert("Course is required.");
    return true;
  };

  const saveCertificateData = async () => {
    setLoading(true);
    try {
      const apiBase = process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com";
      const payload = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        college: form.college,
        location: form.location,
        course: form.course,     // manual text value
        duration: form.duration,
        mentor: form.mentor,
      };

      const res = await axios.post(`${apiBase}/api/certificates/create`, payload);

      if (res.data && res.data.success) {
        alert("✅ Data saved and CNX ID generated: " + (res.data.certId || ""));
        onSuccess && onSuccess(res.data);
        onClose();
      } else {
        alert("❌ Failed to save. " + (res.data?.message || ""));
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Error saving data. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Check if enrollment exists for this email (in-memory lookup against fetched enrollments list)
    const inputEmail = form.email.trim().toLowerCase();
    const enrollmentExists = enrollments.some(
      (enroll) => enroll.email && enroll.email.trim().toLowerCase() === inputEmail
    );

    if (!enrollmentExists) {
      setShowWarningModal(true);
    } else {
      await saveCertificateData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-500"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold text-center text-purple-600 mb-4">Data Entry</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="fullName" value={form.fullName} onChange={handleChange}
            className="w-full p-3 border rounded" placeholder="Full Name (as per 10th marks)" />

          <input name="email" value={form.email} onChange={handleChange}
            className="w-full p-3 border rounded" placeholder="Email Address" />

          <input name="phone" value={form.phone} onChange={handleChange}
            className="w-full p-3 border rounded" placeholder="Phone Number" />

          <input name="college" value={form.college} onChange={handleChange}
            className="w-full p-3 border rounded" placeholder="College Name" />

          <input name="location" value={form.location} onChange={handleChange}
            className="w-full p-3 border rounded" placeholder="Location" />

          {/* Course as manual text input (replaced dropdown) */}
          <input name="course" value={form.course} onChange={handleChange}
            className="w-full p-3 border rounded" placeholder="Course (type manually)" />

          <input name="duration" value={form.duration} onChange={handleChange}
            className="w-full p-3 border rounded" placeholder="Duration (e.g. 4 Weeks)" />

          <input name="mentor" value={form.mentor} onChange={handleChange}
            className="w-full p-3 border rounded" placeholder="Guided By (Mentor Name)" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {showWarningModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[60] animate-fadeIn">
          {/* Custom scoped CSS for animated traveling border */}
          <style>{`
            @keyframes rotateGlow {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .traveling-border-wrapper {
              position: relative;
              padding: 4px; /* Border thickness */
              border-radius: 1.25rem;
              overflow: hidden;
              background: #f3f4f6;
              max-width: 28rem;
              width: 100%;
              box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
            }
            .traveling-border-wrapper::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: conic-gradient(
                from 0deg,
                transparent 20%,
                #ec4899 40%, /* Pink */
                #8b5cf6 60%, /* Purple */
                transparent 80%
              );
              animation: rotateGlow 2.5s linear infinite;
              z-index: 0;
            }
            .traveling-border-content {
              position: relative;
              background: white;
              border-radius: 1rem;
              padding: 24px;
              z-index: 10;
            }
          `}</style>

          <div className="traveling-border-wrapper transform transition duration-300">
            <div className="traveling-border-content text-center">
              {/* Warning Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center border-4 border-amber-200 text-amber-600 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Unmatched User</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                You are generating an unmatched user. No matching enrollment found for the email: <strong className="text-purple-600">{form.email.trim()}</strong>.<br/><br/>
                Do you want to generate a new Unique ID and create this certificate anyway?
              </p>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowWarningModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setShowWarningModal(false);
                    await saveCertificateData();
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataEntryModal;
