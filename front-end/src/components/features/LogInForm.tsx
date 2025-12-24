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
    <div className="container">
      <input
        type="email"
        placeholder="Email"
        className="email-input"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        className="password-input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="sign-btn" onClick={handleLogin}>
        {isLoading ? "Loading" : "log In"}
      </button>
    </div>
  );
};
