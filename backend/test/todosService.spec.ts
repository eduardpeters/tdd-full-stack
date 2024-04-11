import { describe, expect, test } from 'vitest';
import { getAllTodos, createTodo } from '../src/todosService';

describe('Todos service', () => {
  test('Empty array is returned when there are no todos', async () => {
    expect(await getAllTodos()).toEqual([]);
  });

  test('A todo can be added', async () => {
    const newTodo = { description: 'a new todo', isComplete: false };
    expect(await createTodo(newTodo)).toHaveProperty('id');
  });
});
