import express, { Request, Response } from 'express';
import cors from 'cors';
import pg from 'pg';
import { FakeTodoRepository } from './FakeTodosRepository.js';
import { TodosRepository } from './TodosRepository.js';
import { TodosService } from './TodosService.js';
import { TodosController } from './TodosController.js';

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

app.use(cors());
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.send(`Hello from TypeScript Express!`);
});

app.get('/todos', async (req: Request, res: Response) => {
  return todosController.getAll(req, res);
});

app.post('/todos', async (req: Request, res: Response) => {
  return todosController.create(req, res);
});

app.patch('/todos/:id', async (req: Request, res: Response) => {
  return todosController.updateById(req, res);
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
  return todosController.deleteById(req, res);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
