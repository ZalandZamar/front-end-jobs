import axios from "axios";

export const userData = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const res = await axios.get(
        "https://fullstack-jobs.onrender.com/api/jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.job;
    }
  } catch (error) {
    console.log(error);
  }
};
