// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();

  // Check if the user is authenticated
  if (!token) {
    console.warn("ProtectedRoute: No token found. Redirecting to /login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the role is required, check the user's role
  if (requiredRole && user?.role !== requiredRole) {
    console.warn(`ProtectedRoute: Role mismatch. Redirecting to /unauthorized...`);
    return <Navigate to="/unauthorized" replace />;
  }

  return children; // If everything is fine, render the child components
};

export default ProtectedRoute;

