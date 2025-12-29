import axios from "axios";
import { useState } from "react";

interface UpdateJobProps {
  closeForm: () => void;
  onSuccess: () => void;
}

export const CreateJob: React.FC<UpdateJobProps> = ({
  closeForm,
  onSuccess,
}) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");

  const createUserJob = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.post(
        `https://fullstack-jobs.onrender.com/api/jobs`,
        {
          company,
          position,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    onSuccess();
    closeForm();
  };

  return (
    <div className="mt-32 flex flex-col">
      <input
        type="text"
        placeholder="compnay"
        value={company}
        className="min-w-40 border py-2 px-3 font-medium outline-0 text-[18px] mb-3"
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="position"
        value={position}
        className="min-w-40 border py-2 px-3 font-medium outline-0 text-[18px] mb-3"
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="status"
        value={status}
        className="min-w-40 border py-2 px-3 font-medium outline-0 text-[18px] mb-3"
        onChange={(e) => setStatus(e.target.value)}
      />
      <button
        onClick={createUserJob}
        className="bg-blue-500 max-w-40 py-2 px-3 text-white cursor-pointer"
      >
        Create Job
      </button>
    </div>
  );
};
