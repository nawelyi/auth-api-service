import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'Servidor base saludable' });
});

app.listen(PORT, () => {
  console.log(`Servidor base corriendo en http://localhost:${PORT}`);
});
