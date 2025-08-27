import React from "react";

export default function Card({ total, name, cardNumber, balance }) {
  const maskedNumber = cardNumber
    ? `${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(-4)}`
    : "**** **** **** ****";

  const remaining = balance != null ? balance - total : null;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Sanal Kart</h3>
      <div style={styles.number}>{maskedNumber}</div>
      <div style={styles.name}>{name || "Ad Soyad"}</div>
      {balance != null && (
        <div style={styles.balance}>
          <div>💰 Toplam Bakiye: <strong>{balance} ₺</strong></div>
          <div>🧾 Kalan Bakiye: <strong>{remaining} ₺</strong></div>
        </div>
      )}
      <div style={styles.total}>
        Toplam Harcama: <strong>{total} ₺</strong>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: 300,
    margin: "30px auto",
    padding: 20,
    borderRadius: 12,
    background: "linear-gradient(135deg, #122e4aff, #42a5f5)",
    color: "white",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  title: {
    marginBottom: 10,
  },
  number: {
    fontSize: 24,
    letterSpacing: 2,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    marginBottom: 10,
  },
  balance: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: "1.5",
  },
  total: {
    fontSize: 16,
    marginTop: 10,
  },
};
