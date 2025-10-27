import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', message: 'Servidor base saludable' });
})



export default app;