import { beforeEach } from 'node:test';
import { beforeAll, afterEach, describe, expect, test } from 'vitest';
import { TodosController } from '../src/TodosController';
import { TodosService } from '../src/TodosService';
import { FakeTodoRepository } from '../src/FakeTodosRepository';
import request from 'supertest';
import { app } from '../src/index';

describe('Todos controller', () => {
  let todosController: TodosController;

  beforeAll(() => {
    const todosRepository = new FakeTodoRepository();
    const todosService = new TodosService(todosRepository);
    todosController = new TodosController(todosService);
  });

  test('Todos are available on /todos', async () => {
    const response = await request(app).get('/todos');
    console.log(response.status, response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
