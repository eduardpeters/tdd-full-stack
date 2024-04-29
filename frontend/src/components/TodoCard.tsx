import { useState } from 'react';
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
  const [newDescription, setNewDescription] = useState(todo.description);

  async function changeDescription() {
    if (todo.description === newDescription) {
      return;
    }
    const error = await updateTodo({ ...todo, description: newDescription });

    if (error) {
      alert(error.error);
    }
  }

  async function changeCompleteness() {
    const error = await updateTodo({ ...todo, isComplete: !todo.isComplete });

    if (error) {
      alert(error.error);
    }
  }
  return (
    <div>
      <label data-testid="todo-description">
        {todo.description}
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          data-testid="description-input"
        ></input>
      </label>
      <button onClick={changeDescription} data-testid="description-button">
        Update description
      </button>
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
