import axios from "axios";

export const signIn: any = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const data = { name, email, password };

    const res = await axios.post(
      "https://fullstack-jobs.onrender.com/api/auth/register",
      data
    );

    const token = res.data.token;
    localStorage.setItem("token", token);

    // if we reach here the response is a success(2xx)
    return true;
  } catch (error) {
    console.log(error);
    alert("register failed");
    return false;
  }
};
