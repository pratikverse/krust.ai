import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    navigate('/'); // Redirect to the login page
  };

  const handleSignUp = () => {
    alert('Welcome to Krust'); // Display the welcome message
    navigate('/expenses'); // Redirect to the Expense Tracker page
  };

  const handleGoogleSignIn = () => {
    // Add Google Sign-In logic here
    alert('Google Sign-In clicked!');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="First Name"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={handleSignUp}>Sign Up</button>
          </div>
          <button type="button" className="google-signin" onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>
        </form>
      </div>
      <div className="welcome-section">
        
      </div>
    </div>
  );
};

export default Login;
