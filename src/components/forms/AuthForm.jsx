import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

const AuthForm = ({ title, buttonText }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"

  const navigate = useNavigate();
  const isSignup = title === "Sign Up";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sign Up
    if (isSignup) {
      if (email && username && password) {
        try {
          const res = await fetch("http://localhost/job-application-tracker/backend/signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, password }),
          });

          const data = await res.json();
          if (res.ok) {
            setMessage("Signup successful! Please login.");
            setMessageType("success");
            setTimeout(() => navigate("/login"), 1500);
          } else {
            setMessage(data.error || "Signup failed");
            setMessageType("error");
          }
        } catch (error) {
          setMessage("Error connecting to server");
          setMessageType("error");
        }
      } else {
        setMessage("Please fill in all fields");
        setMessageType("error");
      }
    } else {
      // Login
      if (username && password) {
        try {
          const res = await fetch("http://localhost/job-application-tracker/backend/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });

          const data = await res.json();

          if (res.ok) {
            setMessage("Login successful!");
            setMessageType("success");
            navigate("/dashboard");
          } else {
            setMessage(data.error || "Login failed");
            setMessageType("error");
          }
        } catch (error) {
          setMessage("Error connecting to server");
          setMessageType("error");
        }
      } else {
        setMessage("Please fill in all fields");
        setMessageType("error");
      }
    }
  };

  return (
    <div className="w-full max-w-md px-8 py-12 bg-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{title}</h2>

      {message && (
        <div className={`text-left p-6 py-3 mb-4 text-sm font-medium ${messageType === "error" ? "bg-red-100" : "bg-green-100"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {isSignup && (
          <InputField
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <InputField
          type="text"
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        {isSignup ? (
          <>Already have an account? <span className="text-cyan-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>Login</span></>
        ) : (
          <>Don't have an account? <span className="text-cyan-600 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>Sign up</span></>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
