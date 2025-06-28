import React from "react";

const DeleteModal = ({ job, onCancel, onConfirm }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#191B41] rounded-[40px] p-8 w-[500px] h-[320px] mx-auto ">
        <h2 className="text-3xl font-bold text-[#B8995D] mb-6">DELETE JOB ENTRY</h2>
        <hr className="border-gray-400 mb-8" />
        <p className="text-lg text-[#DDE3EE] mb-12 max-w-[320px] leading-relaxed">
          Are you sure you want to delete "<strong>{job.title}</strong>" at <strong>{job.company}</strong>?
        </p>
        <div className="flex space-x-4 justify-center">
          <button
            className="cursor-pointer bg-[#D9D9D9] rounded-[20px] py-4 px-12 font-bold text-black hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            CANCEL
          </button>
          <button
            className="cursor-pointer bg-[#F55D5D] rounded-[20px] py-4 px-12 font-bold text-black hover:bg-red-500 transition"
            onClick={() => onConfirm(job.job_id)}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
