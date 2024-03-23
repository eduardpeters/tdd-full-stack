import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
