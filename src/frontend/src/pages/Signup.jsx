import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');


  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5100/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`, 
          email: username, 
          password: password,
          phone: "1234567890", 
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful!');
        navigate('/expenses'); 
      } else {
        alert(data.error || 'Signup failed!');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:5100/api/auth/google';
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="button-group">
            <button type="submit">Sign Up</button>
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

export default Signup;




























