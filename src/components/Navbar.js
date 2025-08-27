import React from "react";

export default function Navbar({ onAddCardClick, onLogout }) {
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>BankApp</div>
      <div style={styles.right}>
        <span role="img" aria-label="notif" style={{ marginRight: 10 }}>
          🔔
        </span>
        <button onClick={onAddCardClick} style={styles.button}>
          + Kart Ekle
        </button>
        <button onClick={onLogout} style={styles.logoutButton}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    color: "#1976d2",
    padding: "6px 12px",
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "6px 12px",
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "10px",
  },
};
