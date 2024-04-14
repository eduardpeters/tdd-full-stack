import pg from 'pg';
import { beforeAll, afterEach, describe, expect, test } from 'vitest';
import { TodosRepository } from '../src/TodosRepository';

describe('Todos repository', () => {
  let repository: TodosRepository;

  beforeAll(async () => {
    const { Client } = pg;
    const client = new Client({
      user: process.env.VITE_PGUSER,
      password: process.env.VITE_PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT as unknown as number,
    });
    await client.connect();
    await client.query(
      'CREATE TABLE IF NOT EXISTS todos (id serial, description VARCHAR(255), is_complete boolean);'
    );
    repository = new TodosRepository(client);
  });

  afterEach(async () => {
    await repository.truncate();
  });

  test('Empty table returns empty array', async () => {
    expect(await repository.getAll()).toEqual([]);
  });

  test('A todo can be created', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const created = await repository.create(newTodo);
    expect(created).toHaveProperty('id');
    expect(created.description).toBe('a new todo');
    expect(created.isComplete).toBe(false);
  });

  test('A populated table returns an array of todos', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    await repository.create(newTodo);
    let todos = await repository.getAll();
    expect(todos).toHaveLength(1);
    await repository.create(newTodo);
    todos = await repository.getAll();
    expect(todos).toHaveLength(2);
    expect(todos[0]).toHaveProperty('id');
    expect(todos[0]).toHaveProperty('description');
    expect(todos[0]).toHaveProperty('isComplete');
  });
});
