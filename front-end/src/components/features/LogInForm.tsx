import { useState } from "react";
import { logIn } from "./functions/logIn";

interface SignInFormProps {
  setActiveForm: (value: "signIn" | "logIn" | null) => void;
  setIsLoggedIn: (value: boolean) => void;
}

export const LogInForm: React.FC<SignInFormProps> = ({
  setActiveForm,
  setIsLoggedIn,
}) => {
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
