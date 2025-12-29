import { useState } from "react";
import { signIn } from "./functions/signIn";

interface SignInFormProps {
  setIsLoggedIn: (value: boolean) => void;
  // optional setter so parent can control which auth form is active
  setActiveForm?: (value: "signIn" | "logIn" | null) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ setIsLoggedIn }) => {
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
    <div className="flex flex-col mt-14">
      <input
        type="text"
        placeholder="Name"
        className="min-w-40 border py-2 px-3 font-medium outline-0 text-[18px] mb-3"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Email"
        className="min-w-40 border py-2 px-3 font-medium outline-0 text-[18px] mb-3"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        className="min-w-40 border py-2 px-3 font-medium outline-0 text-[18px] mb-3"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="bg-blue-500 max-w-28 py-2.5 text-white text-[16px] cursor-pointer"
        onClick={handleSignIn}
      >
        {isLoading ? "Loading" : "Sign in"}
      </button>
    </div>
  );
};
