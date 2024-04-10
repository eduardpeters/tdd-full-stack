import express, { Request, Response } from 'express';
import pg from 'pg';

const app = express();
const port = process.env.PORT || 3000;

const { Client } = pg;
const client = new Client();
(async function getConnection() {
  await client.connect();
})();

app.get('/', async (req: Request, res: Response) => {
  const result = await client.query('SELECT NOW()');
  console.log(result);
  res.send(`Hello from TypeScript Express! ${result.rowCount}`);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
