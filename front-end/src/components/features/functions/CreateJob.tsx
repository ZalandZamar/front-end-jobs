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
    <div>
      <input
        type="text"
        placeholder="compnay"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={createUserJob}>Create</button>
    </div>
  );
};
