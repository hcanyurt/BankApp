import React, { useState } from "react";
import { Box, Tab, Tabs, TextField, Button, Paper, Typography, Fade } from "@mui/material";

export default function AuthPage({ onLogin }) {
  const [tabIndex, setTabIndex] = useState(0); // 0 = Login, 1 = Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setEmail("");
    setPassword("");
    setConfirm("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Lütfen e-posta ve şifrenizi girin.");
    try {
      const response = await fetch("https://localhost:7180/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error(await response.text());
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      alert(`Giriş başarılı! Hoşgeldin ${user.fullName}`);
      onLogin?.(user);
    } catch (error) {
      alert("Hata: " + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) return alert("Tüm alanları doldurun.");
    if (password !== confirm) return alert("Şifreler uyuşmuyor.");
    try {
      const response = await fetch("https://localhost:7180/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.text();
      if (response.ok) alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      else alert("Hata: " + data);
    } catch (error) {
      alert("Sunucu hatası: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/pictures/app.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper elevation={6} sx={{ width: 360, p: 4, borderRadius: 3, bgcolor: "rgba(255,255,255,0.95)" }}>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Giriş Yap" />
          <Tab label="Üye Ol" />
        </Tabs>

        <Fade in={tabIndex === 0}>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2, display: tabIndex === 0 ? "block" : "none" }}>
            <TextField label="E-mail" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField label="Şifre" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, "&:hover": { bgcolor: "#0056b3" } }}>Giriş Yap</Button>
          </Box>
        </Fade>

        <Fade in={tabIndex === 1}>
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 2, display: tabIndex === 1 ? "block" : "none" }}>
            <TextField label="E-mail" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField label="Şifre" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
            <TextField label="Şifre Tekrar" type="password" fullWidth margin="normal" value={confirm} onChange={e => setConfirm(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, "&:hover": { bgcolor: "#0056b3" } }}>Üye Ol</Button>
          </Box>
        </Fade>
      </Paper>
    </Box>
  );
}

