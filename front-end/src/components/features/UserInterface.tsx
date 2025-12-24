import { useEffect, useState } from "react";
import { userData } from "./functions/userData";
import "./css/userInterface.css";
import { CreateJob } from "./functions/CreateJob";
import { UpdateJob } from "./UpdateJob.tsx";
import { deleteJob } from "./functions/deleteJob";

interface UserInterfaceProps {
  handleLogOut: () => void;
}

export const UserInterface: React.FC<UserInterfaceProps> = ({
  handleLogOut,
}) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [activeForm, setActiveForm] = useState<"update" | "create" | null>(
    null
  );

  const getJobs = async () => {
    const jobsArray = await userData();
    setJobs(jobsArray ?? []);
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <p className="header">hello Mr: Zaland</p>
      <button className="logout-btn" onClick={handleLogOut}>
        Log out
      </button>
      <button className="create-job" onClick={() => setActiveForm("create")}>
        Create Job
      </button>

      {activeForm === "create" && (
        <CreateJob closeForm={() => setActiveForm(null)} onSuccess={getJobs} />
      )}

      {activeForm === "update" && selectedJob && (
        <UpdateJob
          selectedJob={selectedJob}
          closeForm={() => setActiveForm(null)}
          onSuccess={getJobs}
        />
      )}

      {activeForm === null &&
        jobs.map((job) => {
          return (
            <div key={job._id} className="jobs-container">
              <div>
                <p>company: {job.company}</p>
                <p>position: {job.position}</p>
                <p>status: {job.status}</p>
              </div>
              <div>
                <button
                  className="update-btn"
                  onClick={() => {
                    setSelectedJob(job);
                    setActiveForm("update");
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteJob(job._id, getJobs)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
