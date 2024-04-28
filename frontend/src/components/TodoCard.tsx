import type { Todo } from '../types.ts';

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  return (
    <div>
      <span data-testid="todo-description">{todo.description}</span>
      <span data-testid="todo-completeness">
        {todo.isComplete ? 'Done!' : 'Pending'}
      </span>
    </div>
  );
}
