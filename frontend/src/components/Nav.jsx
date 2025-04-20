import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/nav.css";

const Nav = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const fetchLoginStatus = () => {
    axios
      .get("http://localhost:3001/api/auth/status", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn && res.data.username) {
          setUsername(res.data.username);
        } else {
          setUsername(null);
        }
      })
      .catch((err) => {
        console.error("Status check failed:", err);
        setUsername(null);
      });
  };

  useEffect(() => {
    fetchLoginStatus();

    window.addEventListener("username-updated", fetchLoginStatus);

    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("username-updated", fetchLoginStatus);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUsername(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isLoggedIn = !!username;

  const renderAuthLinks = () => (
    <div className="auth-buttons">
      <Link
        to="/login"
        className={`auth-link ${
          location.pathname === "/login" ? "selected" : ""
        }`}
      >
        <i className="fas fa-sign-in-alt"></i> Log In
      </Link>
      <Link
        to="/register"
        className={`auth-link ${
          location.pathname === "/register" ? "selected" : ""
        }`}
      >
        <i className="fas fa-user-plus"></i> Sign Up
      </Link>
    </div>
  );

  const renderUserDropdown = () => (
    <div
      className="auth-user"
      style={{ position: "relative" }}
      ref={dropdownRef}
    >
      <span
        className="auth-link"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <i className="fas fa-user"></i> {username} ▼
      </span>
      {showDropdown && (
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-auth">
          {isLoggedIn ? renderUserDropdown() : renderAuthLinks()}
        </div>

        <div className="navbar-title">Battleship Game</div>

        <ul className="navbar-links">
          <li>
            <Link
              to="/"
              className={`navbar-link ${
                location.pathname === "/" ? "selected" : ""
              }`}
            >
              <i className="fas fa-home"></i> Home
            </Link>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <Link
                  to="/games"
                  className={`navbar-link ${
                    location.pathname === "/games" ? "selected" : ""
                  }`}
                >
                  <i className="fas fa-th-list"></i> All Games
                </Link>
              </li>
              <li>
                <Link
                  to="/game/create"
                  className={`navbar-link ${
                    location.pathname === "/game/create" ? "selected" : ""
                  }`}
                >
                  <i className="fas fa-plus-circle"></i> New Game
                </Link>
              </li>
              <li>
                <Link
                  to="/highscores"
                  className={`navbar-link ${
                    location.pathname === "/highscores" ? "selected" : ""
                  }`}
                >
                  <i className="fas fa-trophy"></i> High Scores
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              to="/rules"
              className={`navbar-link ${
                location.pathname === "/rules" ? "selected" : ""
              }`}
            >
              <i className="fas fa-book"></i> Game Rules
            </Link>
          </li>
        </ul>
      </nav>

      <div className="AllPageContent">{children}</div>
    </div>
  );
};

export default Nav;
