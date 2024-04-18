import express, { Request, Response } from 'express';
import pg from 'pg';
import { FakeTodoRepository } from './FakeTodosRepository';
import { TodosRepository } from './TodosRepository';
import { TodosService } from './TodosService';
import { TodosController } from './TodosController';

export const app = express();
const port = process.env.PORT || 3000;

let todosRepository: TodosRepository | FakeTodoRepository;

if (process.env.NODE_ENV !== 'test') {
  const { Client } = pg;
  const client = new Client();
  await client.connect();

  todosRepository = new TodosRepository(client);
} else {
  todosRepository = new FakeTodoRepository();
}
const todosService = new TodosService(todosRepository);
const todosController = new TodosController(todosService);

app.get('/', async (req: Request, res: Response) => {
  res.send(`Hello from TypeScript Express!`);
});

app.get('/todos', async (req: Request, res: Response) => {
  return todosController.getAll(req, res);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
