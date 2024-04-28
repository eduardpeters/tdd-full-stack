import type { ResponseError, Todo } from '../types.ts';

interface TodosListProps {
  todos: Todo[] | undefined;
  error: string | undefined;
  updateTodo: (todo: Todo) => Promise<ResponseError | undefined>;
  deleteTodo: (id: number) => Promise<ResponseError | undefined>;
}

export default function TodosList({ todos, error }: TodosListProps) {
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
