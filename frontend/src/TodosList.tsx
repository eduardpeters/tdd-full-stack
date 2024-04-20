import { useState } from 'react';
import { Todo } from './types.ts';

export default function TodosList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<boolean>(false);

  return (
    <main data-testid="todos-list">
      {error && <span>Oh no, something bad happened</span>}
      {todos.length > 0 ? <span>todo</span> : <span>No todos yet...</span>}
    </main>
  );
}
