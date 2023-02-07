type Props = {
  todos: Todo[]
  filter: Filter
  onTodo: <T extends Todo, K extends keyof Todo, U extends T[K]>(
    obj: T,
    key: K,
    value: U,
  ) => void
}

export const TodoItem = (props: Props) => {
  const filterTodos = props.todos.filter((todo) => {
    switch (props.filter) {
      case "all":
        return !todo.removed
      case "checked":
        return todo.checked && !todo.removed
      case "unchecked":
        return !todo.checked && !todo.removed
      case "removed":
        return todo.removed
      default:
        return todo
    }
  })

  return (
    <ul>
      {filterTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={() => props.onTodo(todo, "checked", !todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => props.onTodo(todo, "value", e.target.value)}
            />
            <button onClick={() => props.onTodo(todo, "removed",!todo.removed)}>
              {todo.removed? "復元" : "削除"}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
