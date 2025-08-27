import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function RegisterMUI() {
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
        headers: { "Content-Type": "application/json" },
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
    <Box component="form" onSubmit={handleRegister} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" align="center">Üye Ol</Typography>
      <TextField label="E-mail" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Şifre" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
      <TextField label="Şifre Tekrar" type="password" fullWidth value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <Button type="submit" variant="contained" fullWidth>Üye Ol</Button>
    </Box>
  );
}
