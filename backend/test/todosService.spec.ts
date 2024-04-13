import { beforeEach, describe, expect, test } from 'vitest';
import {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodoById,
} from '../src/todosService';

describe('Todos service', () => {
  test('Empty array is returned when there are no todos', async () => {
    expect(await getAllTodos()).toEqual([]);
  });

  test('A todo can be added', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    expect(await createTodo(newTodo)).toHaveProperty('id');
  });

  test('When a todo exists, it is returned when getting all', async () => {
    expect(await getAllTodos()).toHaveLength(1);
  });

  test('A specific todo can be retrieved', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const created = await createTodo(newTodo);
    const found = await getTodoById(created.id);
    expect(found?.description).toEqual('a new todo');
  });

  test('A specific todo can be completed', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const created = await createTodo(newTodo);
    const patchData = { isComplete: true };
    const updated = await updateTodo(created.id, patchData);
    expect(updated?.description).toEqual('a new todo');
    expect(updated?.isComplete).to.be.true;
  });

  test('A specific todo description can change', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const created = await createTodo(newTodo);
    const patchData = { description: 'a new description' };
    const updated = await updateTodo(created.id, patchData);
    expect(updated?.description).toEqual('a new description');
    expect(updated?.isComplete).to.be.false;
  });

  test('A specific todo can be deleted', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    const created = await createTodo(newTodo);
    let allTodos = await getAllTodos();
    const previousLength = allTodos.length;
    await deleteTodoById(created.id);
    allTodos = await getAllTodos();
    expect(allTodos.length).toEqual(previousLength - 1);
    expect(allTodos).to.not.contain(created);
  });
});
