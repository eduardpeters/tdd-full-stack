import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getAllTodos, updateTodo } from '../src/services/TodosService.ts';

// eslint-disable-next-line no-undef
global.fetch = vi.fn();

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)), ok: true };
}

describe('Todos service', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    global.fetch.mockReset();
  });

  test('Returns an error message if request fails', async () => {
    const response = await getAllTodos();

    expect(response).toHaveProperty('error');
  });

  test('Returns an empty array of todos if successful, but there are no todos', async () => {
    const todoListResponse = [];
    fetch.mockResolvedValue(createFetchResponse(todoListResponse));
    const todos = await getAllTodos();

    expect(fetch).toHaveBeenCalledWith(import.meta.env.VITE_BASE_URL);
    expect(todos).toHaveLength(0);
  });

  test('Returns an array of todos if successful', async () => {
    const todoListResponse = [
      { id: 1, description: 'First todo', isComplete: false },
      { id: 2, description: 'Second todo', isComplete: true },
    ];
    fetch.mockResolvedValue(createFetchResponse(todoListResponse));
    const todos = await getAllTodos();

    expect(fetch).toHaveBeenCalledWith(import.meta.env.VITE_BASE_URL);
    expect(todos).toHaveLength(2);
  });

  test('Returns an error when no parameters are provided', async () => {
    const todos = await updateTodo();

    expect(todos).toHaveProperty('error');
  });

  test('Returns an error when no data is provided', async () => {
    const todos = await updateTodo(42);

    expect(todos).toHaveProperty('error');
  });

  test('Returns an error when empty data is provided', async () => {
    const todos = await updateTodo(42, {});

    expect(todos).toHaveProperty('error');
  });

  test('Returns an error when request fails', async () => {
    const todos = await updateTodo(42, { isComplete: true });

    expect(todos).toHaveProperty('error');
  });

  test('Returns the updated todo with description when sucessful', async () => {
    const todoResponse = {
      id: 1,
      description: 'First todo',
      isComplete: false,
    };
    fetch.mockResolvedValue(createFetchResponse(todoResponse));
    const id = todoResponse.id;
    const data = { description: 'First todo' };
    const todo = await updateTodo(id, data);

    expect(fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    expect(todo).to.deep.equal(todoResponse);
  });

  test('Returns the updated todo with new status when sucessful', async () => {
    const todoResponse = {
      id: 1,
      description: 'First todo',
      isComplete: true,
    };
    fetch.mockResolvedValue(createFetchResponse(todoResponse));
    const id = todoResponse.id;
    const data = { isComplete: true };
    const todo = await updateTodo(id, data);

    expect(fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    expect(todo).to.deep.equal(todoResponse);
  });

  test('Returns the updated todo with all fields updated when sucessful', async () => {
    const todoResponse = {
      id: 1,
      description: 'First todo',
      isComplete: true,
    };
    fetch.mockResolvedValue(createFetchResponse(todoResponse));
    const id = todoResponse.id;
    const data = { description: 'First todo', isComplete: true };
    const todo = await updateTodo(id, data);

    expect(fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BASE_URL}/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    expect(todo).to.deep.equal(todoResponse);
  });
});
