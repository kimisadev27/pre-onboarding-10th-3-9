import TodoItem from "./TodoItem";

const TodoList = ({ todos, setTodos }: any) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }: any) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
