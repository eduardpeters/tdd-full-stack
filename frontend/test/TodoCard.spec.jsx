import { afterEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import TodoCard from '../src/components/TodoCard.tsx';

const updateTodo = vi.fn();

describe('Todos list component', () => {
  afterEach(() => {
    updateTodo.mockReset();
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

  test("An incomplete todo's description can be updated", async () => {
    const mockTodo = { id: 1, description: 'First todo', isComplete: false };
    const { getByTestId } = render(
      <TodoCard todo={mockTodo} updateTodo={updateTodo} />
    );

    const newDescription = 'Updated todo';
    fireEvent.change(getByTestId('description-input'), {
      target: { value: newDescription },
    });
    getByTestId('description-button').click();

    expect(updateTodo).toHaveBeenCalledWith({
      ...mockTodo,
      description: newDescription,
    });
  });
});
