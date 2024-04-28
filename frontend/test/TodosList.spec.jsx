import { describe, expect, test } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import TodosList from '../src/components/TodosList.tsx';

describe('Todos list component', () => {
  test('It renders an error message if todos cannot be fetched', async () => {
    const mockTodos = [];
    const mockError = 'Error ocurred';
    const { getByTestId } = await waitFor(() =>
      render(<TodosList todos={mockTodos} error={mockError} />)
    );
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-message')).toHaveTextContent('Error ocurred');
  });

  test('It renders an empty list message if no todos are available', async () => {
    const mockTodos = [];
    const mockError = undefined;
    const { getByTestId } = await waitFor(() =>
      render(<TodosList todos={mockTodos} error={mockError} />)
    );
    expect(getByTestId('todos-list')).toHaveTextContent('No todos yet...');
  });

  test('It renders a list with todos', async () => {
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
