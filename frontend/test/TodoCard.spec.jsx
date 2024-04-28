import { describe, expect, test } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import TodoCard from '../src/components/TodoCard.tsx';

describe('Todos list component', () => {
  test("It renders a todo's details", () => {
    const mockTodo = { id: 1, description: 'First todo', isComplete: false };
    const { getByTestId } = render(<TodoCard todo={mockTodo} />);
    expect(getByTestId('todo-description')).toBeInTheDocument();
    expect(getByTestId('todo-completeness')).toBeInTheDocument();
  });

  test.skip('It renders an empty list message if no todos are available', async () => {
    const mockTodos = [];
    const mockError = undefined;
    const { getByTestId } = await waitFor(() =>
      render(<TodosList todos={mockTodos} error={mockError} />)
    );
    expect(getByTestId('todos-list')).toHaveTextContent('No todos yet...');
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
