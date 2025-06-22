import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './api';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); 