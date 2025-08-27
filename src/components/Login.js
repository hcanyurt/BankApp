import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Lütfen e-posta ve şifrenizi girin.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7180/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();

        // ✅ Tüm kullanıcıyı localStorage'a kaydet (id, email, fullName vs.)
        localStorage.setItem("user", JSON.stringify(user));

        alert(`✅ Giriş başarılı! Hoşgeldin ${user.fullName}`);
        onLogin?.(user); // App.js'e user'ı gönder
      } else {
        const errorText = await response.text();
        alert("❌ Giriş hatalı: " + errorText);
      }
    } catch (error) {
      alert("❌ Sunucu hatası: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Giriş Yap</h2>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />

      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />

      <button type="submit" style={{ padding: "10px 20px", width: "100%" }}>
        Giriş Yap
      </button>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button
          type="button"
          onClick={() => alert("Şifre sıfırlama özelliği yakında eklenecek.")}
          style={{
            background: "none",
            border: "none",
            color: "#007BFF",
            cursor: "pointer",
            fontSize: "14px",
            textDecoration: "underline",
          }}
        >
          Şifrenizi mi unuttunuz?
        </button>
      </div>
    </form>
  );
}
