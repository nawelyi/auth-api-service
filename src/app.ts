import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes'

dotenv.config();

const app = express();

app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'Servidor base saludable' });
});

app.use('/api/auth', authRoutes);

export default app;
