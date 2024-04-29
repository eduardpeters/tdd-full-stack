import { updateTodo } from '../services/TodosService.ts';
import type { Todo, ResponseError } from '../types.ts';

interface TodoCardProps {
  todo: Todo;
  updateTodo: (todo: Todo) => Promise<ResponseError | undefined>;
  deleteTodo: (id: number) => Promise<ResponseError | undefined>;
}

export default function TodoCard({
  todo,
  updateTodo,
  deleteTodo,
}: TodoCardProps) {
  async function changeCompleteness() {
    const error = await updateTodo({ ...todo, isComplete: !todo.isComplete });

    if (error) {
      alert(error.error);
    }
  }
  return (
    <div>
      <span data-testid="todo-description">{todo.description}</span>
      <span data-testid="todo-completeness">
        {todo.isComplete ? 'Done!' : 'Pending'}
      </span>
      <button
        data-testid="complete-button"
        onClick={changeCompleteness}
      >{`Mark ${todo.isComplete ? 'not' : ''} complete`}</button>
    </div>
  );
}
