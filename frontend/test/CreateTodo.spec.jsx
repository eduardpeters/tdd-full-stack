import { afterEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CreateTodo from '../src/components/CreateTodo.tsx';

// eslint-disable-next-line no-undef
global.fetch = vi.fn();

function createFetchResponse(data, isOk = true) {
  return { json: () => new Promise((resolve) => resolve(data)), ok: isOk };
}

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/todos`;

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

  test('It does not submit if description is empty', async () => {
    const { getByTestId } = await waitFor(() => render(<CreateTodo />));
    fireEvent(getByTestId('submit-button'), new MouseEvent('click'));
    expect(fetch).not.toHaveBeenCalled();
  });

  test('A todo creation request is sent with valid description', async () => {
    const mockResponse = [
      { id: 1, description: 'First todo', isComplete: false },
    ];
    fetch.mockResolvedValue(createFetchResponse(mockResponse));
    const { getByTestId } = await waitFor(() => render(<CreateTodo />));

    fireEvent.change(getByTestId('description-input'), {
      target: { value: 'First todo' },
    });
    fireEvent(getByTestId('submit-button'), new MouseEvent('click'));

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: 'First todo', isComplete: false }),
    });
  });
});
