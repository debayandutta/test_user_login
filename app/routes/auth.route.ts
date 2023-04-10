import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { login, register } from '../controllers/auth.controller';
import { User } from '../models/user.model';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, (req, res) => {
  const user: User = req.user as User;
  res.json({ user });
});

export default router;
