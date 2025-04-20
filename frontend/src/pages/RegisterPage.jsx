import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, checkLoginStatus } from "../api/api";
import "../css/auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      try {
        const res = await checkLoginStatus();
        if (res.data.loggedIn) {
          navigate("/");
        }
      } catch (err) {
        console.error("Login status check failed:", err);
      }
    };

    redirectIfLoggedIn();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const res = await registerUser({ username, password, confirmPassword });
      console.log("Register successful", res.data.message);
      window.dispatchEvent(new Event("username-updated"));

      navigate("/");
    } catch (err) {
      console.error("Register error:", err.response?.data);
      setError(err.response?.data?.error?.toString() || "Registration failed");
    }
  };

  return (
    <>
      <h2>Sign Up</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          id="username"
          placeholder="e.g., hunter123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="e.g., banana2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          id="confirm-password"
          placeholder="Type Password Again"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="button-wrapper">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default Register;
