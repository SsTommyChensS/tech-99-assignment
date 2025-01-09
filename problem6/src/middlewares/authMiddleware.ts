import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// JWT Token Authentication Middleware
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      res.status(401).json({ success: false, message: 'Access Denied' });
      return;
    }
  
    jwt.verify(token, 'secretKey', (err, user) => {
      if (err) {
        res.status(403).json({ success: false, message: 'Invalid Token' });
        return;
      }
      (req as any).user = user; // Attach user information to the request object
      next(); // Call next middleware or route handler
    });
}