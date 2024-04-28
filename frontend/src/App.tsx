import CreateTodo from './components/CreateTodo.tsx';
import TodosList from './components/TodosList.tsx';
import useTodos from './hooks/useTodos.tsx';

function App() {
  const [todos, error, createTodo, updateTodo, deleteTodo] = useTodos();
  return (
    <>
      <CreateTodo appendTodo={createTodo} />
      <TodosList
        todos={todos}
        error={error}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default App;
