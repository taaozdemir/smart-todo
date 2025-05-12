import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("Kişisel");
  const [priority, setPriority] = useState("Orta");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()){
      setError("Lütfen bir görev girin.");
      return;
    }
    //form geçerliyse hata temizle
    setError("");

    addTodo({ text, completed: false, deadline, category, priority });

    setText("");
    setDeadline("");
    setCategory("Kişisel");
    setPriority("Orta");
  };

  return (
    <form 
    onSubmit={handleSubmit} className="todo-form">
      {error && <p className="error-text">{error}</p>}
      <input className="todo-input"
        type="text"
        placeholder="Bir görev yaz..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select className="select-category" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Kişisel</option>
        <option>İş</option>
        <option>Okul</option>
        <option>Diğer</option>
      </select>

      <select className="select-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
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
