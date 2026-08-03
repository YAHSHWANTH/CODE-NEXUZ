// src/components/DataEntryModal.jsx
import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Use your existing backend endpoint
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

      const res = await axios.post((process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com") + "/api/certificates/create", payload);


      if (res.data && res.data.success) {
        alert("✅ Data saved and CNX ID generated: " + (res.data.certId || ""));
        onSuccess && onSuccess(res.data);
        onClose();
      } else {
        // If your server returns non-standard shape, show message
        alert("❌ Failed to save. " + (res.data?.message || ""));
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Error saving data. See console for details.");
    } finally {
      setLoading(false);
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
    </div>
  );
};

export default DataEntryModal;
