import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("Kişisel");
  const [priority, setPriority] = useState("Orta");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTodo({ text, completed: false, deadline, category, priority });

    setText("");
    setDeadline("");
    setCategory("Kişisel");
    setPriority("Orta");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Bir görev yaz..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Kişisel</option>
        <option>İş</option>
        <option>Okul</option>
        <option>Diğer</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Düşük</option>
        <option>Orta</option>
        <option>Yüksek</option>
      </select>

      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Ekle</button>
    </form>
  );
}

export default TodoForm;
