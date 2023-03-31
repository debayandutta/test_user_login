import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { login, register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;
