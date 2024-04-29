import { afterEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CreateTodo from '../src/components/CreateTodo.tsx';

const appendTodo = vi.fn();

describe('Todos list component', () => {
  afterEach(() => {
    appendTodo.mockReset();
  });

  test('It renders a form with a description input', async () => {
    const { getByTestId } = await waitFor(() =>
      render(<CreateTodo appendTodo={appendTodo} />)
    );
    expect(getByTestId('description-label')).toBeInTheDocument();
    expect(getByTestId('description-input')).toBeInTheDocument();
  });

  test('It renders a form with a submit button', async () => {
    const { getByTestId } = await waitFor(() =>
      render(<CreateTodo appendTodo={appendTodo} />)
    );
    expect(getByTestId('submit-button')).toBeInTheDocument();
  });

  test('It does not submit if description is empty', async () => {
    const { getByTestId } = await waitFor(() =>
      render(<CreateTodo appendTodo={appendTodo} />)
    );
    fireEvent(getByTestId('submit-button'), new MouseEvent('click'));
    expect(appendTodo).not.toHaveBeenCalled();
  });

  test('A todo creation request is sent with valid description', async () => {
    const newTodo = { description: 'First todo', isComplete: false };
    const { getByTestId } = render(<CreateTodo appendTodo={appendTodo} />);

    fireEvent.change(getByTestId('description-input'), {
      target: { value: newTodo.description },
    });
    fireEvent(getByTestId('submit-button'), new MouseEvent('click'));
    expect(appendTodo).toHaveBeenCalledWith(newTodo);
  });
});
