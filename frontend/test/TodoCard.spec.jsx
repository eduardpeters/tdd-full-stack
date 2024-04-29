import { afterEach, describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import TodoCard from '../src/components/TodoCard.tsx';

const updateTodo = vi.fn();
// eslint-disable-next-line no-undef
global.fetch = vi.fn();

function createFetchResponse(data, isOk = true) {
  return { json: () => new Promise((resolve) => resolve(data)), ok: isOk };
}

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/todos`;

describe('Todos list component', () => {
  afterEach(() => {
    updateTodo.mockReset();
    // eslint-disable-next-line no-undef
    global.fetch.mockReset();
  });

  test("It renders a todo's details", () => {
    const mockTodo = { id: 1, description: 'First todo', isComplete: false };
    const { getByTestId } = render(<TodoCard todo={mockTodo} />);
    expect(getByTestId('todo-description')).toBeInTheDocument();
    expect(getByTestId('todo-completeness')).toBeInTheDocument();
  });

  test('It can be set as complete', async () => {
    const mockTodo = { id: 1, description: 'First todo', isComplete: false };
    const { getByTestId } = render(
      <TodoCard todo={mockTodo} updateTodo={updateTodo} />
    );

    expect(getByTestId('complete-button')).toHaveTextContent('Mark complete');

    getByTestId('complete-button').click();
    expect(updateTodo).toHaveBeenCalledWith({ ...mockTodo, isComplete: true });
  });

  test('It can be set as not complete', async () => {
    const mockTodo = { id: 1, description: 'First todo', isComplete: true };
    const { getByTestId } = render(
      <TodoCard todo={mockTodo} updateTodo={updateTodo} />
    );

    expect(getByTestId('complete-button')).toHaveTextContent(
      'Mark not complete'
    );

    getByTestId('complete-button').click();
    expect(updateTodo).toHaveBeenCalledWith({ ...mockTodo, isComplete: false });
  });

  test.skip('It renders a list with todos', async () => {
    const mockTodos = [
      { id: 1, description: 'First todo', isComplete: false },
      { id: 2, description: 'Second todo', isComplete: true },
    ];
    const mockError = undefined;
    const { getByTestId } = await waitFor(() =>
      render(<TodosList todos={mockTodos} error={mockError} />)
    );
    expect(getByTestId('todos-list').children.length).toBeGreaterThan(0);
    expect(getByTestId('todos-list')).not.toHaveTextContent('No todos yet...');
  });
});
