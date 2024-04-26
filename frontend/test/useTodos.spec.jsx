import { beforeEach, describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useTodos from '../src/hooks/useTodos.tsx';

describe('useTodos hook', () => {
  test('An error is returned if there is no response', () => {
    const { result } = renderHook(() => useTodos());
    console.log(result);
    const [todos, error] = result.current;
    expect(todos).toBe(undefined);
    expect(error).toBe(true);
  });
});
