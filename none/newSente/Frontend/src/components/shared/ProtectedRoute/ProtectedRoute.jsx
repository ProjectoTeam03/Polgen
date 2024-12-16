import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || null); // Safely parse 'user'
  const location = useLocation();

  // Debugging Logs
  console.log("ProtectedRoute: Checking access...");
  console.log("Token:", token);
  console.log("User:", user);

  if (!token) {
    console.warn("ProtectedRoute: No token found. Redirecting to /login...");
    // Redirect to login if no token
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.warn(
      `ProtectedRoute: Role mismatch. Expected '${requiredRole}', got '${user?.role}'. Redirecting to /unauthorized...`
    );
    // Redirect to unauthorized if role doesn't match
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("ProtectedRoute: Access granted.");
  return children; // Render the protected component
};

export default ProtectedRoute;

