import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addTodoToFirestore, getTodosFromFirestore, deleteTodoFromFirestore, toggleTodoInFirestore, toggleCompleteFirestore } from './utils/firestoreHelpers';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import AuthForm from './components/AuthForm';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Auth kontrolü
  // Todo listesi firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const fetchedTodos = await getTodosFromFirestore(currentUser.uid);
        setTodos(fetchedTodos);
      } else {
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Dark mode class
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  //TODO
  const addTodo = async (todoData) => {
    const newTodo = {
      ...todoData,
      userId: user.uid,
      createdAt: new Date(),
    };
  
    console.log("Gönderilen görev:", newTodo); //Test için
  
    try {
      const added = await addTodoToFirestore(newTodo);
      setTodos([...todos, { ...newTodo, id: added.id }]);
    } catch (err) {
      console.error("Firestore hatası:", err);
    }
  };

  //Firestore
  const toggleComplete = async (id) => {
  const todo = todos.find(t => t.id === id);
  if (!todo) return; // id eşleşmiyorsa işlem yapma

  const newCompleted = !todo.completed;

  try {
    await toggleCompleteFirestore(id, newCompleted); // Firestore'a doğru değer gönder
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: newCompleted } : t
    ));
  } catch (err) {
    console.error("toggleComplete hatası:", err);
  }
};

  //firestore silme
  const deleteTodo = async (id) => {
    await deleteTodoFromFirestore(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  //filtreleme
  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  //login-out
  const handleLogout = () => signOut(auth);

  //state
  const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      if (user) {
      setShowContent(true);
                } else {
  // kısa gecikmeyle animasyonun bitmesini bekle
      setTimeout(() => setShowContent(false), 300);
  }

}, [user]);

  return (
<div className={`app-container ${darkMode ? "dark" : ""}`}>
  <div className="top-bar">
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "☀️" : "🌙"}
    </button>
    {user && (
      <button onClick={handleLogout} className="logout-btn">
        Çıkış Yap
      </button>
    )}
  </div>

  <h1>Smart To-Do App</h1>

  {user || showContent ? (
  <div className={user ? "fade-in" : "fade-out"}>
    <TodoForm addTodo={addTodo} />
    <div className="filters">
      <button
      className={filter === "all" ? "filter-button active" : "filter-button"}
      onClick={() => setFilter("all")}
      >
      Hepsi
      </button>
      <button
       className={filter === "active" ? "filter-button active" : "filter-button"}
       onClick={() => setFilter("active")}
       >
       Aktif
      </button>
      <button
       className={filter === "completed" ? "filter-button active" : "filter-button"}
       onClick={() => setFilter("completed")}
       >
      Tamamlanan
      </button>
     </div>
    <TodoList todos={filteredTodos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
  </div>
) : (
  <AuthForm />
)}
</div>
  );
}

export default App;
