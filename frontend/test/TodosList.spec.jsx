import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import TodosList from '../src/TodosList.tsx';

describe('Todos list component', () => {
  test('It renders an empty list message if no todos are available', () => {
    const { getByTestId } = render(<TodosList />);
    expect(getByTestId('todos-list')).toHaveTextContent('No todos yet...');
  });

  test('It renders a list with todos', () => {
    const { getByTestId } = render(<TodosList />);
    expect(getByTestId('todos-list').children.length).toBeGreaterThan(0);
    expect(getByTestId('todos-list')).not.toHaveTextContent('No todos yet...');
  });
});
