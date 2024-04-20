import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import TodosList from '../src/TodosList.tsx';

describe('Todos list component', () => {
  test('It renders an empty list message if no todos are available', () => {
    const { getByTestId } = render(<TodosList />);
    expect(getByTestId('todos-list')).toHaveTextContent('No todos yet...');
  });
});
