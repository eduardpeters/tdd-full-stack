import { beforeEach } from 'node:test';
import { beforeAll, afterEach, describe, expect, test } from 'vitest';
import { TodosController } from '../src/TodosController';
import { TodosService } from '../src/TodosService';
import { FakeTodoRepository } from '../src/FakeTodosRepository';
import request from 'supertest';
import { app } from '../src/index';

describe('Todos controller', () => {
  test('Todos are available on GET /todos', async () => {
    const response = await request(app).get('/todos');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(0);
  });

  test('An empty body returns 400 at POST /todo', async () => {
    const response = await request(app).post('/todos');
    expect(response.status).toBe(400);
  });

  test('Sending no description in body returns 400 at POST /todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ isComplete: false });
    expect(response.status).toBe(400);
  });

  test('Sending empty description string in body returns 400 at POST /todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ isComplete: false, description: '' });
    expect(response.status).toBe(400);
  });
});
