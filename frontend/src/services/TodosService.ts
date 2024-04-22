const baseUrl = import.meta.env.VITE_BASE_URL;

export async function getAllTodos() {
  try {
    console.log(baseUrl);
    const response = await fetch(baseUrl);
    console.log(response);
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
