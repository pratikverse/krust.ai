// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import ExpenseTracker from '../pages/ExpenseTracker';
import Profile from '../pages/Profile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/expenses" element={<ExpenseTracker />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/expenses" element={<ExpenseTracker />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
