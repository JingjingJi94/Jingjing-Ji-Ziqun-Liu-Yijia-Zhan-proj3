import React, { useState, useEffect } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');


  // Check login status on initial render
  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch('/api/auth/status', {
        method: 'GET',
        credentials: 'include', // Send cookies to check session status
      });

      const data = await response.json();

      // If logged in is true, set the state to true
      if (data.loggedIn) {
        setIsLoggedIn(true); 
      }
    };

    checkLoginStatus();
  }, []); // Empty dependency array to run only on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      setError('You are already logged in. Please head to the homepage.');
      return;
    }

    if (!username || !password) {
      setError('Both username and password are required.');
      return;
    }

    // Reset the error before submitting
    setError('');

    try {
      // Sending the login request to the backend API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Send data as JSON
        },
        body: JSON.stringify({ username, password }),  // Send username and password
        credentials: 'include', // Send cookies
      });

      const data = await response.json();

      // Check if the login was successful
      if (response.ok) {
        console.log('Login successful', data);
        navigate('/home'); //must be url
      } else {
        // Handle unsuccessful login (e.g., wrong credentials)
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
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

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
