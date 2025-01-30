import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // Example condition to "authenticate"
    if (credentials.username === 'user' && credentials.password === 'password') {
      alert('Login successful!');
      navigate('/expenses'); // Redirect to the Expense Tracker page
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
