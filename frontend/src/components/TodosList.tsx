import type { Todo } from '../types.ts';

interface TodosListProps {
  todos: Todo[] | undefined;
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | undefined>>;
  error: string | undefined;
}
export default function TodosList({ todos, setTodos, error }: TodosListProps) {
  return (
    <main data-testid="todos-list">
      {error !== undefined && (
        <span data-testid="error-message">{`Oh no, something bad happened: ${error}`}</span>
      )}
      {todos && todos?.length > 0 ? (
        <span>todo</span>
      ) : (
        <span>No todos yet...</span>
      )}
    </main>
  );
}
