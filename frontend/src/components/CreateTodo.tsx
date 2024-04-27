export default function CreateTodo() {
  return (
    <form>
      <h1>Create a new todo</h1>
      <label data-testid="description-label">
        <span>Description</span>
        <input type="text" data-testid="description-input"></input>
      </label>
      <button data-testid="submit-button">Create</button>
    </form>
  );
}
