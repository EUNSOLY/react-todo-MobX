import React, { useState } from "react";
import TodoStore from "./TodoStore";
import { observer } from "mobx-react";
interface TodoListProps {
  todoStore: TodoStore;
}

const TodoList: React.FC<TodoListProps> = observer(({ todoStore }) => {
  console.log(todoStore);

  const [value, setValue] = useState<string>("");
  return (
    <div className="todo">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        onClick={() => {
          if (value) {
            todoStore.addTodo(value);
          }
          setValue("");
        }}
      >
        Add
      </button>

      <div>완료일정 갯수 : {todoStore.status.completed} 개</div>
      <div>남은일정 갯수 : {todoStore.status.remaining} 개</div>
      <ul>
        {todoStore.todos.map((todo) => {
          return (
            <li
              key={todo.id}
              onClick={() => {
                todoStore.toggleTodo(todo.id);
              }}
            >
              {todo.title} [{todo.completed ? "X" : ""}]
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default TodoList;
