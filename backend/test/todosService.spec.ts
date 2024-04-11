import { beforeEach, describe, expect, test } from 'vitest';
import { getAllTodos, createTodo, getTodoById } from '../src/todosService';

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
});
