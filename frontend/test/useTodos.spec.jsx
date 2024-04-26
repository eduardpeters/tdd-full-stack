import { afterEach, describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useTodos from '../src/hooks/useTodos.tsx';

// eslint-disable-next-line no-undef
global.fetch = vi.fn();

function createFetchResponse(data, isOk = true) {
  return { json: () => new Promise((resolve) => resolve(data)), ok: isOk };
}

describe('useTodos hook', () => {
  afterEach(() => {
    // eslint-disable-next-line no-undef
    global.fetch.mockReset();
  });

  test('An error is returned if there is no response', () => {
    fetch.mockResolvedValue(createFetchResponse({}, false));
    const { result } = renderHook(() => useTodos());
    const [todos, error] = result.current;

    expect(todos).toBe(undefined);
    expect(error).toBe(true);
  });
});
