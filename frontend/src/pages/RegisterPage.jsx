import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get("/api/auth/status", {
          withCredentials: true,
        });
        if (res.data.loggedIn) {
          navigate("/");
        }
      } catch (err) {
        console.error("Login status check failed:", err);
      }
    };

    checkLoginStatus();
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
      const res = await axios.post(
        "/api/auth/register",
        { username, password, confirmPassword },
        { withCredentials: true }
      );

      console.log("Register successful", res.data.message);
      window.dispatchEvent(new Event("username-updated"));
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      setError(err.response?.data?.message || "Registration failed");
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
