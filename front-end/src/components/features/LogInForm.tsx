import { useState } from "react";
import { logIn } from "./functions/logIn";

interface SignInFormProps {
  setIsLoggedIn: (value: boolean) => void;
  // optional setter so parent can control which auth form is active
  setActiveForm?: (value: "signIn" | "logIn" | null) => void;
}

export const LogInForm: React.FC<SignInFormProps> = ({ setIsLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);

    const success = await logIn(email, password);

    setIsLoading(false);

    if (success) {
      setIsLoggedIn(true);
    } else {
      alert("wrong credntials");
    }
  };

  return (
    <div className="flex flex-col mt-32">
      <input
        type="email"
        placeholder="Email"
        className="min-w-64 border h-9 py-2 px-3 font-bold mb-2.5 outline-0"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        className="min-w-64 border h-9 py-2 px-3 font-bold mb-2.5 outline-0"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="bg-blue-500 max-w-24 py-2.5 px-5 rounded-[3px] outline-0"
        onClick={handleLogin}
      >
        {isLoading ? "Loading" : "log In"}
      </button>
    </div>
  );
};
