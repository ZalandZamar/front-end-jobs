import axios from "axios";

export const logIn = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      "https://fullstack-jobs.onrender.com/api/auth/login",
      {
        email,
        password,
      }
    );

    const token = res.data.token;
    localStorage.setItem("token", token);

    // if we reach here it means the res is a success(2xx)
    return true;
  } catch (error) {
    console.log(error);
    alert("logIn failed");
    return false;
  }
};
