import { afterEach, describe, expect, test, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import TodosList from '../src/TodosList.tsx';

// eslint-disable-next-line no-undef
global.fetch = vi.fn();

function createFetchResponse(data, isOk = true) {
  return { json: () => new Promise((resolve) => resolve(data)), ok: isOk };
}

describe('Todos list component', () => {
  afterEach(() => {
    // eslint-disable-next-line no-undef
    global.fetch.mockReset();
  });

  test('It renders an error message if todos cannot be fetched', async () => {
    fetch.mockResolvedValue(createFetchResponse({}, false));
    const { getByTestId } = await waitFor(() => render(<TodosList />));
    expect(getByTestId('error-message')).toBeInTheDocument();
  });

  test('It renders an empty list message if no todos are available', async () => {
    const mockTodos = [];
    fetch.mockResolvedValue(createFetchResponse(mockTodos));
    const { getByTestId } = await waitFor(() => render(<TodosList />));
    expect(getByTestId('todos-list')).toHaveTextContent('No todos yet...');
  });

  test('It renders a list with todos', async () => {
    const mockTodos = [
      { id: 1, description: 'First todo', isComplete: false },
      { id: 2, description: 'Second todo', isComplete: true },
    ];
    fetch.mockResolvedValue(createFetchResponse(mockTodos));
    const { getByTestId } = await waitFor(() => render(<TodosList />));
    expect(getByTestId('todos-list').children.length).toBeGreaterThan(0);
    expect(getByTestId('todos-list')).not.toHaveTextContent('No todos yet...');
  });
});
