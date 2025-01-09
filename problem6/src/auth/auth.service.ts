import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// Sample user data
const users: User[] = [
  { username: 'user1', password: 'password123' },
  { username: 'user2', password: 'password456' },
];

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Username and password are required.' });
    return;
  }

  // Authenticate user
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    res.status(401).json({ success: false, message: 'Invalid credentials.' });
    return;
  }

  // Generate JWT
  const accessToken = jwt.sign({ username: user.username }, 'secretKey', { expiresIn: '1h' });

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    accessToken,
  });
};
