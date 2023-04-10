import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { omitPassword } from '../utils/utils';
import { User } from '../models/user.model';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || '');

    const user: User = {
      id: decodedToken.id,
      email: decodedToken.email,
      password: '',
    };

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
