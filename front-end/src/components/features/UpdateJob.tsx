import axios from "axios";
import { useEffect, useState } from "react";

interface UpdateJobProps {
  selectedJob: any; // we’ll improve this later
  closeForm: () => void;
  onSuccess: () => void;
}

export const UpdateJob: React.FC<UpdateJobProps> = ({
  selectedJob,
  closeForm,
  onSuccess,
}) => {
  const [company, setCompany] = useState(selectedJob.company);
  const [position, setPosition] = useState(selectedJob.position);
  const [status, setStatus] = useState(selectedJob.status);

  useEffect(() => {
    setCompany(selectedJob.company);
    setPosition(selectedJob.position);
    setStatus(selectedJob.status);
  }, [selectedJob]);

  const updateUserJob = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.patch(
        `https://fullstack-jobs.onrender.com/api/jobs/${selectedJob._id}`,
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
        placeholder="company"
        value={company}
        className="min-w-40 border py-2 px-3 font-medium outline-0 text-[18px] mb-3"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="position"
        value={position}
        className="min-w-40 border py-2 px-3 font-medium outline-0 text-[18px] mb-3"
        onChange={(e) => {
          setPosition(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="status"
        value={status}
        className="min-w-40 border py-2 px-3 font-medium outline-0 text-[18px] mb-3"
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      />
      <button
        onClick={updateUserJob}
        className="bg-green-500 max-w-40 py-2 px-3 text-white cursor-pointer"
      >
        Confirm Update
      </button>
    </div>
  );
};
