import express, { Request, Response } from 'express';
import pg from 'pg';
import { FakeTodoRepository } from './FakeTodosRepository';
import { TodosRepository } from './TodosRepository';
import { TodosService } from './TodosService';
import { TodosController } from './TodosController';

export const app = express();
const port = process.env.PORT || 3000;

const { Client } = pg;
const client = new Client();

async function getConnection() {
  await client.connect();
}

let todosRepository: FakeTodoRepository | TodosRepository;
if (process.env.NODE_ENV !== 'test') {
  getConnection().then(() => {
    todosRepository = new TodosRepository(client);
  });
} else {
  todosRepository = new FakeTodoRepository();
}
const todosService = new TodosService(todosRepository);
const todosController = new TodosController(todosService);

app.get('/', async (req: Request, res: Response) => {
  const result = await client.query('SELECT NOW()');
  console.log(result);
  res.send(`Hello from TypeScript Express! ${result.rowCount}`);
});

app.get('/todos', async (req: Request, res: Response) => {
  return todosController.getAll(req, res);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
