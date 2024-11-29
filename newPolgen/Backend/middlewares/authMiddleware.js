import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is missing
  if (!authHeader) {
    console.error('No authorization header provided.');
    return res.status(401).json({ error: 'Unauthorized: Missing authorization header' });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];

  // Check if the token is missing in the authorization header
  if (!token) {
    console.error('Token missing from authorization header.');
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Token decoded:', decoded); // Optional logging, useful for debugging

    // Find the user by the ID decoded from the token
    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.error('User not found for token.');
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach the user to the request object for use in subsequent middleware
    req.user = user;

    // Proceed to the next middleware
    next();

  } catch (error) {
    // Log the error more informatively
    console.error('Authentication error:', error.name, error.message);

    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Catch any other unexpected errors
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Middleware to check if the user has the required role
export const requireRole = (role) => {
  return (req, res, next) => {
    // Ensure the user exists and the role matches
    if (!req.user || req.user.role !== role) {
      console.error('User does not have the required role.');
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
    }

    // Role check passed, continue to the next middleware
    next();
  };
};

