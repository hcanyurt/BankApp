import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      alert("Tüm alanları doldurun.");
      return;
    }

    if (password !== confirm) {
      alert("Şifreler uyuşmuyor.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7180/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (response.ok) {
        alert("✅ Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      } else {
        alert("❌ Hata: " + data);
      }
    } catch (error) {
      alert("❌ Sunucu hatası: " + error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ border: "1px solid #ccc", padding: "30px", borderRadius: "10px" }}>
      <h2>Üye Ol</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Şifre Tekrar"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
      />
      <button type="submit" style={{ padding: "10px 20px" }}>Üye Ol</button>
    </form>
  );
}
