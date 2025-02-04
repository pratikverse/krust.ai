import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userData = params.get("user");

    if (userData) {
      try {
        setUser(JSON.parse(decodeURIComponent(userData)));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // If user data isn't available, check authentication from backend
      fetch("http://localhost:5100/api/auth/user", {
        credentials: "include", // Important for session handling
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isAuthenticated) {
            setUser(data.user);
          } else {
            navigate("/login");
          }
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [navigate]);

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>
          <p>Email: {user.email}</p>
          <a href="http://localhost:5100/api/auth/logout">Logout</a>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

