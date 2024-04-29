import { FormEvent, useState } from 'react';
import { ResponseError, TodoDto } from '../types.ts';

interface CreateTodoProps {
  appendTodo: (todo: TodoDto) => Promise<ResponseError | undefined>;
}

export default function CreateTodo({ appendTodo }: CreateTodoProps) {
  const [description, setDescription] = useState<string>('');

  async function submitTodo(event: FormEvent) {
    event.preventDefault();
    if (description.length === 0) {
      return;
    }
    const newTodo = {
      description: description,
      isComplete: false,
    };

    const error = await appendTodo(newTodo);

    if (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={submitTodo}>
      <h1>Create a new todo</h1>
      <label data-testid="description-label">
        <span>Description</span>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-testid="description-input"
        ></input>
      </label>
      <button data-testid="submit-button">Create</button>
    </form>
  );
}
