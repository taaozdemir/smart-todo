import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.length === 0 && <p className='no-todos'>Hiç görev yok.</p>}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
