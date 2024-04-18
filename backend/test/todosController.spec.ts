import { describe, expect, test } from 'vitest';
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

  test('A new todo is created at POST /todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ isComplete: false, description: 'my new todo' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toEqual('my new todo');
    expect(response.body.isComplete).toBe(false);
  });

  test('A new todo defaults to not complete when created at POST /todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ description: 'my new todo' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toEqual('my new todo');
    expect(response.body.isComplete).toBe(false);
  });

  test('Todos are available on GET /todos', async () => {
    const response = await request(app).get('/todos');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('An invalid todo id has no effect on DELETE /todos/:id', async () => {
    const todosResponse = await request(app).get('/todos');
    expect(todosResponse.body.length).toBeGreaterThan(0);
    const deleteResponse = await request(app).delete('/todos/123');
    expect(deleteResponse.status).toBe(204);
    const todosConfirmation = await request(app).get('/todos');
    expect(todosConfirmation.body.length).toEqual(todosResponse.body.length);
  });

  test('An invalid todo id has no effect on DELETE /todos/:id', async () => {
    const todosResponse = await request(app).get('/todos');
    expect(todosResponse.body.length).toBeGreaterThan(0);
    const response = await request(app)
      .post('/todos')
      .send({ isComplete: false, description: 'my new todo' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    const deleteResponse = await request(app).delete(
      `/todos/${response.body.id}`
    );
    expect(deleteResponse.status).toBe(204);
    const todosConfirmation = await request(app).get('/todos');
    expect(todosConfirmation.body.length).toEqual(todosResponse.body.length);
    expect(
      todosConfirmation.body.some((todo) => todo.id === response.body.id)
    ).toBe(false);
  });

  test('An invalid todo id cannot be updated at PATCH /todo', async () => {
    const updated = await request(app)
      .patch('/todos/123')
      .send({ isComplete: true, description: 'I am now complete' });
    expect(updated.status).toBe(400);
  });

  test('An empty update body yields 400 at PATCH /todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ description: 'my new todo' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toEqual('my new todo');
    expect(response.body.isComplete).toBe(false);
    const updated = await request(app).patch(`/todos/${response.body.id}`);
    expect(updated.status).toBe(400);
  });

  test('A todo can be completed at PATCH /todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ description: 'my new todo' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toEqual('my new todo');
    expect(response.body.isComplete).toBe(false);
    const updated = await request(app)
      .patch(`/todos/${response.body.id}`)
      .send({ isComplete: true });
    expect(updated.status).toBe(200);
    expect(updated.body.description).toEqual('my new todo');
    expect(updated.body.isComplete).toBe(true);
  });

  test('A todo description can be changed at PATCH /todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ description: 'my new todo' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toEqual('my new todo');
    expect(response.body.isComplete).toBe(false);
    const updated = await request(app)
      .patch(`/todos/${response.body.id}`)
      .send({ description: 'I am now complete' });
    expect(updated.status).toBe(200);
    expect(updated.body.description).toEqual('I am now complete');
    expect(updated.body.isComplete).toBe(false);
  });

  test('A todo can be completely updated at PATCH /todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ description: 'my new todo', isComplete: true });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toEqual('my new todo');
    expect(response.body.isComplete).toBe(true);
    const updated = await request(app)
      .patch(`/todos/${response.body.id}`)
      .send({ description: 'I am not complete', isComplete: false });
    expect(updated.status).toBe(200);
    expect(updated.body.description).toEqual('I am not complete');
    expect(updated.body.isComplete).toBe(false);
  });
});
