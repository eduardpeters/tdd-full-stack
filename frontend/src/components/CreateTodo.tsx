import { FormEvent, useState } from 'react';
import { createTodo } from '../services/TodosService.ts';
import { Todo } from '../types.ts';

interface CreateTodoProps {
  appendTodo: (todo: Todo) => void;
}

export default function CreateTodo({ appendTodo }: CreateTodoProps) {
  const [description, setDescription] = useState<string>('');

  async function submitTodo(event: FormEvent) {
    event.preventDefault();
    if (description.length === 0) {
      return;
    }
    const newTodo = await createTodo({
      description: description,
      isComplete: false,
    });

    if ('error' in newTodo) {
      alert(newTodo.error);
    } else {
      appendTodo(newTodo);
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
