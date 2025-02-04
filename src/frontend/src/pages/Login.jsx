import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5100/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        navigate('/expenses'); 
      } else {
        alert(data.error || 'Invalid credentials!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); 
  };

  const handleGoogleSignIn = () => {
   
    window.location.href = 'http://localhost:5100/api/auth/google';
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
        {/* Add any welcome message or image here */}
      </div>
    </div>
  );
};

export default Login;





























