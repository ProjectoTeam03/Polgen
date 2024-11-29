import jwt from 'jsonwebtoken';

const requireRole = (role) => (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the decoded token contains the role
    if (!decoded.role) {
      return res.status(401).json({ error: 'Unauthorized: Missing role in token' });
    }

    // Compare the user's role with the required role
    if (decoded.role !== role) {
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
    }

    // Attach decoded user data to request object
    req.user = decoded;
    
    // Continue to the next middleware
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    
    // Handle token verification errors (e.g., expired token)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    }
    
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default requireRole;

