import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom"
=======
import { useNavigate } from "react-router-dom";
>>>>>>> b5821d2 (This version should be able to run)
import axios from "axios";
import "../css/auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    setError("");

    try {
      const res = await axios.post(
        "/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      console.log("Login successful", res.data.message);

      window.dispatchEvent(new Event("username-updated"));
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err);
      setError(err.response?.data?.message || "Log In Failed");
    }
  };

  return (
    <>
      <h2>Login</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="button-wrapper">
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
