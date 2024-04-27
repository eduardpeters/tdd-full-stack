import useTodos from '../hooks/useTodos.tsx';

export default function TodosList() {
  const [todos, setTodos, error] = useTodos();

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
