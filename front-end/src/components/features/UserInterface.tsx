import { useEffect, useState } from "react";
import { userData } from "./functions/userData";
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
      <p className="fixed top-3 left-3.5">hello Mr: Zaland</p>
      <button
        className="fixed bottom-11 left-3 bg-red-600 text-white py-2 px-4 text-[18px] cursor-pointer"
        onClick={handleLogOut}
      >
        Log out
      </button>
      <button
        className="fixed top-11 right-3 bg-blue-600 text-white py-2 px-4 text-[18px] cursor-pointer"
        onClick={() => setActiveForm("create")}
      >
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

      {activeForm === null && (
        <div className="mt-36 min-w-screen">
          {jobs.map((job) => {
            return (
              <div
                key={job._id}
                className="flex flex-row justify-between items-center max-w-[55%] mb-5 bg-gray-200 py-5 mx-auto px-3.5 sm:max-w-[65%] lg:max-w-[75%]"
              >
                <div>
                  <p>company: {job.company}</p>
                  <p>position: {job.position}</p>
                  <p>status: {job.status}</p>
                </div>
                <div>
                  <button
                    className="bg-green-600 text-white text-[14px] mr-2 py-1 px-2 cursor-pointer"
                    onClick={() => {
                      setSelectedJob(job);
                      setActiveForm("update");
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 text-white text-[14px] mr-2 py-1 px-2 cursor-pointer"
                    onClick={() => deleteJob(job._id, getJobs)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
