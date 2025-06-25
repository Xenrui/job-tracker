import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

const AuthForm = ({ title, buttonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      console.log("User submitted:", { email, password });

      // ✅ Redirect to homepage or dashboard
      // navigate("/dashboard");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="w-full max-w-md px-8 py-12 bg-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{title}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SubmitButton text={buttonText} />
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        {title === "Login" ? (
          <>Don't have an account? <span className="text-[#8dafa8] cursor-pointer hover:underline">Sign up</span></>
        ) : (
          <>Already have an account? <span className="text-[#8dafa8] cursor-pointer hover:underline">Login</span></>
        )}
      </p>
    </div>
  );
};

export default AuthForm;