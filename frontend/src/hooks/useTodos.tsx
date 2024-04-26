import { useEffect, useState } from 'react';
import { Todo } from '../types.ts';
import { getAllTodos } from '../services/TodosService.ts';

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getTodos() {
      const response = await getAllTodos();
      if ('error' in response) {
        setError(response.error);
      } else {
        setTodos(response);
      }
    }

    if (todos === undefined) {
      getTodos();
    }
  });

  return [todos, error] as const;
}
