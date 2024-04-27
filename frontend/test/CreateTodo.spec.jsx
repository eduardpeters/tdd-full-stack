import { afterEach, describe, expect, test, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import CreateTodo from '../src/components/CreateTodo.tsx';

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

  test('It renders a form with a description input', async () => {
    const { getByTestId } = await waitFor(() => render(<CreateTodo />));
    expect(getByTestId('description-label')).toBeInTheDocument();
    expect(getByTestId('description-input')).toBeInTheDocument();
  });

  test('It renders a form with a submit button', async () => {
    const { getByTestId } = await waitFor(() => render(<CreateTodo />));
    expect(getByTestId('submit-button')).toBeInTheDocument();
  });

  test.skip('It renders an empty list message if no todos are available', async () => {
    const mockTodos = [];
    fetch.mockResolvedValue(createFetchResponse(mockTodos));
    const { getByTestId } = await waitFor(() => render(<TodosList />));
    expect(getByTestId('todos-list')).toHaveTextContent('No todos yet...');
  });

  test.skip('It renders a list with todos', async () => {
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
