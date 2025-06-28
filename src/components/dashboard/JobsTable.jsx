import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../config";
import DeleteModal from "../modals/DeleteModal";
import ApplicationForm from "./ApplicationForm";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const JobsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [jobToDelete, setJobToDelete] = useState(null);
  const [jobToEdit, setJobToEdit] = useState(null);

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

  const handleDeleteConfirm = (jobId) => {
    console.log("Deleting job with ID:", jobId);
    fetch(`${API_BASE_URL}/delete_job.php?job_id=${jobId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete job");
        setJobs((prev) => prev.filter((job) => job.job_id !== jobId));
        setJobToDelete(null);
      })
      .catch((err) => {
        alert("Error deleting job: " + err.message);
        setJobToDelete(null);
      });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-8">
        <svg
          className="animate-spin h-8 w-8 text-cyan-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );

  if (error)
    return (
      <p className="text-red-600 font-semibold text-center py-8" role="alert">
        Error: {error}
      </p>
    );

  return (
    <>
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <caption className="sr-only">List of job applications</caption>
        <thead className="bg-[#191B41] text-white select-none">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-semibold">
              Company
            </th>
            <th scope="col" className="px-6 py-3 text-left font-semibold">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left font-semibold">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left font-semibold">
              Date Applied
            </th>
            <th scope="col" className="px-6 py-3 text-left font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr className="bg-gray-50">
              <td
                colSpan="5"
                className="text-center py-6 text-gray-500 italic"
                role="row"
              >
                No jobs found.
              </td>
            </tr>
          ) : (
            jobs.map((job, idx) => (
              <tr
                key={job.job_id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-cyan-100 transition-colors duration-200 shadow-sm`}
              >
                <td className="px-6 py-4 border-b border-gray-200">{job.company}</td>
                <td className="px-6 py-4 border-b border-gray-200">{job.title}</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        job.status === "Applied"
                          ? "bg-yellow-200 text-yellow-800"
                          : job.status === "Interviewed"
                          ? "bg-blue-200 text-blue-800"
                          : job.status === "Offered"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-800"
                      }
                    `}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">{job.date_applied}</td>
                <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <button
                        type="button"
                        aria-label={`Edit job at ${job.company}`}
                        className="text-cyan-600 hover:text-cyan-800 mr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded p-1"
                        onClick={() => setJobToEdit(job)}
                        >
                        <FiEdit size={20} />
                    </button>
                    <button
                        type="button"
                        aria-label={`Delete job at ${job.company}`}
                        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                        onClick={() => {setJobToDelete(job); console.log("Requesting delete for job ID:", job.job_id);}}
                        >
                        <FiTrash2 size={20} />
                    </button>


                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        job={jobToDelete}
        onCancel={() => setJobToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Edit Job Form Modal */}
      {jobToEdit && (
        <ApplicationForm
          mode="edit"
          initialData={jobToEdit}
          onCancel={() => setJobToEdit(null)}
          onSuccess={() => {
            setJobToEdit(null);
            fetchJobs(); // Refresh after edit
          }}
        />
      )}

      {/* Add some space below */}
      <div className="my-8" />
    </>
  );
};

export default JobsTable;
