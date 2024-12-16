import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = React.memo(({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  let user = null;

  try {
    const userData = localStorage.getItem('user');
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("ProtectedRoute: Failed to parse user data from localStorage.", error);
    user = null; // Ensure `user` is `null` if parsing fails
  }

  const location = useLocation();

  console.log("ProtectedRoute: Checking access for location:", location.pathname);

  // Check if the token is missing
  if (!token) {
    console.warn("ProtectedRoute: No token found. Redirecting to /login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the role doesn't match
  if (requiredRole && user?.role !== requiredRole) {
    console.warn(
      `ProtectedRoute: Role mismatch. Expected '${requiredRole}', got '${user?.role}'. Redirecting to /Error404...`
    );
    return <Navigate to="/Error_404" replace />;
  }

  console.log("ProtectedRoute: Access granted for role:", user?.role || "No role specified.");
  return children;
});

export default ProtectedRoute;

