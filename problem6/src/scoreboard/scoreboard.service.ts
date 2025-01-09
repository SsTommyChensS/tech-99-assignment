import { Request, Response } from 'express';
import Score from '../models/score.model';

// Mock score data
let scores: Score[] = [
  { username: 'user1', score: 50 },
  { username: 'user2', score: 40 },
];

// Update user score
export const updateScore = (req: Request, res: Response): void => {
  const { username, score } = req.body;

  if (!username || typeof score !== 'number') {
    res.status(400).json({ success: false, message: 'Invalid input.' });
    return;
  }

  const user = scores.find((u) => u.username === username);

  if (user) {
    user.score += score;
  } else {
    scores.push({ username, score });
  }

  scores = scores.sort((a, b) => b.score - a.score).slice(0, 10); // Keep top 10 scores
  res.status(200).json({ success: true, message: 'Score updated.', scores });
};

// Get top scores
export const getTopScores = (req: Request, res: Response): void => {
  res.status(200).json({ success: true, scores });
};
