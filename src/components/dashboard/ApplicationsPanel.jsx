import React, { useState, useEffect } from "react";
import JobsTable from "./JobsTable";
import ApplicationForm from "./ApplicationForm";
import API_BASE_URL from "../../config";
import HeaderPanel from "./Header";

const ApplicationsPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchJobs = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/get_jobs.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="relative">
      <HeaderPanel onButtonClick={() => setShowAddForm(true)} />

      {loading ? (
        <p className="p-6">Loading jobs...</p>
      ) : error ? (
        <p className="p-6 text-red-600">{error}</p>
      ) : (
        <div className="p-8 overflow-auto w-full">
          <JobsTable jobs={jobs} refreshJobs={fetchJobs} />
        </div>
      )}

      {/* Modal Backdrop + Centered Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <ApplicationForm
            mode="add"
            onCancel={() => setShowAddForm(false)}
            onSuccess={() => {
              fetchJobs();
              setShowAddForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationsPanel;
