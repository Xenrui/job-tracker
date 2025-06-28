import React from "react";

const DeleteModal = ({ job, onCancel, onConfirm }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the job "<strong>{job.title}</strong>" at <strong>{job.company}</strong>?
        </p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => onConfirm(job.id)}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
