import React, { useState } from "react";
import { GrFormClose, GrFormEdit, GrFormCheckmark } from "react-icons/gr";
import { useTodoLayerValue } from "../context/TodoContext";
import clsx from "clsx";
const Todo = ({ todo }) => {
  const [{}, dispatch] = useTodoLayerValue();
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(todo.content);

  const removeTodo = (todoId) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: todoId,
    });
  };
  const completeTodo = (todoId) => {
    dispatch({
      type: "COMPLETE_TODO",
      payload: todoId,
    });
  };

  const updateTodo = (todoId, newValue) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: { todoId, newValue },
    });
  };
  const todoStyle = clsx({
    ["todo-row"]: true,
    ["completed"]: todo.isCompleted,
  });
  return (
    <div className={todoStyle}>
      <div onClick={() => (editable ? "" : completeTodo(todo.id))}>
        {editable ? (
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="todo-input-edit"
          />
        ) : (
          todo.content
        )}
      </div>
      <div className="todo-icons">
        <GrFormClose
          className="todo-icon"
          onClick={() => removeTodo(todo.id)}
        />
        {editable ? (
          <GrFormCheckmark
            className="todo-icon"
            onClick={() => {
              updateTodo({
                todoId: todo.id,
                newValue: content,
              });
              setEditable(false);
              setContent("");
            }}
          />
        ) : (
          <GrFormEdit className="todo-icon" onClick={() => setEditable(true)} />
        )}
      </div>
    </div>
  );
};

export default Todo;
