import React, { useEffect, useState } from "react";

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    duration: "",
    guidance: "",
    college: "",
    location: "",
  });

  // ✅ Fetch all enrollments
  const fetchEnrollments = async () => {
    try {
      const res = await fetch((process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com") + "/api/enroll/all");
      const data = await res.json();
      setEnrollments(data.data || []);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // ✅ Handle form field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Create new enrollment
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch((process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com") + "/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Enrollment created successfully!");
        setShowForm(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          course: "",
          duration: "",
          guidance: "",
          college: "",
          location: "",
        });
        fetchEnrollments();
      } else {
        alert("❌ Failed to create enrollment. Check console.");
        console.error("Server response:", data);
      }
    } catch (err) {
      console.error("Error creating enrollment:", err);
    }
  };

  // ✅ Delete enrollment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) return;
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com"}/api/enroll/${id}`, { method: "DELETE" });
      alert("Enrollment deleted successfully!");
      fetchEnrollments();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ Export CSV
  const handleDownloadCSV = () => {
    window.open((process.env.REACT_APP_API_BASE_URL || "https://code-nexuz.onrender.com") + "/api/enroll/export", "_blank");
  };

  // ✅ Search filter
  const filtered = enrollments.filter(
    (e) =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.course?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            📋 Enrollments Dashboard
          </h1>
          <div className="space-x-3">
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              ➕ Add Enrollment
            </button>
            <button
              onClick={handleDownloadCSV}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              ⬇️ Download CSV
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, email, or course..."
          className="border p-3 w-full rounded-lg mb-6 focus:ring-2 focus:ring-pink-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No enrollments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Guidance</th>
                  <th className="p-3 text-left">College</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e._id} className="border-b hover:bg-pink-50 transition">
                    <td className="p-3">{e.name}</td>
                    <td className="p-3">{e.email}</td>
                    <td className="p-3">{e.phone}</td>
                    <td className="p-3">{e.course}</td>
                    <td className="p-3">{e.duration}</td>
                    <td className="p-3">{e.guidance}</td>
                    <td className="p-3">{e.college}</td>
                    <td className="p-3">{e.location}</td>
                    <td className="p-3">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Add Enrollment Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
              ➕ Add New Enrollment
            </h2>
            <form onSubmit={handleCreate} className="space-y-3">
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData[key]}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                  required={["name", "email", "phone", "course"].includes(key)}
                />
              ))}

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnrollments;
