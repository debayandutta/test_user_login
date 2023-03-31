import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import authRouter from './routes/auth.route';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the authentication API');
});

app.use('/auth', authRouter);

// Error handler
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
