// middlewares/auth.js
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_secret_key';

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Access Denied: No Token' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Invalid Token' });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden: Insufficient rights' });
    }
    next();
  };
};


