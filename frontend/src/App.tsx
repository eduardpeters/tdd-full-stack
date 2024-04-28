import CreateTodo from './components/CreateTodo.tsx';
import TodosList from './components/TodosList.tsx';
import useTodos from './hooks/useTodos.tsx';

function App() {
  const [todos, setTodos, error] = useTodos();
  return (
    <>
      <CreateTodo appendTodo={() => undefined} />
      <TodosList todos={todos} setTodos={setTodos} error={error} />
    </>
  );
}

export default App;
