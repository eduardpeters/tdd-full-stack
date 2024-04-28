import { useEffect, useState } from 'react';
import { Todo, TodoDto } from '../types.ts';
import { getAllTodos, createTodo } from '../services/TodosService.ts';

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
  }, [todos]);

  async function appendTodo(newTodo: TodoDto) {
    if (newTodo.description?.length === 0 || todos === undefined) {
      return;
    }
    const response = await createTodo({
      description: newTodo.description,
      isComplete: false,
    });
    if ('error' in response) {
      return response;
    } else {
      setTodos([...todos, response]);
    }
  }

  return [todos, error, appendTodo] as const;
}
