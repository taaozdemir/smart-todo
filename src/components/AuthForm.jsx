import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        showToast("Kayıt başarılı 🎉");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        showToast("Giriş başarılı 👋");
      }
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      showToast("Hata: " + err.message, true);
    }
  };

  const showToast = (message, isError = false) => {
    const toast = document.createElement("div");
    toast.className = `toast ${isError ? "error" : ""}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    }, 50);
  };

  return (
    <div className={`auth-form ${fadeIn ? "fade-in" : ""}`}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '40px' }}>✅</div>
        <h1 style={{ fontSize: '28px', margin: '0' }}>Smart To-Do</h1>
        <p style={{ fontSize: '16px', marginTop: '6px', color: 'gray' }}>
          Planlarını Bugün Gerçekleştir ✨
        </p>
      </div>

      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="E-posta adresin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={{ width: "100%", marginTop: "10px" }}>
          {isRegistering ? "Kayıt Ol" : "Giriş Yap"}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '14px' }}>
        <span>
          {isRegistering ? "Zaten hesabın var mı?" : "Hesabın yok mu?"}
        </span>{" "}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isRegistering ? "Giriş Yap" : "Kayıt Ol"}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
