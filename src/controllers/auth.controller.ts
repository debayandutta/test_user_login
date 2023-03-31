import { Request, Response } from 'express';
import { db } from '../database/db';
import { hashPassword, comparePassword } from '../utils/utils';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { omitPassword } from '../utils/utils';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user: User = await db.one(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, password',
      [email, hashedPassword],
    );

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY || '');

    res.json({ user: omitPassword(user), token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user: User = await db.one('SELECT * FROM users WHERE email = $1', [email]);

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY || '');

    res.json({ user: omitPassword(user), token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
