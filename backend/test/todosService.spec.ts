import pg from 'pg';
import { beforeAll, describe, expect, test } from 'vitest';
import { TodosService } from '../src/TodosService';
import { FakeTodoRepository } from '../src/FakeTodosRepository';
import { TodosRepository } from '../src/TodosRepository';

describe('Todos service', () => {
  let todosService: TodosService;

  beforeAll(async () => {
    //const repository = new FakeTodoRepository();
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
    const repository = new TodosRepository(client);
    todosService = new TodosService(repository);
  });

  test('Empty array is returned when there are no todos', async () => {
    expect(await todosService.getAll()).toEqual([]);
  });

  test('A todo can be added', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    expect(await todosService.create(newTodo)).toHaveProperty('id');
  });

  test('When a todo exists, it is returned when getting all', async () => {
    expect(await todosService.getAll()).toHaveLength(1);
  });

  test('A specific todo can be retrieved', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const created = await todosService.create(newTodo);
    const found = await todosService.getById(created.id);
    expect(found?.description).toEqual('a new todo');
  });

  test('A specific todo can be completed', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const created = await todosService.create(newTodo);
    const patchData = { isComplete: true };
    const updated = await todosService.update(created.id, patchData);
    expect(updated?.description).toEqual('a new todo');
    expect(updated?.isComplete).to.be.true;
  });

  test('A specific todo description can change', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const created = await todosService.create(newTodo);
    const patchData = { description: 'a new description' };
    const updated = await todosService.update(created.id, patchData);
    expect(updated?.description).toEqual('a new description');
    expect(updated?.isComplete).to.be.false;
  });

  test('A specific todo can be deleted', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const created = await todosService.create(newTodo);
    let allTodos = await todosService.getAll();
    const previousLength = allTodos.length;
    await todosService.deleteById(created.id);
    allTodos = await todosService.getAll();
    expect(allTodos.length).toEqual(previousLength - 1);
    expect(allTodos).to.not.contain(created);
  });
});
