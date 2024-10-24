import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});