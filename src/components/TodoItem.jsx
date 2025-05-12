import React from 'react';

function TodoItem({ todo, id, toggleComplete, deleteTodo }) {
  const priorityColors = {
    Düşük: '#4caf50',
    Orta: '#ff9800',
    Yüksek: '#f44336',
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div>
        <strong>{todo.text}</strong>
        <div><small>Kategori: {todo.category}</small></div>
        <div>
          <small>
            Öncelik: 
            <span className={`priority-label ${
               todo.priority === "Yüksek" ? "priority-high" :
               todo.priority === "Orta" ? "priority-medium" :
               "priority-low"
            }`}>
           {todo.priority}
          </span>
          </small>

        </div>
        {todo.deadline && (
          <div><small>Teslim: {new Date(todo.deadline).toLocaleString()}</small></div>
        )}
      </div>
      <div>

      <button 
        onClick={() => toggleComplete(todo.id)}
        style={{
        backgroundColor: todo.completed ? "#4caf50" : "#ff9800", 
        color: "white", 
        borderRadius: "6px", 
        padding: "6px 12px", 
        cursor: "pointer",
        border: "none",
  }}
>
        {todo.completed ? "Geri Al" : "Tamamla"}
      </button>

      <button 
        onClick={() => deleteTodo(todo.id)}
        style={{
          backgroundColor: "#f44336", 
          color: "white", 
          borderRadius: "6px", 
          padding: "6px 12px", 
          cursor: "pointer",
          border: "none",
               }}
      >Sil</button>
      </div>
    </li>
  );
}

export default TodoItem;
