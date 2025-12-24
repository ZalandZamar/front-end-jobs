import axios from "axios";
import { useEffect, useState } from "react";
import "./css/updateJob.css";

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
    <div>
      <input
        type="text"
        placeholder="company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="position"
        value={position}
        onChange={(e) => {
          setPosition(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="status"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      />
      <button onClick={updateUserJob}>Confirm Update</button>
    </div>
  );
};
