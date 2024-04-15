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

  test('No todo is retrieved when searching for a invalid id', async () => {
    const result = await repository.getById(123);
    expect(result).toBeUndefined();
  });

  test('A single todo can be retrieved by id', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const result = await repository.create(newTodo);
    const retrieved = await repository.getById(result.id);
    expect(retrieved?.id).toEqual(result.id);
    expect(retrieved?.description).toEqual(result.description);
    expect(retrieved?.isComplete).toEqual(result.isComplete);
  });

  test('A single todo can be updated by id', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const result = await repository.create(newTodo);
    const newData = { description: 'just completed', isComplete: true };
    const updated = await repository.update(result.id, newData);
    expect(updated?.id).toEqual(result.id);
    expect(updated?.description).toEqual('just completed');
    expect(updated?.isComplete).toEqual(true);
  });

  test('A single todo description can be updated by id', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const result = await repository.create(newTodo);
    const newData = { description: 'just completed' };
    const updated = await repository.update(result.id, newData);
    expect(updated?.id).toEqual(result.id);
    expect(updated?.description).toEqual('just completed');
  });

  test('A single todo completeness can be updated by id', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const result = await repository.create(newTodo);
    const newData = { isComplete: true };
    const updated = await repository.update(result.id, newData);
    expect(updated?.id).toEqual(result.id);
    expect(updated?.isComplete).toEqual(true);
  });

  test('No todo is updated when using an invalid id', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const result = await repository.create(newTodo);
    const newData = { description: 'just completed', isComplete: true };
    const updated = await repository.update(123, newData);
    expect(updated).toBeUndefined();
    const confirmResult = await repository.getById(result.id);
    expect(confirmResult).to.deep.equal(result);
  });

  test('A todo can be deleted by id', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const result = await repository.create(newTodo);
    let allTodos = await repository.getAll();
    expect(allTodos).toHaveLength(1);
    await repository.delete(result.id);
    allTodos = await repository.getAll();
    expect(allTodos).toHaveLength(0);
  });

  test('No todo is deleted if id is not valid', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const result = await repository.create(newTodo);
    let allTodos = await repository.getAll();
    expect(allTodos).toHaveLength(1);
    await repository.delete(result.id + 42);
    allTodos = await repository.getAll();
    expect(allTodos).toHaveLength(1);
  });
});
