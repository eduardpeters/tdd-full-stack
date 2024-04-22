import { describe, expect, test } from 'vitest';
import { getAllTodos } from '../src/services/TodosService.ts';

describe('Todos service', () => {
  test('Returns an error message if request fails', async () => {
    console.log('load env', import.meta.env.VITE_HELLO);
    const response = await getAllTodos();
    console.log(response);
    expect(response).toHaveProperty('error');
  });
});
