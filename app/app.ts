import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route';

const app = express();

// Middleware
app.use(json());
app.use(cors());

// Routes
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello world');
});

export default app;
