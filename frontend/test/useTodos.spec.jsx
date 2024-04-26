import { afterEach, describe, expect, test, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useTodos from '../src/hooks/useTodos.tsx';

// eslint-disable-next-line no-undef
global.fetch = vi.fn();

function createFetchResponse(data, isOk = true) {
  return { json: () => new Promise((resolve) => resolve(data)), ok: isOk };
}

describe('useTodos hook', () => {
  afterEach(() => {
    // eslint-disable-next-line no-undef
    global.fetch.mockReset();
  });

  test('An error is returned if there is no response', async () => {
    fetch.mockResolvedValue(createFetchResponse({}, false));
    const { result } = await waitFor(() => renderHook(() => useTodos()));
    const [todos, error] = result.current;

    expect(todos).toBe(undefined);
    expect(error).toBe(true);
  });

  test('An empty array is returned if there are no todos', async () => {
    const mockTodos = [];
    fetch.mockResolvedValue(createFetchResponse(mockTodos));
    const { result } = await waitFor(() => renderHook(() => useTodos()));
    const [todos, error] = result.current;

    expect(todos).to.deep.equal([]);
    expect(error).toBe(false);
  });

  test('A todos array is returned', async () => {
    const mockTodos = [
      { id: 1, description: 'First todo', isComplete: false },
      { id: 2, description: 'Second todo', isComplete: true },
    ];
    fetch.mockResolvedValue(createFetchResponse(mockTodos));
    const { result } = await waitFor(() => renderHook(() => useTodos()));
    const [todos, error] = result.current;

    expect(todos).to.deep.equal(mockTodos);
    expect(error).toBe(false);
  });
});
