import { ResponseError, Todo, TodoDto } from '../types.ts';

const baseUrl = `${import.meta.env.VITE_BASE_URL}/todos`;

export async function getAllTodos(): Promise<Todo[] | ResponseError> {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const todos = await response.json();
    return todos;
  } catch (e) {
    let message;
    if (e instanceof Error) {
      message = e.message;
    } else {
      message = String(e);
    }
    return { error: message };
  }
}

export async function createTodo(data: TodoDto): Promise<Todo | ResponseError> {
  if (!data || (!data.description && data.isComplete === undefined)) {
    return { error: 'Incomplete request data' };
  }
  const url = `${baseUrl}`;
  const payload = {
    description: data.description,
    isComplete: data.isComplete,
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const todos = await response.json();
    return todos;
  } catch (e) {
    let message;
    if (e instanceof Error) {
      message = e.message;
    } else {
      message = String(e);
    }
    return { error: message };
  }
}

export async function updateTodo(
  id: number,
  data: TodoDto
): Promise<Todo | ResponseError> {
  if (
    id === undefined ||
    !data ||
    (!data.description && data.isComplete === undefined)
  ) {
    return { error: 'Incomplete request data' };
  }
  const url = `${baseUrl}/${id}`;
  const { description, isComplete } = data;
  const payload: TodoDto = {};
  if (description) {
    payload.description = description;
  }
  if (isComplete !== undefined) {
    payload.isComplete = isComplete;
  }
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const todos = await response.json();
    return todos;
  } catch (e) {
    let message;
    if (e instanceof Error) {
      message = e.message;
    } else {
      message = String(e);
    }
    return { error: message };
  }
}

export async function deleteTodo(id: number): Promise<object | ResponseError> {
  if (id === undefined) {
    return { error: 'Incomplete request data' };
  }
  const url = `${baseUrl}/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return {};
  } catch (e) {
    let message;
    if (e instanceof Error) {
      message = e.message;
    } else {
      message = String(e);
    }
    return { error: message };
  }
}
