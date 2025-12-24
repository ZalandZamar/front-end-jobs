import { useState } from "react";
import "./css/SignInForm.css";
import { signIn } from "./functions/signIn";

interface SignInFormProps {
  setActiveForm: (value: "signIn" | "logIn" | null) => void;
  setIsLoggedIn: (value: boolean) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  setActiveForm,
  setIsLoggedIn,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);

    const success = await signIn(name, email, password);

    setIsLoading(false);

    if (success) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Credintials");
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Name"
        className="name-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
      <button className="sign-btn" onClick={handleSignIn}>
        {isLoading ? "Loading" : "Sign in"}
      </button>
    </div>
  );
};
