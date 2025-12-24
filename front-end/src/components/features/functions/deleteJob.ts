import axios from "axios";

export const deleteJob = async (jobId: string, getJobs: any) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.delete(
        `https://fullstack-jobs.onrender.com/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    getJobs();
  } catch (error) {
    console.log(error);
  }
};
