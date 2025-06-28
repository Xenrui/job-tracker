import React, { useState, useEffect } from "react";
import InputField from "../login/InputField";
import API_BASE_URL from "../../config";

const ApplicationForm = ({ onCancel, onSuccess, initialData = {}, mode = "add" }) => {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState(() => {
  const today = new Date();
    return mode === "add"
      ? today.toISOString().split("T")[0]  // format: YYYY-MM-DD
      : "";
  });
  
  const isEdit = mode === "edit";

useEffect(() => {
  if (initialData && Object.keys(initialData).length > 0) {
    setCompany(initialData.company || "");
    setTitle(initialData.title || "");
    setStatus(initialData.status || "Applied");
    setDateApplied(initialData.date_applied || "");
  }
}, [initialData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company || !title || !dateApplied) {
      alert("Please fill in all fields");
      return;
    }

    const payload = {
      company,
      title,
      status,
      date_applied: dateApplied,
    };

    const endpoint = isEdit
      ? `${API_BASE_URL}/edit_job.php`
      : `${API_BASE_URL}/add_application.php`;

    const requestBody = isEdit
      ? JSON.stringify({ ...payload, job_id: initialData.job_id })
      : JSON.stringify(payload);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: requestBody,
      });

      const text = await res.text();
      console.log("Raw response text:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error("JSON parse error:", jsonErr);
        alert("Server response is not valid JSON");
        return;
      }

      if (res.ok) {
        onSuccess();
      } else {
        alert(data.error || (isEdit ? "Failed to update application" : "Failed to add application"));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full px-4 fixed inset-0 bg-black/50 z-50">
      <div className="p-8 max-w-[600px] w-full bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEdit ? "Edit Job Application" : "Add New Job Application"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            type="text"
            label="Company"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <InputField
            type="text"
            label="Job Title"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>
  <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
  >
    <option value="Applied">Applied</option>
    <option value="Interviewed">Interviewed</option>
    <option value="Offered">Offered</option>
  </select>
</div>


          <InputField
            type="date"
            label="Date Applied"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
          />

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
            >
              {isEdit ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
