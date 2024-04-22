import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getAllTodos } from '../src/services/TodosService.ts';

global.fetch = vi.fn();

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)), ok: true };
}

describe('Todos service', () => {
  beforeEach(() => {
    global.fetch.mockReset();
  });

  test('Returns an error message if request fails', async () => {
    const response = await getAllTodos();

    expect(response).toHaveProperty('error');
  });

  test('Returns an empty array of todos if successful', async () => {
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
});
