import { useEffect, useState } from 'react';
import { Todo } from '../types.ts';

export default function useTodos() {
  const [todos, setTodos] = useState<Todo | undefined>(undefined);
  const [error, setError] = useState<boolean>(true);

  useEffect(() => {
    setError(true);
  }, []);

  return [todos, error];
}
