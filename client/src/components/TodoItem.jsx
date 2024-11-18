import React from 'react';

const TodoItem = ({ todo, deleteTodo, handleUpdateTodo }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={todo.status === "completed"}
        onChange={() =>
          handleUpdateTodo(todo._id, {
            status:
              todo.status === "completed" ? "pending" : "completed",
          })
        }
      />
      <span
        className={`flex-1 ${todo.status === 'completed' ? 'line-through text-gray-500' : ''}`}
      >
        {todo.description}
      </span>
      <button
        onClick={() => deleteTodo(todo._id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
