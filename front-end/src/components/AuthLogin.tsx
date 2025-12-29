import { useEffect, useState } from "react";
import { SignInForm } from "./features/SignInForm";
import { LogInForm } from "./features/LogInForm";
import { UserInterface } from "./features/UserInterface";

export const AuthLogin = () => {
  const [activeForm, setActiveForm] = useState<"signIn" | "logIn" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setActiveForm(null);
  };

  const fetchUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex justify-center">
      {isLoggedIn && <UserInterface handleLogOut={handleLogOut} />}

      {!activeForm && !isLoggedIn && (
        <div className="my-28">
          <button
            className="bg-blue-500 text-white border-0 p-3 border-r-4 ml-5 cursor-pointer"
            onClick={() => setActiveForm("signIn")}
          >
            Sign in
          </button>
          <button
            className="bg-blue-500 text-white border-0 p-3 border-r-4 ml-5 cursor-pointer"
            onClick={() => setActiveForm("logIn")}
          >
            Log in
          </button>
        </div>
      )}

      {activeForm === "signIn" && !isLoggedIn && (
        <SignInForm
          setIsLoggedIn={setIsLoggedIn}
          setActiveForm={setActiveForm}
        />
      )}
      {activeForm === "logIn" && !isLoggedIn && (
        <LogInForm
          setIsLoggedIn={setIsLoggedIn}
          setActiveForm={setActiveForm}
        />
      )}
    </div>
  );
};
